import ThreeWorld from '@components/ThreeWorld';
import { AnimationContext } from '@ctx/AnimationContext';
import styles from '@layouts_style/MainMiddleArea.module.sass';
import * as cam from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils/';
import HandLib, { Hands, InputImage } from '@mediapipe/hands';
import { fullCalculation } from '@util/handPose';
import React, { useContext, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

type TProps = {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  webcamRef: React.MutableRefObject<Webcam | null>;
};

let camera = null;

const MainMiddleArea = ({ canvasRef, webcamRef }: TProps): JSX.Element => {
  const {
    setVideoHeight,
    setVideoWidth,
    setZoom,
    setX,
    setY,
    setRotateX,
    setRotateY,
    containerHeight,
    containerWidth,
    setContainerWidth,
    setContainerHeight,
    action,
    followHand,
    setFollowHand,
    setHandX,
    setHandY,
  } = useContext(AnimationContext);

  const showWebCam = true;
  const mounted = useRef(false);
  const followHandRef = useRef(false);

  useEffect(() => {
    mounted.current = action;
    return () => {
      mounted.current = false;
    };
  }, [action]);

  useEffect(() => {
    followHandRef.current = followHand;
    return () => {
      followHandRef.current = false;
    };
  }, [followHand]);

  const runMediaPipe = async () => {
    if (webcamRef && canvasRef && webcamRef.current && canvasRef.current && webcamRef.current.video) {
      const hands = new Hands({
        locateFile: file => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });

      hands.setOptions({
        maxNumHands: 2,
        minDetectionConfidence: 0.8,
        minTrackingConfidence: 0.8,
      });

      hands.onResults(results => {
        const videoReference = webcamRef?.current?.video as HTMLVideoElement;
        const canvasReference = canvasRef?.current as HTMLCanvasElement;
        const { videoWidth } = videoReference;
        const { videoHeight } = videoReference;
        videoReference.width = videoWidth;
        videoReference.height = videoHeight;
        canvasReference.width = videoWidth;
        canvasReference.height = videoHeight;
        setVideoWidth(videoWidth);
        setVideoHeight(videoHeight);
        const canvasCtx = canvasRef.current?.getContext('2d');
        canvasCtx?.save();
        canvasCtx?.clearRect(0, 0, videoWidth, videoHeight);
        canvasCtx?.drawImage(results.image, 0, 0, videoWidth, videoHeight);
        if (mounted.current && results.multiHandLandmarks) {
          for (const landmarks of results.multiHandLandmarks) {
            const { indexDown, pinkyDown, ringDown, middleDown, xVal, yVal, indexThumbAngle, distance } =
              fullCalculation(landmarks);
            let left = false;
            let up = false;

            // 🏃‍♂️ - 👋 X,Y Position 🔥🔥🔥🔥
            if (xVal !== null && yVal !== null) {
              setX(preXVal => {
                const newX = xVal * videoWidth;
                left = preXVal - newX > 0 ? true : false;
                return newX;
              });
              setY(preYVal => {
                const newY = yVal * videoHeight;
                up = preYVal - newY > 0 ? true : false;
                return newY;
              });
              if (followHandRef.current) {
                setHandX(xVal * videoWidth);
                setHandY(yVal * videoHeight);
              }
            }

            // 🔍 - ✋ Zoom 🔥🔥🔥🔥
            if (indexThumbAngle && indexThumbAngle > 0.7) {
              setZoom(zoom => {
                if (left) {
                  return zoom + 0.05;
                }
                return zoom - 0.05 > 1 ? zoom - 0.05 : 1;
              });
              if (canvasCtx) {
                drawConnectors(canvasCtx, [landmarks[8], landmarks[5], landmarks[4]], HandLib.HAND_CONNECTIONS, {
                  color: '#ff0000',
                  lineWidth: 10,
                });
              }
            }

            // 🔁 - 🤏 Rotate around Y axis 🔥🔥🔥🔥
            if (distance && distance < 0.1) {
              setRotateY(prevRY => {
                if (left) {
                  return prevRY + 0.05;
                }
                return prevRY - 0.05;
              });
              if (canvasCtx) {
                drawLandmarks(canvasCtx, [landmarks[8], landmarks[4]], {
                  color: '#ff0000',
                  lineWidth: 30,
                });
              }
            }

            // 🔃 -👆 Rotate around X axis 🔥🔥🔥🔥
            if (middleDown && ringDown && pinkyDown) {
              setRotateX(prevRX => {
                if (up) {
                  return prevRX - 0.05;
                }
                return prevRX + 0.05;
              });
            }

            // 🤟 Hand follow stop 🔥🔥🔥🔥
            if (indexDown && middleDown && ringDown && pinkyDown !== null && !pinkyDown) {
              setFollowHand(false);
            }
          }
        }
        if (canvasCtx) {
          canvasCtx.restore();
        }
      });

      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current?.video as unknown as InputImage });
        },
      });

      camera.start();
    }
  };

  useEffect(() => {
    runMediaPipe();
  }, [webcamRef, canvasRef]);

  useEffect(() => {
    if (canvasRef.current) {
      const temp = canvasRef.current as unknown as HTMLDivElement;
      setContainerWidth(temp.clientWidth);
      setContainerHeight(temp.clientHeight);
    }
  }, [canvasRef]);

  return (
    <div className={styles.fullCover}>
      {showWebCam && (
        <Webcam
          ref={webcamRef}
          className={styles.videoObject}
          screenshotFormat='image/jpeg'
          mirrored
          width={containerWidth}
          height={containerHeight}
          videoConstraints={{ width: containerWidth, height: containerHeight }}
        />
      )}
      <canvas ref={canvasRef} className={styles.canvasObject} />
      <ThreeWorld />
    </div>
  );
};

export default MainMiddleArea;
