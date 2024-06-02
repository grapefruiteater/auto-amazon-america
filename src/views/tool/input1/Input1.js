import React, { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import Papa from 'papaparse'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
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
  CFormCheck,
  CFormLabel,
} from '@coreui/react'

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: 'auto',
  height: 250,
  margin: 10,
  //backgroundColor: '#BDBFBF ',
  borderRadius: '10px',
  //boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  padding: '10px 16px',
  '&:hover': {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  },
  '&:focusWithin': {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  },
  justifyContent: 'center',
  alignItems: 'center',
  placeItems: 'center',
}
const borderNormalStyle = {
  border: '3px solid #BDBFBF',
}
const borderDragStyle = {
  border: '3px solid #00f',
  transition: 'border 0.125s ease-in-out',
}

const FormControl = () => {
  //変数宣言
  const button_color = 'primary'
  const countryCode = useSelector((state) => state.countryCode)
  const [selectedFile, setSelectedFile] = React.useState()
  const [isFilePicked, setIsFilePicked] = React.useState(false)
  const [responseData, setResponseData] = React.useState(null)
  const [csvData, setCsvData] = React.useState([])
  const [isAvairableSPAPI, setisAvairableSPAPI] = React.useState(null)
  const [isLoadingUpload, setisLoadingUpload] = React.useState(false)
  var count = 0
  var isfileValidation1 = true
  var isfileValidation2 = true

  const [pararesponseData, setparaResponseData] = React.useState(null)
  const [para1Data, setpara1Data] = React.useState(null)
  const [para2Data, setpara2Data] = React.useState(null)
  const [para3Data, setpara3Data] = React.useState(null)
  const [para4Data, setpara4Data] = React.useState(null)
  const [para5Data, setpara5Data] = React.useState(null)
  const [para6Data, setpara6Data] = React.useState(null)
  const [para7Data, setpara7Data] = React.useState(null)
  const [para8Data, setpara8Data] = React.useState(null)
  const [para9Data, setpara9Data] = React.useState(null)
  const [para10Data, setpara10Data] = React.useState(null)
  const [onoffData, setonoffData] = React.useState(null)
  const [para11Data, setpara11Data] = React.useState(null)
  const [para12Data, setpara12Data] = React.useState(null)
  //出品設定のInventory Loaderで使うパラメーター
  const [para13Data, setpara13Data] = React.useState(null)
  const [para14Data, setpara14Data] = React.useState(null)
  //自動価格改定のパラメーター
  const [para15Data, setpara15Data] = React.useState(null)
  const [para16Data, setpara16Data] = React.useState(null)

  const paraList = [
    para1Data,
    para2Data,
    para3Data,
    para4Data,
    para5Data,
    para6Data,
    para7Data,
    para8Data,
    para9Data,
    para10Data,
    onoffData,
    para11Data,
    para12Data,
    para13Data,
    para14Data,
    para15Data,
    para16Data,
  ]

  const onDrop = useCallback((acceptedFiles) => {
    console.log('acceptedFiles:', acceptedFiles)
    if (acceptedFiles.length === 0) {
      console.log('none')
    } else {
      //ファイルアップロード用
      setSelectedFile(acceptedFiles[0])
      setIsFilePicked(true)
      //ファイル読み込み用
      const reader = new FileReader()
      reader.onloadend = handleFileRead
      reader.readAsText(acceptedFiles[0])
    }
  }, [])

  const initialTask = async () => {
    await handleparameterSubmission('update', paraList)
    await handlecheckSubmission('check')
  }

  const { getRootProps, getInputProps, isDragActive, open, acceptedFiles } = useDropzone({
    onDrop,
    noClick: true,
    multiple: false, // 複数のファイル選択を禁止する
  })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? borderDragStyle : borderNormalStyle),
    }),
    [isDragActive],
  )

  React.useEffect(() => {
    initialTask()
  }, [])

  /*//ファイル選択時にファイルを変数に格納する
  const changeHandler = (event) => {
    //ファイルアップロード用
    setSelectedFile(event.target.files[0])
    setIsFilePicked(true)
    //ファイル読み込み用
    const reader = new FileReader()
    reader.onloadend = handleFileRead
    reader.readAsText(event.target.files[0])
  }*/

  const handleFileRead = (event) => {
    const content = event.target.result
    //CSVファイル読み込み用
    const result = Papa.parse(content, { header: false })
    setCsvData(result.data)
    console.log(result.data)
  }

  function checkEelement(element) {
    return element !== undefined && element !== 0 && element !== null && element['ASIN'] !== ''
  }

  //ファイルをURLへHTTP POSTしてアップロードする
  const handleSubmission = async (event) => {
    event.preventDefault()
    setisLoadingUpload(true)
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode

    const formData = new FormData()
    formData.append('File', selectedFile)
    formData.append('Text', username)
    var checkedasinlist = csvData.filter(checkEelement)
    var simpleasinlist = checkedasinlist.map((item) => item[0])
    var asinlist = [...new Set(simpleasinlist)]
    //console.log(asinlist)

    var today = new Date()
    var nowDate =
      today.getFullYear().toString() +
      ('0' + (today.getMonth() + 1)).toString().slice(-2) +
      ('0' + today.getDate()).toString().slice(-2) +
      ('0' + today.getHours()).toString().slice(-2) +
      ('0' + today.getMinutes()).toString().slice(-2) +
      ('0' + today.getSeconds()).toString().slice(-2)

    const body = {
      data: asinlist,
      user: username,
      timestamp: nowDate,
      filename: selectedFile.name,
    }

    try {
      await axios
        .post(
          'https://ty1yh90l47.execute-api.ap-northeast-1.amazonaws.com/default/Preprocess_Get-Amazon-Infomation',
          //formData,
          body,
          {
            headers: {
              //'Content-type': 'multipart/form-data',
              //'Content-type': 'application/json', 直接Step Fcuntionにリクエスト
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          //setResponseData(res.data)
          console.log(res)
        })
      alert('[Correctly Done] 正常にリクエストされました！')
      setisLoadingUpload(false)
    } catch (error) {
      console.error(error.response)
      console.error(error.message)
      alert('[ERROR] ファイルが正常にアップロードされませんでした')
      setisLoadingUpload(false)
    }
  }

  //URLへHTTP POSTする
  const handlecheckSubmission = async (event) => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode
    const body = { user: username, region: event }
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

  //URLへHTTP POSTする
  const handleparameterSubmission = async (keys, event) => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode
    const body = { user: username, data: paraList }
    try {
      await axios
        .post(
          'https://oj33pxhwoe.execute-api.ap-northeast-1.amazonaws.com/default/Revise-Parameter-Data-To-DynamoDB',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          setparaResponseData(res.data)
          setonoffData(res.data[18])
          if ((keys === 'delete') | (keys === 'add') | (keys === 'save')) {
            alert('正常に保存できました！')
          }
        })
    } catch (err) {
      console.error(err)
    }
  }

  function handleClick(event) {
    if ((event === true) & (onoffData === false)) {
      setonoffData(true)
    } else if ((event === false) & (onoffData === true)) {
      setonoffData(false)
    }
  }

  for (let i = 1; i < csvData.length; i++) {
    if (csvData[i].length !== 1) {
      count = count + 1
    } else if (csvData[i][0].length !== 10) {
      count = count + 1
    }
  }

  if (count >= 5) {
    isfileValidation1 = false
  } else if (csvData.length > 150000) {
    isfileValidation2 = false
  } else {
    isfileValidation1 = true
    isfileValidation2 = true
  }

  if (!pararesponseData) {
    return (
      <div>
        <CSpinner color="dark" />
      </div>
    )
  }

  return (
    <div>
      <CRow>
        <h3 className="h3style">出品ASINアップロード</h3>
        <CCol xs={12}>
          <CCard
            className="mb-4"
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <CCardHeader>
              <strong>ASINファイルアップロード</strong>
              <small>
                &ensp;※ASINのみが記載されたテキストファイルを入力する。入力したASINが重複していた場合、自動で重複を削除します。
              </small>
              {/*<small>　※事前準備として、SP-API キー設定が必要です</small>*/}
            </CCardHeader>
            <CCardBody>
              <div {...getRootProps({ style })} className="centered-button">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p style={{ fontSize: '20px' }}>Drop the file here ...</p>
                ) : selectedFile ? (
                  <p style={{ fontSize: '24px' }}>{selectedFile.name}</p>
                ) : (
                  <p style={{ fontSize: '20px' }}>Drag & drop to select file</p>
                )}
                <button type="button" onClick={open} className="btn btn-primary align-self-center">
                  ファイルを選択
                </button>
              </div>
              {/*<CInputGroup style={{ width: 'auto' }}>
                <CInputGroup style={{ width: 'auto', height: '160px' }}>
                <Input
                  type="file"
                  onChange={changeHandler}
                  onClick={(e) => {
                    e.target.value = ''
                  }}
                  disableUnderline
                  sx={{
                    width: '100%',
                    //'& input[type="file"]': { visibility: 'hidden' },
                    backgroundColor: '#BDBFBF ',
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    padding: '10px 16px',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    },
                    '&:focus-within': {
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                  inputProps={{ accept: 'image/*' }}
                />
                <CFormInput
                  type="file"
                  id="input1_1"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  onChange={changeHandler}
                  onClick={(e) => {
                    e.target.value = ''
                  }}
                  style={{
                    backgroundColor: '#BDBFBF',
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    color: 'black',
                    opacity: 100,
                    fontSize: '16px',
                    '&:hover': {
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    },
                    '&:focus-within': {
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                />
              </CInputGroup>*/}
              {/*{isfileValidation1 && isfileValidation2 ? (
                <CInputGroup style={{ width: 'auto', height: '160px' }}>
                  <CFormInput
                    type="file"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    onChange={changeHandler}
                    onClick={(e) => {
                      e.target.value = ''
                    }}
                  />
                  <CButton
                    type="button"
                    onClick={handleSubmission}
                    color="dark"
                    id="inputGroupFileAddon04"
                  >
                    {isLoadingUpload ? (
                      <CSpinner
                        component="span"
                        size="sm"
                        aria-hidden="true"
                        style={{ marginRight: '5px' }}
                      />
                    ) : (
                      <div></div>
                    )}
                    出品ASINアップロード
                  </CButton>
                </CInputGroup>
              ) : (
                <CInputGroup style={{ width: 'auto', height: '160px' }}>
                  <CFormInput
                    type="file"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    onChange={changeHandler}
                    onClick={(e) => {
                      e.target.value = ''
                    }}
                    invalid={true}
                  />
                  <CButton
                    type="button"
                    onClick={handleSubmission}
                    color="dark"
                    id="inputGroupFileAddon04"
                    disabled
                  >
                    出品ASINアップロード
                  </CButton>
                </CInputGroup>
              )}*/}
              <CCol xs={12}>
                {isfileValidation1 && isfileValidation2 ? (
                  <div></div>
                ) : isfileValidation1 === false ? (
                  <CAlert color="danger" style={{ marginTop: '20px', marginBottom: '0px' }}>
                    ※入力ファイル形式が正しくありません。ASINのみが記載されたテキストファイルを入力してください。
                  </CAlert>
                ) : (
                  <CAlert color="danger" style={{ marginTop: '20px', marginBottom: '0px' }}>
                    ※入力ファイルサイズが大きすぎます。18000行以下のテキストサイズを入力してください。
                  </CAlert>
                )}
              </CCol>
            </CCardBody>
            {isfileValidation1 && isfileValidation2 && csvData.length > 0 ? (
              <CButton
                type="button"
                onClick={handleSubmission}
                color="dark"
                id="inputGroupFileAddon04"
              >
                {isLoadingUpload ? (
                  <CSpinner
                    component="span"
                    size="sm"
                    aria-hidden="true"
                    style={{ marginRight: '5px' }}
                  />
                ) : (
                  <div></div>
                )}
                出品ASINアップロード
              </CButton>
            ) : (
              <CButton
                type="button"
                onClick={handleSubmission}
                color="dark"
                id="inputGroupFileAddon04"
                disabled
              >
                出品ASINアップロード
              </CButton>
            )}
          </CCard>
          <CCol xs={12}>
            <CCard
              className="mb-4"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <CCardHeader>
                <strong>自動出品</strong>
                <small>
                  &ensp;※&quot;自動出品する&quot;にチェックをしていると、ASINファイルアップロード後、商品情報を取得して、フィルター制限を満たす商品のみ、対象のセラーアカウントへ自動出品されます。
                </small>
              </CCardHeader>
              <CCardBody>
                <CCol xs={'2'}>
                  <CFormCheck
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    label="自動出品する"
                    checked={onoffData === true}
                    onChange={() => handleClick(true)}
                  />
                </CCol>
                <CCol xs={'2'}>
                  <CFormCheck
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    label="自動出品しない"
                    checked={onoffData === false}
                    onChange={() => handleClick(false)}
                  />
                </CCol>
                <p></p>
                <CCol xs={'2'}>
                  <div className="d-grid gap-2 d-md-flex">
                    <CButton
                      type="button"
                      color={button_color}
                      onClick={() => handleparameterSubmission('save', paraList)}
                      className="mb-4"
                    >
                      保存
                    </CButton>
                  </div>
                </CCol>
              </CCardBody>
            </CCard>
          </CCol>
        </CCol>
      </CRow>
      {isAvairableSPAPI === false ? (
        <div style={{ width: 'auto' }}>
          <CAlert color="danger">※SP-API キーの設定がされていないか間違っています！</CAlert>
        </div>
      ) : (
        <div></div>
      )}
      {isFilePicked ? (
        <div>
          <h5>
            <strong>
              ファイル内容：{(selectedFile.size * 0.001).toFixed(2)} KB,　
              {csvData.length}行
            </strong>
          </h5>
          {/*<div className="print" style={{ width: 'auto' }}>
            <pre>
              ファイル名 : <p>{selectedFile.name}</p>
              <p>{fileData}</p>
            </pre>
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
          </div>*/}
        </div>
      ) : (
        <div>
          <h6>ここに選択ファイルの詳細が表示されます</h6>
        </div>
      )}
    </div>
  )
}

export default FormControl
