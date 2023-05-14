import classNames from 'classnames'
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'

import { dropdownHandler } from '@/components/lib/dropdown'
import { checkRules, RuleType } from '@/components/lib/rule'
import useControlled from '@/hooks/useControlled'
import get from '@/lib/pythonic/get'

import styles from './Dropdown.module.scss'
import { DropdownProps, DropdownRef } from './Dropdown.types'

const Dropdown = forwardRef<DropdownRef, DropdownProps>((props, ref) => {
  const size = props.size || 'default'
  const buttonRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<boolean>(false)
  const [selected, setSelected] = useControlled(props.value, props.onChange)
  const [rule, setRule] = useState({
    error: false,
    message: <></>
  })
  const onClickOutsideHandler = useCallback(
    ({ target }: MouseEvent) => {
      if (!buttonRef.current) return
      if (buttonRef.current.contains(target as Node)) return
      setActive(false)
      checkRules(props.rules as RuleType[], setRule, selected)
      menuRef.current!.style.maxHeight = '0'
      setTimeout(() => {
        menuRef.current!.style.maxWidth = '0'
      }, 300)
      document.removeEventListener('click', onClickOutsideHandler)
    },
    [props.rules, selected]
  )
  const [activateDropdown, deactivateDropdown] = dropdownHandler(
    menuRef,
    buttonRef,
    setActive,
    props.width,
    props.height || '200px',
    onClickOutsideHandler as EventListener,
    true
  )

  const handleSelect = (items: string | object, value: string) => {
    const selectedValue = props.returnObject ? items : value
    setSelected(selectedValue)
    deactivateDropdown()
    checkRules(props.rules as RuleType[], setRule, selectedValue)
  }

  useImperativeHandle(ref, () => ({
    touch: () => {
      return checkRules(props.rules as RuleType[], setRule, selected)
    }
  }))

  return (
    <div ref={buttonRef} className={styles.dropdownContainer}>
      <div
        className={classNames(styles.dropdownButton, {
          [styles.dropdownButtonSm]: size === 'small',
          [styles.dropdownButtonLg]: size === 'large',
          [styles.dropdownButtonBase]: size === 'default',
          [styles.dropdownButtonError]: rule.error,
          [styles.dropdownButtonFocus]: active
        })}
        onClick={active ? deactivateDropdown : activateDropdown}
      >
        {!!props.prepend && (
          <span
            className={classNames(styles.dropdownButtonInnerPrefix, {
              [styles.dropdownButtonInnerPrefixActive]: active
            })}
          >
            {props.prepend}
          </span>
        )}
        <div
          className={classNames(styles.dropdownButtonInner, {
            [styles.dropdownButtonInnerPlaceholder]: !selected,
            [styles.dropdownButtonInnerFocus]: active
          })}
        >
          {get(selected, props.itemName as string, selected) || props.defaultValue || props.placeholder}
        </div>
        <span
          className={classNames(styles.dropdownButtonInnerAppend, {
            [styles.dropdownButtonInnerAppendActive]: active
          })}
        >
          <i className="fa-regular fa-chevron-down"></i>
        </span>
      </div>
      {!props.hideMessage && (
        <div className={styles.dropdownButtonInnerWarning}>
          {(props.error && props.errorMessage) || (rule.error && rule.message)}
        </div>
      )}
      <div ref={menuRef} className={styles.dropdownMenu} tabIndex={-1} onClick={(e) => e.stopPropagation()}>
        <ul>
          {props.items?.map((items, index) => {
            const value = props.itemName ? items[props.itemName] : items
            return (
              <li
                key={index}
                className={classNames(styles.dropdownMenuItem, {
                  [styles.dropdownMenuItemSelected]: selected === value
                })}
                onClick={() => handleSelect(items, value)}
              >
                {value}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
})

Dropdown.displayName = 'Dropdown'

export { Dropdown }
