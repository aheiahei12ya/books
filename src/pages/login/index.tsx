import React, { useRef, useState } from "react";
import styles from './index.module.sass';
import Input, { InputRef } from "../../components/input";
import { useIntl, FormattedMessage } from "react-intl";
import classNames from "classnames";
import Button from "../../components/button";
import Checkbox from "../../components/checkbox";
import { string } from "prop-types";

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const userIcon = <i className="fa-light fa-user"></i>
  const passwordIcon = <i className="fa-light fa-lock"></i>
  const i18n = useIntl()
  const usernameRef = useRef<InputRef>(null)
  const passwordRef = useRef<InputRef>(null)

  return (
    <div className={ styles.loginPage }>
      <div
        className={ styles.loginPanel }
      >
        <div className={ styles.logo }>
          <span>
            <FormattedMessage id={ 'pages.login.title.welcome' }></FormattedMessage>
          </span>
        </div>
        <div className={ classNames(styles.loginForm) }>
          <Input
            ref={ usernameRef }
            value={ username }
            onChange={ (val: string) => setUsername(val) }
            clearable={ true }
            prepend={ userIcon }
            placeholder={ i18n.formatMessage({ id: 'pages.login.username.placeholder' }) }
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
            placeholder={ i18n.formatMessage({ id: 'pages.login.password.placeholder' }) }
            rules={ [
              {
                required: true,
                message: <FormattedMessage id={ 'pages.login.password.required' }/>
              }
            ] }
          ></Input>
          <div>
            <Checkbox
              onChange={ (e) => {
                setRemember(e)
              } }
              checked={ remember }
            >
              <FormattedMessage id={ 'pages.login.checkbox.remember' }></FormattedMessage>
            </Checkbox>
          </div>
          <Button
            block
            color={ 'primary' }
            onClick={ () => {
              usernameRef.current?.touch()
              passwordRef.current?.touch()
            } }
          >
            <FormattedMessage id={ 'pages.login.button.login' }></FormattedMessage>
          </Button>
        </div>
      </div>
      <div
        className={ classNames(styles.illustrate, styles.hiddenSmAndDown) }
      ></div>
    </div>
  )
}

export default Login
