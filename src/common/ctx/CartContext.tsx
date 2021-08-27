import { IFigurePackageObj, IPaperPackageObj, TCurrency, TPaperSize } from '@ts/common';
import React, { useEffect, useState } from 'react';

type TProps = {
  children: JSX.Element;
};

interface IContext {
  totalPrice: number;
  figureCount: number;
  currency: TCurrency;
  paperSize: TPaperSize;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setFigureCount: React.Dispatch<React.SetStateAction<number>>;
  setCurrency: React.Dispatch<React.SetStateAction<TCurrency>>;
  setPaperSize: React.Dispatch<React.SetStateAction<TPaperSize>>;
  figurePackageObj: IFigurePackageObj;
  paperPackageObj: IPaperPackageObj;
}

const initContext: IContext = {
  totalPrice: 79,
  figureCount: 1,
  currency: 'euro',
  paperSize: 'A4',
  setTotalPrice: () => null,
  setFigureCount: () => null,
  setCurrency: () => null,
  setPaperSize: () => null,
  figurePackageObj: {
    figure1: {
      prev: 109,
      now: 79,
      imgUrl: '/images/sample1.jpeg',
    },
    figure2: {
      prev: 139,
      now: 109,
      imgUrl: '/images/sample2.jpeg',
    },
    figure3: {
      prev: 149,
      now: 139,
      imgUrl: '/images/sample3.jpeg',
    },
    figure4: {
      prev: 199,
      now: 169,
      imgUrl: '/images/sample4.jpeg',
    },
    figure5: {
      prev: 229,
      now: 199,
      imgUrl: '/images/sample5.jpeg',
    },
    figure6: {
      prev: 259,
      now: 229,
      imgUrl: '/images/sample6.jpeg',
    },
  },
  paperPackageObj: {
    paperA4: {
      prev: 259,
      now: 229,
      imgUrl: '/images/sample6.jpeg',
    },
  },
};

export const CartContext = React.createContext<IContext>(initContext);

export const CartContextProvider = ({ children }: TProps): React.ReactElement => {
  const [totalPrice, setTotalPrice] = useState(initContext.totalPrice);
  const [currency, setCurrency] = useState(initContext.currency);
  const [figureCount, setFigureCount] = useState(initContext.figureCount);
  const [paperSize, setPaperSize] = useState(initContext.paperSize);
  const [figurePackageObj] = useState(initContext.figurePackageObj);
  const [paperPackageObj] = useState(initContext.paperPackageObj);

  useEffect(() => {
    const figurePrice = figurePackageObj[`figure${figureCount}`]?.now;
    const paperPrice = 30;
    setTotalPrice(figurePrice + paperPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [figureCount]);

  const contextValue = {
    totalPrice,
    figureCount,
    currency,
    paperSize,
    setTotalPrice,
    setFigureCount,
    setCurrency,
    setPaperSize,
    figurePackageObj,
    paperPackageObj,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
