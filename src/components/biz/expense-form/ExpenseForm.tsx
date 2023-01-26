import classNames from 'classnames'
import dayjs from 'dayjs'
import React, { forwardRef, useCallback, useState } from 'react'

import ReceiptForm from '@/components/biz/receipt-form'
import Checkbox from '@/components/checkbox'
import DatePicker from '@/components/datePicker'
import Dropdown from '@/components/dropdown'
import Input from '@/components/input'
import TimePicker from '@/components/timePicker'
import useRequest from '@/hooks/useRequest'
import services from '@/services'

import {
  autoDebitKeys,
  expenseConfig,
  expenseFormKeys,
  expenseFormKeysAppend,
  installmentKeys,
  reimbursementKeys
} from './config'
import styles from './ExpenseForm.module.sass'
import {
  expenseConfigType,
  ExpenseFormProps,
  expenseType,
  itemType
} from './ExpenseForm.types'

const ExpenseForm = forwardRef<unknown, ExpenseFormProps>((props, ref) => {
  ExpenseForm.displayName = 'ExpenseForm'
  const current = dayjs()
  const [expense, setExpense] = useState<expenseType>({
    time: current.format('HH:mm:ss'),
    date: current.format('YYYY-MM-DD'),
    reimbursementFullAmount: false
  })

  const handleReimbursement = useCallback(
    (amount: number, coupon: number, reimbursementAmount: number) => {
      const realAmount = expense.reimbursementFullAmount
        ? 0
        : Math.max(amount - coupon - reimbursementAmount, 0)
      expense.reimbursementFullAmount &&
      setExpense((prevState) => ({
        ...prevState,
        reimbursementAmount: Number(Math.max(amount - coupon, 0).toFixed(2))
      }))
      return realAmount
    },
    [expense.reimbursementFullAmount]
  )
  const handleChange = useCallback(
    (key: string, value: string | number | undefined | boolean) => {
      switch (key) {
        case 'coupon': {
          const amount = expense.amount || 0
          const coupon = value ? (value as number) : 0
          const reimbursementAmount = expense.reimbursementAmount || 0
          const realAmount = handleReimbursement(
            amount,
            coupon,
            reimbursementAmount
          )
          setExpense((prevState) => ({
            ...prevState,
            realAmount: realAmount
          }))
          break
        }
        case 'amount': {
          const amount = value ? (value as number) : 0
          const coupon = expense.coupon || 0
          const reimbursementAmount = expense.reimbursementAmount || 0
          const realAmount = handleReimbursement(
            amount,
            coupon,
            reimbursementAmount
          )
          setExpense((prevState) => ({
            ...prevState,
            realAmount: realAmount
          }))
          break
        }
        case 'reimbursementAmount': {
          const amount = expense.amount || 0
          const coupon = expense.coupon || 0
          const reimbursementAmount = value ? (value as number) : 0
          setExpense((prevState) => ({
            ...prevState,
            realAmount: Math.max(amount - coupon - reimbursementAmount, 0)
          }))
          break
        }
        default:
          break
      }
      setExpense((prevState) => ({ ...prevState, [key]: value }))
    },
    [expense, handleReimbursement]
  )
  const makeInputUnit = (formKey: keyof expenseConfigType) => {
    switch (expenseConfig[formKey].type) {
      case 'input':
        return (
          <div key={ formKey } className={ styles.expenseFormButton }>
            <Input
              prepend={ expenseConfig[formKey].icon }
              hideMessage
              value={ expense[formKey] as string | undefined }
              placeholder={ expenseConfig[formKey].name }
              clearable
              showClearIfFill
              type={ formKey === 'note' ? 'string' : 'digit' }
              onChange={ (val) => handleChange(formKey, val) }
              onClear={ () => handleChange(formKey, '') }
            ></Input>
          </div>
        )
      case 'select':
        return (
          <div key={ formKey } className={ styles.expenseFormButton }>
            <Dropdown
              prepend={ expenseConfig[formKey].icon }
              hideMessage
              placeholder={ expenseConfig[formKey].name }
              items={ expenseConfig[formKey].items }
              itemName={ 'name' }
              returnObject
              onSelect={ (val) => handleChange(formKey, val) }
              defaultSelected={ (expense[formKey] as itemType)?.name }
              rules={ [
                {
                  required: true
                }
              ] }
            ></Dropdown>
          </div>
        )
      case 'checkbox':
        return (
          <div key={ formKey } className={ styles.expenseFormButton }>
            <Checkbox
              onChange={ handleCheck }
              checked={ expense.reimbursementFullAmount }
            >
              { expenseConfig[formKey].name }
            </Checkbox>
          </div>
        )
      case 'date-picker':
        return (
          <div key={ formKey } className={ styles.expenseFormButton }>
            <DatePicker
              hideMessage
              prepend={ expenseConfig[formKey].icon }
              placeholder={ expenseConfig[formKey].name }
              onSelect={ (year, month, date) =>
                handleChange(formKey, `${ year }-${ month }-${ date }`)
              }
              defaultSelected={ current.format('YYYY-MM-DD') }
              locale={ props.locale }
            ></DatePicker>
          </div>
        )
      case 'time-picker':
        return (
          <div key={ formKey } className={ styles.expenseFormButton }>
            <TimePicker
              hideMessage
              prepend={ expenseConfig[formKey].icon }
              placeholder={ expenseConfig[formKey].name }
              onSelect={ (hour, minute, second) =>
                handleChange(formKey, `${ hour }:${ minute }:${ second }`)
              }
              defaultValue={ current }
              locale={ props.locale }
            ></TimePicker>
          </div>
        )

      default:
        return
    }
  }
  const handleCheck = (e: boolean) => {
    if (e) {
      handleChange('reimbursementFullAmount', true)
      !!expense.realAmount &&
      handleChange('reimbursementAmount', expense.realAmount)
    } else {
      handleChange('reimbursementFullAmount', false)
    }
  }
  const makeExtraRow = () => {
    switch (expense.paymentMethod?.key) {
      case 'installment':
        return (
          <div className={ styles.expenseFormRow }>
            { installmentKeys.map((formKey) =>
              makeInputUnit(formKey as keyof expenseConfigType)
            ) }
          </div>
        )
      case 'auto-debit':
        return (
          <div className={ styles.expenseFormRow }>
            { autoDebitKeys.map((formKey) =>
              makeInputUnit(formKey as keyof expenseConfigType)
            ) }
          </div>
        )
      case 'reimbursement':
        return (
          <div className={ styles.expenseFormRow }>
            { reimbursementKeys.map((formKey) =>
              makeInputUnit(formKey as keyof expenseConfigType)
            ) }
          </div>
        )
      default:
        return
    }
  }

  const { loading } = useRequest(() => services.expense.initial({ user: 1 }), {
    onSuccess: (data) => {
      if (data.success) {
        expenseConfig.platform.items = data?.data.platformList
        expenseConfig.account.items = data?.data.accountList
        expenseConfig.category.items = data?.data.categoryList
        expenseConfig.subcategory.items = data?.data.subcategoryList
        expenseConfig.paymentMethod.items = data?.data.paymentMethodList
        Object.getOwnPropertyNames(data?.data.preset).forEach((key: string) => {
          handleChange(key, data?.data.preset[key])
        })
      }
    }
  })

  return loading ? (
    <></>
  ) : (
    <div className={ styles.expenseContainer }>
      <div className={ styles.expenseForm }>
        { expenseFormKeys.map((formRow, index) => (
          <div key={ `row-${ index }` } className={ styles.expenseFormRow }>
            { formRow.map((formKey) =>
              makeInputUnit(formKey as keyof expenseConfigType)
            ) }
          </div>
        )) }
        { makeExtraRow() }
        { expenseFormKeysAppend.map((formRow, index) => (
          <div key={ `row-${ index }` } className={ styles.expenseFormRow }>
            { formRow.map((formKey) =>
              makeInputUnit(formKey as keyof expenseConfigType)
            ) }
          </div>
        )) }
      </div>
      <div
        className={ classNames(styles.expenseReceipt, styles.hiddenSmAndDown) }
      >
        <ReceiptForm expense={ expense }></ReceiptForm>
      </div>
    </div>
  )
})

export default ExpenseForm
