import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import Button from '@/components/button'
import Checkbox from '@/components/checkbox'
import Input, { InputRef } from '@/components/input'
import { accountError, passwordError } from '@/constants/resultCode'
import useRequest from '@/hooks/useRequest'
import { useAuth } from '@/lib/auth'
import services from '@/services'

import styles from './index.module.sass'

const Login: React.FC = () => {
  Login.displayName = 'Login'
  const i18n = useIntl()
  const router = useRouter()
  const auth = useAuth()

  const usernameRef = useRef<InputRef>(null)
  const passwordRef = useRef<InputRef>(null)

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(true)

  const [usernameIncorrect, setUsernameIncorrect] = useState<boolean>(false)
  const [passwordIncorrect, setPasswordIncorrect] = useState<boolean>(false)

  const {
    loading,
    run: doLogin,
    data,
    error
  } = useRequest(
    () =>
      services.login.login({
        username: username,
        password: password
      }),
    {
      manual: true,
      onSuccess: (data) => {
        if (!data.success) {
          data.resultCode === accountError && setUsernameIncorrect(true)
          data.resultCode === passwordError && setPasswordIncorrect(true)
        } else {
          auth.setLogin(true)
          auth.setUserInfo(data.data)
        }
      }
    }
  )

  const handleSubmit = () => {
    const usernameError = usernameRef.current?.touch()
    const passwordError = passwordRef.current?.touch()
    if (!usernameError && !passwordError && !loading) {
      doLogin()
    }
  }

  useEffect(() => {
    router.prefetch('/home')
    if (data?.success) {
      sessionStorage.setItem('userInfo', JSON.stringify(data.data))
      router.replace('/home')
    }
  }, [data, router])

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
            onChange={ (val: string) => {
              setUsername(val)
              setUsernameIncorrect(false)
            } }
            clearable={ true }
            prepend={ <i className="fa-light fa-user"></i> }
            placeholder={ i18n.formatMessage({
              id: 'pages.login.username.placeholder'
            }) }
            rules={ [
              {
                required: true,
                message: <FormattedMessage id="pages.login.username.required"/>
              }
            ] }
            error={ usernameIncorrect }
            errorMessage={
              <FormattedMessage id={ 'pages.login.username.incorrect' }/>
            }
          ></Input>
          <Input
            ref={ passwordRef }
            value={ password }
            type={ 'password' }
            onChange={ (val: string) => {
              setPassword(val)
              setPasswordIncorrect(false)
            } }
            clearable={ true }
            prepend={ <i className="fa-light fa-lock"></i> }
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
            error={ passwordIncorrect }
            errorMessage={
              <FormattedMessage id={ 'pages.login.password.incorrect' }/>
            }
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
          <Button
            block
            color={ 'primary' }
            onClick={ handleSubmit }
            loading={ loading }
          >
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
