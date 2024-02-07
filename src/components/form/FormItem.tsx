import classNames from 'classnames'
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'

import Checkbox from '@/components/checkbox'
import get from '@/lib/pythonic/get'

import useFormContext from './FormContext'
import { FormContextType } from './FormContext.types'
import { FormItemProps } from './FormItem.types'

const FormItem = forwardRef<unknown, FormItemProps>((props, ref) => {
  const formContext = useFormContext()
  const form = formContext.form!
  const formItemRef = useRef({})
  const formItemInnerRef = useRef({})
  const [formValue, setFormValue] = useState(
    props.initialValue || get(formContext.initialValue!, props.name, undefined)
  )

  const updateFormValue = (newVal: any) => {
    setFormValue(newVal)
    form.set(props.name, newVal)
  }

  const instance = {
    name: props.name,
    value: formValue,
    setValue: (newVal: any) => updateFormValue(newVal),
    validate: formItemInnerRef
  }

  useEffect(() => {
    if (typeof props.name === 'undefined') return
    const formItemMapRef = formContext.formItemMap?.current
    if (!formItemMapRef) return
    formItemMapRef.set(props.name, formItemRef)

    return () => {
      formItemMapRef.delete(props.name)
    }
  }, [props.name, formItemRef, formContext.formItemMap])

  useEffect(() => {
    setFormValue(form.get(props.name))
  }, [form, props.name])

  useImperativeHandle(formItemRef, () => instance)

  return (
    <div className={classNames(props.className)}>
      {Children.map(props.children, (child, index) => {
        if (!child) return null
        let controlKey = 'value'
        if (isValidElement(child)) {
          if (child.type === Checkbox) controlKey = 'checked'
          return cloneElement(child, {
            ...child.props,
            ref: formItemInnerRef,
            [controlKey]: formValue || '',
            onChange: (value: any, ...args: any[]) => {
              updateFormValue(value)
              child.props.onChange?.call?.(null, value, ...args)
            },
            rules: formContext.rules?.[props.name as keyof FormContextType]
          })
        }
        return child
      })}
    </div>
  )
})

FormItem.displayName = 'FormItem'

export { FormItem }
