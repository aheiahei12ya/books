import classNames from 'classnames'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import Card from '@/components/card'
import { Curve } from '@/components/chart'
import useRequest from '@/hooks/useRequest'
import services from '@/services'

import styles from './index.module.sass'

Home.useLayout = true

function Home() {
  const currentDate = dayjs().format('YYYY/MM')
  const lastYear = dayjs().subtract(1, 'year').format('YYYY/MM')

  const [outcomeTrend, setOutcomeTrend] = useState<number[]>([])
  const [balanceTrend, setBalanceTrend] = useState<number[]>([])
  useRequest(
    () =>
      services.statistic.outcomeTrend({
        year: dayjs().year(),
        month: dayjs().month()
      }),
    {
      onSuccess: (res) => {
        setOutcomeTrend(res.data.trend)
      }
    }
  )
  useRequest(
    () =>
      services.statistic.balanceTrend({
        year: dayjs().year(),
        month: dayjs().month()
      }),
    {
      onSuccess: (res) => {
        setBalanceTrend(res.data.trend)
      }
    }
  )
  return (
    <div className={styles.main}>
      <div className={styles.mainContent}>
        <div className={styles.title}>
          <Card title={'Good Afternoon'} subtitle={'Welcome Back'} />
        </div>
        <div className={styles.trend}>
          <Card
            subtitle={'支出趋势'}
            className={styles.trendOutcome}
            elevation={1}
          >
            <Curve
              xs={outcomeTrend}
              ys={outcomeTrend}
              hideAxes
              accentLast
            ></Curve>
          </Card>
          <Card
            subtitle={'余额趋势'}
            className={styles.trendBalance}
            elevation={1}
          >
            <Curve
              xs={balanceTrend}
              ys={balanceTrend}
              hideAxes
              accentLast
            ></Curve>
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
          className={classNames(styles.booking2, styles.hiddenXs)}
          elevation={1}
          fill
        ></Card>
      </div>
      <div className={classNames(styles.viceContent, styles.hiddenSmAndDown)}>
        <Card
          title={'本月消费笔数'}
          className={styles.currentCount}
          elevation={1}
        >
          {/*本月消费笔数*/}
        </Card>
        <Card className={styles.spendDiff} elevation={1}>
          {/*{currentDate}消费 <br />*/}
          {/*{lastYear}*/}
        </Card>
      </div>
    </div>
  )
}

export default Home
