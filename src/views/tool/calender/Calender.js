import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import Papa from 'papaparse'
import dayjs from 'dayjs'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { getMonth } from '../../../util'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CSpinner,
  CContainer,
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

const CalendarHeader = (props) => {
  const { setMonthIndex, monthIndex, setScheduleTime, ScheduleTime } = props
  const countryCode = useSelector((state) => state.countryCode)
  const [isLoadingUpload, setisLoadingUpload] = React.useState(false)

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1)
  }
  const handelNextMonth = () => {
    setMonthIndex(monthIndex + 1)
  }
  const handleReset = () => {
    setMonthIndex(dayjs().month())
  }

  // Save changesで時間を設定する関数
  const handleSubmit = async (time) => {
    setisLoadingUpload(true)
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode
    const body = {
      type: 'uploadtime',
      scheduletime: time,
      username: username,
    }
    try {
      await axios
        .post(
          'https://caixpkm2rj.execute-api.ap-northeast-1.amazonaws.com/default/Revise-Calendar-To-DynamoDB',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          alert('正常に更新できました！')
        })
    } catch (err) {
      console.error(err)
      alert('エラー')
    }
    setisLoadingUpload(false)
  }

  return (
    <header className="calendar-header-component">
      <h1 style={{ width: '140px', alignItems: 'center' }}>
        {dayjs(new Date(dayjs().year(), monthIndex)).format('YYYY年M月')}
      </h1>
      <CButton
        type="button"
        className="calendar-header-buttun1"
        color={'dark'}
        onClick={() => handleReset()}
      >
        <div style={{ marginTop: '-0.3rem', alignItems: 'center' }}>Now</div>
      </CButton>
      <CButton
        type="button"
        className="calendar-header-buttun2"
        color={'dark'}
        onClick={() => handlePrevMonth()}
      >
        <MdChevronLeft style={{ marginTop: '-0.9rem', alignItems: 'center' }} />
      </CButton>
      <CButton
        type="button"
        className="calendar-header-buttun2"
        color={'dark'}
        onClick={() => handelNextMonth()}
      >
        <MdChevronRight style={{ marginTop: '-0.9rem', alignItems: 'center' }} />
      </CButton>
      {/*<h2>{dayjs(new Date(dayjs().year(), monthIndex)).format('YYYY年M月')}</h2>*/}
      <CContainer>
        <CForm className="row g-3 justify-content-end">
          <CCol xs={'auto'}>
            <CFormInput
              type="time"
              id="appt"
              name="appt"
              value={ScheduleTime}
              min="00:00"
              max="24:00"
              style={{
                height: '40px',
                width: '120px',
                fontSize: '15pt',
                fontFamily: 'inherit',
              }}
              onChange={(event) => setScheduleTime(event.target.value)}
            />
          </CCol>
          <CCol xs={'auto'}>
            <CButton color="primary" onClick={() => handleSubmit(ScheduleTime)}>
              {isLoadingUpload ? (
                <CSpinner
                  component="span"
                  size="sm"
                  aria-hidden="true"
                  style={{ marginRight: '0px' }}
                />
              ) : (
                <div></div>
              )}
              Save change
            </CButton>
          </CCol>
        </CForm>
      </CContainer>
    </header>
  )
}

CalendarHeader.propTypes = {
  setMonthIndex: PropTypes.any.isRequired,
  monthIndex: PropTypes.any.isRequired,
  setScheduleTime: PropTypes.any.isRequired,
  ScheduleTime: PropTypes.any.isRequired,
}

{
  /*const Month = (props) => {
  const { month, setDaySelected, setShowEventModal } = props
  return (
    <div className="flex-1 grid-container">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day
              day={day}
              key={idx}
              rowIdx={i}
              setDaySelected={setDaySelected}
              setShowEventModal={setShowEventModal}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

Month.propTypes = {
  month: PropTypes.array,
  setDaySelected: PropTypes.any.isRequired,
  setShowEventModal: PropTypes.any.isRequired,
}*/
}

