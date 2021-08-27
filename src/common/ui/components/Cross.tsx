import styles from '@components_style/Cross.module.sass';
import React from 'react';

type TProps = {
  menuOpened: boolean;
  clickHandler: React.Dispatch<React.SetStateAction<boolean>>;
};
const Cross = ({ clickHandler, menuOpened }: TProps): JSX.Element => {
  return (
    <button
      className={`${styles.container} ${menuOpened ? styles.open : ''}`}
      type='button'
      onClick={() => clickHandler(state => !state)}>
      <span />
      <span />
      <span />
      <span />
    </button>
  );
};

export default Cross;
