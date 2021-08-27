import MainBottomBar from '@layouts/MainBottomBar';
import MainLeftBar from '@layouts/MainLeftBar';
import MainMiddleArea from '@layouts/MainMiddleArea';
import MainMiddlePlaceHolder from '@layouts/MainMiddlePlaceHolder';
import MainRightBar from '@layouts/MainRightBar';
import styles from '@pages_style/index.module.sass';
import '@tensorflow/tfjs-backend-webgl';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const Index = (): JSX.Element => {
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [videoOn, setVideoOn] = useState(false);
  const [showLeftBar, setShowLeftBar] = useState(true);
  const [showRightBar, setShowRightBar] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <div className={styles.videoContainerInner}>
          {showLeftBar && <MainLeftBar />}
          <div className={styles.videoMenuMiddle}>
            {videoOn ? <MainMiddleArea canvasRef={canvasRef} webcamRef={webcamRef} /> : <MainMiddlePlaceHolder />}
          </div>
          {showRightBar && <MainRightBar />}
        </div>
      </div>
      <MainBottomBar
        videoOn={videoOn}
        showLeftBar={showLeftBar}
        showRightBar={showRightBar}
        setVideoOn={val => setVideoOn(val)}
        setShowLeftBar={val => setShowLeftBar(val)}
        setShowRightBar={val => setShowRightBar(val)}
      />
    </div>
  );
};

export default Index;
