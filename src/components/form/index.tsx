import { Form as BasicForm } from './Form'
import { FormItem } from './FormItem'

type FormType = typeof BasicForm

interface FormInterface extends FormType {
  Item: typeof FormItem
}

const Form = BasicForm as FormInterface

Form.Item = FormItem

export default Form
