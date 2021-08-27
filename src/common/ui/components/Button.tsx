import styles from '@components_style/Button.module.sass';
import React from 'react';

type TProps = { text: string; onClickHandler: () => void; isDisabled: boolean; type: 'normal' | 'submit' };
const Button = ({ isDisabled, onClickHandler, text, type = 'normal' }: TProps): JSX.Element => {
  return (
    <>
      {type === 'normal' && (
        <button
          className={`${styles.container} ${isDisabled ? styles.disabled : ''}`}
          onClick={() => {
            if (!isDisabled) {
              onClickHandler();
            }
          }}
          type='button'>
          {text}
        </button>
      )}
      {type === 'submit' && (
        <input
          type='submit'
          className={`${styles.submitBtn} ${isDisabled ? styles.disabled : ''}`}
          onClick={e => {
            e.preventDefault();
            if (!isDisabled) {
              onClickHandler();
            }
          }}
          value={text}
        />
      )}
    </>
  );
};
export default Button;
