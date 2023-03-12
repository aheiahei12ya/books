import { Collapse as BasicCollapse } from './Collapse'
import { CollapsePanel } from './CollapsePanel'

type CollapseType = typeof BasicCollapse

interface CollapseInterface extends CollapseType {
  Panel: typeof CollapsePanel
}

const Collapse = BasicCollapse as CollapseInterface

Collapse.Panel = CollapsePanel

export default Collapse
