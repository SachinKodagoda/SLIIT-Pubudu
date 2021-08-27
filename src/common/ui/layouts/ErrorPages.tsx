import Button from '@components/Button';
import workspace from '@images/workspace.svg';
import styles from '@layouts_style/ErrorPages.module.sass';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const ErrorPages = (): JSX.Element => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.imageCover}>
        <Image src={workspace} alt='workspace' layout='intrinsic' />
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

export default ErrorPages;
