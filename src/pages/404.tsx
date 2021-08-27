import Button from '@components/Button';
import styles from '@pages_style/404.module.sass';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import error from '../../public/images/error_404.svg';

const ErrorPage404 = (): JSX.Element => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.imageCover}>
        <Image src={error} alt='workspace' layout='intrinsic' />
      </div>
      <div className={styles.message}>This page could not be found.</div>
      <div className={styles.btnCtr}>
        <Button
          type='normal'
          isDisabled={false}
          text='GO HOME'
          onClickHandler={() => {
            router.push('/');
          }}
        />
      </div>
    </div>
  );
};

export default ErrorPage404;
