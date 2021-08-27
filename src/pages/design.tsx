import styles from '@pages_style/design.module.sass';
import { TTab } from '@ts/common';
import { Translations } from '@util/localize';
import React, { useState } from 'react';
import Quantity from 'src/common/ui/layouts/Quantity';

const Design = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<TTab>('quantity');
  const t = Translations();

  const getTabBody = () => {
    switch (selectedTab) {
      case 'cart':
        return <Quantity />;
      case 'quantity':
        return <Quantity />;
      case 'size':
        return <Quantity />;
      case 'upload':
        return <Quantity />;
      default:
        return <Quantity />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabHeader}>
        <button
          type='button'
          className={`${styles.tabHeaderItem} ${selectedTab === 'quantity' ? styles.active : ''}`}
          onClick={() => {
            setSelectedTab('quantity');
          }}>
          {t.quantity}
        </button>
        <button
          type='button'
          className={`${styles.tabHeaderItem} ${selectedTab === 'size' ? styles.active : ''}`}
          onClick={() => {
            setSelectedTab('size');
          }}>
          {t.size}
        </button>
        <button
          type='button'
          className={`${styles.tabHeaderItem} ${selectedTab === 'upload' ? styles.active : ''}`}
          onClick={() => {
            setSelectedTab('upload');
          }}>
          {t.upload}
        </button>
        <button
          type='button'
          className={`${styles.tabHeaderItem} ${selectedTab === 'cart' ? styles.active : ''}`}
          onClick={() => {
            setSelectedTab('cart');
          }}>
          {t.shippingCart}
        </button>
      </div>
      <div className={styles.tabBody}>
        {getTabBody()}
        <div className={styles.deliveryDesc}>
          <div className={styles.deliveryDescItem}>
            <img className={styles.deliveryDescIcon} src='/images/truck.svg' alt='truck' />
            {t.expressDeliveryDays}
          </div>
          <div className={styles.deliveryDescItem}>
            <img className={styles.deliveryDescIcon} src='/images/hand-writing.svg' alt='hand-writing' />
            {t.handmade}
          </div>
          <div className={styles.deliveryDescItem}>
            <img className={styles.deliveryDescIcon} src='/images/customer.svg' alt='customer' />
            {t.satisfactionGuarantee}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
