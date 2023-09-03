import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import Button from '@/components/button'
import Checkbox from '@/components/checkbox'
import Form from '@/components/form'
import Input, { InputRef } from '@/components/input'
import { illustrateUrl } from '@/constants/resource'
import { accountError, passwordError } from '@/constants/resultCode'
import useForm from '@/hooks/useForm'
import useRequest from '@/hooks/useRequest'
import useResize from '@/hooks/useResize'
import { useAuth } from '@/lib/auth'
import { rgbDataURL } from '@/lib/image'
import services from '@/services'

import styles from './index.module.scss'

const Login: React.FC = () => {
  Login.displayName = 'Login'
  const i18n = useIntl()
  const router = useRouter()
  const auth = useAuth()
  const resize = useResize()
  const form = useForm()
  const formId = useId()

  const usernameRef = useRef<InputRef>(null)
  const passwordRef = useRef<InputRef>(null)

  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
    remember: true
  })
  const [usernameIncorrect, setUsernameIncorrect] = useState<boolean>(false)
  const [passwordIncorrect, setPasswordIncorrect] = useState<boolean>(false)

  const rules = useMemo(
    () => ({
      username: [
        {
          required: true,
          message: i18n.formatMessage({ id: 'pages.login.username.required' })
        }
      ],
      password: [
        {
          required: true,
          message: i18n.formatMessage({ id: 'pages.login.password.required' })
        }
      ]
    }),
    [i18n]
  )

  const {
    loading,
    run: doLogin,
    data
  } = useRequest((val) => services.user.login(val), {
    manual: true,
    onSuccess: (data) => {
      if (!data.success) {
        data.errorCode === accountError && setUsernameIncorrect(true)
        data.errorCode === passwordError && setPasswordIncorrect(true)
      } else {
        auth.setLogin(true)
        auth.setUserInfo(data.data)
      }
    }
  })

  const handleSubmit = () => {
    const usernameError = usernameRef.current?.touch()
    const passwordError = passwordRef.current?.touch()
    if (!usernameError && !passwordError && !loading) {
      doLogin(form.values())
    }
  }

  useEffect(() => {
    if (data?.success) {
      sessionStorage.setItem('userInfo', JSON.stringify(data.data))
      router.replace('/home')
    }
  }, [data, router])

  const handleValue = (type?: string) => {
    setLoginInfo(form.values())
    if (type === 'username') setUsernameIncorrect(false)
    else if (type === 'password') setPasswordIncorrect(false)
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginPanel}>
        <div className={styles.loginPanelLogo}>
          <span>
            <FormattedMessage id={'pages.login.title.welcome'}></FormattedMessage>
          </span>
          {resize.isMobile && (
            <Image
              src={illustrateUrl}
              alt={''}
              fill
              priority
              placeholder="blur"
              blurDataURL={rgbDataURL(250, 250, 250)}
            />
          )}
        </div>
        <div className={classNames(styles.loginPanelForm)}>
          <Form id={formId} form={form} initialValue={loginInfo} onSubmit={handleSubmit} rules={rules} gap={'0'}>
            <Form.Item name={'username'}>
              <Input
                value={form.get('username', undefined)}
                onChange={() => handleValue('username')}
                clearable
                prepend={<i className="fa-light fa-user"></i>}
                placeholder={i18n.formatMessage({
                  id: 'pages.login.username.placeholder'
                })}
                error={usernameIncorrect}
                errorMessage={<FormattedMessage id={'pages.login.username.incorrect'} />}
              ></Input>
            </Form.Item>
            <Form.Item name={'password'}>
              <Input
                value={form.get('password', undefined)}
                type={'password'}
                onChange={() => handleValue('password')}
                clearable
                prepend={<i className="fa-light fa-lock"></i>}
                placeholder={i18n.formatMessage({
                  id: 'pages.login.password.placeholder'
                })}
                error={passwordIncorrect}
                errorMessage={<FormattedMessage id={'pages.login.password.incorrect'} />}
              ></Input>
            </Form.Item>
            <div className={styles.loginPanelExtra}>
              <Form.Item name={'remember'}>
                <Checkbox onChange={() => handleValue} checked={form.get('remember')}>
                  <FormattedMessage id={'pages.login.checkbox.remember'}></FormattedMessage>
                </Checkbox>
              </Form.Item>
              <Form.Item name={'forget'}>
                <Button type={'text'} size={'small'} color={'warning'}>
                  <FormattedMessage id={'pages.login.button.forget'}></FormattedMessage>
                </Button>
              </Form.Item>
            </div>
            <Button form={formId} block color={'primary'} htmlType={'submit'} loading={loading}>
              <FormattedMessage id={'pages.login.button.login'}></FormattedMessage>
            </Button>
          </Form>
        </div>
      </div>
      <div className={classNames(styles.loginIllustrate, styles.hiddenSmAndDown)}>
        {resize.isPC && (
          <Image
            src={illustrateUrl}
            alt={''}
            fill
            priority
            placeholder="blur"
            blurDataURL={rgbDataURL(250, 250, 250)}
          />
        )}
      </div>
    </div>
  )
}

export default Login
