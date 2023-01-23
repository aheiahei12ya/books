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
  const sheetRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState<boolean>(false)
  const [selected, setSelected] = useState(props.defaultSelected)
  const [rule, setRule] = useState({
    error: false,
    message: <></>
  })
  const handleDropdown = useCallback(
    (type: 'activate' | 'deactivate') => {
      const nodeRef = sheetRef.current!
      const onClickOutsideHandler = (e: Event) => {
        if (!buttonRef.current) return
        buttonRef.current.contains(e.target) || handleDropdown('deactivate')
      }
      if (type === 'activate') {
        setActive(true)
        nodeRef.style.width = buttonRef.current.clientWidth + 'px'
        nodeRef.style.maxHeight = '200px'
        document.addEventListener('click', onClickOutsideHandler)
      } else {
        setActive(false)
        nodeRef.style.maxHeight = '0'
        document.removeEventListener('click', onClickOutsideHandler)
      }
    },
    [buttonRef]
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
  }, [hover])

  return (
    <div ref={ buttonRef }>
      <div
        className={ classNames(styles.dropdown, {
          [styles.dropdownSm]: size === 'small',
          [styles.dropdownLg]: size === 'large',
          [styles.dropdownBase]: size === 'default',
          [styles.dropdownError]: rule.error,
          [styles.dropdownFocus]: active
        }) }
        onClick={ handleClick }
      >
        { !!props.prepend && (
          <span
            className={ classNames(styles.dropdownPrefix, {
              [styles.dropdownPrefixActive]:
              (hover && activate === 'hover') || active
            }) }
          >
            { props.prepend }
          </span>
        ) }
        <div
          className={ classNames(styles.inputBox, {
            [styles.inputBoxPlaceholder]: !selected,
            [styles.inputBoxFocus]: (hover && activate === 'hover') || active
          }) }
        >
          { selected || props.placeholder }
        </div>
        <span
          className={ classNames(styles.dropdownAppend, {
            [styles.dropdownAppendActive]:
            (hover && activate === 'hover') || active
          }) }
        >
          <i className="fa-regular fa-chevron-down"></i>
        </span>
      </div>
      { !props.hideMessage && (
        <div className={ styles.dropdownWarning }>
          { (props.error && props.errorMessage) || (rule.error && rule.message) }
        </div>
      ) }
      <div
        ref={ sheetRef }
        className={ styles.dropdownMenu }
        onClick={ (e) => e.stopPropagation() }
      >
        <ul ref={ itemsRef }>
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
