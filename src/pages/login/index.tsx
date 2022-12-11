import React, { useState } from "react";
import styles from './index.module.sass';
import Input from "../../components/input";
import { useIntl } from "react-intl";

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userIcon = <i className="fa-light fa-user"></i>
  const passwordIcon = <i className="fa-light fa-lock"></i>
  const i18n = useIntl()

  return (
    <div className={ styles.loginPage }>
      <div
        className={ styles.loginPanel }
      >
        <div className={ styles.logo }>
          <span>账本3.0</span>
        </div>
        <div className={ styles.loginForm }>
          <Input
            value={ username }
            onChange={ (val: string) => setUsername(val) }
            clearable={ true }
            prepend={ userIcon }
            placeholder={ i18n.formatMessage({ id: 'login.username.tip' }) }
          ></Input>
          <Input
            value={ password }
            onChange={ (val: string) => setPassword(val) }
            clearable={ true }
            prepend={ passwordIcon }
            placeholder={ i18n.formatMessage({ id: 'login.password.tip' }) }
          ></Input>
        </div>
      </div>
      <div
        className={ styles.illustrate }
      ></div>
    </div>
  )
}

export default Login
