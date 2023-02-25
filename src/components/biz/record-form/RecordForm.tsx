import classNames from 'classnames'
import { forwardRef, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import ExpenseForm, { ExpenseDropdownType } from '@/components/biz/record-form/components/expense-form'
import IncomeForm, { IncomeDropdownType } from '@/components/biz/record-form/components/income-form'
import TransferForm from '@/components/biz/record-form/components/transfer-form'
import useRequest from '@/hooks/useRequest'
import { useAuth } from '@/lib/auth'
import services from '@/services'

import styles from './RecordForm.module.scss'
import { RecordFormProps } from './RecordForm.types'

const RecordForm = forwardRef<unknown, RecordFormProps>((props, ref) => {
  RecordForm.displayName = 'RecordForm'
  const auth = useAuth()
  const [type, setType] = useState<string>('expense')
  const [expensePreset, setExpensePreset] = useState({})
  const [incomePreset, setIncomePreset] = useState({})
  const [shortcutList, setShortcutList] = useState([])
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
  useRequest(() => services.income.initial({ user: 1 }), {
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
  const { run: getShortcut } = useRequest(
    () =>
      services.shortcut.list({
        type: type,
        user: auth?.userInfo?.userInfo?.id
      }),
    {
      once: true,
      manual: true,
      onSuccess: (data) => {
        if (data.success) {
          setShortcutList(data.data.shortcutList)
        }
      }
    }
  )
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
          onClick={() => (recordType: string) => {
            setShortcutList([])
            setType(recordType)
            getShortcut()
          }}
        >
          <span>
            <FormattedMessage id={`pages.record.button.${recordType}`}></FormattedMessage>
          </span>
        </div>
      )),
    [getShortcut, type]
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
            shortcutList={shortcutList}
          />
        )}
        {type === 'income' && (
          <IncomeForm
            defaultValue={incomePreset}
            accountList={incomeDropdown.accountList}
            categoryList={incomeDropdown.categoryList}
            subcategoryList={incomeDropdown.subcategoryList}
            shortcutList={shortcutList}
          />
        )}
        {type === 'transfer' && (
          <TransferForm
            defaultValue={incomePreset}
            accountList={incomeDropdown.accountList}
            shortcutList={shortcutList}
          />
        )}
      </div>
    </div>
  )
})

export { RecordForm }
