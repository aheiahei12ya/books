import classNames from 'classnames'
import React, { forwardRef, useCallback, useMemo } from 'react'

import { expenseReceiptKeys } from '@/components/biz/record-form/components/expense-form/config'
import { ExpenseConfigType, ExpenseType } from '@/components/biz/record-form/components/expense-form/ExpenseForm.types'
import { incomeReceiptKeys } from '@/components/biz/record-form/components/income-form/config'
import { IncomeConfigType, IncomeType } from '@/components/biz/record-form/components/income-form/IncomeForm.types'
import { ReceiptFormProps } from '@/components/biz/record-form/components/receipt-form/ReceiptForm.types'
import get from '@/lib/pythonic/get'

import styles from './ReceiptForm.module.sass'

const expenseSign = '-'
const incomeSign = '+'
const emptySign = '--'

const ReceiptForm = forwardRef<unknown, ReceiptFormProps>((props, ref) => {
  ReceiptForm.displayName = 'ReceiptForm'

  const isExpense = props.type === 'expense'

  const receiptKeys = isExpense ? expenseReceiptKeys : incomeReceiptKeys
  type receiptConfigType = ExpenseConfigType | IncomeConfigType
  type ReceiptType = ExpenseType | IncomeType
  const sign = isExpense ? expenseSign : incomeSign

  const getReceiptValue = useCallback(
    (value: string | undefined | number, type?: string) => {
      if (value === undefined) {
        return emptySign
      } else if (isNaN(Number(value))) {
        return value
      } else {
        switch (type) {
          case 'tax':
            return `${expenseSign}${Math.max(Number(value), 0).toFixed(2)}`
          case 'coupon':
            return `${incomeSign}${Math.max(Number(value), 0).toFixed(2)}`
          default:
            return `${sign}${Math.max(Number(value), 0).toFixed(2)}`
        }
      }
    },
    [sign]
  )

  const receiptDetail = useMemo(() => {
    let receiptValue: string
    return receiptKeys.map((type) => {
      const config = props.config[type as keyof receiptConfigType]
      if (config.type === 'select') {
        receiptValue = get(props.item, [type, props.itemName], props.item[type as keyof ReceiptType])
      } else {
        receiptValue = props.item[type as keyof ReceiptType] as string
        if (type === 'coupon' && !receiptValue) return
        if (type === 'tax' && !receiptValue) return
      }
      return (
        <div key={type} className={styles.receiptDetailRow}>
          <span className={styles.receiptDetailKey}>{config.name}</span>
          <span
            className={classNames({
              [styles.receiptDetailCoupon]: type === 'coupon',
              [styles.receiptDetailTax]: type === 'tax'
            })}
          >
            {getReceiptValue(receiptValue, type)}
          </span>
        </div>
      )
    })
  }, [getReceiptValue, props.item, props.itemName, props.config, receiptKeys])

  return (
    <>
      <div className={styles.receiptHeader}>
        <span className={styles.receiptHeaderNote}>{props.item.note}</span>
        <span className={styles.receiptHeaderExpense}>{getReceiptValue(props.item.realAmount)}</span>
      </div>
      <div className={styles.receiptDetail}>{receiptDetail}</div>
    </>
  )
})

export { ReceiptForm }
