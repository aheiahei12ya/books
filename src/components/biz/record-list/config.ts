import { i18n } from '@/locales'

export const columns = [
  {
    title: i18n.formatMessage({ id: 'pages.transaction.table.time' }),
    dataIndex: 'time',
    key: 'time',
    ellipsis: true,
    width: 70
  },
  {
    title: i18n.formatMessage({ id: 'pages.transaction.table.type' }),
    dataIndex: 'type',
    key: 'type',
    ellipsis: true,
    width: 70
  },
  {
    title: i18n.formatMessage({ id: 'pages.transaction.table.account' }),
    dataIndex: 'account',
    key: 'account',
    ellipsis: true
  },
  {
    title: i18n.formatMessage({ id: 'pages.transaction.table.method' }),
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    ellipsis: true
  },
  {
    title: i18n.formatMessage({ id: 'pages.transaction.table.category' }),
    dataIndex: 'category',
    key: 'category',
    ellipsis: true
  },
  {
    title: i18n.formatMessage({ id: 'pages.transaction.table.subcategory' }),
    dataIndex: 'subcategory',
    key: 'subcategory',
    ellipsis: true
  },
  {
    title: i18n.formatMessage({ id: 'pages.transaction.table.amount' }),
    dataIndex: 'amount',
    key: 'amount',
    width: 80
  },
  {
    title: i18n.formatMessage({ id: 'pages.transaction.table.note' }),
    dataIndex: 'note',
    key: 'note',
    ellipsis: true,
    width: 150
  }
]
