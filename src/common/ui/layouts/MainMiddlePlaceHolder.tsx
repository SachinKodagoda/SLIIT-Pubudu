import styles from '@layouts_style/MainMiddlePlaceHolder.module.sass';
import React from 'react';

const MainMiddlePlaceHolder = (): JSX.Element => {
  return (
    <div className={styles.videoPlaceholder}>
      <div className={styles.userName}>Duminda Kodagoda</div>
      <div className={styles.userMessage}>Your video is off!</div>
    </div>
  );
};

export default MainMiddlePlaceHolder;
