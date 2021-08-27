import styles from '@components_style/LetterImg.module.sass';
import { fistCapitalLetter } from '@util/normalize';
import React from 'react';
import { colors } from 'styles/baseStyles';

type TProps = {
  text: string;
  size?: string;
  color?: string;
  background?: string;
  fontSize?: string;
};
const LetterImg = ({
  background = colors.grayLight,
  color = colors.black,
  size = '50px',
  fontSize = '1.5rem',
  text,
}: TProps): JSX.Element => {
  return (
    <div
      className={styles.container}
      style={{ fontSize, background, color, width: size, height: size, lineHeight: size }}>
      {fistCapitalLetter(text)}
    </div>
  );
};

export default LetterImg;