const Day = (props) => {
  const { day, rowIdx, setDaySelected, setShowEventModal, dayEvents } = props

  var calenderfilename = ''
  var datalength = ''
  var calenderfileurl = ''
  for (let elem = 0; elem < dayEvents.length; elem++) {
    if (dayEvents[elem]['key'] === day.format('YYYY-MM-DD')) {
      calenderfilename = dayEvents[elem]['filename'].substr(0, 12) + '... '
      datalength = '(' + dayEvents[elem]['length'] + '件)'
      calenderfileurl = dayEvents[elem]['url']
    }
  }

  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'get-current-day-component' : ''
  }

  return (
    <div className="calendar-day-component">
      <header
        className="flex flex-col items-center cursor-pointer"
        onClick={() => {
          setDaySelected(day)
          setShowEventModal(true)
        }}
      >
        {rowIdx === 0 && <p className="text-sm mt-1">{day.format('ddd')}</p>}
        <p className={`text-sm p-1 my-1 text-center" ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div
        className="flex flex-col items-center cursor-pointer"
        style={{ width: 'auto', height: '100%' }}
        onClick={() => {
          setDaySelected(day)
          setShowEventModal(true)
        }}
      >
        {calenderfilename !== '' ? (
          <p className={`text-sm p-1 my-1 text-center`}>
            <a href={calenderfileurl} onClick="event.stopPropagation()">
              {calenderfilename}
              {datalength}
            </a>
          </p>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

Day.propTypes = {
  day: PropTypes.any.isRequired,
  rowIdx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setDaySelected: PropTypes.any.isRequired,
  setShowEventModal: PropTypes.any.isRequired,
  dayEvents: PropTypes.any.isRequired,
}

const EventModal = (props) => {
  const { setShowEventModal, daySelected, dayEvents } = props

  const [selectedFile, setSelectedFile] = React.useState()
  const [csvData, setCsvData] = React.useState([])
  const [isLoadingUpload, setisLoadingUpload] = React.useState(false)

  const countryCode = useSelector((state) => state.countryCode)

  var calenderfilename = ''
  var datalength = ''
  for (let elem = 0; elem < dayEvents.length; elem++) {
    if (dayEvents[elem]['key'] === daySelected.format('YYYY-MM-DD')) {
      calenderfilename = dayEvents[elem]['filename'].substr(0, 20)
      datalength = '(' + dayEvents[elem]['length'] + '件)'
    }
  }

  // Save changesで動作する関数
  const handleSubmit = async (e) => {
    var checkedasinlist = csvData.filter(checkEelement)
    var simpleasinlist = checkedasinlist.map((item) => item[0])
    var asinlist = [...new Set(simpleasinlist)]
    setisLoadingUpload(true)

    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode

    const body = {
      type: e,
      data: asinlist,
      day: daySelected.format('YYYY-MM-DD'),
      username: username,
      filename: selectedFile.name,
    }

    // モーダルで選択したファイルのアップロード
    try {
      await axios
        .post(
          'https://caixpkm2rj.execute-api.ap-northeast-1.amazonaws.com/default/Revise-Calendar-To-DynamoDB',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          console.log('ok')
        })
    } catch (err) {
      console.error(err)
    }
    setShowEventModal(false)
    setisLoadingUpload(false)
  }

  const handleFileRead = (event) => {
    const content = event.target.result
    //CSVファイル読み込み用
    const result = Papa.parse(content, { header: false })
    setCsvData(result.data)
  }

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      console.log('none')
    } else {
      //ファイルアップロード用
      setSelectedFile(acceptedFiles[0])
      //ファイル読み込み用
      const reader = new FileReader()
      reader.onloadend = handleFileRead
      reader.readAsText(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
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

  function checkEelement(element) {
    return element !== undefined && element !== 0 && element !== null && element['ASIN'] !== ''
  }

  //削除用の関数
  const handleDeleteSubmit = async (e) => {
    setisLoadingUpload(true)
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode

    const body = {
      type: e,
      username: username,
      day: daySelected.format('YYYY-MM-DD'),
    }

    try {
      await axios
        .post(
          'https://caixpkm2rj.execute-api.ap-northeast-1.amazonaws.com/default/Revise-Calendar-To-DynamoDB',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          console.log('Done')
        })
    } catch (err) {
      console.error(err)
    }
    setShowEventModal(false)
    setisLoadingUpload(false)
  }

  return (
    <div className="eventmodal-component">
      <CModal
        className="show d-block position-static"
        alignment="center"
        backdrop={'static'}
        keyboard={false}
        portal={false}
        onClose={() => setShowEventModal(false)}
        visible
      >
        <CModalHeader>
          <CModalTitle>{daySelected.format('dddd, MMMM DD')}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {calenderfilename ? (
            <div>
              <h5>予約中</h5>
              <CRow className="mt-2">
                <CCol xs={'auto'}>
                  <strong
                    style={{
                      fontSize: '18px',
                      marginLeft: '80px',
                      marginRight: '5px',
                      justifyContent: 'center',
                      textAlign: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {calenderfilename}
                    {datalength}
                  </strong>
                </CCol>
                <CCol className="d-grid gap-2 d-md-flex justify-content-md-end bottom-0">
                  <CButton color="primary" onClick={() => handleDeleteSubmit('delete')}>
                    {isLoadingUpload ? (
                      <CSpinner
                        component="span"
                        size="sm"
                        aria-hidden="true"
                        style={{
                          marginLeft: '5px',
                          marginRight: '5px',
                          marginBottom: '5px',
                          textAlign: 'right',
                        }}
                      />
                    ) : (
                      <div></div>
                    )}
                    Delete
                  </CButton>
                </CCol>
              </CRow>
              <hr />
            </div>
          ) : (
            <div></div>
          )}
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
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowEventModal(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => handleSubmit('upload')}>
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
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

EventModal.propTypes = {
  setShowEventModal: PropTypes.any.isRequired,
  daySelected: PropTypes.any.isRequired,
  dayEvents: PropTypes.any.isRequired,
}

const usePagecomponent = () => {
  const [currentMonth, setCurrentMonth] = React.useState(getMonth())
  const [monthIndex, setMonthIndex] = React.useState(dayjs().month())
  const [daySelected, setDaySelected] = React.useState(dayjs())
  const [showEventModal, setShowEventModal] = React.useState(false)
  const countryCode = useSelector((state) => state.countryCode)
  const [dayEvents, setDayEvents] = useState([])
  const [ScheduleTime, setScheduleTime] = React.useState('')

  // 今月分の日付を取得する関数
  React.useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex])

  const initialTask = async () => {
    await handleSubmit('get')
  }

  React.useEffect(() => {
    initialTask()
  }, [])

  React.useEffect(() => {
    initialTask()
  }, [showEventModal])

  const handleSubmit = async (e) => {
    const users = await Auth.currentAuthenticatedUser()
    const username = users.username + '-' + countryCode

    const body = {
      type: e,
      username: username,
    }

    try {
      await axios
        .post(
          'https://caixpkm2rj.execute-api.ap-northeast-1.amazonaws.com/default/Revise-Calendar-To-DynamoDB',
          body,
          {
            headers: {
              'Content-type': 'text/plain',
            },
          },
        )
        .then((res) => {
          setDayEvents(res.data[0])
          setScheduleTime(res.data[1])
        })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <CRow>
      <h3 className="h3style">出品スケジュール</h3>
      <CCol>
        <CCard
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            height: 'auto',
          }}
        >
          <CCardHeader>
            <strong>出品予約スケジュール</strong>
            <small>&ensp;※クリックして、追加・修正・削除ができます。</small>
          </CCardHeader>
          <CCardBody>
            {/* カレンダーの日付をクリックしたとき、showEventModalがtrueになり、EventModalコンポーネントが表示される */}
            {showEventModal && (
              <EventModal
                setShowEventModal={setShowEventModal}
                daySelected={daySelected}
                dayEvents={dayEvents}
              />
            )}
            <CalendarHeader
              setMonthIndex={setMonthIndex}
              monthIndex={monthIndex}
              setScheduleTime={setScheduleTime}
              ScheduleTime={ScheduleTime}
            />
            <div className="calendar-component">
              <div className="flex-1 grid-container">
                {/* 今月の日付をループする */}
                {currentMonth.map((row, i) => (
                  <React.Fragment key={i}>
                    {row.map((day, idx) => (
                      //各日付のコンポーネントで、setDaySelectedで選択した日付情報、setShowEventModalでEventModalコンポーネントを表示するフラグ情報
                      <Day
                        day={day}
                        key={idx}
                        rowIdx={i}
                        setDaySelected={setDaySelected}
                        setShowEventModal={setShowEventModal}
                        dayEvents={dayEvents}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default usePagecomponent
