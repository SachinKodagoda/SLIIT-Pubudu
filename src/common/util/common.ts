export const leftTopToCenter = (value: number, length: number, scaler: number, extra: number): number => {
  return length / (2 * scaler) - (value + extra) / scaler;
};

// PI/2 = 90 Degree
// PI = 180 Degree

// 0 Degree = 0 Radian **
// 30 Degree = 0.523599 Radian
// 45 Degree = 0.785398 Radian
// 60 Degree = 1.0472 Radian
// 90 Degree = 1.5708 Radian ***
// 120 Degree = 2.0944 Radian
// 150 Degree = 2.61799 Radian
// 180 Degree = 3.14159 Radian ***
// 270 Degree = 4.71239 Radian ***
// 360 Degree = 6.28319 Radian ***

export const toDegree = (radian: number): number => (radian * 180) / Math.PI;

export const toRadian = (degree: number): number => (degree * Math.PI) / 180;

export const toFixedVal = (val: number, base: number): number => +val.toFixed(base);
