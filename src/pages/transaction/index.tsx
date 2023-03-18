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

const data = [
  {
    year: '2023年',
    items: [
      {
        id: 51,
        year: '2023',
        month: '3',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '0.00',
        total_expense: '1733.91',
        record_datetime: '2023-03-05T21:21:15.890'
      },
      {
        id: 50,
        year: '2023',
        month: '2',
        month_start_day: '1',
        month_end_day: '28',
        total_income: '26580.76',
        total_expense: '2446.10',
        record_datetime: '2023-02-05T23:12:56.194'
      },
      {
        id: 49,
        year: '2023',
        month: '1',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '51865.46',
        total_expense: '18821.95',
        record_datetime: '2023-01-15T21:31:15.595'
      }
    ]
  },
  {
    year: '2022年',
    items: [
      {
        id: 48,
        year: '2022',
        month: '12',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '25698.11',
        total_expense: '3341.49',
        record_datetime: '2022-12-04T21:30:01.637'
      },
      {
        id: 47,
        year: '2022',
        month: '11',
        month_start_day: '1',
        month_end_day: '30',
        total_income: '25698.11',
        total_expense: '5204.55',
        record_datetime: '2022-11-13T16:41:32.768'
      },
      {
        id: 46,
        year: '2022',
        month: '10',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '26520.01',
        total_expense: '18596.10',
        record_datetime: '2022-10-01T20:00:02.381'
      },
      {
        id: 45,
        year: '2022',
        month: '9',
        month_start_day: '1',
        month_end_day: '30',
        total_income: '27283.71',
        total_expense: '24092.87',
        record_datetime: '2022-09-03T16:25:15.035'
      },
      {
        id: 44,
        year: '2022',
        month: '8',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '27866.11',
        total_expense: '5418.95',
        record_datetime: '2022-08-01T20:26:20.748'
      },
      {
        id: 43,
        year: '2022',
        month: '7',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '22057.61',
        total_expense: '19535.71',
        record_datetime: '2022-07-09T11:24:52.009'
      },
      {
        id: 42,
        year: '2022',
        month: '6',
        month_start_day: '1',
        month_end_day: '30',
        total_income: '22212.50',
        total_expense: '4305.09',
        record_datetime: '2022-06-03T18:17:14.947'
      },
      {
        id: 41,
        year: '2022',
        month: '5',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '22190.00',
        total_expense: '3422.41',
        record_datetime: '2022-05-03T22:00:14.697'
      },
      {
        id: 40,
        year: '2022',
        month: '4',
        month_start_day: '1',
        month_end_day: '30',
        total_income: '22362.50',
        total_expense: '36532.22',
        record_datetime: '2022-04-10T15:45:20.905'
      },
      {
        id: 39,
        year: '2022',
        month: '3',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '22407.50',
        total_expense: '6495.19',
        record_datetime: '2022-03-05T22:00:12.694'
      },
      {
        id: 38,
        year: '2022',
        month: '2',
        month_start_day: '1',
        month_end_day: '28',
        total_income: '140918.65',
        total_expense: '15102.37',
        record_datetime: '2022-02-05T17:19:48.873'
      },
      {
        id: 37,
        year: '2022',
        month: '1',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '37047.28',
        total_expense: '18767.98',
        record_datetime: '2022-01-02T21:10:10.638'
      }
    ]
  },
  {
    year: '2021年',
    items: [
      {
        id: 36,
        year: '2021',
        month: '12',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '17757.50',
        total_expense: '3419.50',
        record_datetime: '2021-12-05T15:52:31.492'
      },
      {
        id: 35,
        year: '2021',
        month: '11',
        month_start_day: '1',
        month_end_day: '30',
        total_income: '17735.00',
        total_expense: '6965.72',
        record_datetime: '2021-11-05T22:44:46.705'
      },
      {
        id: 34,
        year: '2021',
        month: '10',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '17600.00',
        total_expense: '18466.94',
        record_datetime: '2021-10-04T21:41:51.174'
      },
      {
        id: 33,
        year: '2021',
        month: '9',
        month_start_day: '1',
        month_end_day: '30',
        total_income: '17735.00',
        total_expense: '9097.85',
        record_datetime: '2021-09-03T09:18:00.554'
      },
      {
        id: 32,
        year: '2021',
        month: '8',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '17735.00',
        total_expense: '2610.71',
        record_datetime: '2021-08-01T16:31:16.059'
      },
      {
        id: 31,
        year: '2021',
        month: '7',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '17991.03',
        total_expense: '17034.89',
        record_datetime: '2021-07-01T19:06:57.600'
      },
      {
        id: 30,
        year: '2021',
        month: '6',
        month_start_day: '1',
        month_end_day: '30',
        total_income: '18701.25',
        total_expense: '3619.68',
        record_datetime: '2021-06-06T11:35:46.444'
      },
      {
        id: 29,
        year: '2021',
        month: '5',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '26901.87',
        total_expense: '3845.19',
        record_datetime: '2021-05-01T20:02:46.853'
      },
      {
        id: 28,
        year: '2021',
        month: '4',
        month_start_day: '1',
        month_end_day: '30',
        total_income: '81094.74',
        total_expense: '93488.61',
        record_datetime: '2021-04-01T09:08:12.764'
      },
      {
        id: 27,
        year: '2021',
        month: '3',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '17384.90',
        total_expense: '3848.52',
        record_datetime: '2021-03-01T08:34:11.805'
      },
      {
        id: 26,
        year: '2021',
        month: '2',
        month_start_day: '1',
        month_end_day: '28',
        total_income: '53723.23',
        total_expense: '24688.92',
        record_datetime: '2021-02-01T08:48:18.614'
      },
      {
        id: 25,
        year: '2021',
        month: '1',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '8985.23',
        total_expense: '53521.44',
        record_datetime: '2021-01-04T11:21:37.347'
      }
    ]
  },
  {
    year: '2020年',
    items: [
      {
        id: 24,
        year: '2020',
        month: '12',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '24366.83',
        total_expense: '5241.56',
        record_datetime: '2020-12-04T14:19:37.648'
      },
      {
        id: 23,
        year: '2020',
        month: '11',
        month_start_day: '1',
        month_end_day: '30',
        total_income: '17846.36',
        total_expense: '11883.84',
        record_datetime: '2020-11-03T14:16:59.528'
      },
      {
        id: 22,
        year: '2020',
        month: '10',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '16573.27',
        total_expense: '8290.35',
        record_datetime: '2020-10-01T15:49:32.650'
      },
      {
        id: 21,
        year: '2020',
        month: '9',
        month_start_day: '1',
        month_end_day: '30',
        total_income: '7839.86',
        total_expense: '10144.19',
        record_datetime: '2020-09-03T14:30:06.351'
      },
      {
        id: 20,
        year: '2020',
        month: '8',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '8299.86',
        total_expense: '4759.30',
        record_datetime: '2020-08-02T19:19:01.490'
      },
      {
        id: 19,
        year: '2020',
        month: '7',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '8281.86',
        total_expense: '14077.94',
        record_datetime: '2020-07-06T19:46:14.962'
      },
      {
        id: 18,
        year: '2020',
        month: '6',
        month_start_day: '1',
        month_end_day: '30',
        total_income: '7748.86',
        total_expense: '6465.32',
        record_datetime: '2020-06-01T20:03:09.815'
      },
      {
        id: 17,
        year: '2020',
        month: '5',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '7548.86',
        total_expense: '12507.11',
        record_datetime: '2020-05-01T21:57:09.623'
      },
      {
        id: 16,
        year: '2020',
        month: '4',
        month_start_day: '1',
        month_end_day: '30',
        total_income: '14128.06',
        total_expense: '17791.13',
        record_datetime: '2020-04-02T15:53:45.779'
      },
      {
        id: 15,
        year: '2020',
        month: '3',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '3646.20',
        total_expense: '10178.91',
        record_datetime: '2020-03-05T15:52:40.397'
      },
      {
        id: 1,
        year: '2020',
        month: '2',
        month_start_day: '1',
        month_end_day: '29',
        total_income: '2960.00',
        total_expense: '4369.86',
        record_datetime: '2020-02-28T08:49:11.803'
      },
      {
        id: 2,
        year: '2020',
        month: '1',
        month_start_day: '1',
        month_end_day: '31',
        total_income: '13810.00',
        total_expense: '9543.02',
        record_datetime: '2020-02-28T09:26:53.461'
      }
    ]
  }
]
const columns = [
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    ellipsis: true
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    ellipsis: true
  },
  {
    title: '账户',
    dataIndex: 'account',
    key: 'account',
    ellipsis: true
  },
  {
    title: '消费方式',
    dataIndex: 'paymentType',
    key: 'paymentType',
    ellipsis: true
  },
  {
    title: '一级分类',
    dataIndex: 'category',
    key: 'category',
    ellipsis: true
  },
  {
    title: '二级分类',
    dataIndex: 'subcategory',
    key: 'subcategory',
    ellipsis: true
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
    ellipsis: true,
    width: 100
  }
]

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
  }, [currentYearMonth, lastDay])

  const [header, colgroup] = useMemo(() => {
    const header: React.ReactNode[] = []
    const colgroup: React.ReactNode[] = []
    columns.forEach((column) => {
      const style = column?.width ? { width: `${column.width}px` } : {}
      colgroup.push(<col key={column.key} style={style}></col>)
      header.push(
        <th
          key={column.key}
          className={classNames(
            {
              [styles.tableEllipsis]: column.ellipsis
            },
            styles.recordListHeader
          )}
        >
          <div className={styles.tableHeaderCell}>{column.title}</div>
        </th>
      )
    })
    return [header, colgroup]
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
            <Card title={'我的口袋'} subtitle={'今天是你记账的第1000天'}></Card>
          </div>
          <div className={styles.columnContainer}>
            <div className={classNames(styles.columnLeft, styles.hiddenLgAndDown)}>
              <Card title={'收支统计'} elevation={2} className={styles.statisticCard}>
                <RecordStatistic></RecordStatistic>
              </Card>
              <Card title={'账户统计'} elevation={2} className={styles.statisticCard}>
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
                <Collapse className={styles.yearSelector} defaultExpandName={'2023年'}>
                  {data.map((item) => (
                    <Collapse.Panel
                      key={item.year}
                      name={item.year}
                      header={item.year}
                      contentClass={styles.recordButtonPanel}
                    >
                      {item.items.map((item) => (
                        <div key={item.id} className={styles.recordButton}>
                          <div className={styles.recordButtonDate}>
                            <span className={styles.recordButtonMonth}>{item.month}</span>
                            <span className={styles.recordButtonText}>月</span>
                          </div>
                          <span className={classNames(styles.recordButtonText, styles.recordButtonTextRed)}>
                            +{item.total_income}
                          </span>
                          <span className={classNames(styles.recordButtonText, styles.recordButtonTextGreen)}>
                            -{item.total_expense}
                          </span>
                        </div>
                      ))}
                    </Collapse.Panel>
                  ))}
                </Collapse>
                <div className={styles.recordList}>
                  <table className={styles.table}>
                    <colgroup>{colgroup}</colgroup>
                    <thead className={classNames(styles.tableHeader)}>
                      <tr className={styles.tableRow}>{header}</tr>
                    </thead>
                    <tbody>
                      <tr className={styles.tableTitleRow}>
                        <td colSpan={8} className={styles.tableTitleRowDate}>
                          <span className={styles.tableTitleRowDay}>23</span>/<span>3</span>/<span>2023</span>
                        </td>
                        <td colSpan={2} className={styles.tableTitleRowExpense}>
                          <span>支出：</span>
                          <span className={styles.recordButtonTextGreen}>5.00</span>
                        </td>
                      </tr>
                      <tr>
                        <td>a</td>
                        <td>b</td>
                        <td>c</td>
                        <td>d</td>
                        <td>e</td>
                        <td>f</td>
                        <td>g</td>
                        <td>h</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
