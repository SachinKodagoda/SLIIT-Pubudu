import Loader from '@components/Loader';
import { UserContext } from '@ctx/UserContext';
import styles from '@pages_style/login.module.sass';
import Image from 'next/image';
import React, { useContext, useEffect } from 'react';
import google from '../../public/images/google.svg';
import workspace from '../../public/images/workspace.svg';

const Login = (): JSX.Element => {
  const { adminRoute, loading, signIn } = useContext(UserContext);
  useEffect(() => {
    adminRoute();
  }, [adminRoute]);

  return (
    <div className={styles.container}>
      <div className={styles.imageCover}>
        <Image src={workspace} alt='workspace' layout='intrinsic' />
      </div>
      <div className={styles.welcome}>
        Welcome to <b>DAVINCI</b>
      </div>

      <button
        onClick={() => {
          signIn();
        }}
        className={styles.loginBtn}
        type='button'>
        <div className={styles.googleIconCover}>
          <Image src={google} alt='googleImg' />
        </div>
        Login
      </button>
      <Loader show={loading} />
    </div>
  );
};

export default Login;
