import classNames from 'classnames'
import dayjs from 'dayjs'
import React, { forwardRef, useCallback, useState } from 'react'

import styles from '@/components/biz/record-form/components/expense-form/ExpenseForm.module.sass'
import ReceiptForm from '@/components/biz/record-form/components/receipt-form'
import { ItemType } from '@/components/biz/record-form/components/types'
import Button from '@/components/button'
import DatePicker from '@/components/datePicker'
import Dropdown from '@/components/dropdown'
import Form from '@/components/form'
import Input from '@/components/input'
import TimePicker from '@/components/timePicker'
import useForm from '@/hooks/useForm'

import {
  incomeConfig,
  incomeFormKeys,
  incomeFormKeysAppend,
  rules
} from './config'
import {
  IncomeConfigType,
  IncomeFormProps,
  IncomeType
} from './IncomeForm.types'

const IncomeForm = forwardRef<unknown, IncomeFormProps>((props, ref) => {
  const current = dayjs()
  const form = useForm()
  const [income, setIncome] = useState<IncomeType>({
    ...props.defaultValue,
    time: current.format('HH:mm:ss'),
    date: current.format('YYYY-MM-DD')
  })

  const handleChange = useCallback(
    (key: string, value: string | number | undefined | boolean) => {
      switch (key) {
        case 'tax': {
          const amount = form.get('amount', 0)
          const tax = value ? (value as number) : 0
          form.set('realAmount', amount - tax)
          break
        }
        case 'amount': {
          const amount = value ? (value as number) : 0
          const tax = form.get('tax', 0)

          form.set('realAmount', amount - tax)
          break
        }
        default:
          break
      }
      setIncome(form.values())
    },
    [form]
  )
  const makeInputUnit = (formKey: keyof IncomeConfigType) => {
    switch (incomeConfig[formKey].type) {
      case 'input':
        return (
          <Form.Item
            name={ formKey }
            key={ formKey }
            className={ styles.expenseFormButton }
          >
            <Input
              prepend={ incomeConfig[formKey].icon }
              hideMessage
              value={ form.get(formKey, undefined) }
              placeholder={ incomeConfig[formKey].name }
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
              prepend={ incomeConfig[formKey].icon }
              hideMessage
              placeholder={ incomeConfig[formKey].name }
              items={ incomeConfig[formKey].items }
              itemName={ 'name' }
              returnObject
              onChange={ (val) => handleChange(formKey, val) }
              value={ (form.get(formKey) as ItemType)?.name }
            ></Dropdown>
          </Form.Item>
        )
      case 'date-picker':
        return (
          <Form.Item name={ formKey } key={ formKey }>
            <DatePicker
              hideMessage
              prepend={ incomeConfig[formKey].icon }
              placeholder={ incomeConfig[formKey].name }
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
              prepend={ incomeConfig[formKey].icon }
              placeholder={ incomeConfig[formKey].name }
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

  return (
    <div className={ styles.expenseContainer }>
      <Form
        form={ form }
        initialValue={ income }
        rules={ rules }
        className={ styles.expenseForm }
        onSubmit={ () => {
          console.log(income)
        } }
      >
        { incomeFormKeys.map((formRow, index) => (
          <div key={ `row-${ index }` } className={ styles.expenseFormRow }>
            { formRow.map((formKey) =>
              makeInputUnit(formKey as keyof IncomeConfigType)
            ) }
          </div>
        )) }
        { incomeFormKeysAppend.map((formRow, index) => (
          <div key={ `row-${ index }` } className={ styles.expenseFormRow }>
            { formRow.map((formKey) =>
              makeInputUnit(formKey as keyof IncomeConfigType)
            ) }
          </div>
        )) }
        <div className={ styles.expenseFormRow }>
          <Button htmlType={ 'submit' } block>
            Submit
          </Button>
        </div>
      </Form>

      <div
        className={ classNames(styles.expenseReceipt, styles.hiddenSmAndDown) }
      >
        <ReceiptForm
          type={ 'income' }
          item={ income }
          itemName={ 'name' }
        ></ReceiptForm>
      </div>
    </div>
  )
})

IncomeForm.displayName = 'IncomeForm'

export { IncomeForm }
