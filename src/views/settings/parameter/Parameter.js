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
  CFormInput,
  CButton,
  CFormLabel,
  CForm,
  CSpinner,
  CFormSwitch,
} from '@coreui/react'

const Parameter = () => {
  const button_color = 'dark'
  const countryCode = useSelector((state) => state.countryCode)
  const [responseData, setResponseData] = React.useState(null)
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
  //日本の出品者のラジオボタン
  const [selectedOption1, setselectedOption1] = React.useState(null)
  const [selectedOption2, setselectedOption2] = React.useState(null)
  //Positive Feedbackのパラメーター
  const [para17Data, setpara17Data] = React.useState(null)
  const [para18Data, setpara18Data] = React.useState(null)
  //自動停止中削除のパラメーター
  const [paraDelstopData, setparaDelstopData] = React.useState(null)

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
    para17Data,
    para18Data,
    selectedOption1,
    selectedOption2,
    paraDelstopData,
  ]

  const [weightList, setweightList] = React.useState([])
  const updateweightElement = (index, value) => {
    const newList = [...weightList]
    newList[index] = value
    setweightList(newList)
  }

  const [amountList1, setamountList1] = React.useState([])
  const updateamountElement1 = (index, value) => {
    const newList = [...amountList1]
    newList[index] = value
    setamountList1(newList)
  }

  const [amountList2, setamountList2] = React.useState([])
  const updateamountElement2 = (index, value) => {
    const newList = [...amountList2]
    newList[index] = value
    setamountList2(newList)
  }

  const [amountList3, setamountList3] = React.useState([])
  const updateamountElement3 = (index, value) => {
    const newList = [...amountList3]
    newList[index] = value
    setamountList3(newList)
  }

  const [amountList4, setamountList4] = React.useState([])
  const updateamountElement4 = (index, value) => {
    const newList = [...amountList4]
    newList[index] = value
    setamountList4(newList)
  }

  const [amountList5, setamountList5] = React.useState([])
  const updateamountElement5 = (index, value) => {
    const newList = [...amountList5]
    newList[index] = value
    setamountList5(newList)
  }

  const [amountList6, setamountList6] = React.useState([])
  const updateamountElement6 = (index, value) => {
    const newList = [...amountList6]
    newList[index] = value
    setamountList6(newList)
  }

  const [amountList7, setamountList7] = React.useState([])
  const updateamountElement7 = (index, value) => {
    const newList = [...amountList7]
    newList[index] = value
    setamountList7(newList)
  }

  const [amountList8, setamountList8] = React.useState([])
  const updateamountElement8 = (index, value) => {
    const newList = [...amountList8]
    newList[index] = value
    setamountList8(newList)
  }

  const [valueList, setvalueList] = React.useState([])
  const updatevalueElement = (index, value) => {
    const newList = [...valueList]
    newList[index] = value
    setvalueList(newList)
  }

  const [profitrateList, setprofitrateList] = React.useState([])
  const updateprofitrateElement = (index, value) => {
    const newList = [...profitrateList]
    newList[index] = value
    setprofitrateList(newList)
  }

  const [diffdelList, setdiffdelList] = React.useState([])
  const updatediffdelElement = (index, value) => {
    const newList = [...diffdelList]
    newList[index] = value
    setdiffdelList(newList)
  }

  const [MaxprofitList, setMaxprofitList] = React.useState([])

  const initialTask = async () => {
    await handleSubmission2('initial', profitpatternAllList)
    await handleSubmission1('initial', selectedAllList)
    await handleSubmission('update', paraList)
  }

  React.useEffect(() => {
    initialTask()
  }, [])

  React.useEffect(() => {
    calcMaxprofit()
  }, [valueList, profitrateList])

  const calcMaxprofit = () => {
    let newList = [
      ...valueList.map(function (item, index) {
        return parseFloat(item)
      }),
    ]
    setMaxprofitList(newList)
  }

  //URLへHTTP POSTする
  const handleSubmission = async (keys, event) => {
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
          console.log(res.data)
          setResponseData(res.data)
          setpara1Data(res.data[0])
          setpara10Data(res.data[1])
          setpara11Data(res.data[2])
          setpara12Data(res.data[3])
          setpara13Data(res.data[4])
          setpara14Data(res.data[5])
          setpara15Data(res.data[6])
          setpara16Data(res.data[7])
          setpara17Data(res.data[8])
          setpara18Data(res.data[9])
          setpara2Data(res.data[10])
          setpara3Data(res.data[11])
          setpara4Data(res.data[12])
          setpara5Data(res.data[13])
          setpara6Data(res.data[14])
          setpara7Data(res.data[15])
          setpara8Data(res.data[16])
          setpara9Data(res.data[17])
          setonoffData(res.data[18])
          setparaDelstopData(res.data[19])
          setselectedOption1(res.data[20])
          setselectedOption2(res.data[21])
          if ((keys === 'delete') | (keys === 'add') | (keys === 'save')) {
            alert('正常に保存できました！')
          }
        })
    } catch (err) {
      console.error(err)
    }
  }

  //URLへHTTP POSTする
  const handleSubmission1 = async (keys, event) => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode
    const body = { key: keys, data: event, user: username }
    try {
      await axios
        .post(
          'https://lahjdue8jk.execute-api.ap-northeast-1.amazonaws.com/default/Revise-Parameter-Shipping-Pattern-To-DynamoDB',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          setweightList(res.data[0]['value'])
          setamountList1(res.data[1]['value'])
          setamountList2(res.data[2]['value'])
          setamountList3(res.data[3]['value'])
          setamountList4(res.data[4]['value'])
          setamountList5(res.data[5]['value'])
          setamountList6(res.data[6]['value'])
          setamountList7(res.data[7]['value'])
          setamountList8(res.data[8]['value'])
        })
      if ((keys === 'update') | (keys === 'add') | (keys === 'save')) {
        alert('正常に更新できました！')
      }
    } catch (err) {
      console.error(err)
    }
  }

  //URLへHTTP POSTする
  const handleSubmission2 = async (keys, event) => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode
    const body = { key: keys, data: event, user: username }
    try {
      await axios
        .post(
          'https://cnbyghcpx2.execute-api.ap-northeast-1.amazonaws.com/default/Revise-Parameter-Profit-Pattern-To-DynamoDB',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          setvalueList(res.data[0]['value'])
          setprofitrateList(res.data[1]['value'])
          setdiffdelList(res.data[2]['value'])
        })
      if ((keys === 'update') | (keys === 'add')) {
        alert('正常に更新できました！')
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

  const saveSubmission = async () => {
    await handleSubmission2('save', profitpatternAllList)
    await handleSubmission1('update', selectedAllList)
    await handleSubmission('nokey', paraList)
  }

  let selectedAllList = [
    weightList,
    amountList1,
    amountList2,
    amountList3,
    amountList4,
    amountList5,
    amountList6,
    amountList7,
    amountList8,
  ]

  let profitpatternAllList = [valueList, profitrateList, diffdelList]

  if (!responseData) {
    return (
      <div>
        <CSpinner color="dark" />
      </div>
    )
  }

  return (
    <CRow>
      <h3 className="h3style">設定画面</h3>
      {/*<CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>出品価格比較対象</strong>
          </CCardHeader>
          <CCardBody>
            <CFormSelect
              aria-label="Default select example"
              onChange={(event) => setpara1Data(event.target.value)}
              value={para1Data}
            >
              <option value="最低価格">最低価格</option>
              <option value="カート価格">カート価格</option>
            </CFormSelect>
          </CCardBody>
        </CCard>
      </CCol>*/}
      <CCol xs={12}>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>出品価格設定</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="出品価格比較対象" readOnly plainText />
                </CCol>
                <CCol xs={'auto'}>
                  <CFormSelect
                    aria-label="Default select example"
                    onChange={(event) => setpara1Data(event.target.value)}
                    value={para1Data}
                  >
                    <option value="最低価格">最低価格</option>
                    <option value="カート価格">カート価格</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="Rate掛け率" readOnly plainText />
                </CCol>
                <CCol xs={'auto'}>
                  <CFormInput
                    type="number"
                    step="0.1"
                    placeholder="0.98"
                    defaultValue={para2Data}
                    aria-label="First name"
                    onChange={(event) => setpara2Data(event.target.value)}
                  />
                </CCol>
                <CCol xs={'auto'}>
                  <CFormInput
                    type="text"
                    defaultValue="× 為替レート で計算する"
                    readOnly
                    plainText
                  />
                </CCol>
              </CRow>
              {/*<CRow>
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="手数料率(%)" readOnly plainText />
                </CCol>
                <CCol xs={'auto'}>
                  <CFormInput
                    type="number"
                    placeholder="15"
                    defaultValue={para3Data}
                    aria-label="First name"
                    onChange={(event) => setpara3Data(event.target.value)}
                  />
                </CCol>
              </CRow>*/}
              <CRow className="mt-2">
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="諸経費(円)" readOnly plainText />
                </CCol>
                <CCol xs={'auto'}>
                  <CFormInput
                    type="number"
                    placeholder="800"
                    defaultValue={para4Data}
                    aria-label="First name"
                    onChange={(event) => setpara4Data(event.target.value)}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="ポイント割引(%)" readOnly plainText />
                </CCol>
                <CCol xs={'auto'}>
                  <CFormInput
                    type="number"
                    placeholder="100"
                    defaultValue={para5Data}
                    aria-label="First name"
                    onChange={(event) => setpara5Data(event.target.value)}
                  />
                </CCol>
                <CCol className="d-grid gap-2 d-md-flex justify-content-md-end bottom-0">
                  <div className="position-absolute bottom-10">
                    <CButton type="button" color={button_color} onClick={() => saveSubmission()}>
                      保存
                    </CButton>
                  </div>
                </CCol>
              </CRow>
              {/*<CRow className="mt-2">
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="参照する商品状態" readOnly plainText />
                </CCol>
                <CCol xs={'auto'} className="mt-2">
                  <CFormCheck
                    inline
                    id="flexCheckChecked"
                    label="New"
                    defaultChecked={para11Data}
                    onChange={(event) => setpara11Data(event.target.checked)}
                  />
                  <CFormCheck
                    inline
                    id="flexCheckChecked"
                    label="Used"
                    defaultChecked={para12Data}
                    onChange={(event) => setpara12Data(event.target.checked)}
                  />
                </CCol>
              </CRow>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton type="button" color={button_color} onClick={() => saveSubmission()}>
                  保存
                </CButton>
              </div>*/}
            </CForm>
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
            <strong>送料設定</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="配送方法" readOnly plainText />
              </CCol>
              <CCol xs={'auto'}>
                <CFormSelect
                  aria-label="Default select example"
                  onChange={(event) => setpara6Data(event.target.value)}
                  value={para6Data}
                >
                  <option value="クーリエ">クーリエ</option>
                  <option value="クーリエEMS">クーリエ+EMS</option>
                  <option value="クーリエEMSeパケット">クーリエ+EMS+eパケット</option>
                  {/*<option value="DHL">DHL</option>
                  <option value="FedEx">FedEx</option>
                  <option value="EMS">EMS</option>
                  <option value="エアメール">エアメール</option>
                  <option value="SAL">SAL</option>
                  <option value="eパケット">eパケット</option>
                  <option value="eパケットライト">eパケットライト</option>
                  <option value="その他">その他</option>*/}
                </CFormSelect>
              </CCol>
              <CCol className="d-grid gap-2 d-md-flex justify-content-md-end bottom-0">
                <div className="position-absolute bottom-10">
                  <CButton type="button" color={button_color} onClick={() => saveSubmission()}>
                    保存
                  </CButton>
                </div>
              </CCol>
              <small className="text">
                <p></p>
                　※クーリエ = DHL, FedExのうち最安のもの
                <br />
                　　クーリエ+EMS = DHL, FedEx, EMSのうち最安のもの
                <br />
                　　クーリエ+EMS+eパケット = DHL, FedEx, EMS, eパケット,
                eパケットライトのうち最安のもの
              </small>
            </CRow>
            {/*<CRow>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="書き留めの有無" readOnly plainText />
              </CCol>
              <CCol xs={'auto'}>
                <CFormSelect
                  aria-label="Default select example"
                  onChange={(event) => setpara7Data(event.target.value)}
                  value={para7Data}
                >
                  <option value="書き留有り">書き留有り</option>
                  <option value="書き留無し">書き留無し</option>
                </CFormSelect>
              </CCol>
            </CRow>*/}
            {/*<CRow>
              <CCol xs={'auto'}>
                <CFormInput type="text" defaultValue="EMS発送境界額(USD)" readOnly plainText />
              </CCol>
              <CCol xs={'auto'}>
                <CFormInput
                  type="number"
                  placeholder="800"
                  defaultValue={para8Data}
                  aria-label="First name"
                  onChange={(event) => setpara8Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'2'}>
                <CFormInput
                  type="text"
                  defaultValue="以上の場合はEMSで発送する"
                  readOnly
                  plainText
                />
              </CCol>
            </CRow>*/}
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
            <strong>国際送料パターン</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 align-items-center">
              <CCol xs={'2'}>
                <CFormLabel>重量(g)</CFormLabel>
                {weightList.map((item, index) => (
                  <CFormInput
                    key={index}
                    type="number"
                    min="0"
                    step="100"
                    placeholder="g"
                    defaultValue={item}
                    aria-label="Addgin word"
                    onChange={(event) => updateweightElement(index, event.target.value)}
                    className="mt-2"
                  />
                ))}
              </CCol>
              <CCol xs={'1'}>
                <CFormLabel>DHL</CFormLabel>
                {amountList1.map((item, index) => (
                  <CFormInput
                    key={index}
                    type="number"
                    min="0"
                    step="100"
                    placeholder="&yen;"
                    defaultValue={item}
                    aria-label="Addgin word"
                    onChange={(event) => updateamountElement1(index, event.target.value)}
                    className="mt-2"
                  />
                ))}
              </CCol>
              <CCol xs={'1'}>
                <CFormLabel>FedEx</CFormLabel>
                {amountList2.map((item, index) => (
                  <CFormInput
                    key={index}
                    type="number"
                    min="0"
                    step="100"
                    placeholder="&yen;"
                    defaultValue={item}
                    aria-label="Addgin word"
                    onChange={(event) => updateamountElement2(index, event.target.value)}
                    className="mt-2"
                  />
                ))}
              </CCol>
              <CCol xs={'1'}>
                <CFormLabel>EMS</CFormLabel>
                {amountList3.map((item, index) => (
                  <CFormInput
                    key={index}
                    type="number"
                    min="0"
                    step="100"
                    placeholder="&yen;"
                    defaultValue={item}
                    aria-label="Addgin word"
                    onChange={(event) => updateamountElement3(index, event.target.value)}
                    className="mt-2"
                  />
                ))}
              </CCol>
              <CCol xs={'1'}>
                <CFormLabel>eパケット</CFormLabel>
                {amountList4.map((item, index) => (
                  <CFormInput
                    key={index}
                    type="number"
                    min="0"
                    step="100"
                    placeholder="&yen;"
                    defaultValue={item}
                    aria-label="Addgin word"
                    onChange={(event) => updateamountElement4(index, event.target.value)}
                    className="mt-2"
                  />
                ))}
              </CCol>
              <CCol xs={'1'}>
                <CFormLabel>eパケットライト</CFormLabel>
                {amountList5.map((item, index) => (
                  <CFormInput
                    key={index}
                    type="number"
                    min="0"
                    step="100"
                    placeholder="&yen;"
                    defaultValue={item}
                    aria-label="Addgin word"
                    onChange={(event) => updateamountElement5(index, event.target.value)}
                    className="mt-2"
                  />
                ))}
              </CCol>
              {/*<CCol xs={'1'}>
                <CFormLabel>エアメール</CFormLabel>
                {amountList6.map((item, index) => (
                  <CFormInput
                    key={index}
                    type="number"
                    step="100"
                    placeholder="&yen;"
                    defaultValue={item}
                    aria-label="Addgin word"
                    onChange={(event) => updateamountElement6(index, event.target.value)}
                    className="mt-2"
                  />
                ))}
              </CCol>
              <CCol xs={'1'}>
                <CFormLabel>SAL</CFormLabel>
                {amountList7.map((item, index) => (
                  <CFormInput
                    key={index}
                    type="number"
                    step="100"
                    placeholder="&yen;"
                    defaultValue={item}
                    aria-label="Addgin word"
                    onChange={(event) => updateamountElement7(index, event.target.value)}
                    className="mt-2"
                  />
                ))}
              </CCol>
              <CCol xs={'1'}>
                <CFormLabel>その他</CFormLabel>
                {amountList8.map((item, index) => (
                  <CFormInput
                    key={index}
                    type="number"
                    step="100"
                    placeholder="&yen;"
                    defaultValue={item}
                    aria-label="Addgin word"
                    onChange={(event) => updateamountElement8(index, event.target.value)}
                    className="mt-2"
                  />
                ))}
              </CCol>*/}
            </CForm>
            <p></p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton
                type="button"
                color={button_color}
                onClick={() => handleSubmission1('update', selectedAllList)}
              >
                更新
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
            <strong>利益パターン</strong>
          </CCardHeader>
          <CCardBody>
            {/*<CFormSelect
              aria-label="Default select example"
              onChange={(event) => setpara9Data(event.target.value)}
              value={para9Data}
            >
              <option value="1">利益パターン1</option>
              <option value="2">利益パターン2</option>
              <option value="3">利益パターン3</option>
              <option value="4">利益パターン4</option>
              <option value="5">利益パターン5</option>
              <option value="6">利益パターン6</option>
              <option value="7">利益パターン7</option>
              <option value="8">利益パターン8</option>
              <option value="9">利益パターン9</option>
            </CFormSelect>
            <p></p>*/}
            <CForm className="row g-3 align-items-center">
              <CCol xs={'2'}>
                <CFormInput
                  type="text"
                  defaultValue="シミュレーション用送料(円)"
                  readOnly
                  plainText
                />
                <CFormInput
                  type="number"
                  min="0"
                  step="100"
                  placeholder="0.98"
                  defaultValue={para10Data}
                  aria-label="First name"
                  onChange={(event) => setpara10Data(event.target.value)}
                />
              </CCol>
              <CCol xs={'2'}>
                <CFormInput
                  type="text"
                  defaultValue="シミュレーション用手数料率(%)"
                  readOnly
                  plainText
                />
                <CFormInput
                  type="number"
                  min="0"
                  max="100"
                  placeholder="15"
                  defaultValue={para3Data}
                  aria-label="First name"
                  onChange={(event) => setpara3Data(event.target.value)}
                />
              </CCol>
            </CForm>
            <p></p>
            <CForm className="row g-3 align-items-center">
              <CCol xs={'2'}>
                <CFormLabel>価格(&yen;)以下</CFormLabel>
                {valueList.map((item, index) => (
                  <CFormInput
                    key={index}
                    type="number"
                    min="0"
                    step="100"
                    placeholder="&yen;"
                    defaultValue={item}
                    aria-label="Addgin word"
                    onChange={(event) => updatevalueElement(index, event.target.value)}
                    className="mt-2"
                  />
                ))}
              </CCol>
              <CCol xs={'2'}>
                <CFormLabel>利益率(%)</CFormLabel>
                {profitrateList.map((item, index) => (
                  <CFormInput
                    key={index}
                    type="number"
                    min="0"
                    placeholder="%"
                    defaultValue={item}
                    aria-label="Addgin word"
                    onChange={(event) => updateprofitrateElement(index, event.target.value)}
                    className="mt-2"
                  />
                ))}
              </CCol>
              <CCol xs={'2'}>
                <CFormLabel>差額削除(%)</CFormLabel>
                {diffdelList.map((item, index) => (
                  <CFormInput
                    key={index}
                    type="number"
                    min="0"
                    max="100"
                    placeholder="%"
                    defaultValue={item}
                    aria-label="Addgin word"
                    onChange={(event) => updatediffdelElement(index, event.target.value)}
                    className="mt-2"
                  />
                ))}
              </CCol>
              <CCol xs={'2'}>
                <CFormLabel>利益率からの最大利益額(&yen;)</CFormLabel>
                {/* 利益率からの最大利益 = 利益率*販売価格  = ( ( (仕入価格 + 国際送料 + 諸経費 )*(利益率 + 1 - Rate掛け率) ) / (1 - 販売手数料 - 利益率 ) */}
                {/* 利益率からの最大利益 = 利益率*販売価格  =    ( 仕入価格 + 国際送料 + 諸経費) / ( 1 - 利益率) / ( Rate掛け率）/ (1 - 販売手数料 - 利益率) */}
                {MaxprofitList.map((item, index) => (
                  <CFormInput
                    key={index}
                    placeholder="&yen;"
                    value={parseInt(
                      ((parseFloat(item) + parseFloat(para10Data) + parseFloat(para4Data)) *
                        (parseFloat(profitrateList[index]) * 0.01 + 1 - parseFloat(para2Data))) /
                        (1 -
                          parseFloat(para3Data) * 0.01 -
                          parseFloat(profitrateList[index]) * 0.01),
                    )}
                    aria-label="fix word"
                    className="mt-2"
                    disabled
                  />
                ))}
              </CCol>
            </CForm>
            <p></p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton type="button" color={button_color} onClick={() => saveSubmission()}>
                更新
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      {/*<CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>自動出品</strong>
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
          </CCardBody>
        </CCard>
      </CCol>
      <div className="d-grid gap-2">
        <CButton type="button" color="primary" onClick={() => saveSubmission()}>
          保存
        </CButton>
      </div>*/}
      <CCol xs={12}>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>LowestPrice取得条件</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="日本の出品者" readOnly plainText />
                </CCol>
                <CCol xs={'4'} className="mt-2">
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioFullfillmentChannel"
                    id="inlineCheckbox1"
                    value="option1"
                    label="All"
                    checked={selectedOption1 === 'option1'}
                    onChange={() => setselectedOption1('option1')}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioFullfillmentChannel"
                    id="inlineCheckbox2"
                    value="option2"
                    label="Merchantのみ"
                    checked={selectedOption1 === 'option2'}
                    onChange={() => setselectedOption1('option2')}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioFullfillmentChannel"
                    id="inlineCheckbox3"
                    value="option3"
                    label="FBA優先"
                    checked={selectedOption1 === 'option3'}
                    onChange={() => setselectedOption1('option3')}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioFullfillmentChannel"
                    id="inlineCheckbox4"
                    value="option4"
                    label="FBAのみ"
                    checked={selectedOption1 === 'option4'}
                    onChange={() => setselectedOption1('option4')}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="日本の配送時間" readOnly plainText />
                </CCol>
                <CCol xs={'5'} className="mt-2">
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioShippingtime"
                    id="inlineCheckbox1"
                    value="option1"
                    label="All"
                    checked={selectedOption2 === 'option1'}
                    onChange={() => setselectedOption2('option1')}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioShippingtime"
                    id="inlineCheckbox2"
                    value="option2"
                    label="~2days"
                    checked={selectedOption2 === 'option2'}
                    onChange={() => setselectedOption2('option2')}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioShippingtime"
                    id="inlineCheckbox3"
                    value="option3"
                    label="~3days"
                    checked={selectedOption2 === 'option3'}
                    onChange={() => setselectedOption2('option3')}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioShippingtime"
                    id="inlineCheckbox4"
                    value="option4"
                    label="~5days"
                    checked={selectedOption2 === 'option4'}
                    onChange={() => setselectedOption2('option4')}
                  />
                  <CFormCheck
                    inline
                    type="radio"
                    name="inlineRadioShippingtime"
                    id="inlineCheckbox5"
                    value="option5"
                    label="~7days"
                    checked={selectedOption2 === 'option5'}
                    onChange={() => setselectedOption2('option5')}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol xs={'auto'}>
                  <CFormInput
                    type="text"
                    defaultValue="Positive Feedback Ratio"
                    readOnly
                    plainText
                  />
                </CCol>
                <CCol xs={'2'}>
                  <CFormInput
                    type="text"
                    defaultValue="Positive Feedbackの割合が"
                    readOnly
                    plainText
                  />
                </CCol>
                <CCol xs={'1'}>
                  <CFormInput
                    type="number"
                    min="0"
                    step="1"
                    max="100"
                    placeholder="80"
                    defaultValue={para17Data}
                    aria-label="First name"
                    onChange={(event) => setpara17Data(event.target.value)}
                  />
                </CCol>
                <CCol xs={'auto'}>
                  <CFormInput
                    type="text"
                    defaultValue="%以上のセラーを対象にする"
                    readOnly
                    plainText
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="Seller Feedback Count" readOnly plainText />
                </CCol>
                <CCol xs={'2'}>
                  <CFormInput type="text" defaultValue="評価数が" readOnly plainText />
                </CCol>
                <CCol xs={'1'}>
                  <CFormInput
                    type="number"
                    min="0"
                    step="1"
                    placeholder="1"
                    defaultValue={para18Data}
                    aria-label="First name"
                    onChange={(event) => setpara18Data(event.target.value)}
                  />
                </CCol>
                <CCol xs={'auto'}>
                  <CFormInput
                    type="text"
                    defaultValue="以上のセラーを対象にする"
                    readOnly
                    plainText
                  />
                </CCol>
              </CRow>
              <CCol className="d-grid gap-2 d-md-flex justify-content-md-end bottom-0">
                <div className="position-absolute bottom-10">
                  <CButton type="button" color={button_color} onClick={() => saveSubmission()}>
                    保存
                  </CButton>
                </div>
              </CCol>
            </CForm>
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
            <strong>出品設定</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow>
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="出品する数(Quantity)" readOnly plainText />
                </CCol>
                <CCol xs={'2'}>
                  <CFormInput
                    type="number"
                    min="0"
                    placeholder="1"
                    defaultValue={para13Data}
                    aria-label="First name"
                    onChange={(event) => setpara13Data(event.target.value)}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="出荷までの日数" readOnly plainText />
                </CCol>
                <CCol xs={'2'}>
                  <CFormInput
                    type="number"
                    min="0"
                    placeholder="7"
                    defaultValue={para14Data}
                    aria-label="First name"
                    onChange={(event) => setpara14Data(event.target.value)}
                  />
                </CCol>
              </CRow>
              <CCol className="d-grid gap-2 d-md-flex justify-content-md-end bottom-0">
                <div className="position-absolute bottom-10">
                  <CButton type="button" color={button_color} onClick={() => saveSubmission()}>
                    保存
                  </CButton>
                </div>
              </CCol>
            </CForm>
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
            <strong>自動価格更新設定</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <CRow className="mt-2">
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="自動価格更新" readOnly plainText />
                </CCol>
                <CCol xs={'auto'} className="mt-2">
                  <CFormSwitch
                    label="&ensp;※毎日下記時間に自動で価格を更新します"
                    id="formSwitchCheckDefault"
                    defaultChecked={para15Data}
                    onChange={(event) => setpara15Data(event.target.checked)}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="処理開始時間" readOnly plainText />
                </CCol>
                <CCol xs={'auto'} className="mt-1">
                  <input
                    type="time"
                    id="appt"
                    className="appt"
                    value={para16Data}
                    min="00:00"
                    max="24:00"
                    step="900"
                    style={{
                      height: '30px',
                      width: '100px',
                      fontSize: '15pt',
                      border: '2px inset',
                      backgroundColor: '#F2F2F2',
                      fontFamily: 'inherit',
                    }}
                    onChange={(event) => setpara16Data(event.target.value)}
                    required
                  ></input>
                </CCol>
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="の時間に毎日実行する" readOnly plainText />
                </CCol>
              </CRow>
              <CRow className="mt-2">
                <CCol xs={'auto'}>
                  <CFormInput type="text" defaultValue="自動停止削除" readOnly plainText />
                </CCol>
                <CCol xs={'auto'} className="mt-2">
                  <CFormSwitch
                    label="&ensp;※在庫から停止中の商品を一括で自動削除します"
                    id="formSwitchCheckDefault1"
                    defaultChecked={paraDelstopData}
                    onChange={(event) => setparaDelstopData(event.target.checked)}
                  />
                </CCol>
              </CRow>
              <CCol className="d-grid gap-2 d-md-flex justify-content-md-end bottom-0">
                <div className="position-absolute bottom-10">
                  <CButton type="button" color={button_color} onClick={() => saveSubmission()}>
                    保存
                  </CButton>
                </div>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Parameter
