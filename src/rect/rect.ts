/**
 * 对Rect的建模
 */
export enum Corner { // Rect的四个角
  topLeft = 1,
  topRight = 2,
  bottomRight = -1,
  bottomLeft = -2,
}

export enum Edge { // Rect的四个棱
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

export enum Quadrant {
  OR,
  QD1,
  QD2,
  QD3,
  QD4,
}

export const ScrapEdgeMap = { // 顺时针方向的切边对应的两个点
  [Edge.top]: [Corner.topRight, Corner.bottomRight, Corner.topLeft],
  [Edge.right]: [Corner.bottomRight, Corner.bottomLeft, Corner.topRight],
  [Edge.bottom]: [Corner.bottomLeft, Corner.topLeft, Corner.bottomRight],
  [Edge.left]: [Corner.topLeft, Corner.topRight, Corner.bottomLeft],
}

export type Dot = { // 视窗左手系坐标
  x: number; // left
  y: number;
}

export type ViewPortsDelta = {
  deltaX: number,
  deltaY: number,
  metaKey: boolean,
  ctrlKey: boolean,
}

/**
 * 向量的复合变换矩阵
 * [ vertX horX tranX
 *   vertY horY tranY
 *   0     0    1     ]
 */
export type MatrixComplexT = {
  vertX: number,
  vertY: number,
  horX: number,
  horY: number,
  tranX: number,
  tranY: number
}

/**
 * 视窗标准矩形：视窗下的标准图形有两个特征
 * 1、用以下参数描述图形：宽、高、左上角点、顺时钟方向旋转
 * 2、左手系垂直坐标系
 */
export type Rect = {
  width: number;
  height: number;
  left: number;
  top: number;
  ro: number;
}

export type Origin = Dot;

export type TopLeftDot = Dot;

export type Vector = Dot;

export type Deg = number; // 0 —— 360

export type Rad = number; // 0 —— 2Math.PI

/**
 * 获取Rect(视窗标准矩形)的旋转原点
 * @param rect
 */
export function getOriginByRect(rect: Rect): Origin {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  }
}

/**
 * 获取Rect(视窗标准矩阵形)的角向量
 */
export function getCornerByRect(rect: Rect, corner: Corner): Vector {
  return ({
    [Corner.topLeft]: () => ({ x: rect.left, y: rect.top }),
    [Corner.topRight]: () => ({ x: rect.left + rect.width, y: rect.top }),
    [Corner.bottomRight]: () => ({ x: rect.left + rect.width, y: rect.top + rect.height }),
    [Corner.bottomLeft]: () => ({ x: rect.left, y: rect.top + rect.height })
  })[corner]();
}

/**
 * 获取旋转后的角向量
 */
export function getRotatedCorner(corner: Corner, rect: Rect): Vector {
  return rotateMatrix(getCornerByRect(rect, corner), getOriginByRect(rect), rect.ro);
}

/**
 * 非标准坐标系旋转-复合变换 平移 -> 旋转 -> 平移
 * @param vector
 * @param origin
 * @param angle
 */
export function rotateMatrix(vector: Vector, origin: Origin, angle: Deg): Vector {
  return {
    x: vector.x * cos(angle) - vector.y * sin(angle) - origin.x * cos(angle) + origin.y * sin(angle) + origin.x,
    y: vector.x * sin(angle) + vector.y * cos(angle) - origin.x * sin(angle) - origin.y * cos(angle) + origin.y
  }
}

/**
 * 非标准坐标系逆旋转-复合变换 平移 -> 逆旋转 -> 平移
 */
export function inversionRotateMatrix(vector: Vector, origin: Origin, angle: Deg): Vector {
  return {
    x: vector.x * cos(angle) + vector.y * sin(angle) - origin.x * cos(angle) - origin.y * sin(angle) + origin.x,
    y: -vector.x * sin(angle) + vector.y * cos(angle) + origin.x * sin(angle) - origin.y * cos(angle) + origin.y
  }
}

/**
 * 生成rect
 */
export function getRectByOrigin(cornerDot: Dot, origin: Dot, angle: Deg, corner: Corner): Rect {
  let topLeftPoint = {
    left: 0,
    top: 0,
  }
  const rect = {
    width: Math.abs(origin.x - cornerDot.x) * 2,
    height: Math.abs(origin.y - cornerDot.y) * 2,
    ro: angle,
  }
  if (corner === Corner.topLeft) {
    topLeftPoint = {
      left: cornerDot.x,
      top: cornerDot.y,
    }
  }
  if (corner === Corner.topRight) {
    topLeftPoint = {
      left: cornerDot.x - rect.width,
      top: cornerDot.y,
    }
  }
  if (corner === Corner.bottomLeft) {
    topLeftPoint = {
      left: cornerDot.x,
      top: cornerDot.y - rect.height,
    }
  }
  if (corner === Corner.bottomRight) {
    topLeftPoint = {
      left: cornerDot.x - rect.width,
      top: cornerDot.y - rect.height
    }
  }
  return { ...topLeftPoint, ...rect };
}

