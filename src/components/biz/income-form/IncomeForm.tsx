import { forwardRef, useRef, useState } from 'react'

import Button from '@/components/button'
import Dropdown from '@/components/dropdown'
import Form from '@/components/form'
import useForm from '@/hooks/useForm'

import { IncomeFormProps } from './IncomeForm.types'

const IncomeForm = forwardRef<unknown, IncomeFormProps>((props, ref) => {
  const input = useRef(null)
  const [value, setValue] = useState(props.value || {})
  const form = useForm()
  return (
    <>
      <Form form={ form } initialValue={ value } orientation={ 'horizontal' }>
        <Form.Item name={ 'platform' }>
          <Dropdown
            ref={ input }
            items={ [
              {
                id: 5,
                name: '线下',
                key: 'offline'
              },
              {
                id: 3,
                name: '京东',
                key: 'jingdong'
              },
              {
                id: 1,
                name: '淘宝天猫',
                key: 'taobao'
              },
              {
                id: 7,
                name: '小米有品'
              },
              {
                id: 4,
                name: '网易考拉'
              },
              {
                id: 6,
                name: '应用商店'
              },
              {
                id: 8,
                name: '苹果商店'
              },
              {
                id: 9,
                name: '京东金融'
              }
            ] }
            returnObject
            itemName={ 'name' }
          ></Dropdown>
        </Form.Item>
        <Form.Item name={ 'account' }>
          <Dropdown
            ref={ input }
            items={ [
              {
                id: 2,
                name: '余额',
                key: 'balance'
              },
              {
                id: 5,
                name: '花呗'
              },
              {
                id: 3,
                name: '借呗'
              },
              {
                id: 6,
                name: '金条'
              },
              {
                id: 7,
                name: '美团月付'
              },
              {
                id: 1,
                name: '京东白条'
              },
              {
                id: 4,
                name: '招行信用卡'
              }
            ] }
            returnObject
            itemName={ 'name' }
          ></Dropdown>
        </Form.Item>
      </Form>
      <ul>
        { Object.getOwnPropertyNames(value).map((key, i) => {
          return <li key={ i }>{ value[key].name }</li>
        }) }
      </ul>
      <Button onClick={ () => setValue(form.values()) }></Button>
    </>
  )
})

IncomeForm.displayName = 'IncomeForm'

export { IncomeForm }
