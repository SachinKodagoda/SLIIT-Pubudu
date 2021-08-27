import styles from '@layouts_style/MainLeftBar.module.sass';
import React from 'react';

const MainLeftBar = (): JSX.Element => {
  return (
    <div className={styles.videoMenuLeft}>
      <div className={styles.videoItem}>D.G.Kodagoda</div>
      <div className={styles.videoItem}>Y.Abinaya</div>
      <div className={styles.videoItem}>Y.R.Kodagoda</div>
      <div className={styles.videoItem}>S.Kodagoda</div>
      <div className={styles.videoItem}>I.Kumarasinghe</div>
      <div className={styles.videoItem}>Thilina</div>
      <div className={styles.videoItem}>User1</div>
      <div className={styles.videoItem}>User2</div>
      <div className={styles.videoItem}>User3</div>
      <div className={styles.videoItem}>User4</div>
      <div className={styles.videoItem}>User5</div>
      <div className={styles.videoItem}>User6</div>
    </div>
  );
};

export default MainLeftBar;
