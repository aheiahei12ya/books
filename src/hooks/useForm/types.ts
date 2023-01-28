export interface FormStoreType {
  init: (initData: object) => void
  values: () => object
  set: (key: string, value: any) => void
  get: (key: string, defaultValue?: any) => object
}
