import styles from '@components_style/EllipsisAnimator.module.sass';
import React from 'react';

type TProps = { text?: string };
const EllipsisAnimator = ({ text = 'Checking' }: TProps): JSX.Element => {
  return <div className={styles.container}>{text}</div>;
};

export default EllipsisAnimator;
