import classNames from 'classnames'
import { forwardRef, useRef } from 'react'

import useForm from '@/hooks/useForm'

import styles from './Form.module.sass'
import { FormProps } from './Form.types'
import { FormContext } from './FormContext'
import { FormContextType } from './FormContext.types'

const Form = forwardRef<unknown, FormProps>((props, ref) => {
  const form = useForm(props.form)
  const gap = props.gap || '12px'
  const orientation = props.orientation || 'vertical'
  const formItemMapRef = useRef(new Map())

  form.init(props.initialValue)

  const contextValue: FormContextType = {
    form: form,
    rules: props.rules,
    validate: false,
    formItemMap: formItemMapRef,
    initialValue: props.initialValue
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    let hasError = false
    formItemMapRef.current.forEach((v, k) => {
      if (v.current.validate?.current?.touch?.()) {
        hasError = true
      }
    })
    hasError || props.onSubmit?.(e.target)
  }
  return (
    <FormContext.Provider value={contextValue}>
      <form
        id={props.id}
        className={classNames(
          {
            [styles.formVertical]: orientation === 'vertical',
            [styles.formHorizontal]: orientation === 'horizontal'
          },
          props?.className
        )}
        style={{ gap: gap }}
        onSubmit={handleSubmit}
      >
        {props.children}
      </form>
    </FormContext.Provider>
  )
})

Form.displayName = 'Form'

export { Form }
