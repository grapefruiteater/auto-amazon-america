import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormInput,
  CButton,
  CSpinner,
  CAlert,
} from '@coreui/react'

const Parameter = () => {
  const button_color = 'dark'
  const [responseData, setResponseData] = React.useState(null)
  const [JPLWAAPPIDData, setJPLWAAPPIDData] = React.useState(null)
  const [JPLWACLIENTData, setJPLWACLIENTData] = React.useState(null)
  const [JPREFLESHData, setJPREFLESHData] = React.useState(null)
  const [USLWAAPPIDData, setUSLWAAPPIDData] = React.useState(null)
  const [USLWACLIENTData, setUSLWACLIENTData] = React.useState(null)
  const [USREFLESHData, setUSREFLESHData] = React.useState(null)
  const [isAvairableSPAPIJP, setisAvairableSPAPIJP] = React.useState(true)
  const [isAvairableSPAPIUS, setisAvairableSPAPIUS] = React.useState(true)
  const [isLoadingJP, setisLoadingJP] = React.useState(false)
  const [isLoadingUS, setisLoadingUS] = React.useState(false)
  const [JPSellerID, setJPSellerID] = React.useState(null)
  const [USSellerID, setUSSellerID] = React.useState(null)

  const countryCode = useSelector((state) => state.countryCode)

  const initialTask = async () => {
    await handleSubmission('update', [])
  }

  React.useEffect(() => {
    initialTask()
  }, [])

  //URLへHTTP POSTする
  const handleSubmission = async (keys, event) => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode
    console.log(username)
    console.log(event)
    const body = { user: username, data: event }
    try {
      await axios
        .post(
          'https://8oiscks7o6.execute-api.ap-northeast-1.amazonaws.com/default/Revise-SP-API-Key-To-DynamoDB',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          setResponseData(res.data)
          setJPLWAAPPIDData(res.data[5])
          setJPLWACLIENTData(res.data[4])
          setJPREFLESHData(res.data[3])
          setUSLWAAPPIDData(res.data[2])
          setUSLWACLIENTData(res.data[1])
          setUSREFLESHData(res.data[0])
          if ((keys === 'delete') | (keys === 'add') | (keys === 'save')) {
            alert('正常に保存できました！')
          }
        })
    } catch (err) {
      console.error(err)
    }
  }

  let inputAllList = [
    JPLWAAPPIDData,
    JPLWACLIENTData,
    JPREFLESHData,
    USLWAAPPIDData,
    USLWACLIENTData,
    USREFLESHData,
  ]

  //URLへHTTP POSTする
  const handlecheckSubmission = async (event) => {
    if (event === 'JP') {
      setisLoadingJP(true)
    } else {
      setisLoadingUS(true)
    }
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-us'
    console.log(username)
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
          setisLoadingJP(false)
          setisLoadingUS(false)
          if (event === 'JP') {
            setisAvairableSPAPIJP(res.data)
          } else {
            setisAvairableSPAPIUS(res.data)
          }
          if (res.data === true) {
            alert('正常に動作を確認できました。')
          }
        })
    } catch (err) {
      setisLoadingJP(false)
      setisLoadingUS(false)
      console.error(err)
    }
  }

  //SP-API Public OAth認証
  //https://developer-docs.amazon.com/sp-api/docs/website-authorization-workflow
  const location = useLocation()
  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const amazon_callback_uri = searchParams.get('amazon_callback_uri')
    const amazon_state = searchParams.get('amazon_state')
    const selling_partner_id = searchParams.get('selling_partner_id')
    const mws_auth_token = searchParams.get('mws_auth_token')
    const spapi_oauth_code = searchParams.get('spapi_oauth_code')
    const code = searchParams.get('code')
    console.log('Code:', code)
    console.log('amazon_callback_uri:', amazon_callback_uri)
    console.log('amazon_state:', amazon_state)
    console.log('selling_partner_id:', selling_partner_id)

    if (amazon_callback_uri !== null) {
      const pattern_JP = 'sellercentral-japan.amazon.com'
      const judge_JP = amazon_callback_uri.toLowerCase().includes(pattern_JP.toLowerCase())
      console.log('judge_JP:', judge_JP)

      const pattern_US = 'sellercentral.amazon.com'
      const judge_US = amazon_callback_uri.toLowerCase().includes(pattern_US.toLowerCase())
      console.log('judge_US:', judge_US)

      if (judge_JP !== null) {
        setJPSellerID(selling_partner_id)
      } else if (judge_US !== null) {
        setUSSellerID(selling_partner_id)
      }

      try {
        axios
          .post('https://api.amazon.com/auth/o2/token', {
            grant_type: 'authorization_code',
            code: code,
            client_id: 'amzn1.application-oa2-client.e3ca20bb27e3493b80ad6f63e0bd9c9f',
            client_secret:
              'amzn1.oa2-cs.v1.fc4804be7671cd82b432f0169406f4a732109d86b6437f4331e27a679b97af32',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
          })
          .then((res) => {
            console.log(res)
          })
      } catch (err) {
        console.error(err)
      }
    }
  }, [location.search])

  const [windowObject, setWindowObject] = React.useState(null)
  const closeWindow = () => {
    if (windowObject) {
      windowObject.close()
      setWindowObject(null)
    }
  }
  const handleUnload = (e) => {
    closeWindow()
  }
  window.addEventListener('beforeunload', handleUnload)

  const openNewWindow_JP = () => {
    const newWindow = window.open(
      'https://sellercentral.amazon.com/apps/authorize/consent?application_id=amzn1.sp.solution.cf2a9503-89b1-411f-976e-f7a55249b3b7e&version=beta',
      '_blank',
      'noopener,noreferrer',
    )
    setWindowObject(newWindow)
  }

  const openNewWindow_US = () => {
    const newWindow = window.open(
      'https://sellercentral.amazon.com/apps/authorize/consent?application_id=amzn1.sp.solution.cf2a9503-89b1-411f-976e-f7a55249b3b7&version=beta',
      '_blank',
      'noopener,noreferrer',
    )
    setWindowObject(newWindow)
  }

  if (!responseData) {
    return (
      <div>
        <CSpinner color="dark" />
      </div>
    )
  }

  return (
    <CRow>
      <h3 className="h3style">SP-API キー設定</h3>
      <h4>プライベート認証</h4>
      {isAvairableSPAPIJP ? (
        <div></div>
      ) : (
        <div>
          <CAlert color="danger">※SP-API キーの設定が間違っています！</CAlert>
        </div>
      )}
      <CCol xs={12}>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>日本のセラーセントラルアカウント</strong>
          </CCardHeader>
          <CCardBody>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="AWS IAM ARN ※下記APIキーを取得する際に使用する"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue="arn:aws:iam::501273628515:role/AWS_IAM_SPAPI_Access_Role"
                aria-label="SP-API"
                disabled
              />
            </CCol>
            <p></p>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="LWAアプリID" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPLWAAPPIDData}
                aria-label="SP-API"
                onChange={(event) => setJPLWAAPPIDData(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="LWAクライアントシークレット"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPLWACLIENTData}
                aria-label="SP-API"
                onChange={(event) => setJPLWACLIENTData(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="リフレッシュトークン" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={JPREFLESHData}
                aria-label="SP-API"
                onChange={(event) => setJPREFLESHData(event.target.value)}
              />
            </CCol>
            <p></p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton
                type="button"
                color={button_color}
                onClick={() => handleSubmission('save', inputAllList)}
              >
                保存
              </CButton>
              <CButton
                type="button"
                color={button_color}
                onClick={() => handlecheckSubmission('JP')}
              >
                {isLoadingJP ? (
                  <CSpinner
                    component="span"
                    size="sm"
                    aria-hidden="true"
                    style={{ marginRight: '5px' }}
                  />
                ) : (
                  <div></div>
                )}
                動作確認
              </CButton>
            </div>
            <p></p>
            <small className="d-grid gap-2 d-md-flex justify-content-md-end">
              ※保存を押してから、動作確認を実行してください
            </small>
          </CCardBody>
        </CCard>
      </CCol>
      {isAvairableSPAPIUS ? (
        <div></div>
      ) : (
        <div>
          <CAlert color="danger">※SP-API キーの設定が間違っています！</CAlert>
        </div>
      )}
      <CCol xs={12}>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>アメリカのセラーセントラルアカウント</strong>
          </CCardHeader>
          <CCardBody>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="AWS IAM ARN ※下記APIキーを取得する際に使用する"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue="arn:aws:iam::501273628515:role/AWS_IAM_SPAPI_Access_Role"
                aria-label="SP-API"
                disabled
              />
            </CCol>
            <p></p>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="LWAアプリID" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USLWAAPPIDData}
                aria-label="SP-API"
                onChange={(event) => setUSLWAAPPIDData(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                type="text"
                defaultValue="LWAクライアントシークレット"
                readOnly
                plainText
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USLWACLIENTData}
                aria-label="SP-API"
                onChange={(event) => setUSLWACLIENTData(event.target.value)}
              />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="リフレッシュトークン" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="追加するキー"
                defaultValue={USREFLESHData}
                aria-label="SP-API"
                onChange={(event) => setUSREFLESHData(event.target.value)}
              />
            </CCol>
            <p></p>
            <div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton
                  type="button"
                  color={button_color}
                  onClick={() => handleSubmission('save', inputAllList)}
                >
                  保存
                </CButton>
                <CButton
                  type="button"
                  color={button_color}
                  onClick={() => handlecheckSubmission('US')}
                >
                  {isLoadingUS ? (
                    <CSpinner
                      component="span"
                      size="sm"
                      aria-hidden="true"
                      style={{ marginRight: '5px' }}
                    />
                  ) : (
                    <div></div>
                  )}
                  動作確認
                </CButton>
              </div>
            </div>
            <p></p>
            <small className="d-grid gap-2 d-md-flex justify-content-md-end">
              ※保存を押してから、動作確認を実行してください
            </small>
          </CCardBody>
        </CCard>
        <h4>パブリック認証</h4>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>日本のセラーセントラルアカウント</strong>
          </CCardHeader>
          <CCardBody>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="日本のSeller ID" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="JP Seller ID"
                defaultValue={JPSellerID}
                aria-label="Seller ID"
                onChange={(event) => setJPSellerID(event.target.value)}
                disabled
              />
            </CCol>
          </CCardBody>
          <CButton type="button" color={button_color} onClick={() => openNewWindow_JP()}>
            {isLoadingUS ? (
              <CSpinner
                component="span"
                size="sm"
                aria-hidden="true"
                style={{ marginRight: '5px' }}
              />
            ) : (
              <div></div>
            )}
            日本 OAuth 認証
          </CButton>
        </CCard>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>アメリカのセラーセントラルアカウント</strong>
          </CCardHeader>
          <CCardBody>
            <CCol xs={'auto'}>
              <CFormInput type="text" defaultValue="アメリカのSeller ID" readOnly plainText />
            </CCol>
            <CCol xs={'auto'}>
              <CFormInput
                placeholder="US Seller ID"
                defaultValue={USSellerID}
                aria-label="Seller ID"
                onChange={(event) => setUSSellerID(event.target.value)}
                disabled
              />
            </CCol>
          </CCardBody>
          <CButton type="button" color={button_color} onClick={() => openNewWindow_US()}>
            {isLoadingUS ? (
              <CSpinner
                component="span"
                size="sm"
                aria-hidden="true"
                style={{ marginRight: '5px' }}
              />
            ) : (
              <div></div>
            )}
            アメリカ OAuth 認証
          </CButton>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Parameter
