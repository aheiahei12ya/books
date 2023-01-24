import { RefObject } from 'react'

export const dropdownHandler = (
  menuRef: RefObject<HTMLDivElement>,
  buttonRef: RefObject<HTMLDivElement>,
  setActive: Function,
  width: string,
  height: string
) => {
  const onClickOutsideHandler = ({ target }: MouseEvent) => {
    console.log(111)
    if (!buttonRef?.current) return
    buttonRef.current.contains(target as Node) || deactivateDropdown()
  }

  const activateDropdown = () => {
    const nodeRef = menuRef.current!
    setActive(true)
    nodeRef.style.maxHeight = height
    nodeRef.style.height = height
    nodeRef.style.maxWidth = width
    nodeRef.style.width = width
    document.addEventListener('click', onClickOutsideHandler)
  }

  const deactivateDropdown = () => {
    const nodeRef = menuRef.current!
    setActive(false)
    nodeRef.style.maxHeight = '0'
    document.removeEventListener('click', onClickOutsideHandler)
    setTimeout(() => {
      nodeRef.style.maxWidth = '0'
    }, 200)
  }
  return [activateDropdown, deactivateDropdown]
}
