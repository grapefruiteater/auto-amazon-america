import React from 'react'

// Home
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Settings
const Parameters = React.lazy(() => import('./views/settings/parameter/Parameter'))
const Filterings = React.lazy(() => import('./views/settings/filtering/Filtering'))
const Keysettings = React.lazy(() => import('./views/settings/keysetting/Keysetting'))

// Tool
const Input1 = React.lazy(() => import('./views/tool/input1/Input1'))
const Review1 = React.lazy(() => import('./views/tool/review1/Review1'))
const Input2 = React.lazy(() => import('./views/tool/input2/Input2'))
const Review2 = React.lazy(() => import('./views/tool/review2/Review2'))
const Input3 = React.lazy(() => import('./views/tool/input3/Input3'))
const Calender = React.lazy(() => import('./views/tool/calender/Calender'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'home', element: Review1 },
  { path: '/settings', name: 'Settings', element: Parameters, exact: true },
  { path: '/settings/parameter', name: 'Parameters', element: Parameters },
  { path: '/settings/filtering', name: 'Filtering', element: Filterings },
  { path: '/settings/keyset', name: 'Keysetting', element: Keysettings },
  { path: '/tool/input1', name: 'Input', element: Input1 },
  { path: '/tool/review1', name: 'Review_of_Input', element: Review1 },
  { path: '/tool/input2', name: 'Delete', element: Input2 },
  { path: '/tool/review2', name: 'Review_of_Upload', element: Review2 },
  { path: '/tool/input3', name: 'Upload', element: Input3 },
  { path: '/tool/calender', name: 'Calender', element: Calender },
]

export default routes