export function getRectByAcrossCorner(cornerDot: Dot, acrossDot: Dot, angle: Deg, corner: Corner): Rect {
  let topLeftPoint = { left: 0, top: 0 };
  const rect = {
    width: Math.abs(acrossDot.x - cornerDot.x),
    height: Math.abs(acrossDot.y - cornerDot.y),
    ro: angle,
  }
  if (corner === Corner.topLeft) {
    topLeftPoint = {
      left: cornerDot.x,
      top: cornerDot.y,
    }
  }
  if (corner === Corner.topRight) {
    topLeftPoint = {
      left: acrossDot.x - rect.width,
      top: acrossDot.y,
    }
  }
  if (corner === Corner.bottomLeft) {
    topLeftPoint = {
      left: acrossDot.x,
      top: acrossDot.y - rect.height,
    }
  }
  if (corner === Corner.bottomRight) {
    topLeftPoint = {
      left: acrossDot.x - rect.width,
      top: acrossDot.y - rect.height,
    }
  }
  return { ...topLeftPoint, ...rect };
}

/**
 * ===========坐标系相关的工具========
 */
/**
 * 获取两个点的中点
 * @param p1
 * @param p2
 */
export function getCenterDot(p1: Dot, p2: Dot): Dot {
  return {
    x: p1.x + ((p2.x - p1.x) / 2),
    y: p1.y + ((p2.y - p1.y) / 2)
  }
}

/**
 * ============数学公式运算简化==========
 */
/**
 * angle -> radian 角度(0 - 360) -> 弧度(0 - 2Math.PI)
 */
export function getRadianByAngle(angle: Deg): Rad {
  return angle / 360 * 2 * Math.PI;
}

export function getAngleByRadian(rad: Rad): Deg {
  return rad * 360 / (2 * Math.PI) ;
}

/**
 * 保留后4位即可
 * @param angle
 */
export function cos(angle: Deg): number {
  return Math.cos(getRadianByAngle(angle))
}

export function sin(angle: Deg): number {
  return Math.sin(getRadianByAngle(angle))
}

function square(n: number): number {
  return Math.pow(n, 2);
}

function arcCos(rad: Rad): Deg {
  return getAngleByRadian(Math.acos(rad));
}

/**
 * ==============关于向量的运算==============
 */

/**
 * 相对于dot1为坐标系原点的相对向量
 */
export function vectorInDot1(dot1: Dot, dot2: Dot): Dot {
  return {
    x: dot2.x - dot1.x,
    y: dot2.y - dot1.y
  }
}

/**
 * 计算vector1在vector2的投影
 */
export function getShadow(vector1: Vector, vector2: Vector): number {
  return (vector1.x * vector2.x + vector1.y * vector2.y) / Math.sqrt(Math.pow(vector2.x, 2) + Math.pow(vector2.y, 2));
}

/**
 * 根据模和同向的向量求向量
 */
export function getVectorByModal(vector: Vector, modal: number): Vector {
  const t = Math.sqrt(square(modal) / (square(vector.x) + square(vector.y)));
  return modal >= 0 ? { x: t * vector.x, y: t * vector.y } : { x: -t * vector.x, y: -t * vector.y };
}

/**
 * 向量加法
 */
export function plusVector(vector1: Vector, vector2: Vector): Vector {
  return { x: vector1.x + vector2.x, y: vector1.y + vector2.y };
}

/**
 * 向量的模
 */
export function getNorm(vector: Vector): number {
  return Math.sqrt(square(vector.x) + square(vector.y));
}

/**
 * 向量减法 vector1 - vector2
 */
export function subVector(vector1: Vector, vector2: Vector): Vector {
  return { x: vector1.x - vector2.x, y: vector1.y - vector2.y };
}

/**
 * 求两个向量的夹角
 */
export function getVectorAngle(vector1: Vector, vector2: Vector): Deg {
  return arcCos((vector1.x * vector2.x + vector1.y * vector2.y) / (getNorm(vector1) * getNorm(vector2)));
}
