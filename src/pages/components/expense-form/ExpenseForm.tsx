import classNames from 'classnames'
import React, { forwardRef, useCallback, useState } from 'react'

import Dropdown from '@/components/dropdown'
import Input from '@/components/input'
import useRequest from '@/hooks/useRequest'
import {
  expenseConfig,
  expenseFormKeys,
  receiptDetailKeys
} from '@/pages/components/expense-form/config'
import services from '@/services'

import styles from './ExpenseForm.module.sass'
import {
  expenseConfigType,
  ExpenseFormProps,
  expenseType,
  itemType
} from './ExpenseForm.types'

const ExpenseForm = forwardRef<unknown, ExpenseFormProps>((props, ref) => {
  ExpenseForm.displayName = 'ExpenseForm'
  const [expense, setExpense] = useState<expenseType>({
    realAmount: 0,
    amount: 0,
    coupon: 0,
    paymentMethod: undefined,
    platform: undefined,
    category: undefined,
    subcategory: undefined,
    date: undefined,
    time: undefined,
    account: undefined,
    note: undefined
  })

  const handleChange = useCallback(
    (key: string, value: string | number | undefined) => {
      if (key === 'coupon') {
        const amount = expense.amount || 0
        const coupon = value ? (value as number) : 0
        setExpense((prevState) => ({
          ...prevState,
          realAmount: Math.max(amount - coupon, 0)
        }))
      } else if (key === 'amount') {
        const amount = value ? (value as number) : 0
        const coupon = expense.coupon || 0
        setExpense((prevState) => ({
          ...prevState,
          realAmount: Math.max(amount - coupon, 0)
        }))
      }
      setExpense((prevState) => ({ ...prevState, [key]: value }))
    },
    [expense.amount, expense.coupon]
  )

  useRequest(
    () =>
      services.platform.list({
        user: 1
      }),
    {
      onSuccess: (data) => {
        if (data.success) {
          expenseConfig.platform.items = data?.data.platformList
        }
      }
    }
  )
  useRequest(
    () =>
      services.account.list({
        user: 1
      }),
    {
      onSuccess: (data) => {
        if (data.success) {
          expenseConfig.account.items = data?.data.accountList
        }
      }
    }
  )
  useRequest(
    () =>
      services.paymentMethod.list({
        user: 1
      }),
    {
      onSuccess: (data) => {
        if (data.success) {
          expenseConfig.paymentMethod.items = data?.data.paymentMethodList
        }
      }
    }
  )
  useRequest(
    () =>
      services.category.list({
        user: 1,
        root: 0
      }),
    {
      onSuccess: (data) => {
        if (data.success) {
          expenseConfig.category.items = data?.data.categoryList
        }
      }
    }
  )
  useRequest(
    () =>
      services.category.list({
        user: 1,
        root: 1
      }),
    {
      onSuccess: (data) => {
        if (data.success) {
          expenseConfig.subcategory.items = data?.data.categoryList
        }
      }
    }
  )

  return (
    <div className={ styles.expenseContainer }>
      <div className={ styles.expenseForm }>
        { expenseFormKeys.map((formRow, index) => {
          return (
            <div key={ `row-${ index }` } className={ styles.expenseFormRow }>
              { formRow.map((node) => {
                const config = expenseConfig[node as keyof expenseConfigType]
                return config.type === 'input' ? (
                  <div key={ node } className={ styles.expenseFormButton }>
                    <Input
                      prepend={ config.icon }
                      hideMessage
                      placeholder={ config.name }
                      clearable
                      showClearIfFill
                      type={ node === 'note' ? 'string' : 'digit' }
                      onChange={ (val) => handleChange(node, val) }
                      onClear={ () => handleChange(node, undefined) }
                    ></Input>
                  </div>
                ) : (
                  <div key={ node } className={ styles.expenseFormButton }>
                    <Dropdown
                      prepend={ config.icon }
                      hideMessage
                      placeholder={ config.name }
                      items={ config.items }
                      itemName={ 'name' }
                      returnObject
                      onSelect={ (val) => handleChange(node, val) }
                      rules={ [
                        {
                          required: true
                        }
                      ] }
                    ></Dropdown>
                  </div>
                )
              }) }
            </div>
          )
        }) }
      </div>

      <div className={ classNames(styles.expenseReceipt, styles.hiddenSmAndDown) }>
        <div className={ styles.receiptHeader }>
          <span className={ styles.receiptHeaderNote }>{ expense.note }</span>
          <span className={ styles.receiptHeaderExpense }>
            { expense.realAmount && `-${ expense.realAmount.toFixed(2) }` }
          </span>
        </div>
        <div className={ styles.receiptDetail }>
          { receiptDetailKeys.map((type, index) => {
            const config = expenseConfig[type as keyof expenseConfigType]
            let receiptValue: string
            if (config.type === 'select') {
              receiptValue = (expense[type as keyof expenseType] as itemType)
                ?.name
            } else {
              receiptValue = expense[type as keyof expenseType] as string
              if (type === 'coupon' && !receiptValue) return
            }
            return (
              <div key={ index } className={ styles.receiptDetailRow }>
                <span className={ styles.receiptDetailKey }>{ config.name }</span>
                <span
                  className={ classNames({
                    [styles.receiptDetailValue]: type === 'coupon'
                  }) }
                >
                  { receiptValue && type === 'coupon'
                    ? `-${ Number(receiptValue).toFixed(2) }`
                    : receiptValue }
                </span>
              </div>
            )
          }) }
        </div>
      </div>
    </div>
  )
})

export { ExpenseForm }
