import { forwardRef } from 'react'

import styles from './IncomeForm.module.sass'
import { IncomeFormProps } from './IncomeForm.types'

const IncomeForm = forwardRef<unknown, IncomeFormProps>((props, ref) => {
  IncomeForm.displayName = 'IncomeForm'
  return <div className={ styles.incomeForm }></div>
})

export { IncomeForm }
