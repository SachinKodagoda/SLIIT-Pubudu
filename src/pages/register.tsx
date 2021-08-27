import Button from '@components/Button';
import Input from '@components/Input';
import { UserContext } from '@ctx/UserContext';
import useDebounce from '@hooks/useDebounce';
import { firestore } from '@lib/firebase';
import styles from '@pages_style/register.module.sass';
import { isEmpty, passwordValidator, userNameValidator, userNameValidatorBoolean } from '@util/normalize';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { colors } from 'styles/baseStyles';

type TAvailability = 'checking' | 'available' | 'already_taken' | 'error' | 'initial';
const Register = (): JSX.Element | null => {
  const [displayName, setDisplayName] = useState('');
  const debouncedDisplayName = useDebounce(displayName, 250) as string;
  const [displayNameError, setDisplayNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userNameAvailability, setUserNameAvailability] = useState<TAvailability>('checking');
  const isInValid = isEmpty(displayName) || isEmpty(password) || !isEmpty(displayNameError) || !isEmpty(passwordError);
  useEffect(() => {
    setDisplayNameError(userNameValidator(displayName));
    setPasswordError(passwordValidator(password));
  }, [displayName, password]);

  const { isLogged, userData } = useContext(UserContext);

  const checkUsername = useCallback(async () => {
    if (userNameValidatorBoolean(debouncedDisplayName)) {
      try {
        setUserNameAvailability('checking');
        const ref = firestore.doc(`usernames/${debouncedDisplayName}`);
        const { exists } = await ref.get();
        if (!exists) {
          setUserNameAvailability('available');
        } else {
          setUserNameAvailability('already_taken');
        }
      } catch (error) {
        setUserNameAvailability('error');
      }
    } else {
      setUserNameAvailability('initial');
    }
  }, [debouncedDisplayName]);

  useEffect(() => {
    checkUsername();
  }, [checkUsername]);

  useEffect(() => {
    if (userData.displayName) {
      setDisplayName(userData.displayName);
    }
  }, [userData]);

  let availability = '';
  let availability_color = colors.red;
  if (userNameAvailability === 'already_taken') {
    availability = `${debouncedDisplayName} is already taken!`;
    availability_color = colors.red;
  } else if (userNameAvailability === 'available') {
    availability = `${debouncedDisplayName} is available`;
    availability_color = colors.greenDark;
  } else if (userNameAvailability === 'checking') {
    availability = 'checking...';
    availability_color = colors.black;
  } else if (userNameAvailability === 'error') {
    availability = 'System error type agin!';
    availability_color = colors.red;
  } else {
    availability = '';
    availability_color = colors.black;
  }

  if (!isLogged) return null;
  return (
    <div className={styles.container}>
      <form className={styles.containerInner}>
        <Input
          placeholder='User Name'
          label='User name :'
          errorMsg={displayNameError}
          value={displayName}
          onChange={val => setDisplayName(val)}
          type='text'
          autoComplete='username'
          required
        />
        <Input
          placeholder='User Name'
          label=''
          errorMsg=''
          value={displayName}
          onChange={val => setDisplayName(val)}
          type='hidden'
          autoComplete='username'
          required
        />
        <Input
          placeholder='Password'
          label='Password :'
          errorMsg={passwordError}
          value={password}
          onChange={val => setPassword(val)}
          type='password'
          autoComplete='new-password'
          required
        />
        <Button
          type='submit'
          text='Register'
          isDisabled={isInValid}
          onClickHandler={() => {
            if (!isInValid) {
              // eslint-disable-next-line no-console
              console.log('test=-->');
            }
          }}
        />
        <div style={{ color: availability_color }}>{availability}</div>
      </form>
    </div>
  );
};

export default Register;
