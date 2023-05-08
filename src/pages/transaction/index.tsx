import classNames from 'classnames'
import dayjs from 'dayjs'
import Head from 'next/head'
import React, { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import RecordForm from '@/components/biz/record-form'
import RecordList from '@/components/biz/record-list'
import { RecordExpenseItems, RecordExpenses } from '@/components/biz/record-list/RecordList.types'
import RecordStatistic from '@/components/biz/record-statistic'
import YearList from '@/components/biz/year-list'
import Button from '@/components/button'
import Card from '@/components/card'
import Dropdown from '@/components/dropdown'
import Tag from '@/components/tag'
import useRequest from '@/hooks/useRequest'
import deepCopy from '@/lib/pythonic/deepCopy'
import styles from '@/pages/transaction/index.module.scss'
import services from '@/services'

const Transaction = () => {
  const i18n = useIntl()
  const [filter, setFilter] = useState({
    type: '',
    account: '',
    platform: '',
    category: '',
    subcategory: ''
  })
  const [recordList, setRecordList] = useState([])
  const { data: yearListData } = useRequest(() => services.transaction.yearList())
  const { data: expenseData } = useRequest(
    () => {
      const date = new Date()
      return services.transaction.expense({
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString()
      })
    },
    {
      onSuccess: (data) => {
        if (data.success) {
          setRecordList(data.data.recordList)
        }
      }
    }
  )

  const greetCard = useMemo(
    () => (
      <div className={styles.greet}>
        <Card
          title={i18n.formatMessage({ id: 'pages.transaction.greet.title' })}
          subtitle={i18n.formatMessage({ id: 'pages.transaction.greet.subtitle' })}
        ></Card>
      </div>
    ),
    [i18n]
  )

  const statisticCard = useMemo(
    () => (
      <div className={classNames(styles.columnLeft, styles.hiddenLgAndDown)}>
        <Card
          title={i18n.formatMessage({ id: 'pages.record.statistic.payment' })}
          elevation={2}
          className={styles.statisticCard}
        >
          <RecordStatistic></RecordStatistic>
        </Card>
        <Card
          title={i18n.formatMessage({ id: 'pages.record.statistic.account' })}
          elevation={2}
          className={styles.statisticCard}
        >
          <RecordStatistic></RecordStatistic>
        </Card>
      </div>
    ),
    [i18n]
  )

  const tools = useMemo(() => {
    const date = new Date()
    date.setDate(28)
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    const lastDay = date.getDate()
    const currentYearMonth = dayjs().format('YYYY.MM')
    return (
      <>
        <span className={styles.date}>
          {currentYearMonth}.01 ~ {currentYearMonth}.{lastDay}
        </span>
        <div className={styles.toolButtons}>
          <Tag hideBorder color={'success'} size={'small'}>
            <span>{i18n.formatMessage({ id: 'pages.transaction.payment.expense' })}: </span>
            <span className={styles.outcome}>{expenseData?.data?.expense}</span>
          </Tag>
          <Tag hideBorder color={'danger'} size={'small'}>
            <span>{i18n.formatMessage({ id: 'pages.transaction.payment.income' })}: </span>
            <span className={styles.income}>{expenseData?.data?.income}</span>
          </Tag>
          <Tag hideBorder color={'primary'} size={'small'}>
            <span>{i18n.formatMessage({ id: 'pages.transaction.payment.balance' })}: </span>
            <span className={styles.balance}>{expenseData?.data?.balance}</span>
          </Tag>
        </div>
      </>
    )
  }, [expenseData, i18n])

  const filterCard = useMemo(() => {
    const handleFilter = (value: string, type: 'type' | 'account' | 'platform' | 'category' | 'subcategory') => {
      if (filter[type] === value) return
      let source = deepCopy(expenseData.data.recordList)
      let target: RecordExpenses[] = []
      let newVal = { ...filter }
      switch (type) {
        case 'type': {
          newVal.type = value
          newVal.account = ''
          newVal.platform = ''
          newVal.category = ''
          newVal.subcategory = ''
          break
        }
        case 'account': {
          newVal.account = value
          newVal.platform = ''
          newVal.category = ''
          newVal.subcategory = ''
          break
        }
        case 'platform': {
          newVal.platform = value
          newVal.category = ''
          newVal.subcategory = ''
          break
        }
        case 'category': {
          newVal.category = value
          newVal.subcategory = ''
          break
        }
        case 'subcategory': {
          newVal.subcategory = value
          break
        }
        default:
          break
      }

      for (const [k, v] of Object.entries(newVal)) {
        if (v !== '') {
          source.forEach((singleDayRecord: RecordExpenses) => {
            const singleDayTmp: RecordExpenseItems[] = []
            singleDayRecord.items.forEach((item: RecordExpenseItems) => {
              if (item[k as keyof RecordExpenseItems] === v) {
                singleDayTmp.push(item)
              }
            })
            if (singleDayTmp.length) {
              target.push(singleDayRecord)
              target[target.length - 1]['items'] = singleDayTmp
            }
          })
          source = target
          target = []
        }
      }

      setRecordList(source)
      setFilter(newVal)
    }

    const handleReset = () => {
      setRecordList(expenseData.data.recordList)
      setFilter({
        type: '',
        account: '',
        platform: '',
        category: '',
        subcategory: ''
      })
    }

    return (
      <Card
        className={styles.filterContainer}
        title={i18n.formatMessage({ id: 'pages.transaction.payment.detail' })}
        elevation={2}
        toolClass={styles.toolBar}
        tools={tools}
        bodyClass={styles.filterSheet}
      >
        <Dropdown
          value={filter.type}
          items={['收入', '支出']}
          onChange={(val) => handleFilter(val, 'type')}
          placeholder={i18n.formatMessage({ id: 'pages.transaction.payment.type' })}
          hideMessage
        ></Dropdown>
        <Dropdown
          value={filter.account}
          items={['花呗', '支出']}
          onChange={(val) => handleFilter(val, 'account')}
          placeholder={i18n.formatMessage({ id: 'pages.record.expense.account' })}
          hideMessage
        ></Dropdown>
        <Dropdown
          value={filter.platform}
          items={['淘宝', '支出']}
          onChange={(val) => handleFilter(val, 'platform')}
          placeholder={i18n.formatMessage({ id: 'pages.record.expense.platform' })}
          hideMessage
        ></Dropdown>
        <Dropdown
          value={filter.category}
          items={['虚拟商品', '支出']}
          onChange={(val) => handleFilter(val, 'category')}
          placeholder={i18n.formatMessage({ id: 'pages.record.form.category' })}
          hideMessage
        ></Dropdown>
        <Dropdown
          value={filter.subcategory}
          items={['年费', '小型']}
          onChange={(val) => handleFilter(val, 'subcategory')}
          placeholder={i18n.formatMessage({ id: 'pages.record.form.subcategory' })}
          hideMessage
        ></Dropdown>
        <Button onClick={handleReset}>{i18n.formatMessage({ id: 'pages.transaction.button.reset' })}</Button>
      </Card>
    )
  }, [expenseData, filter, i18n, tools])

  const recordYearList = useMemo(() => {
    return (
      <div className={styles.yearSelector}>
        {yearListData?.success && (
          <YearList
            yearList={yearListData.data.yearList}
            defaultExpandName={new Date().getFullYear().toString()}
          ></YearList>
        )}
      </div>
    )
  }, [yearListData])

  const recordDetails = useMemo(() => {
    return (
      <div className={styles.recordList}>
        <RecordList expenses={recordList}></RecordList>
      </div>
    )
  }, [recordList])

  const recordForm = useMemo(() => <RecordForm orientation={'portrait'}></RecordForm>, [])

  return (
    <>
      <Head>
        <title>{i18n.formatMessage({ id: 'pages.transaction.head.title' })}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className={classNames(styles.page)}>
        <div className={styles.layerLeft}>
          {greetCard}
          <div className={styles.columnContainer}>
            {statisticCard}
            <div className={styles.columnRight}>
              {filterCard}
              <Card className={styles.recordContainer} bodyClass={styles.recordSheet} elevation={2}>
                {recordYearList}
                {recordDetails}
              </Card>
            </div>
          </div>
        </div>
        <div className={styles.layerRight}>{recordForm}</div>
      </main>
    </>
  )
}

Transaction.useLayout = true

export default Transaction
