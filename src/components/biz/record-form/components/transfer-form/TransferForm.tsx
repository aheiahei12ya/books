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

import { transferFormKeys, transferReceiptKeys } from './config'
import { TransferConfigType, TransferFormProps, TransferType } from './TransferForm.types'

const TransferForm = forwardRef<unknown, TransferFormProps>((props, ref) => {
  const i18n = useIntl()
  const form = useForm()
  const formId = useId()
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [transfer, setTransfer] = useState<TransferType>({
    ...props.defaultValue,
    time: dayjs().format('HH:mm:ss'),
    date: dayjs().format('YYYY-MM-DD')
  })

  useEffect(() => {
    setTransfer({
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
      sourceAmount: [requiredRule('pages.record.error.amount'), calculatorRule],
      targetAmount: [requiredRule('pages.record.error.amount'), calculatorRule],
      date: [requiredRule('pages.record.error.date')],
      time: [requiredRule('pages.record.error.time')],
      sourceAccount: [requiredRule('pages.record.error.account')],
      targetAccount: [requiredRule('pages.record.error.account')]
    }
  }, [i18n])

  const transferConfig: TransferConfigType = useMemo(() => {
    const makeConfig = (type: ReceiptType['type'], i18nKey: string, icon: string) => {
      return {
        type: type,
        name: i18n.formatMessage({ id: i18nKey }),
        icon: <i className={`fa-regular fa-${icon}`}></i>
      }
    }
    return {
      sourceAmount: makeConfig('input', 'pages.record.transfer.sourceAmount', 'sack-dollar'),
      targetAmount: makeConfig('input', 'pages.record.transfer.targetAmount', 'sack-dollar'),
      exchangeAmount: makeConfig('button', 'pages.record.transfer.exchangeAmount', 'exchange'),
      date: makeConfig('date-picker', 'pages.record.transfer.date', 'calendar'),
      time: makeConfig('time-picker', 'pages.record.transfer.time', 'clock'),
      sourceAccount: makeConfig('select', 'pages.record.transfer.sourceAccount', 'piggy-bank'),
      targetAccount: makeConfig('select', 'pages.record.transfer.targetAccount', 'piggy-bank'),
      exchangeAccount: makeConfig('button', 'pages.record.transfer.exchangeAccount', 'exchange')
    }
  }, [i18n])

  const handleChange = useCallback(
    (key: string, value: string | number | undefined | boolean) => {
      if (key === 'amount') {
        form.set('realAmount', value)
      }
      setTransfer(form.values())
    },
    [form]
  )
  const makeInputUnit = (formKey: keyof TransferConfigType) => {
    switch (transferConfig[formKey]!.type) {
      case 'input':
        return (
          <Form.Item name={formKey} key={formKey} className={styles.expenseFormButton}>
            <Input
              prepend={transferConfig[formKey]!.icon}
              hideMessage
              value={form.get(formKey, undefined)}
              placeholder={transferConfig[formKey]!.name}
              clearable
              showClearIfFill
              type={'calculator'}
              onChange={(val) => handleChange(formKey, val)}
              onClear={() => handleChange(formKey, '')}
            ></Input>
          </Form.Item>
        )
      case 'select':
        return (
          <Form.Item name={formKey} key={formKey} className={styles.expenseFormButton}>
            <Dropdown
              prepend={transferConfig[formKey]!.icon}
              hideMessage
              placeholder={transferConfig[formKey]!.name}
              items={props.accountList as ItemType[]}
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
              prepend={transferConfig[formKey]!.icon}
              placeholder={transferConfig[formKey]!.name}
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
              prepend={transferConfig[formKey]!.icon}
              placeholder={transferConfig[formKey]!.name}
              onChange={(time) => handleChange(formKey, time)}
              value={form.get(formKey)}
              locale={i18n.locale}
            ></TimePicker>
          </Form.Item>
        )
      case 'button':
        return (
          <Form.Item
            name={formKey}
            key={formKey}
            className={classNames({
              [styles.expenseFormIconButton]: props.orientation === 'landscape',
              [styles.expenseFormIconButtonVertical]: props.orientation === 'portrait'
            })}
          >
            <Button type={'text'} onClick={() => handleExchange(formKey as 'exchangeAccount' | 'exchangeAmount')}>
              {transferConfig[formKey]!.icon}
            </Button>
          </Form.Item>
        )
      default:
        return
    }
  }
  const handleExchange = (formKey: 'exchangeAccount' | 'exchangeAmount') => {
    switch (formKey) {
      case 'exchangeAccount': {
        const source = form.get('sourceAccount')
        const target = form.get('targetAccount')
        form.set('sourceAccount', target)
        form.set('targetAccount', source)
        setTransfer(form.values())
        break
      }
      case 'exchangeAmount': {
        const source = form.get('sourceAmount')
        const target = form.get('targetAmount')
        form.set('sourceAmount', target)
        form.set('targetAmount', source)
        setTransfer(form.values())
        break
      }
      default:
        break
    }
  }
  const shortcutList = useMemo(() => {
    const handleShortcutSelect = (items: ShortcutType) => {
      for (let item in items) {
        form.set(item, items[item as keyof ShortcutType])
        setTransfer(form.values())
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
      const style = hide ? classNames(styles.hiddenMdAndUp) : undefined
      return (
        <Button
          form={formId}
          htmlType={'submit'}
          loading={loading}
          noClick={loading || success}
          color={success ? 'success' : 'default'}
          className={style}
          block
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
    console.log(transfer)
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
        <Form id={formId} form={form} initialValue={transfer} rules={rules} onSubmit={handleSubmit}>
          {transferFormKeys.flat().map((formKey, index) => (
            <div key={`row-${index}`} className={styles.expenseFormRow}>
              {makeInputUnit(formKey as keyof TransferConfigType)}
            </div>
          ))}
          <div className={styles.expenseFormRow}>{makeSubmitBtn(false)}</div>
        </Form>
      </div>
      <DivideLine marginTop={'16px'} marginBottom={'12px'}></DivideLine>
      <ReceiptForm
        type={'transfer'}
        item={transfer}
        itemName={'name'}
        keys={transferReceiptKeys}
        config={transferConfig}
      ></ReceiptForm>
      <br />
    </div>
  ) : (
    <div className={styles.expenseContainer}>
      <div className={styles.expenseForm}>
        <Form id={formId} form={form} initialValue={transfer} rules={rules} onSubmit={handleSubmit}>
          {transferFormKeys.map((formRow, index) => (
            <div key={`row-${index}`} className={styles.expenseFormRow}>
              {formRow.map((formKey) => makeInputUnit(formKey as keyof TransferConfigType))}
            </div>
          ))}
          <div className={styles.expenseFormRow}>{makeSubmitBtn(true)}</div>
        </Form>
        <DivideLine></DivideLine>
        {shortcutList}
      </div>

      <div className={classNames(styles.expenseReceipt, styles.hiddenSmAndDown)}>
        <ReceiptForm
          type={'transfer'}
          item={transfer}
          itemName={'name'}
          keys={transferReceiptKeys}
          config={transferConfig}
        ></ReceiptForm>
        <div className={styles.expenseFormRow}>{makeSubmitBtn(false)}</div>
      </div>
    </div>
  )
})

TransferForm.displayName = 'ExpenseForm'
export { TransferForm }
