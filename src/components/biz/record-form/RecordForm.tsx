import classNames from 'classnames'
import React, { forwardRef, useCallback, useMemo, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import ExpenseForm, { ExpenseDropdownType } from '@/components/biz/record-form/components/expense-form'
import IncomeForm, { IncomeDropdownType } from '@/components/biz/record-form/components/income-form'
import TransferForm from '@/components/biz/record-form/components/transfer-form'
import DivideLine from '@/components/divideLine'
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
    methodList: [],
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
          methodList: data.data.methodList
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
    (recordType) =>
      services.shortcut.list({
        type: recordType,
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

  const handleChangeType = useCallback(
    (recordType: string) => {
      if (recordType === type) return
      setShortcutList([])
      setType(recordType)
      getShortcut(recordType)
    },
    [getShortcut, type]
  )

  const recordButtons = useMemo(
    () =>
      ['expense', 'income', 'transfer', 'borrow'].map((recordType) =>
        props[`${recordType}-button` as keyof RecordFormProps] ? (
          <div key={recordType} onClick={() => handleChangeType(recordType)}>
            {props[`${recordType}-button` as keyof RecordFormProps] as React.ReactNode}
          </div>
        ) : (
          <div
            key={recordType}
            className={classNames(styles.recordTypeButton, {
              [styles.recordTypeButtonPortrait]: props.orientation === 'portrait',
              [styles.recordTypeButtonExpense]: recordType === 'expense',
              [styles.recordTypeButtonIncome]: recordType === 'income',
              [styles.recordTypeButtonBorrow]: recordType === 'borrow',
              [styles.recordTypeButtonSelected]: type === recordType
            })}
            onClick={() => handleChangeType(recordType)}
          >
            <span>
              <FormattedMessage id={`pages.record.button.${recordType}`}></FormattedMessage>
            </span>
          </div>
        )
      ),
    [handleChangeType, props, type]
  )
  return (
    <div className={classNames(styles.recordForm, { [styles.recordFormPortrait]: props.orientation === 'portrait' })}>
      <div className={classNames(styles.recordType, { [styles.recordTypePortrait]: props.orientation === 'portrait' })}>
        {recordButtons}
      </div>
      {props.orientation === 'portrait' && <DivideLine marginTop={'6px'} marginBottom={'6px'}></DivideLine>}
      <div className={styles.formSheet}>
        <div className={styles.formContainer}>
          {type === 'expense' && (
            <ExpenseForm
              orientation={props.orientation}
              defaultValue={expensePreset}
              accountList={expenseDropdown.accountList}
              platformList={expenseDropdown.platformList}
              methodList={expenseDropdown.methodList}
              categoryList={expenseDropdown.categoryList}
              subcategoryList={expenseDropdown.subcategoryList}
              reimbursementStateList={expenseDropdown.reimbursementStateList}
              shortcutList={shortcutList}
            />
          )}
          {type === 'income' && (
            <IncomeForm
              orientation={props.orientation}
              defaultValue={incomePreset}
              accountList={incomeDropdown.accountList}
              categoryList={incomeDropdown.categoryList}
              subcategoryList={incomeDropdown.subcategoryList}
              shortcutList={shortcutList}
            />
          )}
          {type === 'transfer' && (
            <TransferForm
              orientation={props.orientation}
              defaultValue={incomePreset}
              accountList={incomeDropdown.accountList}
              shortcutList={shortcutList}
            />
          )}
        </div>
      </div>
    </div>
  )
})

export { RecordForm }
