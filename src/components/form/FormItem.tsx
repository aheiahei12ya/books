import classNames from 'classnames'
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useState
} from 'react'

import Checkbox from '@/components/checkbox'
import useFormContext from '@/components/form/FormContext'
import get from '@/lib/pythonic/get'

import styles from './Form.module.sass'
import { FormItemProps } from './FormItem.types'

const FormItem = forwardRef<unknown, FormItemProps>((props, ref) => {
  const formContext = useFormContext()
  const form = formContext.form!
  const [formValue, setFormValue] = useState(
    props.initialValue || get(formContext.initialValue!, props.name, undefined)
  )

  const updateFormValue = (newVal: any) => {
    setFormValue(newVal)
    form.set(props.name, newVal)
  }

  useEffect(() => {
    setFormValue(form.get(props.name))
  }, [form, props.name])

  return (
    <div className={classNames(styles.formItem, props.className)}>
      {Children.map(props.children, (child, index) => {
        if (!child) return null
        let controlKey = 'value'
        if (isValidElement(child)) {
          if (child.type === Checkbox) controlKey = 'checked'
          return cloneElement(child, {
            ...child.props,
            [controlKey]: formValue || '',
            onChange: (value: any, ...args: any[]) => {
              updateFormValue(value)
              child.props.onChange?.call?.(null, value, ...args)
            }
          })
        }
        return child
      })}
    </div>
  )
})

FormItem.displayName = 'FormItem'

export { FormItem }
