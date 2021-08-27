import EllipsisAnimator from '@components/EllipsisAnimator';
import styles from '@layouts_style/WaitingPage.module.sass';
import React from 'react';

const WaitingPage = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.ellipsisCtr}>
        <EllipsisAnimator text='Checking' />
      </div>
    </div>
  );
};

export default WaitingPage;
