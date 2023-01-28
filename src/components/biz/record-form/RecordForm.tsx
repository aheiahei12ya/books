import classNames from 'classnames'
import { forwardRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import ExpenseForm from '@/components/biz/expense-form'
import expenseConfig from '@/components/biz/expense-form/config'
import IncomeForm from '@/components/biz/income-form'
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
  return (
    <div className={ styles.recordForm }>
      <div className={ styles.recordType }>
        <div
          className={ classNames(
            styles.recordTypeButton,
            styles.recordTypeButtonExpense,
            { [styles.recordTypeButtonSelected]: type === 'expense' }
          ) }
          onClick={ () => setType('expense') }
        >
          <span>
            <FormattedMessage
              id={ 'pages.record.button.expense' }
            ></FormattedMessage>
          </span>
        </div>
        <div
          className={ classNames(
            styles.recordTypeButton,
            styles.recordTypeButtonIncome,
            { [styles.recordTypeButtonSelected]: type === 'income' }
          ) }
          onClick={ () => setType('income') }
        >
          <span>
            <FormattedMessage
              id={ 'pages.record.button.income' }
            ></FormattedMessage>
          </span>
        </div>
      </div>
      <div className={ styles.recordContainer }>
        { type === 'expense' ? (
          !loading && (
            <ExpenseForm locale={ i18n.locale } defaultValue={ expense }/>
          )
        ) : (
          <IncomeForm
            value={ income }
            onChange={ setIncome }
          />
        ) }
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
