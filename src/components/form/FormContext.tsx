import { createContext, useContext } from 'react'

import { FormContextType } from '@/components/form/FormContext.types'

const FormContext = createContext<FormContextType>({
  form: undefined,
  rules: undefined,
  validate: false,
  formItemMap: undefined,
  initialValue: {}
})

const useFormContext = () => useContext(FormContext)

export { FormContext }

export default useFormContext
