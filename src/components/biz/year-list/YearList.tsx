import classNames from 'classnames'
import React from 'react'
import { useIntl } from 'react-intl'

import Collapse from '@/components/collapse'

import styles from './YearList.module.scss'
import { YearListProps } from './YearList.types'

const YearList = (props: YearListProps) => {
  const i18n = useIntl()

  return (
    <Collapse className={props.className} defaultExpandName={props.defaultExpandName}>
      {props.yearList.map((yearDetail) => (
        <Collapse.Panel
          key={yearDetail.year}
          name={yearDetail.year}
          header={yearDetail.year + i18n.formatMessage({ id: 'pages.transaction.list.year' })}
          contentClass={styles.yearListButtonPanel}
        >
          {yearDetail.items.map((monthDetail) => (
            <div key={`${yearDetail.year}-${monthDetail.month}`} className={styles.yearListButton}>
              <div className={styles.yearListButtonDate}>
                <span className={styles.yearListButtonMonth}>{monthDetail.month}</span>
                <span className={styles.yearListButtonText}>
                  {i18n.formatMessage({ id: 'pages.transaction.list.month' })}
                </span>
              </div>
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
  )
}

YearList.displayName = 'YearList'
export { YearList }
