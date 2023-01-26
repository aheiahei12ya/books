import classNames from 'classnames'
import React, { forwardRef } from 'react'

import {
  expenseConfig,
  receiptDetailKeys
} from '@/components/biz/expense-form/config'
import {
  expenseConfigType,
  expenseType,
  itemType
} from '@/components/biz/expense-form/ExpenseForm.types'
import { ReceiptFormProps } from '@/components/biz/receipt-form/ReceiptForm.types'

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
  const makeReceiptDetail = (type: string) => {
    const config = expenseConfig[type as keyof expenseConfigType]
    let receiptValue: string
    if (config.type === 'select') {
      receiptValue = (props.expense[type as keyof expenseType] as itemType)
        ?.name
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
  }

  return (
    <>
      <div className={ styles.receiptHeader }>
        <span className={ styles.receiptHeaderNote }>{ props.expense.note }</span>
        <span className={ styles.receiptHeaderExpense }>
          { getReceiptValue(props.expense.realAmount) }
        </span>
      </div>
      <div className={ styles.receiptDetail }>
        { receiptDetailKeys.map((type) => {
          return makeReceiptDetail(type)
        }) }
      </div>
    </>
  )
})


export { ReceiptForm }
