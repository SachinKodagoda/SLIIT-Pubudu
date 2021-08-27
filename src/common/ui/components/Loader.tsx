import styles from '@components_style/Loader.module.sass';
import React from 'react';

type TProps = { show: boolean };
const Loader = ({ show }: TProps): JSX.Element => {
  const ctrClass = `${styles.container} ${show ? styles.show : ''}`;
  return <div className={ctrClass} />;
};

export default Loader;
