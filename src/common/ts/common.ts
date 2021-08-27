import { Euler, Vector3 } from '@react-three/fiber';

export type TTab = 'quantity' | 'size' | 'upload' | 'cart';
export type TInputValue = string | number | null;
export type TCurrency = 'dollar' | 'euro';
export type TPaperSize = 'A4' | 'A3' | 'A2' | 'A1';
export type TPaper = {
  prev: number;
  now: number;
  imgUrl: string;
};
export type TFigure = {
  prev: number;
  now: number;
  imgUrl: string;
};
export interface IFigurePackageObj {
  [key: string]: TFigure;
}

export interface IPaperPackageObj {
  [key: string]: TPaper;
}

export type TMenuItem = 'artists' | 'editors' | 'customers' | 'analytics' | 'settings';
export type TMenuItemArr = {
  name: TMenuItem;
  icon: string;
}[];

type TNumberArr = [number, number, number, number];
type TLandmarks = [number, number, number];
export type THand = [
  annotations: {
    indexFinger: TNumberArr[];
    middleFinger: TNumberArr[];
    palmBase: TNumberArr[];
    pinky: TNumberArr[];
    ringFinger: TNumberArr[];
    thumb: TNumberArr[];
  },
  boundingBox: {
    bottomRight: [number, number];
    topLeft: [number, number];
  },
  handInViewConfidence: number,
  landmarks: TLandmarks
];

export type TTextData = {
  text: string;
  position: Vector3;
  rotation: Euler;
  display: boolean;
  number: boolean;
  numberVal: string;
  align: number | 'center' | 'left' | 'right' | undefined;
};

export type TTextObj = {
  [index: string]: TTextData;
};
