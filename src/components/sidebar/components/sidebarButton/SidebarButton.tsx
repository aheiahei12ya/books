import classNames from 'classnames'
import React, { forwardRef } from 'react'

import styles from './SidebarButton.module.sass'
import { SidebarButtonProps } from './SidebarButton.types'

export const SidebarButton = forwardRef<unknown, SidebarButtonProps>(
  (props, ref) => {
    SidebarButton.displayName = 'SidebarButton'
    let buttonStyle, iconStyle, textStyle, textHiddenStyle
    switch (props.type) {
      case 'brand':
        buttonStyle = styles.sidebarBrand
        iconStyle = styles.sidebarBrandIcon
        textStyle = styles.sidebarBrandText
        textHiddenStyle = styles.sidebarBrandTextHidden
        break

      case 'avatar':
        buttonStyle = styles.sidebarAvatar
        iconStyle = styles.sidebarAvatarIcon
        textStyle = styles.sidebarAvatarText
        textHiddenStyle = styles.sidebarAvatarTextHidden
        break

      case 'tool':
        buttonStyle = props.children
          ? styles.sidebarToolButton
          : styles.sidebarToolButtonCenter
        iconStyle = styles.sidebarToolButtonIcon

        textStyle = styles.sidebarToolButtonText
        textHiddenStyle = styles.sidebarToolButtonTextHidden
        break

      default:
        buttonStyle = styles.sidebarButton
        iconStyle = styles.sidebarButtonIcon
        textStyle = styles.sidebarButtonText
        textHiddenStyle = styles.sidebarButtonTextHidden
    }
    return (
      <div
        className={ classNames(buttonStyle, {
          [styles.sidebarButtonSelected]: props.selected
        }) }
        onClick={ props?.onClick }
      >
        <span className={ classNames(iconStyle) }>{ props.icon }</span>
        { props.children && (
          <span
            className={ classNames(textStyle, {
              [textHiddenStyle]: props.hideText
            }) }
          >
            { props.children }
          </span>
        ) }
      </div>
    )
  }
)
