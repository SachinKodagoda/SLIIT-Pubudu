import HandLib from '@mediapipe/hands';
import { AnnotatedPrediction } from '@tensorflow-models/handpose';

type TReturn = {
  xVal: number | null;
  yVal: number | null;
  xLen: number | null;
  indexThumbAngle: number | null;
  indexDown: boolean | null;
  middleDown: boolean | null;
  ringDown: boolean | null;
  pinkyDown: boolean | null;
  thumbIn: boolean | null;
  distance: number | null;
};

type TFingerJoints = {
  thumb: number[];
  index: number[];
  middle: number[];
  ring: number[];
  pinky: number[];
};

// Points for finger
const fingerJoints: TFingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  index: [0, 5, 6, 7, 8],
  middle: [0, 9, 10, 11, 12],
  ring: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Infinity Gauntlet Style
const style = {
  0: { color: 'yellow', size: 15 },
  1: { color: 'gold', size: 6 },
  2: { color: 'green', size: 10 }, // green
  3: { color: 'gold', size: 6 },
  4: { color: 'gold', size: 6 },
  5: { color: 'purple', size: 10 }, // purple
  6: { color: 'gold', size: 6 },
  7: { color: 'gold', size: 6 },
  8: { color: 'gold', size: 6 },
  9: { color: 'blue', size: 10 }, // blue
  10: { color: 'gold', size: 6 },
  11: { color: 'gold', size: 6 },
  12: { color: 'gold', size: 6 },
  13: { color: 'red', size: 10 }, // red
  14: { color: 'gold', size: 6 },
  15: { color: 'gold', size: 6 },
  16: { color: 'gold', size: 6 },
  17: { color: 'orange', size: 10 }, // orange
  18: { color: 'gold', size: 6 },
  19: { color: 'gold', size: 6 },
  20: { color: 'gold', size: 6 },
};

// Draw the center of the hand -->
export const drawHandCenter = (ctx: CanvasRenderingContext2D, x: number, y: number): void => {
  if (ctx && x && y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 3 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  }
};

type TPoints = {
  x: number;
  y: number;
  z: number;
};

const find_angle = (A: TPoints, B: TPoints, C: TPoints) => {
  const AB = Math.sqrt((B.x - A.x) ** 2 + (B.y - A.y) ** 2);
  const BC = Math.sqrt((B.x - C.x) ** 2 + (B.y - C.y) ** 2);
  const AC = Math.sqrt((C.x - A.x) ** 2 + (C.y - A.y) ** 2);
  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
};

// Get Hand center -->
export const fullCalculation = (predicted: HandLib.NormalizedLandmarkList): TReturn => {
  if (predicted.length > 0) {
    const xMidSum = predicted[0].x + predicted[5].x + predicted[17].x; // x
    const yMidSum = predicted[0].y + predicted[5].y + predicted[17].y; // y
    const xVal = parseFloat((xMidSum / 3).toFixed(4));
    const yVal = parseFloat((yMidSum / 3).toFixed(4));
    const xLen = predicted[17].x - predicted[5].x;
    const indexThumbAngle = find_angle(predicted[8], predicted[5], predicted[4]) / Math.PI;
    const distance = Math.sqrt(
      (predicted[8].x - predicted[4].x) ** 2 +
        (predicted[8].y - predicted[4].y) ** 2 +
        (predicted[8].z - predicted[4].z) ** 2
    );
    return {
      xVal,
      yVal,
      xLen,
      indexThumbAngle,
      indexDown: predicted[8].y > predicted[5].y,
      middleDown: predicted[12].y > predicted[9].y,
      ringDown: predicted[16].y > predicted[13].y,
      pinkyDown: predicted[20].y > predicted[17].y,
      thumbIn: predicted[4].x < predicted[1].x,
      distance,
    };
  }
  return {
    xVal: null,
    yVal: null,
    xLen: null,
    indexThumbAngle: null,
    indexDown: null,
    middleDown: null,
    ringDown: null,
    pinkyDown: null,
    thumbIn: null,
    distance: null,
  };
};

// Draw Zooming -->
export const drawZooming = (ctx: CanvasRenderingContext2D, hand: AnnotatedPrediction[]): void => {
  if (hand.length > 0) {
    const predicted = hand[0].landmarks;
    if (predicted.length > 0) {
      ctx.beginPath();
      ctx.moveTo(predicted[8][0], predicted[8][1]);
      ctx.lineTo(predicted[5][0], predicted[5][1]);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 4;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(predicted[5][0], predicted[5][1]);
      ctx.lineTo(predicted[4][0], predicted[4][1]);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  }
};

// Draw the full hand -->
export const drawFullHand = (ctx: CanvasRenderingContext2D, hand: AnnotatedPrediction[]): void => {
  if (hand.length > 0) {
    hand.forEach((prediction: AnnotatedPrediction) => {
      const { landmarks } = prediction;
      for (let j = 0; j < Object.keys(fingerJoints).length; j += 1) {
        const finger = Object.keys(fingerJoints)[j];
        for (let k = 0; k < fingerJoints[finger].length - 1; k += 1) {
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];
          ctx.beginPath();
          ctx.moveTo(landmarks[firstJointIndex][0], landmarks[firstJointIndex][1]);
          ctx.lineTo(landmarks[secondJointIndex][0], landmarks[secondJointIndex][1]);
          ctx.strokeStyle = 'plum';
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }
      for (let i = 0; i < landmarks.length; i += 1) {
        const x = landmarks[i][0];
        const y = landmarks[i][1];
        ctx.beginPath();
        ctx.arc(x, y, style[i].size, 0, 3 * Math.PI);
        ctx.fillStyle = style[i].color;
        ctx.fill();
      }
    });
  }
};

// Draw the corners of the canvas -->
export const markCanvasCorners = (ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number): void => {
  const xMiddle = screenWidth / 2;
  const yMiddle = screenHeight / 2;
  const right = 0;
  const left = screenWidth;
  const top = 0;
  const bottom = screenHeight;

  // origin (right top)
  ctx.beginPath();
  ctx.arc(right, top, 20, 0, 3 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();

  // center (xMiddle, yMiddle)
  ctx.beginPath();
  ctx.arc(xMiddle, yMiddle, 10, 0, 3 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  // left top
  ctx.beginPath();
  ctx.arc(left, top, 10, 0, 3 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  // xMiddle top
  ctx.beginPath();
  ctx.arc(xMiddle, top, 10, 0, 3 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  // right top
  ctx.beginPath();
  ctx.arc(right, top, 10, 0, 3 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  // right yMiddle
  ctx.beginPath();
  ctx.arc(right, yMiddle, 10, 0, 3 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  // right bottom
  ctx.beginPath();
  ctx.arc(right, bottom, 10, 0, 3 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  // xMiddle bottom
  ctx.beginPath();
  ctx.arc(xMiddle, bottom, 10, 0, 3 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  // left bottom
  ctx.beginPath();
  ctx.arc(left, bottom, 10, 0, 3 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();

  // left yMiddle
  ctx.beginPath();
  ctx.arc(left, yMiddle, 10, 0, 3 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
};
