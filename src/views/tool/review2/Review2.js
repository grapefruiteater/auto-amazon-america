import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CSpinner,
  CAlert,
  CProgress,
  CProgressBar,
} from '@coreui/react'

const Breadcrumbs = () => {
  const countryCode = useSelector((state) => state.countryCode)
  const [responseData, setResponseData] = React.useState(null)
  const [ErrorFlag, setErrorFlag] = React.useState(false)

  const initialTask = async () => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode
    await handleSubmission(username)
  }

  React.useEffect(() => {
    initialTask()
  }, [])

  //Lambda経由でDynamoDBのテーブル一覧を取得する
  const handleSubmission = async (event) => {
    const article = { username: event }
    try {
      await axios
        .post(
          'https://kr4mapf0fd.execute-api.ap-northeast-1.amazonaws.com/default/Get-All-Exhibit-Process-From-DynamoDB',
          article,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          setResponseData(res.data)
        })
    } catch (err) {
      setErrorFlag(true)
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

  if (ErrorFlag) {
    return (
      <div>
        <h3>処理結果がありません</h3>
      </div>
    )
  } else if (!responseData) {
    return (
      <div>
        <CSpinner color="dark" />
      </div>
    )
  }

  return (
    <CRow>
      <h3 className="h3style">出品・在庫削除 - 処理結果一覧</h3>
      <CCol xs={12}>
        <CCard
          className="mb-4"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CCardHeader>
            <strong>最新の処理結果から順に表示</strong>
          </CCardHeader>
          <CCardBody>
            <CAccordion alwaysOpen flush>
              {/*<p className="text-medium-emphasis small">新しい処理結果順で表示しています</p>*/}
              {responseData.data.map((item, index) => (
                <CAccordionItem itemKey={index} key={index}>
                  {item.jobtype === 'Update' ? (
                    <CAccordionHeader>
                      <strong style={{ color: '#0000CD' }}>
                        Result&ensp;#{responseData.data.length - index}&ensp;
                      </strong>
                      {item.id.substr(0, 4)}/{item.id.substr(4, 2)}/{item.id.substr(6, 2)}&ensp;
                      {item.id.substr(8, 2)}:{item.id.substr(10, 2)}
                      <strong style={{ color: '#006400' }}>&ensp;&ensp;{item.jobtype}</strong>
                      <strong>
                        &ensp;更新ASIN:&ensp;{item.numberofupdate}
                        &ensp;削除ASIN:&ensp;{item.numberofdelete}&ensp;&ensp;
                      </strong>
                      {item.filename === 'Automatical Price Revision' ? (
                        <strong style={{ color: '#808080' }}>自動価格改定</strong>
                      ) : (
                        item.filename
                      )}
                    </CAccordionHeader>
                  ) : (
                    <CAccordionHeader>
                      <strong style={{ color: '#0000CD' }}>
                        Result&ensp;#{responseData.data.length - index}&ensp;
                      </strong>
                      {item.id.substr(0, 4)}/{item.id.substr(4, 2)}/{item.id.substr(6, 2)}&ensp;
                      {item.id.substr(8, 2)}:{item.id.substr(10, 2)}
                      <strong style={{ color: '#BC1A35' }}>&ensp;&ensp;{item.jobtype}</strong>
                      <strong>
                        &ensp;更新ASIN:&ensp;0&ensp;削除ASIN:&ensp;{item.numberofprocess}
                      </strong>
                      &ensp;&ensp;{item.filename}
                    </CAccordionHeader>
                  )}
                  <CAccordionBody>
                    Status:&ensp;{item.status},&ensp;FeedId:&ensp;{item.feedid}
                    ,&ensp;処理された件数:&ensp;{item.numberofprocess}
                    ,&ensp;成功した件数:&ensp;{item.numberofsuccess}
                  </CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Breadcrumbs
