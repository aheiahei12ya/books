import classNames from 'classnames'
import { forwardRef, useCallback, useRef, useState } from 'react'

import useControlled from '@/hooks/useControlled'
import get from '@/lib/pythonic/get'

import styles from './Dropdown.module.sass'
import { DropdownProps } from './Dropdown.types'

const Dropdown = forwardRef<unknown, DropdownProps>((props, ref) => {
  const size = props.size || 'default'
  const buttonRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<boolean>(false)
  const [selected, setSelected] = useControlled(props.value, props.onChange)
  const [rule, setRule] = useState({
    error: false,
    message: <></>
  })
  const height = props.height || '200px'

  const onClickOutsideHandler = useCallback(
    ({ target }: MouseEvent) => {
      if (!buttonRef.current) return
      if (buttonRef.current.contains(target as Node)) return
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
      if (!buttonRef.current) return
      const nodeRef = menuRef.current!
      if (type === 'activate') {
        const buttonWidth = buttonRef.current.clientWidth + 'px'
        setActive(true)
        nodeRef.style.width = props.width || buttonWidth
        nodeRef.style.maxWidth = props.width || buttonWidth
        nodeRef.style.maxHeight = height
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
    [height, onClickOutsideHandler, props.width]
  )

  const handleClick = () => {
    if (!active) {
      handleDropdown('activate')
    } else {
      handleDropdown('deactivate')
    }
  }

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
              [styles.dropdownButtonInnerPrefixActive]: active
            }) }
          >
            { props.prepend }
          </span>
        ) }
        <div
          className={ classNames(styles.dropdownButtonInner, {
            [styles.dropdownButtonInnerPlaceholder]: !selected,
            [styles.dropdownButtonInnerFocus]: active
          }) }
        >
          { get(selected, props.itemName as string, selected) ||
            props.defaultValue ||
            props.placeholder }
        </div>
        <span
          className={ classNames(styles.dropdownButtonInnerAppend, {
            [styles.dropdownButtonInnerAppendActive]: active
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
                  setSelected(props.returnObject ? items : value)
                  handleDropdown('deactivate')
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

Dropdown.displayName = 'Dropdown'

export { Dropdown }
