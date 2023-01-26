import { RefObject } from 'react'

export const dropdownHandler = (
  menuRef: RefObject<HTMLDivElement>,
  buttonRef: RefObject<HTMLDivElement>,
  setActive: Function,
  width: string | undefined,
  height: string,
  callback: EventListener
) => {
  const activateDropdown = () => {
    if (!buttonRef.current) return
    const nodeRef = menuRef.current!
    setActive(true)
    nodeRef.style.maxHeight = height
    nodeRef.style.height = height
    nodeRef.style.maxWidth = width || buttonRef.current.clientWidth + 'px'
    nodeRef.style.width = width || buttonRef.current.clientWidth + 'px'
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
