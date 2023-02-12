import { forwardRef, useState } from 'react'

import Progress from '@/components/progress'

import styles from './BarForm.module.sass'
import { BarFormProps, BarFormRef } from './BarForm.types'

const BarForm = forwardRef<BarFormRef, BarFormProps>((props, ref) => {
  const [percentage, setPercentage] = useState(20)
  return (
    <div className={styles.barFormContainer}>
      <Progress size={'small'} text={'93.32%'} percentage={percentage}></Progress>
      <br />
      <Progress text={'aarrttll'} percentage={percentage}></Progress>
      <br />
      <Progress size={'large'} text={'13%'} percentage={percentage}></Progress>
      <br />
      <Progress type={'line'} text={'93.32%'} percentage={percentage}></Progress>
      <br />
      <Progress percentage={percentage}></Progress>
      <br />
      <Progress size={'small'} text={'93.32%'} percentage={percentage}></Progress>
      <br />
      <Progress text={'aarrttll'} percentage={percentage}></Progress>
      <br />
      <Progress size={'large'} text={'13%'} percentage={percentage}></Progress>
      <br />
      <Progress type={'line'} text={'93.32%'} percentage={percentage}></Progress>
      <br />
      <Progress percentage={percentage}></Progress>
    </div>
  )
})

BarForm.displayName = 'BarForm'
export { BarForm }
