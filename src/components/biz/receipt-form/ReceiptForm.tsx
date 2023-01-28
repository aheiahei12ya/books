import classNames from 'classnames'
import React, { forwardRef, useMemo } from 'react'

import {
  expenseConfig,
  receiptDetailKeys
} from '@/components/biz/expense-form/config'
import {
  expenseConfigType,
  expenseType
} from '@/components/biz/expense-form/ExpenseForm.types'
import { ReceiptFormProps } from '@/components/biz/receipt-form/ReceiptForm.types'
import get from '@/lib/pythonic/get'

import styles from './ReceiptForm.module.sass'

const ReceiptForm = forwardRef<unknown, ReceiptFormProps>((props, ref) => {
  ReceiptForm.displayName = 'ReceiptForm'

  const getReceiptValue = (value: string | undefined | number) => {
    if (value === undefined) {
      return '--'
    } else if (isNaN(Number(value))) {
      return value
    } else {
      return `-${ Number(value).toFixed(2) }`
    }
  }
  const receiptDetail = useMemo(() => {
    let receiptValue: string
    return receiptDetailKeys.map((type) => {
      const config = expenseConfig[type as keyof expenseConfigType]
      if (config.type === 'select') {
        receiptValue = get(
          props.expense,
          [type, props.itemName],
          props.expense[type as keyof expenseType]
        )
      } else {
        receiptValue = props.expense[type as keyof expenseType] as string
        if (type === 'coupon' && !receiptValue) return
      }
      return (
        <div key={ type } className={ styles.receiptDetailRow }>
          <span className={ styles.receiptDetailKey }>{ config.name }</span>
          <span
            className={ classNames({
              [styles.receiptDetailValue]: type === 'coupon'
            }) }
          >
            { getReceiptValue(receiptValue) }
          </span>
        </div>
      )
    })
  }, [props.expense, props.itemName])

  return (
    <>
      <div className={ styles.receiptHeader }>
        <span className={ styles.receiptHeaderNote }>{ props.expense.note }</span>
        <span className={ styles.receiptHeaderExpense }>
          { getReceiptValue(props.expense.realAmount) }
        </span>
      </div>
      <div className={ styles.receiptDetail }>{ receiptDetail }</div>
    </>
  )
})

export { ReceiptForm }
