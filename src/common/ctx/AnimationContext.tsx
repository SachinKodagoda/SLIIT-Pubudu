import { TTextObj } from '@ts/common';
import React, { useEffect, useState } from 'react';

type TProps = {
  children: JSX.Element;
};

type TModelItems = 'not_selected' | 'heart';
interface IContext {
  videoWidth: number;
  videoHeight: number;
  containerWidth: number;
  containerHeight: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  zoom: number;
  x: number;
  y: number;
  handX: number;
  handY: number;
  action: boolean;
  animate: boolean;
  followHand: boolean;
  textObj: TTextObj;
  selectedModel: TModelItems;
  displayAll: boolean;
  displayAllNumbers: boolean;
  setVideoWidth: React.Dispatch<React.SetStateAction<number>>;
  setVideoHeight: React.Dispatch<React.SetStateAction<number>>;
  setContainerHeight: React.Dispatch<React.SetStateAction<number>>;
  setContainerWidth: React.Dispatch<React.SetStateAction<number>>;
  setRotateX: React.Dispatch<React.SetStateAction<number>>;
  setRotateY: React.Dispatch<React.SetStateAction<number>>;
  setRotateZ: React.Dispatch<React.SetStateAction<number>>;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
  setHandX: React.Dispatch<React.SetStateAction<number>>;
  setHandY: React.Dispatch<React.SetStateAction<number>>;
  setAction: React.Dispatch<React.SetStateAction<boolean>>;
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
  setFollowHand: React.Dispatch<React.SetStateAction<boolean>>;
  setTextObj: React.Dispatch<React.SetStateAction<TTextObj>>;
  setSelectedModel: React.Dispatch<React.SetStateAction<TModelItems>>;
  setDisplayAll: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayAllNumbers: React.Dispatch<React.SetStateAction<boolean>>;
}

const initContext: IContext = {
  videoWidth: 0,
  videoHeight: 0,
  containerWidth: 0,
  containerHeight: 0,
  rotateX: (-Math.PI * 4) / 2,
  rotateY: -Math.PI / 2,
  rotateZ: 0,
  zoom: 1,
  x: 0,
  y: 0,
  handX: 0,
  handY: 0,
  action: false,
  animate: false,
  followHand: false,
  textObj: {},
  selectedModel: 'heart',
  displayAll: true,
  displayAllNumbers: true,
  setVideoWidth: () => null,
  setVideoHeight: () => null,
  setContainerHeight: () => null,
  setContainerWidth: () => null,
  setRotateX: () => 0,
  setRotateY: () => 0,
  setRotateZ: () => 0,
  setZoom: () => null,
  setX: () => null,
  setY: () => null,
  setHandX: () => 0,
  setHandY: () => 0,
  setAction: () => false,
  setAnimate: () => false,
  setFollowHand: () => false,
  setTextObj: () => null,
  setSelectedModel: () => 'not_selected',
  setDisplayAll: () => false,
  setDisplayAllNumbers: () => false,
};

export const AnimationContext = React.createContext<IContext>(initContext);

