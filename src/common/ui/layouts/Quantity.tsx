import { CartContext } from '@ctx/CartContext';
import styles from '@layouts_style/Quantity.module.sass';
import { Translations } from '@util/localize';
import { normalizedCurrency } from '@util/normalize';
import React, { useContext } from 'react';

const Quantity = (): JSX.Element => {
  const t = Translations();
  const { currency, figureCount, figurePackageObj, setFigureCount, totalPrice } = useContext(CartContext);

  const selectedPackage = figurePackageObj[`figure${figureCount}`];
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <img src={selectedPackage?.imgUrl} alt='sample_1' className={styles.sample} />
      </div>
      <div className={styles.rightContainer}>
        <div>
          <div className={styles.topic}>{t.numberOfPeople}</div>
          <div className={styles.figureCount}>
            <button
              className={`${styles.figureCountItem} ${figureCount === 1 ? styles.selected : ''}`}
              type='button'
              onClick={() => {
                setFigureCount(1);
              }}>
              1
            </button>
            <button
              className={`${styles.figureCountItem} ${figureCount === 2 ? styles.selected : ''}`}
              type='button'
              onClick={() => {
                setFigureCount(2);
              }}>
              2
            </button>
            <button
              className={`${styles.figureCountItem} ${figureCount === 3 ? styles.selected : ''}`}
              type='button'
              onClick={() => {
                setFigureCount(3);
              }}>
              3
            </button>
            <button
              className={`${styles.figureCountItem} ${figureCount === 4 ? styles.selected : ''}`}
              type='button'
              onClick={() => {
                setFigureCount(4);
              }}>
              4
            </button>
            <button
              className={`${styles.figureCountItem} ${figureCount === 5 ? styles.selected : ''}`}
              type='button'
              onClick={() => {
                setFigureCount(5);
              }}>
              5
            </button>
            <button
              className={`${styles.figureCountItem} ${figureCount === 6 ? styles.selected : ''}`}
              type='button'
              onClick={() => {
                setFigureCount(6);
              }}>
              6
            </button>
          </div>
        </div>
        <div>
          <div className={styles.priceTable}>
            <div className={styles.priceDesc}>
              {figureCount} {t.personsAnimals}
            </div>
            <div className={styles.price}>
              <div className={styles.previousPrice}>{normalizedCurrency(selectedPackage?.prev, currency)}</div>
              <div className={styles.nowPrice}>{normalizedCurrency(selectedPackage?.now, currency)}</div>
            </div>
          </div>
          <div className={styles.totalPriceCover}>
            <span className={styles.totalPrice}>{normalizedCurrency(totalPrice, currency)}</span>
          </div>
          <div className={styles.expressDelivery}>
            <div className={styles.blink} />
            <span className='delivery_in'>{t.expressDeliveryIn}</span>
            &nbsp;
            <span className='delivery_days'>{t.just7Days}</span>
          </div>
          <div className={styles.controlBtn}>
            <div className={styles.backBtn}>Back</div>
            <div className={styles.nextBtn}>Next</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quantity;
