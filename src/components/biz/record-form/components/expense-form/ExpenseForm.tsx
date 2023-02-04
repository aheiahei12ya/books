import classNames from 'classnames'
import dayjs from 'dayjs'
import React, { forwardRef, useCallback, useId, useState } from 'react'

import ReceiptForm from '@/components/biz/record-form/components/receipt-form'
import Button from '@/components/button'
import Checkbox from '@/components/checkbox'
import DatePicker from '@/components/datePicker'
import Dropdown from '@/components/dropdown'
import Form from '@/components/form'
import Input from '@/components/input'
import TimePicker from '@/components/timePicker'
import useForm from '@/hooks/useForm'

import {
  autoDebitKeys,
  expenseConfig,
  expenseFormKeys,
  expenseFormKeysAppend,
  installmentKeys,
  reimbursementKeys,
  rules
} from './config'
import styles from './ExpenseForm.module.sass'
import {
  ExpenseConfigType,
  ExpenseFormProps,
  ExpenseType,
  ItemType
} from './ExpenseForm.types'

const ExpenseForm = forwardRef<unknown, ExpenseFormProps>((props, ref) => {
  ExpenseForm.displayName = 'ExpenseForm'
  const formId = useId()
  const current = dayjs()
  const form = useForm()
  const [expense, setExpense] = useState<ExpenseType>({
    ...props.defaultValue,
    time: current.format('HH:mm:ss'),
    date: current.format('YYYY-MM-DD'),
    reimbursementFullAmount: false
  })

  const handleReimbursement = useCallback(
    (amount: number, coupon: number, reimbursementAmount: number) => {
      const realAmount = form.get('reimbursementFullAmount')
        ? 0
        : Math.max(amount - coupon - reimbursementAmount, 0)
      form.get('reimbursementFullAmount') &&
      form.set(
        'reimbursementAmount',
        Number(Math.max(amount - coupon, 0).toFixed(2))
      )
      return realAmount
    },
    [form]
  )
  const handleChange = useCallback(
    (key: string, value: string | number | undefined | boolean) => {
      switch (key) {
        case 'coupon': {
          const amount = form.get('amount', 0)
          const coupon = value ? (value as number) : 0
          const reimbursementAmount = form.get('reimbursementAmount', 0)
          const realAmount = handleReimbursement(
            amount,
            coupon,
            reimbursementAmount
          )
          form.set('realAmount', realAmount)
          break
        }
        case 'amount': {
          const amount = value ? (value as number) : 0
          const coupon = form.get('coupon', 0)
          const reimbursementAmount = form.get('reimbursementAmount', 0)
          const realAmount = handleReimbursement(
            amount,
            coupon,
            reimbursementAmount
          )
          form.set('realAmount', realAmount)
          break
        }
        case 'reimbursementAmount': {
          const amount = form.get('amount', 0)
          const coupon = form.get('coupon', 0)
          const reimbursementAmount = value ? (value as number) : 0
          form.set(
            'realAmount',
            Math.max(amount - coupon - reimbursementAmount, 0)
          )
          form.set(key, reimbursementAmount)
          break
        }
        default:
          break
      }
      setExpense(form.values())
    },
    [form, handleReimbursement]
  )
  const makeInputUnit = (formKey: keyof ExpenseConfigType) => {
    switch (expenseConfig[formKey].type) {
      case 'input':
        return (
          <Form.Item
            name={ formKey }
            key={ formKey }
            className={ styles.expenseFormButton }
          >
            <Input
              prepend={ expenseConfig[formKey].icon }
              hideMessage
              value={ form.get(formKey, undefined) }
              placeholder={ expenseConfig[formKey].name }
              clearable
              showClearIfFill
              type={ formKey === 'note' ? 'string' : 'digit' }
              onChange={ (val) => handleChange(formKey, val) }
              onClear={ () => handleChange(formKey, '') }
            ></Input>
          </Form.Item>
        )
      case 'select':
        return (
          <Form.Item
            name={ formKey }
            key={ formKey }
            className={ styles.expenseFormButton }
          >
            <Dropdown
              prepend={ expenseConfig[formKey].icon }
              hideMessage
              placeholder={ expenseConfig[formKey].name }
              items={ expenseConfig[formKey].items }
              itemName={ 'name' }
              returnObject
              onChange={ (val) => handleChange(formKey, val) }
              value={ (form.get(formKey) as ItemType)?.name }
            ></Dropdown>
          </Form.Item>
        )
      case 'checkbox':
        return (
          <Form.Item
            name={ formKey }
            key={ formKey }
            className={ styles.expenseFormButton }
          >
            <Checkbox
              onChange={ handleCheck }
              checked={ form.get('reimbursementFullAmount') }
            >
              { expenseConfig[formKey].name }
            </Checkbox>
          </Form.Item>
        )
      case 'date-picker':
        return (
          <Form.Item name={ formKey } key={ formKey }>
            <DatePicker
              hideMessage
              prepend={ expenseConfig[formKey].icon }
              placeholder={ expenseConfig[formKey].name }
              onChange={ (date) => handleChange(formKey, date) }
              value={ form.get(formKey) }
              locale={ props.locale }
            ></DatePicker>
          </Form.Item>
        )
      case 'time-picker':
        return (
          <Form.Item
            name={ formKey }
            key={ formKey }
            className={ styles.expenseFormButton }
          >
            <TimePicker
              hideMessage
              prepend={ expenseConfig[formKey].icon }
              placeholder={ expenseConfig[formKey].name }
              onChange={ (time) => handleChange(formKey, time) }
              value={ form.get(formKey) }
              locale={ props.locale }
            ></TimePicker>
          </Form.Item>
        )
      default:
        return
    }
  }
  const handleCheck = (checked: boolean) => {
    if (checked) {
      const realAmount = form.get('realAmount')
      handleChange('reimbursementFullAmount', true)
      realAmount && handleChange('reimbursementAmount', realAmount)
    } else {
      handleChange('reimbursementFullAmount', false)
      handleChange('reimbursementAmount', 0)
    }
  }
  const makeExtraRow = () => {
    switch (expense.paymentMethod?.key) {
      case 'installment':
        return (
          <div className={ styles.expenseFormRow }>
            { installmentKeys.map((formKey) =>
              makeInputUnit(formKey as keyof ExpenseConfigType)
            ) }
          </div>
        )
      case 'auto-debit':
        return (
          <div className={ styles.expenseFormRow }>
            { autoDebitKeys.map((formKey) =>
              makeInputUnit(formKey as keyof ExpenseConfigType)
            ) }
          </div>
        )
      case 'reimbursement':
        return (
          <div className={ styles.expenseFormRow }>
            { reimbursementKeys.map((formKey) =>
              makeInputUnit(formKey as keyof ExpenseConfigType)
            ) }
          </div>
        )
      default:
        return
    }
  }
  const handleSubmit = () => {
    console.log(expense)
  }
  return (
    <div className={ styles.expenseContainer }>
      <div className={ styles.expenseForm }>
        <Form
          id={ formId }
          form={ form }
          initialValue={ expense }
          rules={ rules }
          onSubmit={ handleSubmit }
        >
          { expenseFormKeys.map((formRow, index) => (
            <div key={ `row-${ index }` } className={ styles.expenseFormRow }>
              { formRow.map((formKey) =>
                makeInputUnit(formKey as keyof ExpenseConfigType)
              ) }
            </div>
          )) }
          { makeExtraRow() }
          { expenseFormKeysAppend.map((formRow, index) => (
            <div key={ `row-${ index }` } className={ styles.expenseFormRow }>
              { formRow.map((formKey) =>
                makeInputUnit(formKey as keyof ExpenseConfigType)
              ) }
              <Button
                form={ formId }
                htmlType={ 'submit' }
                className={ classNames(
                  styles.expenseSubmitButton,
                  styles.hiddenMdAndUp
                ) }
              >
                完成
              </Button>
            </div>
          )) }
        </Form>
        <div>快捷方式</div>
      </div>

      <div
        className={ classNames(styles.expenseReceipt, styles.hiddenSmAndDown) }
      >
        <ReceiptForm
          type={ 'expense' }
          item={ expense }
          itemName={ 'name' }
        ></ReceiptForm>
        <div className={ styles.expenseFormRow }>
          <Button block form={ formId } htmlType={ 'submit' }>
            完成
          </Button>
        </div>
      </div>
    </div>
  )
})

export { ExpenseForm }
