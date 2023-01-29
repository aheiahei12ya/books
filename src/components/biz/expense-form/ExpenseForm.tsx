import classNames from 'classnames'
import dayjs from 'dayjs'
import React, { forwardRef, useCallback, useState } from 'react'

import ReceiptForm from '@/components/biz/receipt-form'
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
  const form = useForm()
  const [expense, setExpense] = useState<expenseType>({
    ...props.defaultValue,
    time: current.format('HH:mm:ss'),
    date: current.format('YYYY-MM-DD'),
    reimbursementFullAmount: false
  })
  const rules = {
    amount: [{ required: true, message: '请输入订单金额' }],
    paymentMethod: [{ required: true, message: '请选择付款方式' }],
    platform: [{ required: true, message: '请选择消费平台' }],
    category: [{ required: true, message: '请选择一级分类' }],
    subcategory: [{ required: true, message: '请选择二级分类' }],
    date: [{ required: true, message: '请选择消费日期' }],
    time: [{ required: true, message: '请选择消费时间' }],
    account: [{ required: true, message: '请选择支出账户' }],
    note: [{ required: true, message: '请输入备注' }],
    installmentDate: [{ required: true, message: '请选择扣款日期' }],
    installmentNumber: [{ required: true, message: '请输入分期期数' }],
    autoDebitDate: [{ required: true, message: '请选择扣款日期' }],
    autoDebitNumber: [{ required: true, message: '请输入扣款次数' }],
    // reimbursementAmount: [{ required: true, message: '请输入报销金额' }],
    reimbursementState: [{ required: true, message: '请选择报销状态' }]
  }
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
  const makeInputUnit = (formKey: keyof expenseConfigType) => {
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
              value={ (form.get(formKey) as itemType)?.name }
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
  return (
    <div className={ styles.expenseContainer }>
      <Form
        form={ form }
        initialValue={ expense }
        rules={ rules }
        className={ styles.expenseForm }
        onSubmit={ () => {
          console.log(expense)
        } }
      >
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
        <Button type={ 'submit' }>Submit</Button>
      </Form>

      <div
        className={ classNames(styles.expenseReceipt, styles.hiddenSmAndDown) }
      >
        <ReceiptForm expense={ expense } itemName={ 'name' }></ReceiptForm>
      </div>
    </div>
  )
})

export { ExpenseForm }
