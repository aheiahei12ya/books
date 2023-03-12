import classNames from 'classnames'
import dayjs from 'dayjs'
import Head from 'next/head'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import RecordForm from '@/components/biz/record-form'
import RecordStatistic from '@/components/biz/record-statistic'
import Button from '@/components/button'
import Card from '@/components/card'
import Collapse from '@/components/collapse'
import Dropdown from '@/components/dropdown'
import Tag from '@/components/tag'
import styles from '@/pages/transaction/index.module.scss'

const Transaction = () => {
  const i18n = useIntl()
  const date = new Date()
  date.setDate(28)
  date.setMonth(date.getMonth() + 1)
  date.setDate(0)
  const lastDay = date.getDate()
  const currentYearMonth = dayjs().format('YYYY.MM')
  const tools = useMemo(() => {
    return (
      <>
        <span className={styles.date}>
          {currentYearMonth}.01 ~ {currentYearMonth}.{lastDay}
        </span>
        <div className={styles.toolButtons}>
          <Tag hideBorder color={'success'} size={'small'}>
            <span>本月支出: </span>
            <span className={styles.outcome}>1000.00</span>
          </Tag>
          <Tag hideBorder color={'danger'} size={'small'}>
            <span>本月收入: </span>
            <span className={styles.income}>1000.00</span>
          </Tag>
          <Tag hideBorder color={'primary'} size={'small'}>
            <span>本月结余: </span>
            <span className={styles.balance}>1000.00</span>
          </Tag>
        </div>
      </>
    )
  }, [])
  return (
    <>
      <Head>
        <title>{i18n.formatMessage({ id: 'pages.transaction.head.title' })}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className={classNames(styles.page)}>
        <div className={styles.layerLeft}>
          <div className={styles.greet}>
            <Card title={'张静静的口袋'} subtitle={'今天是你记账的第1000天'}></Card>
          </div>
          <div className={styles.columnContainer}>
            <div className={classNames(styles.columnLeft, styles.hiddenLgAndDown)}>
              <Card title={'收支统计'} elevation={2}>
                <RecordStatistic></RecordStatistic>
              </Card>
              <Card title={'账户统计'} elevation={2}>
                <RecordStatistic></RecordStatistic>
              </Card>
            </div>
            <div className={styles.columnRight}>
              <Card
                className={styles.filterContainer}
                title={'收支明细'}
                elevation={2}
                toolClass={styles.toolBar}
                tools={tools}
                bodyClass={styles.filterSheet}
              >
                <Dropdown placeholder={'收支类型'} hideMessage></Dropdown>
                <Dropdown placeholder={'账户名称'} hideMessage></Dropdown>
                <Dropdown placeholder={'支出平台'} hideMessage></Dropdown>
                <Dropdown placeholder={'一级分类'} hideMessage></Dropdown>
                <Dropdown placeholder={'二级分类'} hideMessage></Dropdown>
                <Button>重置</Button>
              </Card>

              <Card className={styles.recordContainer} bodyClass={styles.recordSheet} elevation={2}>
                <Collapse className={styles.yearSelector}>
                  <Collapse.Panel name={'1'} header={'1111'}>
                    <div className={styles.recordYearButton}>aaaaa</div>
                    <div className={styles.recordYearButton}>aaaaa</div>
                    <div className={styles.recordYearButton}>aaaaa</div>
                    <div className={styles.recordYearButton}>aaaaa</div>
                    <div className={styles.recordYearButton}>aaaaa</div>
                    <div className={styles.recordYearButton}>aaaaa</div>
                    <div className={styles.recordYearButton}>aaaaa</div>
                    <div className={styles.recordYearButton}>aaaaa</div>
                    <div className={styles.recordYearButton}>aaaaa</div>
                    <div className={styles.recordYearButton}>aaaaa</div>
                  </Collapse.Panel>
                  <Collapse.Panel name={'2'} header={'2222'}>
                    aaa
                  </Collapse.Panel>
                  <Collapse.Panel name={'3'} header={'3333'}>
                    aaa
                  </Collapse.Panel>
                  <Collapse.Panel name={'4'} header={'4444'}>
                    aaa
                  </Collapse.Panel>
                </Collapse>
                <div className={styles.recordList}>b</div>
              </Card>
            </div>
          </div>
        </div>
        <div className={styles.layerRight}>
          <RecordForm orientation={'portrait'}></RecordForm>
        </div>
      </main>
    </>
  )
}

Transaction.useLayout = true

export default Transaction
