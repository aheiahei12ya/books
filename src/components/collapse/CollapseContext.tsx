import { createContext, useContext } from 'react'

import { CollapseContextType } from './CollapseContext.types'

const CollapseContext = createContext<CollapseContextType>({} as CollapseContextType)

const useCollapseContext = () => useContext(CollapseContext)

export { CollapseContext }

export default useCollapseContext
