import { RefObject } from 'react'

export const dropdownHandler = (
  menuRef: RefObject<HTMLDivElement>,
  buttonRef: RefObject<HTMLDivElement>,
  setActive: Function,
  maxWidth: string | undefined,
  maxHeight: string,
  callback: EventListener,
  autoHeight: boolean = false
) => {
  const activateDropdown = () => {
    if (!buttonRef.current) return
    const nodeRef = menuRef.current!
    setActive(true)
    nodeRef.style.maxHeight = maxHeight
    nodeRef.style.height = autoHeight ? 'auto' : maxHeight
    nodeRef.style.maxWidth = maxWidth || buttonRef.current.clientWidth + 'px'
    nodeRef.style.width = maxWidth || buttonRef.current.clientWidth + 'px'
    document.addEventListener('click', callback)
  }

  const deactivateDropdown = () => {
    const nodeRef = menuRef.current!
    setActive(false)
    nodeRef.style.maxHeight = '0'
    document.removeEventListener('click', callback)
    setTimeout(() => {
      nodeRef.style.maxWidth = '0'
    }, 200)
  }
  return [activateDropdown, deactivateDropdown]
}
