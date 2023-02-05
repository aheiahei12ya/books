import classNames from 'classnames'
import { forwardRef, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import ExpenseForm from '@/components/biz/record-form/components/expense-form'
import { ExpenseDropdownType } from '@/components/biz/record-form/components/expense-form/ExpenseForm.types'
import IncomeForm from '@/components/biz/record-form/components/income-form'
import { IncomeDropdownType } from '@/components/biz/record-form/components/income-form/IncomeForm.types'
import { TransferForm } from '@/components/biz/record-form/components/transfer-form/TransferForm'
import useRequest from '@/hooks/useRequest'
import services from '@/services'

import styles from './RecordForm.module.sass'
import { RecordFormProps } from './RecordForm.types'

const RecordForm = forwardRef<unknown, RecordFormProps>((props, ref) => {
  RecordForm.displayName = 'RecordForm'
  const [type, setType] = useState<string>('expense')
  const [expensePreset, setExpensePreset] = useState({})
  const [incomePreset, setIncomePreset] = useState({})
  const [expenseDropdown, setExpenseDropdown] = useState<ExpenseDropdownType>({
    platformList: [],
    accountList: [],
    categoryList: [],
    subcategoryList: [],
    paymentMethodList: [],
    reimbursementStateList: [
      { name: '待报销', key: 'waiting' },
      { name: '报销中', key: 'ongoing' },
      { name: '已报销', key: 'finished' }
    ]
  })
  const [incomeDropdown, setIncomeDropdown] = useState<IncomeDropdownType>({
    accountList: [],
    categoryList: [],
    subcategoryList: []
  })
  useRequest(() => services.expense.initial({ user: 1 }), {
    onSuccess: (data) => {
      if (data.success) {
        setExpenseDropdown((value) => ({
          ...value,
          platformList: data.data.platformList,
          accountList: data.data.accountList,
          categoryList: data.data.categoryList,
          subcategoryList: data.data.subcategoryList,
          paymentMethodList: data.data.paymentMethodList
        }))
        setExpensePreset(data.data.preset)
      }
    }
  })
  const { loading: incomeLoading } = useRequest(() => services.income.initial({ user: 1 }), {
    onSuccess: (data) => {
      if (data.success) {
        setIncomeDropdown({
          accountList: data.data.accountList,
          categoryList: data.data.categoryList,
          subcategoryList: data.data.subcategoryList
        })
        setIncomePreset(data.data.preset)
      }
    }
  })
  const recordButtons = useMemo(
    () =>
      ['expense', 'income', 'transfer'].map((recordType) => (
        <div
          key={recordType}
          className={classNames(styles.recordTypeButton, {
            [styles.recordTypeButtonExpense]: recordType === 'expense',
            [styles.recordTypeButtonIncome]: recordType === 'income',
            [styles.recordTypeButtonSelected]: type === recordType
          })}
          onClick={() => setType(recordType)}
        >
          <span>
            <FormattedMessage id={`pages.record.button.${recordType}`}></FormattedMessage>
          </span>
        </div>
      )),
    [type]
  )
  return (
    <div className={styles.recordForm}>
      <div className={styles.recordType}>{recordButtons}</div>
      <div className={styles.recordContainer}>
        {type === 'expense' && (
          <ExpenseForm
            defaultValue={expensePreset}
            accountList={expenseDropdown.accountList}
            platformList={expenseDropdown.platformList}
            paymentMethodList={expenseDropdown.paymentMethodList}
            categoryList={expenseDropdown.categoryList}
            subcategoryList={expenseDropdown.subcategoryList}
            reimbursementStateList={expenseDropdown.reimbursementStateList}
          />
        )}
        {type === 'income' && (
          <IncomeForm
            defaultValue={incomePreset}
            accountList={incomeDropdown.accountList}
            categoryList={incomeDropdown.categoryList}
            subcategoryList={incomeDropdown.subcategoryList}
          />
        )}
        {type === 'transfer' && <TransferForm defaultValue={incomePreset} accountList={incomeDropdown.accountList} />}
        {/*{!loading && <IncomeForm defaultValue={expensePreset} />}*/}
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
