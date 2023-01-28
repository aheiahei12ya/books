import classNames from 'classnames'
import { forwardRef } from 'react'

import { FormProps } from '@/components/form/Form.types'
import { FormContext } from '@/components/form/FormContext'
import { FormContextType } from '@/components/form/FormContext.types'
import useForm from '@/hooks/useForm'

import styles from './Form.module.sass'

const Form = forwardRef<unknown, FormProps>((props, ref) => {
  const form = useForm(props.form)
  const orientation = props.orientation || 'vertical'

  form.init(props.initialValue)

  const contextValue: FormContextType = {
    form: form,
    rules: props.rules,
    initialValue: props.initialValue
  }

  return (
    <FormContext.Provider value={contextValue}>
      <div
        className={classNames(
          {
            [styles.formVertical]: orientation === 'vertical',
            [styles.formHorizontal]: orientation === 'horizontal'
          },
          props?.className
        )}
      >
        {props.children}
      </div>
    </FormContext.Provider>
  )
})

Form.displayName = 'Form'

export { Form }
