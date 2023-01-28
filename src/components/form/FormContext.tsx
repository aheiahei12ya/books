import { createContext, useContext } from 'react'

import { FormContextType } from '@/components/form/FormContext.types'

const FormContext = createContext<FormContextType>({
  form: undefined,
  rules: undefined,
  initialValue: {}
})

const useFormContext = () => useContext(FormContext)

export { FormContext }

export default useFormContext
