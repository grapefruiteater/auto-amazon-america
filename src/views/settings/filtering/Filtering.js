import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormSelect,
  CRow,
  CForm,
  CFormInput,
  CButton,
  CFormLabel,
  CSpinner,
  CFormTextarea,
} from '@coreui/react'

const Filterings = () => {
  const button_color = 'dark'
  const [responseData, setResponseData] = React.useState(null)
  const [responseData2, setResponseData2] = React.useState(null)
  const [keywordData, setkeywordData] = React.useState(null)
  const [brandData, setbrandData] = React.useState(null)
  const [JPtitleData, setJPtitleData] = React.useState(null)
  const [UStitleData, setUStitleData] = React.useState(null)
  const [categoryData, setcategoryData] = React.useState(null)
  const [ASINData, setASINData] = React.useState(null)
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
  const [para11Data, setpara11Data] = React.useState(null)
  const [para12Data, setpara12Data] = React.useState(null)
  const [onoffData, setonoffData] = React.useState(true)

  const [keywordlistData, setkeywordlistData] = React.useState([])
  const [brandlistData, setbrandlistData] = React.useState([])
  const [JPtitlelistData, setJPtitlelistData] = React.useState([])
  const [UStitlelistData, setUStitlelistData] = React.useState([])
  const [categorylistData, setcategorylistData] = React.useState([])
  const [ASINlistData, setASINlistData] = React.useState([])

  const [addkeywordlistData, setaddkeywordlistData] = React.useState(null)
  const [addbrandlistData, setaddbrandlistData] = React.useState(null)
  const [addJPtitlelistData, setaddJPtitlelistData] = React.useState(null)
  const [addUStitlelistData, setaddUStitlelistData] = React.useState(null)
  const [addcategorylistData, setaddcategorylistData] = React.useState(null)
  const [addASINlistData, setaddASINlistData] = React.useState(null)

  const [isLoadingAdd, setisLoadingAdd] = React.useState(false)
  const [isLoadingDelete, setisLoadingDelete] = React.useState(false)
  const [isLoadingGet, setisLoadingGet] = React.useState(false)

  const countryCode = useSelector((state) => state.countryCode)

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
    para11Data,
    para12Data,
    onoffData,
  ]

  const domainName = window.location.hostname
  var currentName = ''
  if (domainName === 'localhost') {
    currentName = 'localhost'
  } else if (domainName === 'us-export.auto-amazon.com') {
    currentName = 'US'
  } else if (domainName === 'ca-export.auto-amazon.com') {
    currentName = 'CA'
  } else if (domainName === 'sg-export.auto-amazon.com') {
    currentName = 'SG'
  } else if (domainName === 'au-export.auto-amazon.com') {
    currentName = 'AU'
  }

  const initialTask = async () => {
    const users = await Auth.currentAuthenticatedUser()
    await console.log(users.username)
    await handleSubmission1('update', ['1', '2'])
    await handleSubmission2('update')
  }

  React.useEffect(() => {
    initialTask()
  }, [])

  //URLへHTTP POSTする
  const handleSubmission1 = async (keys, event) => {
    console.log(keys)
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode
    const body = { key: keys, data: event, user: username }
    if (keys === 'add') {
      setisLoadingAdd(true)
    } else if (keys === 'get') {
      setisLoadingGet(true)
    } else if (keys === 'delete') {
      setisLoadingDelete(true)
      var size = 0
      for (let i = 0; i < event.length; i++) {
        if (event[i]) {
          size = size + event[i].split('\n').length
        }
      }
      const confirmed = window.confirm(
        size + 'つ入力中です\nこれらのワードをブラックリストから完全に削除しますか？',
      )
      if (!confirmed) {
        setisLoadingDelete(false)
        return null
      }
    }
    try {
      await axios
        .post(
          'https://4kb4rsivf3.execute-api.ap-northeast-1.amazonaws.com/default/Revise-Filterring-BlackListData-To-DynamoDB',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          if (keys !== 'get') {
            setResponseData(res.data)
            setkeywordData(res.data[0].value)
            setcategoryData(res.data[1].value)
            setbrandData(res.data[2].value)
            setUStitleData(res.data[3].value)
            setJPtitleData(res.data[4].value)
            setASINData(res.data[5].value)
            setisLoadingDelete(false)
          } else if (keys === 'get') {
            const link = document.createElement('a')
            link.href = res.data
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }
        })
      if ((keys === 'delete') | (keys === 'add') | (keys === 'save')) {
        alert('正常に更新できました！')
      }
    } catch (err) {
      console.error(err)
      setisLoadingDelete(false)
    }
    setisLoadingAdd(false)
    setisLoadingGet(false)
  }

  //URLへHTTP POSTする
  const handleSubmission2 = async (event) => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode
    const body = { key: event, data: paraList, user: username }
    try {
      await axios
        .post(
          'https://7ivhzjm6n9.execute-api.ap-northeast-1.amazonaws.com/default/Revise-Filterring-Data-To-DynamoDB',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          setResponseData2(res.data)
          setpara1Data(res.data[0])
          setpara10Data(res.data[1])
          setpara11Data(res.data[2])
          setpara12Data(res.data[3])
          setonoffData(res.data[4])
          setpara2Data(res.data[5])
          setpara3Data(res.data[6])
          setpara4Data(res.data[7])
          setpara5Data(res.data[8])
          setpara6Data(res.data[9])
          setpara7Data(res.data[10])
          setpara8Data(res.data[11])
          setpara9Data(res.data[12])
        })
      if (event !== 'update') {
        alert('正常に保存できました！')
      }
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

  if (!responseData | !responseData2) {
    return (
      <div>
        <CSpinner color="dark" />
      </div>
    )
  }

  let keywordList = Array.from(keywordlistData, (option) => option.label)
  let brandList = Array.from(brandlistData, (option) => option.label)
  let JPtitleList = Array.from(JPtitlelistData, (option) => option.label)
  let UStitleList = Array.from(UStitlelistData, (option) => option.label)
  let categoryList = Array.from(categorylistData, (option) => option.label)
  let ASINList = Array.from(ASINlistData, (option) => option.label)
  let selectedAllList = [keywordList, brandList, JPtitleList, UStitleList, categoryList, ASINList]

  let inputAllList = [
    addkeywordlistData,
    addbrandlistData,
    addJPtitlelistData,
    addUStitlelistData,
    addcategorylistData,
    addASINlistData,
  ]

  var keywordstrings = ''
  for (let i = 0; i < keywordData.length; i++) {
    keywordstrings = keywordstrings + keywordData[i] + '\n'
  }

  var brandstrings = ''
  for (let i = 0; i < brandData.length; i++) {
    brandstrings = brandstrings + brandData[i] + '\n'
  }

  var JPtitlestrings = ''
  for (let i = 0; i < JPtitleData.length; i++) {
    JPtitlestrings = JPtitlestrings + JPtitleData[i] + '\n'
  }

  var UStitlestrings = ''
  for (let i = 0; i < UStitleData.length; i++) {
    UStitlestrings = UStitlestrings + UStitleData[i] + '\n'
  }

  var categorystrings = ''
  for (let i = 0; i < categoryData.length; i++) {
    categorystrings = categorystrings + categoryData[i] + '\n'
  }

  var ASINstrings = ''
  for (let i = 0; i < ASINData.length; i++) {
    ASINstrings = ASINstrings + ASINData[i] + '\n'
  }

  return (
    <CRow>
      <h3 className="h3style">フィルタリング</h3>
      <CCol xs={12}>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>ブラックリスト</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 align-items-center">
              <CCol xs={'2'}>
                <CFormLabel>キーワード</CFormLabel>
                {/*<CFormSelect
                  multiple
                  aria-label="Multiple select example"
                  htmlSize={10}
                  onChange={(event) => setkeywordlistData([...event.target.selectedOptions])}
                  disabled
                >
                  {keywordData.map((item, index) => (
                    <option value={index} key={index}>
                      {item}
                    </option>
                  ))}
                  </CFormSelect>*/}
                <CFormTextarea
                  value={keywordstrings}
                  aria-label="Addgin word"
                  style={{ height: '250px' }}
                  className="mt-2"
                  readOnly
                ></CFormTextarea>
                <CFormTextarea
                  placeholder="追加・削除するワード"
                  defaultValue=""
                  aria-label="Addgin word"
                  style={{ height: '150px' }}
                  onChange={(event) => setaddkeywordlistData(event.target.value)}
                  className="mt-2"
                ></CFormTextarea>
              </CCol>
              <CCol xs={'2'}>
                <CFormLabel>メーカー・ブランド</CFormLabel>
                {/*<CFormSelect
                  multiple
                  aria-label="Multiple select example"
                  htmlSize={10}
                  onChange={(event) => setbrandlistData([...event.target.selectedOptions])}
                >
                  {brandData.map((item, index) => (
                    <option value={index} key={index}>
                      {item}
                    </option>
                  ))}
                </CFormSelect>*/}
                <CFormTextarea
                  value={brandstrings}
                  aria-label="Addgin word"
                  style={{ height: '250px' }}
                  className="mt-2"
                  readOnly
                ></CFormTextarea>
                <CFormTextarea
                  placeholder="追加・削除するワード"
                  defaultValue=""
                  aria-label="Addgin word"
                  style={{ height: '150px' }}
                  onChange={(event) => setaddbrandlistData(event.target.value)}
                  className="mt-2"
                ></CFormTextarea>
              </CCol>
              <CCol xs={'2'}>
                <CFormLabel>JPタイトル</CFormLabel>
                {/*<CFormSelect
                  multiple
                  aria-label="Multiple select example"
                  htmlSize={10}
                  onChange={(event) => setJPtitlelistData([...event.target.selectedOptions])}
                >
                  {JPtitleData.map((item, index) => (
                    <option value={index} key={index}>
                      {item}
                    </option>
                  ))}
                </CFormSelect>*/}
                <CFormTextarea
                  value={JPtitlestrings}
                  aria-label="Addgin word"
                  style={{ height: '250px' }}
                  className="mt-2"
                  readOnly
                ></CFormTextarea>
                <CFormTextarea
                  placeholder="追加・削除するワード"
                  defaultValue=""
                  aria-label="Addgin word"
                  style={{ height: '150px' }}
                  onChange={(event) => setaddJPtitlelistData(event.target.value)}
                  className="mt-2"
                ></CFormTextarea>
              </CCol>
              <CCol xs={'2'}>
                <CFormLabel>{currentName}タイトル</CFormLabel>
                {/*<CFormSelect
                  multiple
                  aria-label="Multiple select example"
                  htmlSize={10}
                  onChange={(event) => setUStitlelistData([...event.target.selectedOptions])}
                >
                  {UStitleData.map((item, index) => (
                    <option value={index} key={index}>
                      {item}
                    </option>
                  ))}
                </CFormSelect>*/}
                <CFormTextarea
                  value={UStitlestrings}
                  aria-label="Addgin word"
                  style={{ height: '250px' }}
                  className="mt-2"
                  readOnly
                ></CFormTextarea>
                <CFormTextarea
                  placeholder="追加・削除するワード"
                  defaultValue=""
                  aria-label="Addgin word"
                  style={{ height: '150px' }}
                  onChange={(event) => setaddUStitlelistData(event.target.value)}
                  className="mt-2"
                ></CFormTextarea>
              </CCol>
              <CCol xs={'2'}>
                <CFormLabel>カテゴリー</CFormLabel>
                {/*<CFormSelect
                  multiple
                  aria-label="Multiple select example"
                  htmlSize={10}
                  onChange={(event) => setcategorylistData([...event.target.selectedOptions])}
                >
                  {categoryData.map((item, index) => (
                    <option value={index} key={index}>
                      {item}
                    </option>
                  ))}
                </CFormSelect>*/}
                <CFormTextarea
                  value={categorystrings}
                  aria-label="Addgin word"
                  style={{ height: '250px' }}
                  className="mt-2"
                  readOnly
                ></CFormTextarea>
                <CFormTextarea
                  placeholder="追加・削除するワード"
                  defaultValue=""
                  aria-label="Addgin word"
                  style={{ height: '150px' }}
                  onChange={(event) => setaddcategorylistData(event.target.value)}
                  className="mt-2"
                ></CFormTextarea>
              </CCol>
              <CCol xs={'2'}>
                <CFormLabel>ASIN</CFormLabel>
                {/*<CFormSelect
                  multiple
                  aria-label="Multiple select example"
                  htmlSize={10}
                  onChange={(event) => setASINlistData([...event.target.selectedOptions])}
                >
                  {ASINData.map((item, index) => (
                    <option value={index} key={index}>
                      {item}
                    </option>
                  ))}
                </CFormSelect>*/}
                <CFormTextarea
                  value={ASINstrings}
                  aria-label="Addgin word"
                  style={{ height: '250px' }}
                  className="mt-2"
                  readOnly
                ></CFormTextarea>
                <CFormTextarea
                  placeholder="追加・削除するワード"
                  defaultValue=""
                  aria-label="Addgin word"
                  style={{ height: '150px' }}
                  onChange={(event) => setaddASINlistData(event.target.value)}
                  className="mt-2"
                ></CFormTextarea>
              </CCol>
            </CForm>
            <p></p>
            <mark>※一度に入力可能なワード数は約10000件です。</mark>
            <br />
            <mark>
              ※短時間に連続して実行すると、正常に処理ができないことがあります。その場合、少し間を置いてから実行してください。
            </mark>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton
                type="button"
                color={button_color}
                onClick={() => handleSubmission1('get', [])}
              >
                {/*onClick={() => handleSubmission1('delete', selectedAllList)}*/}
                {isLoadingGet ? (
                  <CSpinner
                    component="span"
                    size="sm"
                    aria-hidden="true"
                    style={{ marginRight: '5px' }}
                  />
                ) : (
                  <div></div>
                )}
                ダウンロード
              </CButton>
              <CButton
                type="button"
                color={button_color}
                onClick={() => handleSubmission1('add', inputAllList)}
              >
                {isLoadingAdd ? (
                  <CSpinner
                    component="span"
                    size="sm"
                    aria-hidden="true"
                    style={{ marginRight: '5px' }}
                  />
                ) : (
                  <div></div>
                )}
                追加
              </CButton>
              <CButton
                type="button"
                color={button_color}
                onClick={() => handleSubmission1('delete', inputAllList)}
              >
                {/*onClick={() => handleSubmission1('delete', selectedAllList)}*/}
                {isLoadingDelete ? (
                  <CSpinner
                    component="span"
                    size="sm"
                    aria-hidden="true"
                    style={{ marginRight: '5px' }}
                  />
                ) : (
                  <div></div>
                )}
                削除
              </CButton>
              {/*<CButton
                type="button"
                color={button_color}
                onClick={() => handleSubmission1('update', ['update'])}
              >
                更新
              </CButton>*/}
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>重量・サイズフィルター</strong>
          </CCardHeader>
          <CCardBody className="align-items-center">
            <CRow>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="重量掛け率" readOnly plainText />
              </CCol>
              <CCol xs={'auto'}>
                <CFormInput
                  type="number"
                  step="0.1"
                  placeholder="1.1"
                  defaultValue={para1Data}
                  aria-label="First name"
                  onChange={(event) => setpara1Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="× 商品重量 で計算する" readOnly plainText />
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="サイズ掛け率" readOnly plainText />
              </CCol>
              <CCol xs={'auto'}>
                <CFormInput
                  type="number"
                  step="0.1"
                  placeholder="1.1"
                  defaultValue={para2Data}
                  aria-label="First name"
                  onChange={(event) => setpara2Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'3'}>
                <CFormInput
                  type="text"
                  defaultValue="× 商品パッケージサイズ で計算する"
                  readOnly
                  plainText
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="重量上限" readOnly plainText />
              </CCol>
              <CCol xs={'auto'}>
                <CFormInput
                  type="number"
                  step="100"
                  placeholder="3000"
                  defaultValue={para3Data}
                  aria-label="First name"
                  onChange={(event) => setpara3Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="g以上は出品しない" readOnly plainText />
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="サイズ：3辺上限" readOnly plainText />
              </CCol>
              <CCol xs={'auto'}>
                <CFormInput
                  type="number"
                  placeholder="90"
                  defaultValue={para4Data}
                  aria-label="First name"
                  onChange={(event) => setpara4Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="cm以上は出品しない" readOnly plainText />
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="サイズ：長辺上限" readOnly plainText />
              </CCol>
              <CCol xs={'auto'}>
                <CFormInput
                  type="number"
                  placeholder="60"
                  defaultValue={para5Data}
                  aria-label="First name"
                  onChange={(event) => setpara5Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="cm以上は出品しない" readOnly plainText />
              </CCol>
            </CRow>
            <CRow>　</CRow>
            <CRow>
              <CCol xs={'3.5'}>
                <CFormInput
                  type="text"
                  defaultValue="重量・サイズの情報取得ができない時"
                  readOnly
                  plainText
                />
              </CCol>
              <CCol xs={'2'}>
                <CFormCheck
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  label="出品する"
                  checked={onoffData === true}
                  onChange={() => handleClick(true)}
                />
              </CCol>
              <CCol xs={'2'}>
                <CFormCheck
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  label="出品しない"
                  checked={onoffData === false}
                  onChange={() => handleClick(false)}
                />
              </CCol>
            </CRow>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton type="button" color={button_color} onClick={() => handleSubmission2('save')}>
                保存
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>セラー数フィルター</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="JPセラー数範囲下限" readOnly plainText />
              </CCol>
              <CCol xs={'1'}>
                <CFormInput
                  type="number"
                  placeholder="1"
                  defaultValue={para6Data}
                  aria-label="First name"
                  onChange={(event) => setpara6Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="以上の商品のみ出品する" readOnly plainText />
              </CCol>
            </CRow>
            <CRow>
              <CCol xs={'auto'}>
                <CFormInput
                  type="text"
                  defaultValue={currentName + 'セラー数範囲'}
                  readOnly
                  plainText
                />
              </CCol>
              <CCol xs={'1'}>
                <CFormInput
                  type="number"
                  placeholder="1"
                  defaultValue={para7Data}
                  aria-label="First name"
                  onChange={(event) => setpara7Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'1'}>
                <CFormInput type="text" defaultValue="以上、" readOnly plainText />
              </CCol>
              <CCol xs={'1'}>
                <CFormInput
                  type="number"
                  placeholder="100"
                  defaultValue={para8Data}
                  aria-label="First name"
                  onChange={(event) => setpara8Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="以下の商品のみ出品する" readOnly plainText />
              </CCol>
            </CRow>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton type="button" color={button_color} onClick={() => handleSubmission2('save')}>
                保存
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>出品価格フィルター</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={'auto'}>
                <CFormInput
                  type="text"
                  defaultValue={currentName + '出品価格フィルター'}
                  readOnly
                  plainText
                />
              </CCol>
              <CCol xs={'1'}>
                <CFormInput
                  type="number"
                  placeholder="0"
                  defaultValue={para9Data}
                  aria-label="First name"
                  onChange={(event) => setpara9Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'1'}>
                <CFormInput type="text" defaultValue={currentName + 'D以上、'} readOnly plainText />
              </CCol>
              <CCol xs={'1'}>
                <CFormInput
                  type="number"
                  placeholder="1000"
                  defaultValue={para10Data}
                  aria-label="First name"
                  onChange={(event) => setpara10Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'3'}>
                <CFormInput
                  type="text"
                  defaultValue={currentName + 'D以下の商品のみ出品する'}
                  readOnly
                  plainText
                />
              </CCol>
            </CRow>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton type="button" color={button_color} onClick={() => handleSubmission2('save')}>
                保存
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      {/*<CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>予約商品フィルター</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="予約商品出品範囲" readOnly plainText />
              </CCol>
              <CCol xs={'1'}>
                <CFormInput
                  type="number"
                  placeholder="1"
                  defaultValue={para11Data}
                  aria-label="First name"
                  onChange={(event) => setpara11Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'3'}>
                <CFormInput
                  type="text"
                  defaultValue="日以内に発売される商品を出品する"
                  readOnly
                  plainText
                />
              </CCol>
            </CRow>
            {/*<CRow>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="予約商品リードタイム" readOnly plainText />
              </CCol>
              <CCol xs={'1'}>
                <CFormInput
                  placeholder="1"
                  defaultValue={para12Data}
                  aria-label="First name"
                  onChange={(event) => setpara12Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'3'}>
                <CFormInput
                  type="text"
                  defaultValue="日以内に発送される商品を出品する"
                  readOnly
                  plainText
                />
              </CCol>
            </CRow>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton type="button" color={button_color} onClick={() => handleSubmission2('save')}>
                保存
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>*/}
    </CRow>
  )
}

export default Filterings
