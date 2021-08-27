import styles from '@components_style/Input.module.sass';
import { IHtmlInputElement } from '@ts/interfaces';
import React from 'react';

type TProp = {
  placeholder: string;
  label: string;
  errorMsg?: string;
  onChange: (val: string) => void;
  value: string;
  type: 'text' | 'password' | 'hidden';
  required?: boolean;
  autoComplete?: 'new-password' | 'current-password' | 'username' | 'off' | 'on';
};

const Input = ({
  autoComplete = 'on',
  errorMsg,
  label,
  onChange,
  placeholder = '',
  required = false,
  type,
  value,
}: TProp): JSX.Element => {
  if (type === 'hidden') {
    return <input type='hidden' />;
  }
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={placeholder} className={styles.labelElement}>
          {label}
        </label>
      )}
      <div className={styles.inputElementCtr}>
        <input
          className={`${styles.inputElement} ${errorMsg ? styles.error : ''}`}
          type={type}
          placeholder={placeholder}
          aria-describedby={placeholder}
          onChange={(e: IHtmlInputElement) => onChange(e.target.value)}
          value={value}
          required={required}
          autoComplete={autoComplete}
        />
        {value && <div className={styles.cross} onClick={() => onChange('')} aria-hidden='true' />}
      </div>

      {errorMsg && <div className={`${styles.errorMsg} ${errorMsg ? styles.error : ''}`}>{errorMsg}</div>}
    </div>
  );
};

export default Input;
