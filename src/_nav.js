import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilFilter,
  cilHome,
  cilApplications,
  cilSend,
  cilDialpad,
  cilSignLanguage,
  cilList,
  cilListRich,
  cilInput,
  cilDelete,
  cilCalendar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle, CNavLink } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'ホーム',
  },
  {
    component: CNavItem,
    name: '計算処理一覧',
    to: '/tool/review1',
    icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '出品処理一覧',
    to: '/tool/review2',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'ツール',
  },
  {
    component: CNavItem,
    name: '出品ASINアップロード',
    to: '/tool/input1',
    icon: <CIcon icon={cilSend} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '削除SKUアップロード',
    to: '/tool/input2',
    icon: <CIcon icon={cilDelete} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '出品ファイルアップロード',
    to: '/tool/input3',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: '出品スケジュール',
    to: '/tool/calender',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  /*{
    component: CNavGroup,
    name: '商品情報取得',
    to: '/tool',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'ASINファイル入力',
        to: '/tool/input1',
        badge: {
          color: 'info',
        },
      },
      {
        component: CNavItem,
        name: '処理結果一覧',
        to: '/tool/review1',
        badge: {
          color: 'info',
        },
      },
    ],
  },
  {
    component: CNavGroup,
    name: '出品・在庫削除',
    to: '/tool',
    icon: <CIcon icon={cilSend} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'SKUファイル入力',
        to: '/tool/input2',
        badge: {
          color: 'info',
        },
      },
      {
        component: CNavItem,
        name: '処理結果一覧',
        to: '/tool/review2',
        badge: {
          color: 'info',
        },
      },
    ],
  },*/
  {
    component: CNavTitle,
    name: '設定',
  },
  {
    component: CNavItem,
    name: 'パラメーター',
    to: '/settings/parameter',
    icon: <CIcon icon={cilDialpad} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'フィルタリング',
    to: '/settings/filtering',
    icon: <CIcon icon={cilFilter} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavItem,
    name: 'SP-API キー設定',
    to: '/settings/keyset',
    icon: <CIcon icon={cilInput} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'その他',
  },
  {
    component: CNavLink,
    name: 'マニュアル',
    target: '_blank',
    href: 'https://sites.google.com/view/samplemanual/%E3%83%9B%E3%83%BC%E3%83%A0',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
