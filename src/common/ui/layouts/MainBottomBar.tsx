import { AnimationContext } from '@ctx/AnimationContext';
import { AudioContext } from '@ctx/AudioContext';
import useOnClickOutside from '@hooks/useOnClickOutside';
import styles from '@layouts_style/MainBottomBar.module.sass';
import React, { useContext, useRef, useState } from 'react';
import SpeechRecognition from 'react-speech-recognition';

// Types 🔥🔥🔥🔥
type TProps = {
  videoOn: boolean;
  showLeftBar: boolean;
  showRightBar: boolean;
  setVideoOn: (x: boolean) => void;
  setShowLeftBar: (x: boolean) => void;
  setShowRightBar: (x: boolean) => void;
};

const MainBottomBar = ({
  setShowLeftBar,
  setShowRightBar,
  setVideoOn,
  showLeftBar,
  showRightBar,
  videoOn,
}: TProps): JSX.Element => {
  // Get context data 🔥🔥🔥🔥
  const { isMicDisabled, microphoneOn, setMicrophoneOn } = useContext(AudioContext);
  const { setAction, action, followHand, setFollowHand, textObj, setTextObj, displayAll, setDisplayAll } =
    useContext(AnimationContext);

  // Using useState hooks  🔥🔥🔥🔥
  const [threeMenuOn, setThreeMenuOn] = useState(false);
  const [settingsMenuOn, setSettingsMenuOn] = useState(false);
  const [streaming, setStreaming] = useState(false);

  // Using useRef hooks  🔥🔥🔥🔥
  const popupMenu = useRef<HTMLDivElement | null>(null);

  // Using custom hooks  🔥🔥🔥🔥
  useOnClickOutside(popupMenu, () => setSettingsMenuOn(false));

  // Setting Images 🔥🔥🔥🔥
  const videoIcon = videoOn ? 'videoCameraActive' : 'videoCamera';
  const streamingIcon = streaming ? 'streamingActive' : 'streaming';
  const microphoneIcon = microphoneOn ? 'microphoneActive' : 'microphone';
  const threeMenuIcon = threeMenuOn ? '3dActive' : '3d';
  const settingsMenuIcon = settingsMenuOn ? 'settingsActive' : 'settings';
  const usersIcon = showLeftBar ? 'groupActive' : 'group';
  const messageIcon = showRightBar ? 'messageActive' : 'message';
  const TrackingIcon = action ? 'actionActive' : 'action';
  const AnimateIcon = followHand ? 'handActive' : 'hand';

  // JSX Element 🔥🔥🔥🔥
  return (
    <div className={styles.bottomBar}>
      {/* 🔥🔥🔥🔥 --Left Buttons-- 🔥🔥🔥🔥 */}
      <div className={styles.left}>
        <div className={styles.popupMenuCover} ref={popupMenu}>
          <div className={settingsMenuOn ? `${styles.popupMenu}` : `${styles.popupMenu} ${styles.hide}`}>
            <div className={styles.popupMenuMainIcons}>
              <div
                className={`${styles.popupMenuMainIconsRow}`}
                onClick={() => {
                  const tempDisplay = !displayAll;
                  const tempObj = Object.keys(textObj).reduce(
                    (attrs, key) => ({
                      ...attrs,
                      [key]: { ...textObj[key], number: true, display: true },
                    }),
                    {}
                  );
                  setTextObj(tempObj);
                  setDisplayAll(tempDisplay);
                }}>
                Show all
              </div>
              <div
                className={`${styles.popupMenuMainIconsRow}`}
                onClick={() => {
                  const tempDisplay = !displayAll;
                  const tempObj = Object.keys(textObj).reduce(
                    (attrs, key) => ({
                      ...attrs,
                      [key]: { ...textObj[key], number: false, display: false },
                    }),
                    {}
                  );
                  setTextObj(tempObj);
                  setDisplayAll(tempDisplay);
                }}>
                Hide all
              </div>
            </div>
            <div className={styles.popupMenuMainIcons}>
              <div
                className={`${styles.popupMenuMainIconsRow}`}
                onClick={() => {
                  const tempDisplay = !displayAll;
                  const tempObj = Object.keys(textObj).reduce(
                    (attrs, key) => ({
                      ...attrs,
                      [key]: { ...textObj[key], number: true, display: true },
                    }),
                    {}
                  );
                  setTextObj(tempObj);
                  setDisplayAll(tempDisplay);
                }}>
                Show all numbers
              </div>
              <div
                className={`${styles.popupMenuMainIconsRow}`}
                onClick={() => {
                  const tempDisplay = !displayAll;
                  const tempObj = Object.keys(textObj).reduce(
                    (attrs, key) => ({
                      ...attrs,
                      [key]: { ...textObj[key], number: false, display: true },
                    }),
                    {}
                  );
                  setTextObj(tempObj);
                  setDisplayAll(tempDisplay);
                }}>
                Show all text
              </div>
            </div>
            {Object.entries(textObj).map((item, i) => {
              return (
                <div key={`SelectionRow-${i + 1}`} className={styles.itemRow}>
                  <div
                    className={
                      item[1].number ? `${styles.selectNumber} ${styles.selectNumberActive}` : `${styles.selectNumber}`
                    }
                    onClick={() => {
                      setTextObj(obj => {
                        return { ...obj, [item[0]]: { ...item[1], number: !item[1].number } };
                      });
                    }}>
                    {i + 1}
                  </div>
                  <div
                    className={`${styles.selectBox}`}
                    onClick={() => {
                      setTextObj(obj => {
                        return { ...obj, [item[0]]: { ...item[1], display: !item[1].display } };
                      });
                    }}>
                    <img
                      src={`/images/checked.svg`}
                      alt='check'
                      className={item[1].display ? `${styles.checkIcon} ${styles.selected}` : `${styles.checkIcon}`}
                    />
                    <img
                      src={`/images/not_checked.svg`}
                      alt='check'
                      className={item[1].display ? `${styles.checkIcon}` : `${styles.checkIcon} ${styles.selected}`}
                    />
                  </div>
                  {item[1].text}
                </div>
              );
            })}
          </div>
          <img
            src={`/images/${settingsMenuIcon}.svg`}
            alt='Settings'
            className={styles.leftIcons}
            onClick={() => {
              setSettingsMenuOn(value => !value);
            }}
            aria-hidden='true'
          />
        </div>
        <img
          src={`/images/${threeMenuIcon}.svg`}
          alt='ThreeMenuIcon'
          className={styles.leftIcons}
          onMouseEnter={() => {
            setThreeMenuOn(true);
          }}
          onMouseLeave={() => {
            setThreeMenuOn(false);
          }}
        />
      </div>
      {/* 🔥🔥🔥🔥 --Middle Buttons-- 🔥🔥🔥🔥 */}
      <div className={styles.middle}>
        <img
          src={`/images/${videoIcon}.svg`}
          alt='Video'
          className={styles.middleIcons}
          onClick={() => {
            const tempState = videoOn;
            setVideoOn(!tempState);
          }}
          aria-hidden='true'
        />
        <img
          src={`/images/${TrackingIcon}.svg`}
          alt='StartHandTracking'
          className={styles.middleIcons}
          onClick={() => {
            // Start Tracking
            setAction(prev => !prev);
          }}
          aria-hidden='true'
        />
        <img
          src={`/images/${streamingIcon}.svg`}
          alt='Streaming'
          className={styles.middleIcons}
          onClick={() => {
            setStreaming(!streaming);
            SpeechRecognition.stopListening();
          }}
          aria-hidden='true'
        />
        <img
          src={`/images/${AnimateIcon}.svg`}
          alt='FollowHand'
          className={styles.middleIcons}
          onClick={() => {
            // Start animation
            setFollowHand(prev => !prev);
          }}
          aria-hidden='true'
        />
        <img
          src={`/images/${microphoneIcon}.svg`}
          alt='Microphone'
          className={`${styles.middleIcons} ${isMicDisabled ? styles.disabled : ''}`}
          onClick={() => {
            if (!isMicDisabled) {
              setMicrophoneOn(prev => !prev);
            }
          }}
          aria-hidden='true'
        />
      </div>
      {/* 🔥🔥🔥🔥 --Right Buttons-- 🔥🔥🔥🔥 */}
      <div className={styles.right}>
        <img
          src={`/images/${usersIcon}.svg`}
          alt='users'
          className={styles.rightIcons}
          onClick={() => {
            setShowLeftBar(!showLeftBar);
          }}
          aria-hidden='true'
        />
        <img
          src={`/images/${messageIcon}.svg`}
          alt='messages'
          className={styles.rightIcons}
          onClick={() => {
            setShowRightBar(!showRightBar);
          }}
          aria-hidden='true'
        />
      </div>
    </div>
  );
};

export default MainBottomBar;
