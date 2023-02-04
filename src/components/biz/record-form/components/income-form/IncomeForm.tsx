import classNames from 'classnames'
import dayjs from 'dayjs'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

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

import { incomeFormKeys, incomeFormKeysAppend } from './config'
import {
  IncomeConfigType,
  IncomeFormProps,
  IncomeType
} from './IncomeForm.types'

const IncomeForm = forwardRef<unknown, IncomeFormProps>((props, ref) => {
  const i18n = useIntl()
  const form = useForm()
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
      ]
    }),
    [i18n]
  )
  const incomeConfig: IncomeConfigType = useMemo(
    () => ({
      amount: {
        type: 'input',
        name: i18n.formatMessage({ id: 'pages.record.income.amount' }),
        icon: <i className="fa-regular fa-sack-dollar"></i>
      },
      tax: {
        type: 'input',
        name: i18n.formatMessage({ id: 'pages.record.income.tax' }),
        icon: <i className="fa-regular fa-percent"></i>
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
        name: i18n.formatMessage({ id: 'pages.record.income.date' }),
        icon: <i className="fa-regular fa-calendar"></i>
      },
      time: {
        type: 'time-picker',
        name: i18n.formatMessage({ id: 'pages.record.income.time' }),
        icon: <i className="fa-regular fa-clock"></i>
      },
      account: {
        type: 'select',
        name: i18n.formatMessage({ id: 'pages.record.income.account' }),
        icon: <i className="fa-regular fa-piggy-bank"></i>,
        items: []
      },
      note: {
        type: 'input',
        name: i18n.formatMessage({ id: 'pages.record.form.note' }),
        icon: <i className="fa-regular fa-comment"></i>
      }
    }),
    [i18n]
  )

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
            name={formKey}
            key={formKey}
            className={styles.expenseFormButton}
          >
            <Input
              prepend={incomeConfig[formKey].icon}
              hideMessage
              value={form.get(formKey, undefined)}
              placeholder={incomeConfig[formKey].name}
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
              prepend={incomeConfig[formKey].icon}
              hideMessage
              placeholder={incomeConfig[formKey].name}
              items={
                props[`${formKey}List` as keyof IncomeFormProps] as ItemType[]
              }
              itemName={'name'}
              returnObject
              onChange={(val) => handleChange(formKey, val)}
              value={(form.get(formKey) as ItemType)?.name}
            ></Dropdown>
          </Form.Item>
        )
      case 'date-picker':
        return (
          <Form.Item name={formKey} key={formKey}>
            <DatePicker
              hideMessage
              prepend={incomeConfig[formKey].icon}
              placeholder={incomeConfig[formKey].name}
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
              prepend={incomeConfig[formKey].icon}
              placeholder={incomeConfig[formKey].name}
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

  return (
    <div className={styles.expenseContainer}>
      <Form
        form={form}
        initialValue={income}
        rules={rules}
        className={styles.expenseForm}
        onSubmit={() => {
          console.log(income)
        }}
      >
        {incomeFormKeys.map((formRow, index) => (
          <div key={`row-${index}`} className={styles.expenseFormRow}>
            {formRow.map((formKey) =>
              makeInputUnit(formKey as keyof IncomeConfigType)
            )}
          </div>
        ))}
        {incomeFormKeysAppend.map((formRow, index) => (
          <div key={`row-${index}`} className={styles.expenseFormRow}>
            {formRow.map((formKey) =>
              makeInputUnit(formKey as keyof IncomeConfigType)
            )}
          </div>
        ))}
        <div className={styles.expenseFormRow}>
          <Button htmlType={'submit'} block>
            <FormattedMessage
              id={'pages.record.form.submit'}
            ></FormattedMessage>
          </Button>
        </div>
      </Form>

      <div
        className={classNames(styles.expenseReceipt, styles.hiddenSmAndDown)}
      >
        <ReceiptForm
          type={'income'}
          item={income}
          itemName={'name'}
          config={incomeConfig}
        ></ReceiptForm>
      </div>
    </div>
  )
})

IncomeForm.displayName = 'IncomeForm'

export { IncomeForm }