export const AnimationContextProvider = ({ children }: TProps): React.ReactElement => {
  const [videoWidth, setVideoWidth] = useState(initContext.videoWidth);
  const [videoHeight, setVideoHeight] = useState(initContext.videoHeight);
  const [containerHeight, setContainerHeight] = useState(initContext.containerHeight);
  const [containerWidth, setContainerWidth] = useState(initContext.containerWidth);
  const [rotateX, setRotateX] = useState(initContext.rotateX);
  const [rotateY, setRotateY] = useState(initContext.rotateY);
  const [rotateZ, setRotateZ] = useState(initContext.rotateZ);
  const [zoom, setZoom] = useState(initContext.zoom);
  const [x, setX] = useState(initContext.x);
  const [y, setY] = useState(initContext.y);
  const [handX, setHandX] = useState(initContext.handX);
  const [handY, setHandY] = useState(initContext.handY);
  const [action, setAction] = useState(initContext.action);
  const [animate, setAnimate] = useState(initContext.animate);
  const [followHand, setFollowHand] = useState(initContext.followHand);
  const [textObj, setTextObj] = useState(initContext.textObj);
  const [selectedModel, setSelectedModel] = useState(initContext.selectedModel);
  const [displayAll, setDisplayAll] = useState(initContext.displayAll);
  const [displayAllNumbers, setDisplayAllNumbers] = useState(initContext.displayAllNumbers);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('heart: =', selectedModel);
    if (selectedModel === 'heart') {
      setTextObj({
        left_ventricle: {
          text: 'left ventricle',
          position: [80, -100, -130],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(1)',
          align: 'left',
        },
        left_cardiac_vain: {
          text: 'Left cardiac vain',
          position: [110, -50, -60],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(2)',
          align: 'left',
        },
        left_atrium: {
          text: 'Left atrium',
          position: [60, 0, -100],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(3)',
          align: 'left',
        },
        left_pulmonary_artery2: {
          text: 'Inferior left pulmonary veins',
          position: [0, 30, -140],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(4)',
          align: 'left',
        },
        left_pulmonary_artery1: {
          text: 'Superior left pulmonary veins',
          position: [40, 60, -120],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(5)',
          align: 'left',
        },
        left_pulmonary_artery: {
          text: 'Left pulmonary artery',
          position: [-10, 80, -100],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(6)',
          align: 'left',
        },
        aortic_arch: {
          text: 'Aortic arch',
          position: [20, 120, -28],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(7)',
          align: 'left',
        },
        left_subclavian_artery: {
          text: 'Left subclavian artery',
          position: [-20, 150, -32],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(8)',
          align: 'left',
        },
        left_common_carotid_artery: {
          text: 'Left common carotid artery',
          position: [4, 170, -10],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(9)',
          align: 'left',
        },
        brachiocephalic_trunk: {
          text: 'Brachiocephalic trunk',
          position: [40, 170, 10],
          rotation: [0, -350, 0],
          display: false,
          number: false,
          numberVal: '(10)',
          align: 'right',
        },
        superior_vena_cava: {
          text: 'Superior vena cava ',
          position: [30, 100, 90],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(11)',
          align: 'right',
        },
        right_pulmonary_artery: {
          text: 'Right pulmonary artery',
          position: [-54, 65, 120],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(12)',
          align: 'right',
        },
        right_pulmonary_vein2: {
          text: 'Superior Right pulmonary vein',
          position: [-60, 24, 130],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(13)',
          align: 'right',
        },
        right_pulmonary_vein1: {
          text: 'Inferior right pulmonary vein',
          position: [-70, -10, 120],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(14)',
          align: 'right',
        },
        right_ventricle: {
          text: 'Right ventricle',
          position: [20, -110, 90],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(15)',
          align: 'right',
        },
        inferior_vena_cava: {
          text: 'Inferior vena cava',
          position: [-50, -160, 80],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(16)',
          align: 'right',
        },
        right_atrium: {
          text: 'Right atrium',
          position: [55, 10, 111],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(17)',
          align: 'right',
        },
        right_coronary_artery: {
          text: 'Right coronary artery',
          position: [112, -20, 41],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(18)',
          align: 'right',
        },
        pulmonary_trunk: {
          text: 'Pulmonary trunk',
          position: [110, 30, 10],
          rotation: [0, -300, 0],
          display: false,
          number: false,
          numberVal: '(19)',
          align: 'right',
        },
      });
    }
  }, [selectedModel]);

  useEffect(() => {
    setHandX(videoWidth / 2);
    setHandY(videoHeight / 2);
  }, [videoWidth, videoHeight]);

  const contextValue = {
    videoWidth,
    videoHeight,
    containerWidth,
    containerHeight,
    rotateX,
    rotateY,
    rotateZ,
    zoom,
    x,
    y,
    handX,
    handY,
    action,
    animate,
    followHand,
    textObj,
    selectedModel,
    displayAll,
    displayAllNumbers,
    setVideoWidth,
    setVideoHeight,
    setContainerHeight,
    setContainerWidth,
    setRotateX,
    setRotateY,
    setRotateZ,
    setZoom,
    setX,
    setY,
    setHandX,
    setHandY,
    setAction,
    setAnimate,
    setFollowHand,
    setTextObj,
    setSelectedModel,
    setDisplayAll,
    setDisplayAllNumbers,
  };

  return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>;
};
