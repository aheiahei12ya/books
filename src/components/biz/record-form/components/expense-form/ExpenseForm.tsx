import classNames from 'classnames'
import dayjs from 'dayjs'
import React, { forwardRef, useCallback, useEffect, useId, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import ReceiptForm from '@/components/biz/record-form/components/receipt-form'
import { ItemType, ReceiptType } from '@/components/biz/record-form/components/types'
import Button from '@/components/button'
import Checkbox from '@/components/checkbox'
import DatePicker from '@/components/datePicker'
import Dropdown from '@/components/dropdown'
import Form from '@/components/form'
import Input from '@/components/input'
import TimePicker from '@/components/timePicker'
import useForm from '@/hooks/useForm'

import { autoDebitKeys, expenseFormKeys, expenseFormKeysAppend, installmentKeys, reimbursementKeys } from './config'
import styles from './ExpenseForm.module.sass'
import { ExpenseConfigType, ExpenseFormProps, ExpenseType } from './ExpenseForm.types'

const ExpenseForm = forwardRef<unknown, ExpenseFormProps>((props, ref) => {
  ExpenseForm.displayName = 'ExpenseForm'
  const i18n = useIntl()
  const form = useForm()
  const formId = useId()
  const [expense, setExpense] = useState<ExpenseType>({
    ...props.defaultValue,
    time: dayjs().format('HH:mm:ss'),
    date: dayjs().format('YYYY-MM-DD')
  })

  useEffect(() => {
    setExpense({
      ...props.defaultValue,
      time: dayjs().format('HH:mm:ss'),
      date: dayjs().format('YYYY-MM-DD'),
      reimbursementFullAmount: false
    })
  }, [props.defaultValue])

  const rules = useMemo(() => {
    const calculatorRule = {
      rule: /^\d+( *[+=*/-] *\d+)*$/,
      message: i18n.formatMessage({ id: 'pages.record.error.calculator' })
    }
    const requiredRule = (i18nKey: string) => ({
      required: true,
      message: i18n.formatMessage({ id: i18nKey })
    })
    return {
      amount: [requiredRule('pages.record.error.amount'), calculatorRule],
      coupon: [calculatorRule],
      platform: [requiredRule('pages.record.error.platform')],
      category: [requiredRule('pages.record.error.category')],
      subcategory: [requiredRule('pages.record.error.subcategory')],
      date: [requiredRule('pages.record.error.date')],
      time: [requiredRule('pages.record.error.time')],
      account: [requiredRule('pages.record.error.account')],
      note: [requiredRule('pages.record.error.note')],
      paymentMethod: [requiredRule('pages.record.error.paymentMethod')],
      installmentDate: [requiredRule('pages.record.error.installmentDate')],
      installmentNumber: [requiredRule('pages.record.error.installmentNumber'), calculatorRule],
      autoDebitDate: [requiredRule('pages.record.error.autoDebitDate')],
      autoDebitNumber: [requiredRule('pages.record.error.autoDebitNumber'), calculatorRule],
      reimbursementState: [requiredRule('pages.record.error.reimbursementState')],
      reimbursementAmount: [calculatorRule]
    }
  }, [i18n])

  const expenseConfig: ExpenseConfigType = useMemo(() => {
    const makeConfig = (type: ReceiptType['type'], i18nKey: string, icon: string) => {
      return {
        type: type,
        name: i18n.formatMessage({ id: i18nKey }),
        icon: <i className={ `fa-regular fa-${ icon }` }></i>
      }
    }
    return {
      amount: makeConfig('input', 'pages.record.expense.amount', 'sack-dollar'),
      coupon: makeConfig('input', 'pages.record.expense.coupon', 'percent'),
      platform: makeConfig('select', 'pages.record.expense.platform', 'map-pin'),
      category: makeConfig('select', 'pages.record.form.category', 'grid-horizontal'),
      subcategory: makeConfig('select', 'pages.record.form.subcategory', 'grid'),
      date: makeConfig('date-picker', 'pages.record.expense.date', 'calendar'),
      time: makeConfig('time-picker', 'pages.record.expense.time', 'clock'),
      account: makeConfig('select', 'pages.record.expense.account', 'piggy-bank'),
      note: makeConfig('input', 'pages.record.form.note', 'comment'),
      paymentMethod: makeConfig('select', 'pages.record.expense.paymentMethod', 'credit-card'),
      installmentDate: makeConfig('date-picker', 'pages.record.expense.date', 'calendar-clock'),
      installmentNumber: makeConfig('input', 'pages.record.expense.installmentNumber', 'hashtag'),
      autoDebitDate: makeConfig('date-picker', 'pages.record.expense.autoDate', 'calendar-clock'),
      autoDebitNumber: makeConfig('input', 'pages.record.expense.autoNumber', 'hashtag'),
      reimbursementAmount: makeConfig('input', 'pages.record.expense.reimbursementAmount', 'hashtag'),
      reimbursementFullAmount: makeConfig('checkbox', 'pages.record.expense.reimbursementFull', ''),
      reimbursementState: makeConfig('select', 'pages.record.expense.reimbursementState', 'tags')
    }
  }, [i18n])

  const handleReimbursement = useCallback(
    (amount: number, coupon: number, reimbursementAmount: number) => {
      const realAmount = form.get('reimbursementFullAmount') ? 0 : Math.max(amount - coupon - reimbursementAmount, 0)
      form.get('reimbursementFullAmount') &&
      form.set('reimbursementAmount', Number(Math.max(amount - coupon, 0).toFixed(2)))
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
          if (isNaN(Number(amount)) || isNaN(Number(coupon)) || isNaN(Number(reimbursementAmount))) {
            break
          }
          const realAmount = handleReimbursement(amount, coupon, reimbursementAmount)
          form.set('realAmount', realAmount)
          break
        }
        case 'amount': {
          const amount = value ? (value as number) : 0
          const coupon = form.get('coupon', 0)
          const reimbursementAmount = form.get('reimbursementAmount', 0)
          if (isNaN(Number(amount)) || isNaN(Number(coupon)) || isNaN(Number(reimbursementAmount))) {
            break
          }
          const realAmount = handleReimbursement(amount, coupon, reimbursementAmount)
          form.set('realAmount', realAmount)

          break
        }
        case 'reimbursementAmount': {
          const reimbursementAmount = value ? (value as number) : 0
          const amount = form.get('amount', 0)
          const coupon = form.get('coupon', 0)
          if (isNaN(Number(amount)) || isNaN(Number(coupon)) || isNaN(Number(reimbursementAmount))) {
            break
          }
          form.set('realAmount', Math.max(amount - coupon - reimbursementAmount, 0))
          form.set(key, reimbursementAmount)
        }
          break
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
          <Form.Item name={ formKey } key={ formKey } className={ styles.expenseFormButton }>
            <Input
              prepend={ expenseConfig[formKey].icon }
              hideMessage
              value={ form.get(formKey, undefined) }
              placeholder={ expenseConfig[formKey].name }
              clearable
              showClearIfFill
              type={ formKey === 'note' ? 'string' : 'calculator' }
              onChange={ (val) => handleChange(formKey, val) }
              onClear={ () => handleChange(formKey, '') }
            ></Input>
          </Form.Item>
        )
      case 'select':
        return (
          <Form.Item name={ formKey } key={ formKey } className={ styles.expenseFormButton }>
            <Dropdown
              prepend={ expenseConfig[formKey].icon }
              hideMessage
              placeholder={ expenseConfig[formKey].name }
              items={ props[`${ formKey }List` as keyof ExpenseFormProps] as ItemType[] }
              itemName={ 'name' }
              returnObject
              onChange={ (val) => handleChange(formKey, val) }
              value={ (form.get(formKey) as ItemType)?.name }
            ></Dropdown>
          </Form.Item>
        )
      case 'checkbox':
        return (
          <Form.Item name={ formKey } key={ formKey } className={ styles.expenseFormButton }>
            <Checkbox onChange={ handleCheck } checked={ form.get('reimbursementFullAmount') }>
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
              locale={ i18n.locale }
            ></DatePicker>
          </Form.Item>
        )
      case 'time-picker':
        return (
          <Form.Item name={ formKey } key={ formKey } className={ styles.expenseFormButton }>
            <TimePicker
              hideMessage
              prepend={ expenseConfig[formKey].icon }
              placeholder={ expenseConfig[formKey].name }
              onChange={ (time) => handleChange(formKey, time) }
              value={ form.get(formKey) }
              locale={ i18n.locale }
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
            { installmentKeys.map((formKey) => makeInputUnit(formKey as keyof ExpenseConfigType)) }
          </div>
        )
      case 'auto-debit':
        return (
          <div className={ styles.expenseFormRow }>
            { autoDebitKeys.map((formKey) => makeInputUnit(formKey as keyof ExpenseConfigType)) }
          </div>
        )
      case 'reimbursement':
        return (
          <div className={ styles.expenseFormRow }>
            { reimbursementKeys.map((formKey) => makeInputUnit(formKey as keyof ExpenseConfigType)) }
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
        <Form id={ formId } form={ form } initialValue={ expense } rules={ rules } onSubmit={ handleSubmit }>
          { expenseFormKeys.map((formRow, index) => (
            <div key={ `row-${ index }` } className={ styles.expenseFormRow }>
              { formRow.map((formKey) => makeInputUnit(formKey as keyof ExpenseConfigType)) }
            </div>
          )) }
          { makeExtraRow() }
          { expenseFormKeysAppend.map((formRow, index) => (
            <div key={ `row-${ index }` } className={ styles.expenseFormRow }>
              { formRow.map((formKey) => makeInputUnit(formKey as keyof ExpenseConfigType)) }
              <Button
                form={ formId }
                htmlType={ 'submit' }
                className={ classNames(styles.expenseSubmitButton, styles.hiddenMdAndUp) }
              >
                <FormattedMessage id={ 'pages.record.form.submit' }></FormattedMessage>
              </Button>
            </div>
          )) }
        </Form>
        <div>快捷方式</div>
      </div>

      <div className={ classNames(styles.expenseReceipt, styles.hiddenSmAndDown) }>
        <ReceiptForm type={ 'expense' } item={ expense } itemName={ 'name' } config={ expenseConfig }></ReceiptForm>
        <div className={ styles.expenseFormRow }>
          <Button block form={ formId } htmlType={ 'submit' }>
            <FormattedMessage id={ 'pages.record.form.submit' }></FormattedMessage>
          </Button>
        </div>
      </div>
    </div>
  )
})

export { ExpenseForm }
