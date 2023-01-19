import classNames from 'classnames'
import dayjs from 'dayjs'
import Head from 'next/head'
import React from 'react'
import { useIntl } from 'react-intl'

import Card from '@/components/card'
import { Curve } from '@/components/chart'
import Bar from '@/components/chart/bar'
import useRequest from '@/hooks/useRequest'
import { range } from '@/lib/pythonic'
import services from '@/services'

import styles from './index.module.sass'

Home.useLayout = true

function Home() {
  const currentYearMonth = dayjs().format('YYYY-MM')
  const lastYearMonth = dayjs().subtract(1, 'year').format('YYYY-MM')
  const i18n = useIntl()
  let greet
  switch (Math.floor(dayjs().hour() / 6)) {
    case 1:
      greet = 'pages.home.greet.morning'
      break
    case 2:
      greet = 'pages.home.greet.afternoon'
      break
    default:
      greet = 'pages.home.greet.evening'
      break
  }

  const { data: expenditureTrendData } = useRequest(() =>
    services.statistic.expenditureTrend({
      year: dayjs().year(),
      month: dayjs().month()
    })
  )
  const { data: balanceTrendData } = useRequest(() =>
    services.statistic.balanceTrend({
      year: dayjs().year(),
      month: dayjs().month()
    })
  )
  const { data: lastYearExpenditureData } = useRequest(() =>
    services.statistic.expenditure({
      year: dayjs().year(),
      month: dayjs().month()
    })
  )
  const { data: expenditureData } = useRequest(() =>
    services.statistic.expenditure({
      year: dayjs().year(),
      month: dayjs().month()
    })
  )
  return (
    <>
      <Head>
        <title>{i18n.formatMessage({ id: 'pages.home.head.title' })}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/*<link rel="icon" href="/public/favicon.ico" />*/}
      </Head>
      <main className={classNames(styles.main)}>
        <div className={styles.mainContent}>
          <div className={styles.title}>
            <Card
              title={i18n.formatMessage({ id: greet })}
              subtitle={i18n.formatMessage({ id: 'pages.home.greet.subtitle' })}
            />
          </div>
          <div className={styles.trend}>
            <Card
              subtitle={i18n.formatMessage({
                id: 'pages.home.trend.expenditure'
              })}
              className={styles.trendInner}
              elevation={1}
            >
              {expenditureTrendData?.success && (
                <Curve
                  xs={expenditureTrendData.data.month}
                  ys={expenditureTrendData.data.trend}
                  accentLast
                  showXTicks
                  showYTicks
                  showYAxes
                  showXAxes
                ></Curve>
              )}
            </Card>
            <Card
              subtitle={i18n.formatMessage({ id: 'pages.home.trend.balance' })}
              className={styles.trendInner}
              elevation={1}
            >
              {balanceTrendData?.success && (
                <Curve
                  xs={balanceTrendData.data.month}
                  ys={balanceTrendData.data.trend}
                  accentLast
                  showXTicks
                  showYTicks
                  showYAxes
                  showXAxes
                ></Curve>
              )}
            </Card>
          </div>
          <Card
            title={'记一笔'}
            subtitle={'1111'}
            className={classNames(styles.booking)}
            elevation={1}
            fill
          ></Card>
          <Card
            title={'xx'}
            className={classNames(styles.booking, styles.hiddenXs)}
            elevation={1}
            fill
          ></Card>
        </div>
        <div className={classNames(styles.viceContent, styles.hiddenSmAndDown)}>
          <div className={styles.spendCompare}>
            <Card
              subtitle={lastYearMonth}
              className={styles.spendCompareInner}
              elevation={1}
            >
              {lastYearExpenditureData?.success && (
                <Bar
                  xs={range(
                    1,
                    lastYearExpenditureData.data.expenditure.length + 1
                  )}
                  ys={lastYearExpenditureData.data.expenditure}
                  gap={2.5}
                  showXTicks
                  showYTicks
                  showYAxes
                  showXAxes
                ></Bar>
              )}
            </Card>
            <Card
              subtitle={currentYearMonth}
              className={styles.spendCompareInner}
              elevation={1}
            >
              {expenditureData?.success && (
                <Bar
                  xs={range(1, expenditureData.data.expenditure.length + 1)}
                  ys={expenditureData.data.expenditure}
                  gap={2.5}
                  showXTicks
                  showYTicks
                  showYAxes
                  showXAxes
                ></Bar>
              )}
            </Card>
          </div>

          <Card title={'消费日历'} className={styles.spendDiff} elevation={1}>
            {/*{currentDate}消费 <br />*/}
            {/*{lastYear}*/}
          </Card>
          <Card title={'收支统计'} className={styles.spendDiff} elevation={1}>
            {/*{currentDate}消费 <br />*/}
            {/*{lastYear}*/}
          </Card>
        </div>
      </main>
    </>
  )
}

export default Home
