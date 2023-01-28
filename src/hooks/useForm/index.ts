import { useRef } from 'react'

class FormStore {
  private store: Record<string, any> = {}

  public init = (initData: object): void => {
    this.store = { ...initData }
  }
  public values = (): object => {
    return this.store
  }
  public set = (key: string, value: any): void => {
    this.store = { ...this.store, [key]: value }
  }
  public get = (key: string, defaultValue?: any): object => {
    return this.store[key] === undefined ? defaultValue : this.store[key]
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
