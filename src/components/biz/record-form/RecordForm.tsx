import classNames from 'classnames'
import { forwardRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import ExpenseForm from '@/components/biz/expense-form'
import IncomeForm from '@/components/biz/income-form'

import styles from './RecordForm.module.sass'
import { RecordFormProps } from './RecordForm.types'

const RecordForm = forwardRef<unknown, RecordFormProps>((props, ref) => {
  RecordForm.displayName = 'RecordForm'
  const [type, setType] = useState<string>('expense')
  const i18n = useIntl()
  return (
    <div className={styles.recordForm}>
      <div className={styles.recordType}>
        <div
          className={classNames(
            styles.recordTypeButton,
            styles.recordTypeButtonExpense,
            { [styles.recordTypeButtonSelected]: type === 'expense' }
          )}
          onClick={() => setType('expense')}
        >
          <span>
            <FormattedMessage
              id={'pages.record.button.expense'}
            ></FormattedMessage>
          </span>
        </div>
        <div
          className={classNames(
            styles.recordTypeButton,
            styles.recordTypeButtonIncome,
            { [styles.recordTypeButtonSelected]: type === 'income' }
          )}
          onClick={() => setType('income')}
        >
          <span>
            <FormattedMessage
              id={'pages.record.button.income'}
            ></FormattedMessage>
          </span>
        </div>
      </div>
      <div className={styles.recordContainer}>
        {type === 'expense' ? (
          <ExpenseForm locale={i18n.locale} />
        ) : (
          <IncomeForm />
        )}
      </div>
      {/*<div className={styles.recordTool}>*/}
      {/*  <div className={styles.recordToolButton}>*/}
      {/*    <span>收 入</span>*/}
      {/*  </div>*/}
      {/*  <div className={styles.recordToolButton}>*/}
      {/*    <span>支 出</span>*/}
      {/*  </div>*/}
      {/*  <div className={styles.recordToolButton}>*/}
      {/*    <span>分期付款</span>*/}
      {/*  </div>*/}
      {/*  <div className={styles.recordToolButton}>*/}
      {/*    <span>自动扣款</span>*/}
      {/*  </div>*/}
      {/*  <div className={styles.recordToolButton}>*/}
      {/*    <span>清 空</span>*/}
      {/*  </div>*/}
      {/*  <div className={styles.recordToolButton}>*/}
      {/*    <span>保 存</span>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
})

export { RecordForm }
