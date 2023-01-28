export interface FormStoreType {
  initForm: (initData: object) => void
  setValue: (key: string, value: any) => void
  getValue: () => object
}
