import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import Button from '@/components/button'
import Checkbox from '@/components/checkbox'
import Input, { InputRef } from '@/components/input'
import services from '@/services'

import styles from './index.module.sass'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const userIcon = <i className="fa-light fa-user"></i>
  const passwordIcon = <i className="fa-light fa-lock"></i>
  const i18n = useIntl()
  const usernameRef = useRef<InputRef>(null)
  const passwordRef = useRef<InputRef>(null)

  const handleSubmit = async () => {
    const usernameError = usernameRef.current?.touch()
    const passwordError = passwordRef.current?.touch()
    if (!usernameError && !passwordError) {
      console.log(await services.login.submit())
    }
  }

  return (
    <div className={ styles.login }>
      <div className={ styles.loginPanel }>
        <div className={ styles.loginPanelLogo }>
          <span>
            <FormattedMessage
              id={ 'pages.login.title.welcome' }
            ></FormattedMessage>
          </span>
        </div>
        <div className={ classNames(styles.loginPanelForm) }>
          <Input
            ref={ usernameRef }
            value={ username }
            onChange={ (val: string) => setUsername(val) }
            clearable={ true }
            prepend={ userIcon }
            placeholder={ i18n.formatMessage({
              id: 'pages.login.username.placeholder'
            }) }
            rules={ [
              {
                required: true,
                message: <FormattedMessage id="pages.login.username.required"/>
              }
            ] }
          ></Input>
          <Input
            ref={ passwordRef }
            value={ password }
            type={ 'password' }
            onChange={ (val: string) => setPassword(val) }
            clearable={ true }
            prepend={ passwordIcon }
            placeholder={ i18n.formatMessage({
              id: 'pages.login.password.placeholder'
            }) }
            rules={ [
              {
                required: true,
                message: (
                  <FormattedMessage id={ 'pages.login.password.required' }/>
                )
              }
            ] }
          ></Input>
          <div className={ styles.loginPanelExtra }>
            <Checkbox
              onChange={ (e) => {
                setRemember(e)
              } }
              checked={ remember }
            >
              <FormattedMessage
                id={ 'pages.login.checkbox.remember' }
              ></FormattedMessage>
            </Checkbox>
            <Button type={ 'text' } size={ 'small' } color={ 'warning' }>
              <FormattedMessage
                id={ 'pages.login.button.forget' }
              ></FormattedMessage>
            </Button>
          </div>
          <Button block color={ 'primary' } onClick={ handleSubmit }>
            <FormattedMessage
              id={ 'pages.login.button.login' }
            ></FormattedMessage>
          </Button>
        </div>
      </div>
      <div
        className={ classNames(styles.loginIllustrate, styles.hiddenSmAndDown) }
      ></div>
    </div>
  )
}

export default Login
