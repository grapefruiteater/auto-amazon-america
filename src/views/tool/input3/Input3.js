import React, { useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import Papa from 'papaparse'
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
  const countryCode = useSelector((state) => state.countryCode)
  const [selectedFile, setSelectedFile] = React.useState()
  const [isFilePicked, setIsFilePicked] = React.useState(false)
  const [csvData, setCsvData] = React.useState([])
  const [isLoadingUpload, setisLoadingUpload] = React.useState(false)
  var count = 0
  var isfileValidation1 = true
  var isfileValidation2 = true

  const [selectedDeleteFile, setSelectedDeleteFile] = React.useState()
  const [isDeleteFilePicked, setIsDeleteFilePicked] = React.useState(false)
  const [csvDeleteData, setCsvDeleteData] = React.useState([])
  const [isLoadingDeleteUpload, setisLoadingDeleteUpload] = React.useState(false)
  var countDelete = 0
  var isDeletefileValidation1 = true
  var isDeletefileValidation2 = true

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

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0])
    setIsFilePicked(true)
    const reader1 = new FileReader()
    reader1.onloadend = handleFileRead
    reader1.readAsText(event.target.files[0])
  }

  const changeHandlerDelete = (event) => {
    setSelectedDeleteFile(event.target.files[0])
    setIsDeleteFilePicked(true)
    const reader2 = new FileReader()
    reader2.onloadend = handleDeleteFileRead
    reader2.readAsText(event.target.files[0])
  }

  const handleFileRead = (event) => {
    const content1 = event.target.result
    const result1 = Papa.parse(content1, { header: false })
    setCsvData(result1.data)
  }

  const handleDeleteFileRead = (event) => {
    const content2 = event.target.result
    const result2 = Papa.parse(content2, { header: false })
    setCsvDeleteData(result2.data)
  }

  const handleSubmission = async (event) => {
    event.preventDefault()
    setisLoadingUpload(true)
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode

    var today = new Date()
    var nowDate =
      today.getFullYear().toString() +
      ('0' + (today.getMonth() + 1)).toString().slice(-2) +
      ('0' + today.getDate()).toString().slice(-2) +
      ('0' + today.getHours()).toString().slice(-2) +
      ('0' + today.getMinutes()).toString().slice(-2) +
      ('0' + today.getSeconds()).toString().slice(-2)

    const body = {
      jobtype: 'Update',
      data: csvData,
      user: username,
      timestamp: nowDate,
      filename: selectedFile.name,
    }
    console.log(body)

    try {
      await axios
        .post(
          'https://1hytrjpxii.execute-api.ap-northeast-1.amazonaws.com/default/Exhibit-Inventory-Loader-async',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          console.log(res)
        })
      alert('[Correctly Done] 正常にファイルがアップロードできました')
      setisLoadingUpload(false)
    } catch (err) {
      console.error(err.response)
      console.error(err.message)
      alert('[ERROR] ファイルが正常にアップロードされませんでした')
      setisLoadingUpload(false)
    }
  }

  const handleDeleteSubmission = async (event) => {
    event.preventDefault()
    setisLoadingDeleteUpload(true)
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode

    var today = new Date()
    var nowDate =
      today.getFullYear().toString() +
      ('0' + (today.getMonth() + 1)).toString().slice(-2) +
      ('0' + today.getDate()).toString().slice(-2) +
      ('0' + today.getHours()).toString().slice(-2) +
      ('0' + today.getMinutes()).toString().slice(-2) +
      ('0' + today.getSeconds()).toString().slice(-2)

    const body = {
      jobtype: 'Delete',
      data: csvDeleteData,
      user: username,
      timestamp: nowDate,
      filename: selectedDeleteFile.name,
    }

    try {
      await axios
        .post(
          'https://1hytrjpxii.execute-api.ap-northeast-1.amazonaws.com/default/Exhibit-Inventory-Loader-async',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          console.log(res)
        })
      alert('[Correctly Done] 正常にファイルがアップロードできました')
      setisLoadingDeleteUpload(false)
    } catch (err) {
      console.error(err.response)
      console.error(err.message)
      alert('[ERROR] ファイルが正常にアップロードされませんでした')
      setisLoadingDeleteUpload(false)
    }
  }

  for (let i = 1; i < csvData.length; i++) {
    if (csvData[i].length !== 14) {
      count = count + 1
    } else if (csvData[i][0].length < 10) {
      count = count + 1
    }
  }

  if (count >= 5) {
    isfileValidation1 = false
  } else if (csvData.length >= 200000) {
    isfileValidation2 = false
  } else {
    isfileValidation1 = true
    isfileValidation2 = true
  }

  for (let i = 1; i < csvDeleteData.length; i++) {
    if (csvDeleteData[i].length !== 1) {
      countDelete = countDelete + 1
    } else if (csvDeleteData[i][0].length <= 10) {
      countDelete = countDelete + 1
    }
  }

  if (countDelete >= 5) {
    isDeletefileValidation1 = false
  } else {
    isDeletefileValidation1 = true
  }

  if (countDelete >= 5) {
    isDeletefileValidation1 = false
  } else if (csvDeleteData.length >= 200000) {
    isDeletefileValidation2 = false
  } else {
    isDeletefileValidation1 = true
    isDeletefileValidation2 = true
  }

  return (
    <div>
      <CRow>
        <h3 className="h3style">出品ファイルアップロード</h3>
        <CCol xs={12}>
          <CCard
            className="mb-4"
            style={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <CCardHeader>
              <strong>
                Inventory Loader ファイルアップロード&ensp;
                ※商品情報取得処理から得られるInventoryLoader.csvを入力します。
              </strong>
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
                <CFormInput
                  type="file"
                  id="input1_1"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                  onChange={changeHandler}
                  onClick={(e) => {
                    e.target.value = ''
                  }}
                />
              </CInputGroup>*/}
              {/*{isfileValidation1 && isfileValidation2 ? (
                <CInputGroup style={{ width: 'auto', height: '160px' }}>
                  <CFormInput
                    type="file"
                    id="inputGroupFile06"
                    aria-describedby="inputGroupFileAddon06"
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
                    id="inputGroupFileAddon06"
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
                    出品ファイルアップロード
                  </CButton>
                </CInputGroup>
              ) : (
                <CInputGroup style={{ width: 'auto', height: '160px' }}>
                  <CFormInput
                    type="file"
                    id="inputGroupFile06"
                    aria-describedby="inputGroupFileAddon06"
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
                    id="inputGroupFileAddon06"
                    disabled
                  >
                    出品ファイルアップロード
                  </CButton>
                </CInputGroup>
              )}*/}
              <CCol xs={12}>
                {isfileValidation1 && isfileValidation2 ? (
                  <div></div>
                ) : isfileValidation1 === false ? (
                  <CAlert color="danger" style={{ marginTop: '20px', marginBottom: '0px' }}>
                    ※入力ファイル形式が正しくありません。商品情報取得で得られるInventoryLoader.csvと同じ形式のcsvファイルを入力してください。
                  </CAlert>
                ) : (
                  <CAlert color="danger" style={{ marginTop: '20px', marginBottom: '0px' }}>
                    ※入力ファイルサイズが大きすぎます。200000行以下のテキストサイズを入力してください。
                  </CAlert>
                )}
              </CCol>
            </CCardBody>
            {isfileValidation1 && isfileValidation2 && csvData.length > 0 ? (
              <CButton
                type="button"
                onClick={handleSubmission}
                color="dark"
                id="inputGroupFileAddon06"
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
                出品ファイルアップロード
              </CButton>
            ) : (
              <CButton
                type="button"
                onClick={handleSubmission}
                color="dark"
                id="inputGroupFileAddon06"
                disabled
              >
                出品ファイルアップロード
              </CButton>
            )}
          </CCard>
        </CCol>
        {isFilePicked ? (
          <div>
            <h5>
              <strong>
                ファイル内容：{(selectedFile.size * 0.001).toFixed(2)} KB,　
                {csvData.length}行
              </strong>
            </h5>
          </div>
        ) : (
          <div>
            <h6>ここに選択ファイルの詳細が表示されます</h6>
          </div>
        )}
      </CRow>
    </div>
  )
}

export default FormControl
