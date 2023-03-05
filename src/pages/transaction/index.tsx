import classNames from 'classnames'
import Head from 'next/head'
import React from 'react'
import { useIntl } from 'react-intl'

import RecordStatistic from '@/components/biz/record-statistic'
import Card from '@/components/card'
import { range } from '@/lib/pythonic'
import styles from '@/pages/transaction/index.module.scss'

const Transaction = () => {
  const i18n = useIntl()
  return (
    <>
      <Head>
        <title>{i18n.formatMessage({ id: 'pages.transaction.head.title' })}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main className={classNames(styles.page)}>
        <Card title={'张静静的口袋'} subtitle={'今天是你记账的第1000天'}></Card>
        <div className={styles.pageContainer}>
          <div className={styles.columnLeft}>
            <Card elevation={2} fill></Card>
          </div>
          <div className={styles.columnMiddle}>
            {/*<Card elevation={ 2 } fill>*/}
            <Card bodyClass={styles.middleCard} elevation={2}>
              {range(100).map((i) => (
                <div key={i}>
                  <p>{i}</p>
                </div>
              ))}
            </Card>
            {/*</Card>*/}
          </div>
          <div className={styles.columnRight}>
            <Card title={'收支统计'} elevation={1}>
              <RecordStatistic></RecordStatistic>
            </Card>
            <Card title={'账户统计'} elevation={1}>
              <RecordStatistic></RecordStatistic>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}

Transaction.useLayout = true

export default Transaction
