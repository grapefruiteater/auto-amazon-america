import React from 'react'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import Papa from 'papaparse'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CRow,
  CAlert,
  CSpinner,
} from '@coreui/react'

const FormControl = () => {
  //変数宣言
  const [selectedFile, setSelectedFile] = React.useState()
  const [isFilePicked, setIsFilePicked] = React.useState(false)
  const [responseData, setResponseData] = React.useState(null)
  const [csvData, setCsvData] = React.useState([])
  const [isAvairableSPAPI, setisAvairableSPAPI] = React.useState(null)

  const initialTask = async () => {
    await handlecheckSubmission('check')
  }

  React.useEffect(() => {
    initialTask()
  }, [])

  //ファイル選択時にファイルを変数に格納する
  const changeHandler = (event) => {
    //ファイルアップロード用
    setSelectedFile(event.target.files[0])
    setIsFilePicked(true)
    //ファイル読み込み用
    const reader = new FileReader()
    reader.onloadend = handleFileRead
    reader.readAsText(event.target.files[0])
  }

  const handleFileRead = (event) => {
    const content = event.target.result
    //CSVファイル読み込み用
    const result = Papa.parse(content, { header: true })
    setCsvData(result.data)
  }

  //ファイルをURLへHTTP POSTしてアップロードする
  const handleSubmission = async (event) => {
    event.preventDefault()
    const users = await Auth.currentAuthenticatedUser()

    const formData = new FormData()
    formData.append('File', selectedFile)
    formData.append('Text', users.username)
    console.log(selectedFile)

    try {
      await axios
        .post(
          //'https://d93u0057x3.execute-api.ap-northeast-1.amazonaws.com/default/Get-Amazon-Infomation',
          //'https://jqnsmg9blf.execute-api.ap-northeast-1.amazonaws.com/dev/execution',
          'https://m0m4z46nkk.execute-api.ap-northeast-1.amazonaws.com/dev/execution',
          formData,
          {
            headers: {
              'Content-type': 'multipart/form-data',
            },
          },
        )
        .then((res) => {
          //setResponseData(res.data)
          console.log(responseData)
        })
      alert('[ Correctly Done ] 正常にファイルがアップロードできました')
    } catch (err) {
      console.error(err)
      alert('[ERROR] ファイルが正常にアップロードされませんでした')
    }
  }

  //URLへHTTP POSTする
  const handlecheckSubmission = async (event) => {
    const users = await Auth.currentAuthenticatedUser()
    const body = { user: users.username, region: event }
    try {
      await axios
        .post(
          'https://uak120cq80.execute-api.ap-northeast-1.amazonaws.com/default/Check-SP-API-Key-Executable',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          setisAvairableSPAPI(res.data)
        })
    } catch (err) {
      console.error(err)
    }
  }

  const download = (event) => {
    const link = document.createElement('a')
    link.href = event
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  console.log(isAvairableSPAPI)

  return (
    <div>
      <CRow>
        <h3>ASIN入力</h3>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>ASINファイルアップロード</strong>
              {/*<small>　※事前準備として、SP-API キー設定が必要です</small>*/}
            </CCardHeader>
            <CCardBody>
              <CInputGroup style={{ width: 'auto' }}>
                <CFormInput
                  type="file"
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  onChange={changeHandler}
                />
                <CButton
                  type="button"
                  onClick={handleSubmission}
                  color="dark"
                  variant="outline"
                  id="inputGroupFileAddon04"
                >
                  アップロード
                </CButton>
              </CInputGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {isAvairableSPAPI == false ? (
        <div style={{ width: 'auto' }}>
          <CAlert color="danger">※SP-API キーの設定がされていないか間違っています！</CAlert>
        </div>
      ) : (
        <div></div>
      )}
      {isFilePicked ? (
        <div>
          <h5>
            <strong>ファイル内容：{csvData.length}行</strong>
          </h5>
          <div className="print" style={{ width: 'auto' }}>
            {/*<pre>
              ファイル名 : <p>{selectedFile.name}</p>
              <p>{fileData}</p>
            </pre>*/}
            <table>
              <thead>
                <tr>
                  {Object.keys(csvData[0] || {}).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p></p>
            {responseData && (
              <div>
                <strong>アップロード結果：</strong>
                <pre>{responseData}</pre>
                <CButton onClick={() => download(responseData)}>Download</CButton>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="print">
          <h6>ここにアップロードファイルの中身が表示されます</h6>
        </div>
      )}
    </div>
  )
}

export default FormControl
