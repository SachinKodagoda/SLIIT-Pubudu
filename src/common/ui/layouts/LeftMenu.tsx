import LetterImg from '@components/LetterImg';
import { UserContext } from '@ctx/UserContext';
import styles from '@layouts_style/LeftMenu.module.sass';
import { Log, MenuIcons, ZoomIn } from '@svg/Common';
import { TMenuItem } from '@ts/common';
import React, { useContext, useState } from 'react';
import ErrorPages from 'src/common/ui/layouts/ErrorPages';
import { colors } from 'styles/baseStyles';

const menuHeight = 60;
const LeftMenu = (): JSX.Element | null => {
  const { signOut, userData } = useContext(UserContext);
  const menuItemsArr: TMenuItem[] = ['analytics', 'artists', 'editors', 'customers', 'settings'];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [smallMenu, setSmallMenu] = useState(true);
  const top = `${menuHeight * selectedIndex}px`;

  const { isLogged } = useContext(UserContext);
  if (isLogged === false) {
    return <ErrorPages />;
  }
  return (
    <div className={styles.container} style={{ width: smallMenu ? '70px' : '200px' }}>
      <div className={styles.profileCover} style={{ paddingBottom: smallMenu ? '0' : '16px' }}>
        {userData.photoURL ? (
          <img src={userData.photoURL} alt='user' style={{ width: smallMenu ? '56px' : '80px' }} />
        ) : (
          <LetterImg
            text={userData.photoURL || ''}
            size={smallMenu ? '56px' : '80px'}
            fontSize='3rem'
            background={colors.grayDark}
          />
        )}
      </div>
      {!smallMenu && <div className={styles.profileName}>{userData.displayName}</div>}
      {!smallMenu && userData.type && <div className={styles.type}>({userData.type})</div>}
      <div className={styles.separator} />
      <div className={styles.menuCover}>
        <span className={styles.backgroundSelection} style={{ top }} />
        {menuItemsArr.map((item, i) => {
          return (
            <button
              type='button'
              className={`${styles.menuItem} ${selectedIndex === i ? styles.active : ''}`}
              onClick={() => setSelectedIndex(i)}
              key={`menu-${i + 1}`}>
              <MenuIcons type={item} />
              {!smallMenu && item}
            </button>
          );
        })}
        <span className={styles.topArrow} style={{ top }} />
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.separator} />
        <button type='button' className={styles.logoutCtr} onClick={() => signOut()}>
          {smallMenu ? <Log /> : <div className={styles.logoutText}>Log out</div>}
        </button>
        <div className={styles.separator} />
        <button type='button' className={styles.zoomCtr} onClick={() => setSmallMenu(val => !val)}>
          {smallMenu ? <ZoomIn /> : <div className={styles.zoomOutText}>Small Menu</div>}
        </button>
      </div>
    </div>
  );
};

export default LeftMenu;
