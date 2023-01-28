import { useRef } from 'react'

class FormStore {
  private store: Record<string, any> = {}
  public initForm = (initData: object): void => {
    this.store = { ...initData }
  }
  public setValue = (key: string, value: any): void => {
    this.store = { ...this.store, [key]: value }
  }
  public getValue = (): object => {
    return this.store
  }
}

const useForm = (form?: any): any => {
  const formRef = useRef(Object.create({}))
  if (form) {
    formRef.current = form
  } else {
    formRef.current = new FormStore()
  }
  return formRef.current
}

export default useForm
