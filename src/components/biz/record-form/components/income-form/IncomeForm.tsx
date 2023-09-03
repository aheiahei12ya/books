import classNames from 'classnames'
import dayjs from 'dayjs'
import React, { forwardRef, useCallback, useEffect, useId, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import styles from '@/components/biz/record-form/components/expense-form/ExpenseForm.module.scss'
import ReceiptForm from '@/components/biz/record-form/components/receipt-form'
import { ItemType, ReceiptType } from '@/components/biz/record-form/components/types'
import Button from '@/components/button'
import DatePicker from '@/components/datePicker'
import DivideLine from '@/components/divideLine'
import Dropdown from '@/components/dropdown'
import Form from '@/components/form'
import Input from '@/components/input'
import Tag from '@/components/tag'
import TimePicker from '@/components/timePicker'
import useForm from '@/hooks/useForm'
import { ShortcutType } from '@/services/shortcut/types'

import { incomeFormKeys, incomeFormKeysAppend, incomeReceiptKeys } from './config'
import { IncomeConfigType, IncomeFormProps, IncomeType } from './IncomeForm.types'

const IncomeForm = forwardRef<unknown, IncomeFormProps>((props, ref) => {
  const i18n = useIntl()
  const form = useForm()
  const formId = useId()
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [income, setIncome] = useState<IncomeType>({
    ...props.defaultValue,
    time: dayjs().format('HH:mm:ss'),
    date: dayjs().format('YYYY-MM-DD')
  })

  useEffect(() => {
    setIncome({
      ...props.defaultValue,
      time: dayjs().format('HH:mm:ss'),
      date: dayjs().format('YYYY-MM-DD')
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
      tax: [calculatorRule],
      channel: [requiredRule('pages.record.error.channel')],
      category: [requiredRule('pages.record.error.category')],
      subcategory: [requiredRule('pages.record.error.subcategory')],
      date: [requiredRule('pages.record.error.date')],
      time: [requiredRule('pages.record.error.time')],
      account: [requiredRule('pages.record.error.account')],
      note: [requiredRule('pages.record.error.note')],
      ledger: [requiredRule('pages.record.error.ledger')],
      beneficiary: [requiredRule('pages.record.error.beneficiary')],
      method: [requiredRule('pages.record.error.method')],
    }
  }, [i18n])

  const incomeConfig: IncomeConfigType = useMemo(() => {
    const makeConfig = (type: ReceiptType['type'], i18nKey: string, icon: string) => {
      return {
        type: type,
        name: i18n.formatMessage({ id: i18nKey }),
        icon: <i className={`fa-regular fa-${icon}`}></i>
      }
    }
    return {
      amount: makeConfig('input', 'pages.record.income.amount', 'sack-dollar'),
      tax: makeConfig('input', 'pages.record.income.tax', 'percent'),
      channel: makeConfig('select', 'pages.record.income.channel', 'map-pin'),
      category: makeConfig('select', 'pages.record.form.category', 'grid-horizontal'),
      subcategory: makeConfig('select', 'pages.record.form.subcategory', 'grid'),
      date: makeConfig('date-picker', 'pages.record.income.date', 'calendar'),
      time: makeConfig('time-picker', 'pages.record.income.time', 'clock'),
      account: makeConfig('select', 'pages.record.income.account', 'piggy-bank'),
      note: makeConfig('input', 'pages.record.form.note', 'comment'),
      ledger: makeConfig('select', 'pages.record.form.ledger', 'book'),
      beneficiary: makeConfig('select', 'pages.record.form.beneficiary', 'user'),
      method: makeConfig('select', 'pages.record.income.method', 'credit-card')
    }
  }, [i18n])

  const handleChange = useCallback(
    (key: string, value: string | number | undefined | boolean) => {
      switch (key) {
        case 'tax': {
          const amount = form.get('amount', 0)
          const tax = value ? (value as number) : 0
          if (isNaN(Number(amount)) || isNaN(Number(tax))) {
            break
          }
          form.set('realAmount', amount - tax)
          break
        }
        case 'amount': {
          const amount = value ? (value as number) : 0
          const tax = form.get('tax', 0)
          if (isNaN(Number(amount)) || isNaN(Number(tax))) {
            break
          }
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
    switch (incomeConfig[formKey]!.type) {
      case 'input':
        return (
          <Form.Item name={formKey} key={formKey} className={styles.expenseFormButton}>
            <Input
              prepend={incomeConfig[formKey]!.icon}
              hideMessage
              value={form.get(formKey, undefined)}
              placeholder={incomeConfig[formKey]!.name}
              clearable
              showClearIfFill
              type={formKey === 'note' ? 'string' : 'calculator'}
              onChange={(val) => handleChange(formKey, val)}
              onClear={() => handleChange(formKey, '')}
            ></Input>
          </Form.Item>
        )
      case 'select':
        return (
          <Form.Item name={formKey} key={formKey} className={styles.expenseFormButton}>
            <Dropdown
              prepend={incomeConfig[formKey]!.icon}
              hideMessage
              placeholder={incomeConfig[formKey]!.name}
              items={props[`${formKey}List` as keyof IncomeFormProps] as ItemType[]}
              itemName={'name'}
              returnObject
              onChange={(val) => handleChange(formKey, val)}
              value={(form.get(formKey) as ItemType)?.name}
            ></Dropdown>
          </Form.Item>
        )
      case 'date-picker':
        return (
          <Form.Item name={formKey} key={formKey} className={styles.expenseFormButton}>
            <DatePicker
              hideMessage
              prepend={incomeConfig[formKey]!.icon}
              placeholder={incomeConfig[formKey]!.name}
              onChange={(date) => handleChange(formKey, date)}
              value={form.get(formKey)}
              locale={i18n.locale}
            ></DatePicker>
          </Form.Item>
        )
      case 'time-picker':
        return (
          <Form.Item name={formKey} key={formKey} className={styles.expenseFormButton}>
            <TimePicker
              hideMessage
              prepend={incomeConfig[formKey]!.icon}
              placeholder={incomeConfig[formKey]!.name}
              onChange={(time) => handleChange(formKey, time)}
              value={form.get(formKey)}
              locale={i18n.locale}
            ></TimePicker>
          </Form.Item>
        )
      default:
        return
    }
  }
  const shortcutList = useMemo(() => {
    const handleShortcutSelect = (items: ShortcutType) => {
      for (let item in items) {
        form.set(item, items[item as keyof ShortcutType])
        setIncome(form.values())
      }
    }
    return props.shortcutList.length ? (
      <>
        <div className={styles.expenseShortcuts}>
          {props.shortcutList.map((item, index) => (
            <Tag key={index} select onClick={() => handleShortcutSelect(item)}>
              {item.name}
            </Tag>
          ))}
        </div>
      </>
    ) : (
      <></>
    )
  }, [form, props.shortcutList])

  const makeSubmitBtn = useCallback(
    (hide: boolean) => {
      const style = hide ? classNames(styles.expenseSubmitButton, styles.hiddenMdAndUp) : undefined
      return (
        <Button
          form={formId}
          htmlType={'submit'}
          loading={loading}
          noClick={loading || success}
          color={success ? 'success' : 'default'}
          className={style}
          block={!hide}
        >
          {success ? (
            <i className="fa-regular fa-check"></i>
          ) : (
            <FormattedMessage id={'pages.record.form.submit'}></FormattedMessage>
          )}
        </Button>
      )
    },
    [formId, loading, success]
  )

  const handleSubmit = () => {
    if (loading || success) {
      return
    }
    console.log(income)
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
    setTimeout(() => setSuccess(true), 2000)
    setTimeout(() => setSuccess(false), 5000)
  }

  return props.orientation === 'portrait' ? (
    <div className={styles.expenseContainer} style={{ flexDirection: 'column' }}>
      <div className={styles.expenseForm}>
        {shortcutList}
        <DivideLine></DivideLine>
        <Form id={formId} form={form} initialValue={income} rules={rules} onSubmit={handleSubmit}>
          {incomeFormKeys.flat().map((formKey, index) => (
            <div key={`row-${index}`} className={styles.expenseFormRow}>
              {makeInputUnit(formKey as keyof IncomeConfigType)}
            </div>
          ))}
          {incomeFormKeysAppend.flat().map((formKey, index) => (
            <div key={`row-${index}`} className={styles.expenseFormRow}>
              {makeInputUnit(formKey as keyof IncomeConfigType)}
            </div>
          ))}
          <div className={styles.expenseFormRow}>{makeSubmitBtn(false)}</div>
        </Form>
      </div>
      <DivideLine marginTop={'16px'} marginBottom={'12px'}></DivideLine>
      <ReceiptForm
        type={'income'}
        item={income}
        itemName={'name'}
        keys={incomeReceiptKeys}
        config={incomeConfig}
      ></ReceiptForm>
      <br />
    </div>
  ) : (
    <div className={styles.expenseContainer}>
      <div className={styles.expenseForm}>
        <Form id={formId} form={form} initialValue={income} rules={rules} onSubmit={handleSubmit}>
          {incomeFormKeys.map((formRow, index) => (
            <div key={`row-${index}`} className={styles.expenseFormRow}>
              {formRow.map((formKey) => makeInputUnit(formKey as keyof IncomeConfigType))}
            </div>
          ))}
          {incomeFormKeysAppend.map((formRow, index) => (
            <div key={`row-${index}`} className={styles.expenseFormRow}>
              {formRow.map((formKey) => makeInputUnit(formKey as keyof IncomeConfigType))}
              {makeSubmitBtn(true)}
            </div>
          ))}
        </Form>
        <DivideLine></DivideLine>
        {shortcutList}
      </div>

      <div className={classNames(styles.expenseReceipt, styles.hiddenSmAndDown)}>
        <ReceiptForm
          type={'income'}
          item={income}
          itemName={'name'}
          keys={incomeReceiptKeys}
          config={incomeConfig}
        ></ReceiptForm>
        <div className={styles.expenseFormRow}>{makeSubmitBtn(false)}</div>
      </div>
    </div>
  )
})

IncomeForm.displayName = 'IncomeForm'
export { IncomeForm }
