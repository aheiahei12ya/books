import classNames from 'classnames'
import dayjs from 'dayjs'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState
} from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import ReceiptForm from '@/components/biz/record-form/components/receipt-form'
import { ItemType } from '@/components/biz/record-form/components/types'
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
  expenseFormKeys,
  expenseFormKeysAppend,
  installmentKeys,
  reimbursementKeys
} from './config'
import styles from './ExpenseForm.module.sass'
import {
  ExpenseConfigType,
  ExpenseFormProps,
  ExpenseType
} from './ExpenseForm.types'

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

  const rules = useMemo(
    () => ({
      amount: [
        {
          required: true,
          message: i18n.formatMessage({ id: 'pages.record.error.amount' })
        }
      ],
      platform: [
        {
          required: true,
          message: i18n.formatMessage({ id: 'pages.record.error.platform' })
        }
      ],
      category: [
        {
          required: true,
          message: i18n.formatMessage({ id: 'pages.record.error.category' })
        }
      ],
      subcategory: [
        {
          required: true,
          message: i18n.formatMessage({ id: 'pages.record.error.subcategory' })
        }
      ],
      date: [
        {
          required: true,
          message: i18n.formatMessage({ id: 'pages.record.error.date' })
        }
      ],
      time: [
        {
          required: true,
          message: i18n.formatMessage({ id: 'pages.record.error.time' })
        }
      ],
      account: [
        {
          required: true,
          message: i18n.formatMessage({ id: 'pages.record.error.account' })
        }
      ],
      note: [
        {
          required: true,
          message: i18n.formatMessage({ id: 'pages.record.error.note' })
        }
      ],
      paymentMethod: [
        {
          required: true,
          message: i18n.formatMessage({
            id: 'pages.record.error.paymentMethod'
          })
        }
      ],
      installmentDate: [
        {
          required: true,
          message: i18n.formatMessage({
            id: 'pages.record.error.installmentDate'
          })
        }
      ],
      installmentNumber: [
        {
          required: true,
          message: i18n.formatMessage({
            id: 'pages.record.error.installmentNumber'
          })
        }
      ],
      autoDebitDate: [
        {
          required: true,
          message: i18n.formatMessage({
            id: 'pages.record.error.autoDebitDate'
          })
        }
      ],
      autoDebitNumber: [
        {
          required: true,
          message: i18n.formatMessage({
            id: 'pages.record.error.autoDebitNumber'
          })
        }
      ],
      reimbursementState: [
        {
          required: true,
          message: i18n.formatMessage({
            id: 'pages.record.error.reimbursementState'
          })
        }
      ]
    }),
    [i18n]
  )

  const expenseConfig: ExpenseConfigType = useMemo(
    () => ({
      amount: {
        type: 'input',
        name: i18n.formatMessage({ id: 'pages.record.expense.amount' }),
        icon: <i className="fa-regular fa-sack-dollar"></i>
      },
      coupon: {
        type: 'input',
        name: i18n.formatMessage({ id: 'pages.record.expense.coupon' }),
        icon: <i className="fa-regular fa-percent"></i>
      },
      paymentMethod: {
        type: 'select',
        name: i18n.formatMessage({ id: 'pages.record.expense.paymentMethod' }),
        icon: <i className="fa-regular fa-credit-card"></i>,
        items: []
      },
      platform: {
        type: 'select',
        name: i18n.formatMessage({ id: 'pages.record.expense.platform' }),
        icon: <i className="fa-regular fa-map-pin"></i>,
        items: []
      },
      category: {
        type: 'select',
        name: i18n.formatMessage({ id: 'pages.record.form.category' }),
        icon: <i className="fa-regular fa-grid-horizontal"></i>,
        items: []
      },
      subcategory: {
        type: 'select',
        name: i18n.formatMessage({ id: 'pages.record.form.subcategory' }),
        icon: <i className="fa-regular fa-grid"></i>,
        items: []
      },
      date: {
        type: 'date-picker',
        name: i18n.formatMessage({ id: 'pages.record.expense.date' }),
        icon: <i className="fa-regular fa-calendar"></i>
      },
      time: {
        type: 'time-picker',
        name: i18n.formatMessage({ id: 'pages.record.expense.time' }),
        icon: <i className="fa-regular fa-clock"></i>
      },
      account: {
        type: 'select',
        name: i18n.formatMessage({ id: 'pages.record.expense.account' }),
        icon: <i className="fa-regular fa-piggy-bank"></i>,
        items: []
      },
      note: {
        type: 'input',
        name: i18n.formatMessage({ id: 'pages.record.form.note' }),
        icon: <i className="fa-regular fa-comment"></i>
      },
      installmentDate: {
        type: 'date-picker',
        name: i18n.formatMessage({ id: 'pages.record.expense.date' }),
        icon: <i className="fa-regular fa-calendar-clock"></i>
      },
      installmentNumber: {
        type: 'input',
        name: i18n.formatMessage({
          id: 'pages.record.expense.installmentNumber'
        }),
        icon: <i className="fa-regular fa-hashtag"></i>
      },
      autoDebitDate: {
        type: 'date-picker',
        name: i18n.formatMessage({ id: 'pages.record.expense.autoDate' }),
        icon: <i className="fa-regular fa-calendar-clock"></i>
      },
      autoDebitNumber: {
        type: 'input',
        name: i18n.formatMessage({ id: 'pages.record.expense.autoNumber' }),
        icon: <i className="fa-regular fa-hashtag"></i>
      },
      reimbursementAmount: {
        type: 'input',
        name: i18n.formatMessage({
          id: 'pages.record.expense.reimbursementAmount'
        }),
        icon: <i className="fa-regular fa-hashtag"></i>
      },
      reimbursementFullAmount: {
        type: 'checkbox',
        name: i18n.formatMessage({
          id: 'pages.record.expense.reimbursementFull'
        }),
        icon: <i className="fa-regular fa-calendar-clock"></i>
      },
      reimbursementState: {
        type: 'select',
        name: i18n.formatMessage({
          id: 'pages.record.expense.reimbursementState'
        }),
        icon: <i className="fa-regular fa-tags"></i>,
        items: [
          { name: '待报销', key: 'waiting' },
          { name: '报销中', key: 'ongoing' },
          { name: '已报销', key: 'finished' }
        ]
      }
    }),
    [i18n]
  )

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
            name={formKey}
            key={formKey}
            className={styles.expenseFormButton}
          >
            <Input
              prepend={expenseConfig[formKey].icon}
              hideMessage
              value={form.get(formKey, undefined)}
              placeholder={expenseConfig[formKey].name}
              clearable
              showClearIfFill
              type={formKey === 'note' ? 'string' : 'digit'}
              onChange={(val) => handleChange(formKey, val)}
              onClear={() => handleChange(formKey, '')}
            ></Input>
          </Form.Item>
        )
      case 'select':
        return (
          <Form.Item
            name={formKey}
            key={formKey}
            className={styles.expenseFormButton}
          >
            <Dropdown
              prepend={expenseConfig[formKey].icon}
              hideMessage
              placeholder={expenseConfig[formKey].name}
              items={
                props[`${formKey}List` as keyof ExpenseFormProps] as ItemType[]
              }
              itemName={'name'}
              returnObject
              onChange={(val) => handleChange(formKey, val)}
              value={(form.get(formKey) as ItemType)?.name}
            ></Dropdown>
          </Form.Item>
        )
      case 'checkbox':
        return (
          <Form.Item
            name={formKey}
            key={formKey}
            className={styles.expenseFormButton}
          >
            <Checkbox
              onChange={handleCheck}
              checked={form.get('reimbursementFullAmount')}
            >
              {expenseConfig[formKey].name}
            </Checkbox>
          </Form.Item>
        )
      case 'date-picker':
        return (
          <Form.Item name={formKey} key={formKey}>
            <DatePicker
              hideMessage
              prepend={expenseConfig[formKey].icon}
              placeholder={expenseConfig[formKey].name}
              onChange={(date) => handleChange(formKey, date)}
              value={form.get(formKey)}
              locale={i18n.locale}
            ></DatePicker>
          </Form.Item>
        )
      case 'time-picker':
        return (
          <Form.Item
            name={formKey}
            key={formKey}
            className={styles.expenseFormButton}
          >
            <TimePicker
              hideMessage
              prepend={expenseConfig[formKey].icon}
              placeholder={expenseConfig[formKey].name}
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
          <div className={styles.expenseFormRow}>
            {installmentKeys.map((formKey) =>
              makeInputUnit(formKey as keyof ExpenseConfigType)
            )}
          </div>
        )
      case 'auto-debit':
        return (
          <div className={styles.expenseFormRow}>
            {autoDebitKeys.map((formKey) =>
              makeInputUnit(formKey as keyof ExpenseConfigType)
            )}
          </div>
        )
      case 'reimbursement':
        return (
          <div className={styles.expenseFormRow}>
            {reimbursementKeys.map((formKey) =>
              makeInputUnit(formKey as keyof ExpenseConfigType)
            )}
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
    <div className={styles.expenseContainer}>
      <div className={styles.expenseForm}>
        <Form
          id={formId}
          form={form}
          initialValue={expense}
          rules={rules}
          onSubmit={handleSubmit}
        >
          {expenseFormKeys.map((formRow, index) => (
            <div key={`row-${index}`} className={styles.expenseFormRow}>
              {formRow.map((formKey) =>
                makeInputUnit(formKey as keyof ExpenseConfigType)
              )}
            </div>
          ))}
          {makeExtraRow()}
          {expenseFormKeysAppend.map((formRow, index) => (
            <div key={`row-${index}`} className={styles.expenseFormRow}>
              {formRow.map((formKey) =>
                makeInputUnit(formKey as keyof ExpenseConfigType)
              )}
              <Button
                form={formId}
                htmlType={'submit'}
                className={classNames(
                  styles.expenseSubmitButton,
                  styles.hiddenMdAndUp
                )}
              >
                <FormattedMessage
                  id={'pages.record.form.submit'}
                ></FormattedMessage>
              </Button>
            </div>
          ))}
        </Form>
        <div>快捷方式</div>
      </div>

      <div
        className={classNames(styles.expenseReceipt, styles.hiddenSmAndDown)}
      >
        <ReceiptForm
          type={'expense'}
          item={expense}
          itemName={'name'}
          config={expenseConfig}
        ></ReceiptForm>
        <div className={styles.expenseFormRow}>
          <Button block form={formId} htmlType={'submit'}>
            <FormattedMessage
              id={'pages.record.form.submit'}
            ></FormattedMessage>
          </Button>
        </div>
      </div>
    </div>
  )
})

export { ExpenseForm }
