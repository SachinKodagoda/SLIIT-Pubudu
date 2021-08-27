import EllipsisAnimator from '@components/EllipsisAnimator';
import { AudioContext } from '@ctx/AudioContext';
import styles from '@layouts_style/MainRightBar.module.sass';
import React, { useContext } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';

const MainRightBar = (): JSX.Element => {
  const { action, messageArray, microphoneOn } = useContext(AudioContext);
  const { transcript } = useSpeechRecognition();
  let text = 'Turn your MIC on';
  if (microphoneOn) {
    text = '';
  }

  return (
    <div className={styles.videoMenuRight}>
      <div className={styles.chatItemCover}>
        {messageArray.map((item, index) => {
          if (item.type === 'key' && item.message === 'stop') {
            return (
              <div key={`chatItem-key-${index + 1}`} className={styles.keyItem}>
                {item.message}
              </div>
            );
          }
          if (item.type === 'key' && item.message !== 'stop') {
            return (
              <div key={`chatItem-key-stop-${index + 1}`} className={styles.hiddenKey}>
                {item.message}
              </div>
            );
          }
          return (
            <div key={`chatItem-other-${index + 1}`} className={styles.chatItem}>
              {item.message.replace('stop', '')}
            </div>
          );
        })}
      </div>

      {microphoneOn && (
        <div className={styles.waiting}>
          <EllipsisAnimator text='Listening' />
          <div>{action ? `${action}` : `${text}`}</div>
        </div>
      )}
      <div className={styles.chatInput}>
        <div className={styles.chatInputItem}>{transcript.replace('stop', '')}</div>
      </div>
    </div>
  );
};

export default MainRightBar;
