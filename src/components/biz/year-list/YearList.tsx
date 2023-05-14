import classNames from 'classnames'
import React, { useCallback, useMemo } from 'react'
import { useIntl } from 'react-intl'

import Collapse from '@/components/collapse'

import styles from './YearList.module.scss'
import { YearListProps } from './YearList.types'

const YearList = (props: YearListProps) => {
  const i18n = useIntl()
  const makeMonth = useCallback(
    (month: string | number) => {
      const monthList = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
      return i18n.locale === 'en-US' ? (
        <span className={styles.yearListButtonMonthEn}>{monthList[Number(month) - 1]}</span>
      ) : (
        <>
          <span className={styles.yearListButtonMonth}>{month}</span>
          <span className={styles.yearListButtonText}>
            {i18n.formatMessage({ id: 'pages.transaction.list.month' })}
          </span>
        </>
      )
    },
    [i18n]
  )

  const makeYear = useCallback(
    (year: string) => {
      return i18n.locale === 'en-US'
        ? i18n.formatMessage({ id: 'pages.transaction.list.year' }) + ' ' + year
        : year + i18n.formatMessage({ id: 'pages.transaction.list.year' })
    },
    [i18n]
  )

  return useMemo(
    () => (
      <Collapse className={props.className} defaultExpandName={props.defaultExpandName}>
        {props.yearList.map((yearDetail) => (
          <Collapse.Panel
            key={yearDetail.year}
            name={yearDetail.year}
            header={makeYear(yearDetail.year)}
            contentClass={styles.yearListButtonPanel}
          >
            {yearDetail.items.map((monthDetail) => (
              <div key={`${yearDetail.year}-${monthDetail.month}`} className={styles.yearListButton}>
                <div className={styles.yearListButtonDate}>{makeMonth(monthDetail.month)}</div>
                <span className={classNames(styles.yearListButtonText, styles.yearListButtonTextRed)}>
                  +{monthDetail.income}
                </span>
                <span className={classNames(styles.yearListButtonText, styles.yearListButtonTextGreen)}>
                  -{monthDetail.expense}
                </span>
              </div>
            ))}
          </Collapse.Panel>
        ))}
      </Collapse>
    ),
    [makeMonth, makeYear, props.className, props.defaultExpandName, props.yearList]
  )
}

YearList.displayName = 'YearList'
export { YearList }
