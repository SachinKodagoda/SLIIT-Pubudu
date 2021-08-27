import Cross from '@components/Cross';
import SelectBox from '@components/SelectBox';
import styles from '@layouts_style/NavBar.module.sass';
import { DavinciLogo } from '@svg/Logo';
import { TInputValue } from '@ts/common';
import { Translations } from '@util/localize';
import { useRouter } from 'next/router';
import { useState } from 'react';

const NavBar = (): JSX.Element => {
  const t = Translations();
  const router = useRouter();
  const { asPath, locale, pathname } = router;
  const [menuOpened, setMenuOpened] = useState(false);
  const ToggleLanguage = (val: TInputValue) => {
    switch (val) {
      case 'en':
        router.push(pathname, asPath, { locale: 'en' });
        break;
      case 'de':
        router.push(pathname, asPath, { locale: 'de' });
        break;
      default:
        break;
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.middleContainer}>
        <div className={styles.title}>
          <DavinciLogo />
        </div>
        <div className={styles.menu}>
          <div className={styles.menuItem}>{t.howItWorks}</div>
          <div className={styles.menuItem}>{t.gallery}</div>
          <div className={styles.menuItem}>{t.prices}</div>
          <div className={styles.menuItem}>{t.shipping}</div>
          <div className={styles.langBar}>
            <SelectBox
              options={[
                { label: 'EN', value: 'en' },
                { label: 'DE', value: 'de' },
              ]}
              onChange={selected => {
                ToggleLanguage(selected.value || null);
              }}
              selectedValue={locale || 'en'}
              placeholder=''
            />
          </div>
        </div>
        <Cross menuOpened={menuOpened} clickHandler={setMenuOpened} />
      </div>
    </div>
  );
};

export default NavBar;
