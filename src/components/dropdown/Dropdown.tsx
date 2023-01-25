import classNames from 'classnames'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'

import useHover from '@/hooks/useHover'

import styles from './Dropdown.module.sass'
import { DropdownProps } from './Dropdown.types'

const Dropdown = forwardRef<unknown, DropdownProps>((props, ref) => {
  Dropdown.displayName = 'Dropdown'
  const size = props.size || 'default'
  const activate = props.activate || 'click'
  const [buttonRef, hover] = useHover()
  const menuRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<boolean>(false)
  const [selected, setSelected] = useState(props.defaultSelected)
  const [rule, setRule] = useState({
    error: false,
    message: <></>
  })
  const onClickOutsideHandler = useCallback(
    (e: Event) => {
      if (!buttonRef.current) return
      if (buttonRef.current.contains(e.target)) return
      setActive(false)
      menuRef.current!.style.maxHeight = '0'
      setTimeout(() => {
        menuRef.current!.style.maxWidth = '0'
      }, 300)
      document.removeEventListener('click', onClickOutsideHandler)
    },
    [buttonRef]
  )
  const handleDropdown = useCallback(
    (type: 'activate' | 'deactivate') => {
      const nodeRef = menuRef.current!
      if (type === 'activate') {
        setActive(true)
        nodeRef.style.width = buttonRef.current.clientWidth + 'px'
        nodeRef.style.maxWidth = buttonRef.current.clientWidth + 'px'
        nodeRef.style.maxHeight = '200px'
        document.addEventListener('click', onClickOutsideHandler)
      } else {
        setActive(false)
        nodeRef.style.maxHeight = '0'
        setTimeout(() => {
          nodeRef.style.maxWidth = '0'
        }, 300)
        document.removeEventListener('click', onClickOutsideHandler)
      }
    },
    [buttonRef, onClickOutsideHandler]
  )

  const handleClick = () => {
    if (!active) {
      handleDropdown('activate')
    } else {
      handleDropdown('deactivate')
    }
  }

  useEffect(() => {
    if (activate === 'hover') {
      if (hover) {
        handleDropdown('activate')
      } else {
        handleDropdown('deactivate')
      }
    }
  }, [activate, handleDropdown, hover])

  return (
    <div ref={ buttonRef }>
      <div
        className={ classNames(styles.dropdownButton, {
          [styles.dropdownButtonSm]: size === 'small',
          [styles.dropdownButtonLg]: size === 'large',
          [styles.dropdownButtonBase]: size === 'default',
          [styles.dropdownButtonError]: rule.error,
          [styles.dropdownButtonFocus]: active
        }) }
        onClick={ handleClick }
      >
        { !!props.prepend && (
          <span
            className={ classNames(styles.dropdownButtonInnerPrefix, {
              [styles.dropdownButtonInnerPrefixActive]:
              (hover && activate === 'hover') || active
            }) }
          >
            { props.prepend }
          </span>
        ) }
        <div
          className={ classNames(styles.dropdownButtonInner, {
            [styles.dropdownButtonInnerPlaceholder]: !selected,
            [styles.dropdownButtonInnerFocus]:
            (hover && activate === 'hover') || active
          }) }
        >
          { selected || props.placeholder }
        </div>
        <span
          className={ classNames(styles.dropdownButtonInnerAppend, {
            [styles.dropdownButtonInnerAppendActive]:
            (hover && activate === 'hover') || active
          }) }
        >
          <i className="fa-regular fa-chevron-down"></i>
        </span>
      </div>
      { !props.hideMessage && (
        <div className={ styles.dropdownButtonInnerWarning }>
          { (props.error && props.errorMessage) || (rule.error && rule.message) }
        </div>
      ) }
      <div
        ref={ menuRef }
        className={ styles.dropdownMenu }
        onClick={ (e) => e.stopPropagation() }
      >
        <ul>
          { props.items?.map((items, index) => {
            const value = props.itemName ? items[props.itemName] : items
            return (
              <li
                key={ index }
                className={ classNames(styles.dropdownMenuItem, {
                  [styles.dropdownMenuItemSelected]: selected === value
                }) }
                onClick={ () => {
                  setSelected(value)
                  handleDropdown('deactivate')
                  props.onSelect?.(props.returnObject ? items : value)
                } }
              >
                { value }
              </li>
            )
          }) }
        </ul>
      </div>
    </div>
  )
})

export { Dropdown }
