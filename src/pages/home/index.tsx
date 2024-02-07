import classNames from 'classnames'
import dayjs from 'dayjs'
import { useIntl } from 'react-intl'

import HistoryToday from '@/components/biz/history-today'
import RecordForm from '@/components/biz/record-form'
import RecordStatistic from '@/components/biz/record-statistic'
import RecordTips from '@/components/biz/record-tips'
import Calendar from '@/components/calendar'
import Card from '@/components/card'
import { Curve } from '@/components/chart'
import Bar from '@/components/chart/bar'
import useRequest from '@/hooks/useRequest'
import { range } from '@/lib/pythonic'
import services from '@/services'

import styles from './index.module.scss'

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
  const thisYear = dayjs().year()
  const thisMonth = dayjs().month()
  const { data: expenseTrendData } = useRequest(() =>
    services.statistic.expenseTrend({
      year: thisYear,
      month: thisMonth
    })
  )
  const { data: balanceTrendData } = useRequest(() =>
    services.statistic.balanceTrend({
      year: thisYear,
      month: thisMonth
    })
  )
  const { data: lastYearExpenseData } = useRequest(() =>
    services.statistic.expense({
      year: thisYear,
      month: thisMonth
    })
  )
  const { data: expenseData } = useRequest(() =>
    services.statistic.expense({
      year: thisYear,
      month: thisMonth
    })
  )
  const { data: expenseTimes } = useRequest(() =>
    services.statistic.expenseTimes({
      year: thisYear,
      month: thisMonth
    })
  )
  return (
    <>
      <main className={classNames(styles.page)}>
        <div className={styles.columnLeft}>
          <div className={styles.title}>
            <Card
              title={i18n.formatMessage({ id: greet })}
              subtitle={i18n.formatMessage({ id: 'pages.home.greet.subtitle' })}
            />
          </div>
          <div className={styles.trend}>
            <Card
              subtitle={i18n.formatMessage({
                id: 'pages.home.trend.expense'
              })}
              className={styles.trendInner}
              elevation={1}
            >
              {expenseTrendData?.success && (
                <Curve
                  xs={expenseTrendData.data.month}
                  ys={expenseTrendData.data.trend}
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
          <Card className={classNames(styles.booking)} elevation={1} fill>
            <RecordForm></RecordForm>
          </Card>
          <Card
            title={i18n.formatMessage({ id: 'pages.record.statistic.history' })}
            className={classNames(styles.history, styles.hiddenXs)}
            elevation={1}
            fill
          >
            <HistoryToday></HistoryToday>
          </Card>
        </div>
        <div className={classNames(styles.columnRight, styles.hiddenSmAndDown, styles.hiddenOnPortrait)}>
          <div className={styles.spendCompare}>
            <Card subtitle={currentYearMonth} className={styles.spendCompareInner} elevation={1}>
              {expenseData?.success && (
                <Bar
                  xs={range(1, expenseData.data.expense.length + 1)}
                  ys={expenseData.data.expense}
                  gap={2.5}
                  showXTicks
                  showYTicks
                  showYAxes
                  showXAxes
                ></Bar>
              )}
            </Card>
            <Card subtitle={lastYearMonth} className={styles.spendCompareInner} elevation={1}>
              {lastYearExpenseData?.success && (
                <Bar
                  xs={range(1, lastYearExpenseData.data.expense.length + 1)}
                  ys={lastYearExpenseData.data.expense}
                  gap={2.5}
                  showXTicks
                  showYTicks
                  showYAxes
                  showXAxes
                ></Bar>
              )}
            </Card>
          </div>

          <Card className={styles.spendCalendar} elevation={1}>
            {expenseTimes?.success && (
              <Calendar
                locale={i18n.locale}
                showToolbar
                hideToolButton
                expense={expenseTimes.data.expenseTimes}
              ></Calendar>
            )}
          </Card>
          <Card className={styles.infoForm} elevation={1}>
            <div className={styles.infoFormContainer}>
              <Card
                className={styles.infoFormExpense}
                title={i18n.formatMessage({ id: 'pages.record.statistic.payment' })}
              >
                <div className={styles.infoFormContent}>
                  <RecordStatistic></RecordStatistic>
                </div>
              </Card>
              <Card
                title={i18n.formatMessage({ id: 'pages.record.statistic.account' })}
                className={styles.infoFormAccount}
              >
                <div className={styles.infoFormContent}>
                  <RecordStatistic></RecordStatistic>
                </div>
              </Card>
              <Card className={styles.infoFormReminder}>
                <RecordTips></RecordTips>
              </Card>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}

export default Home
