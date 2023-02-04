import classNames from 'classnames'
import { forwardRef, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import ExpenseForm from '@/components/biz/record-form/components/expense-form'
import { expenseConfig } from '@/components/biz/record-form/components/expense-form/config'
import IncomeForm from '@/components/biz/record-form/components/income-form'
import useRequest from '@/hooks/useRequest'
import services from '@/services'

import styles from './RecordForm.module.sass'
import { RecordFormProps } from './RecordForm.types'

const RecordForm = forwardRef<unknown, RecordFormProps>((props, ref) => {
  RecordForm.displayName = 'RecordForm'
  const [type, setType] = useState<string>('expense')
  const [expense, setExpense] = useState<any>({})
  const [income, setIncome] = useState({})
  const i18n = useIntl()
  const { loading } = useRequest(() => services.expense.initial({ user: 1 }), {
    onSuccess: (data) => {
      if (data.success) {
        expenseConfig.platform.items = data.data.platformList
        expenseConfig.account.items = data.data.accountList
        expenseConfig.category.items = data.data.categoryList
        expenseConfig.subcategory.items = data.data.subcategoryList
        expenseConfig.paymentMethod.items = data.data.paymentMethodList
        setExpense(data.data.preset)
        setIncome(data.data.preset)
      }
    }
  })
  const recordButtons = useMemo(
    () =>
      ['expense', 'income', 'transfer'].map((recordType) => (
        <div
          key={ recordType }
          className={ classNames(styles.recordTypeButton, {
            [styles.recordTypeButtonExpense]: recordType === 'expense',
            [styles.recordTypeButtonIncome]: recordType === 'income',
            [styles.recordTypeButtonSelected]: type === recordType
          }) }
          onClick={ () => setType(recordType) }
        >
          <span>
            <FormattedMessage
              id={ `pages.record.button.${ recordType }` }
            ></FormattedMessage>
          </span>
        </div>
      )),
    [type]
  )
  return (
    <div className={ styles.recordForm }>
      <div className={ styles.recordType }>{ recordButtons }</div>
      <div className={ styles.recordContainer }>
        { type === 'expense' && !loading && (
          <ExpenseForm locale={ i18n.locale } defaultValue={ expense }/>
        ) }
        { type === 'income' && <IncomeForm value={ income }/> }
        {/*{!loading && <IncomeForm defaultValue={expensePreset} />}*/ }
      </div>

      {/*<div className={styles.recordTool}>*/ }
      {/*  <div className={styles.recordToolButton}>*/ }
      {/*    <span>收 入</span>*/ }
      {/*  </div>*/ }
      {/*  <div className={styles.recordToolButton}>*/ }
      {/*    <span>支 出</span>*/ }
      {/*  </div>*/ }
      {/*  <div className={styles.recordToolButton}>*/ }
      {/*    <span>分期付款</span>*/ }
      {/*  </div>*/ }
      {/*  <div className={styles.recordToolButton}>*/ }
      {/*    <span>自动扣款</span>*/ }
      {/*  </div>*/ }
      {/*  <div className={styles.recordToolButton}>*/ }
      {/*    <span>清 空</span>*/ }
      {/*  </div>*/ }
      {/*  <div className={styles.recordToolButton}>*/ }
      {/*    <span>保 存</span>*/ }
      {/*  </div>*/ }
      {/*</div>*/ }
    </div>
  )
})

export { RecordForm }
