import {
  Corner,
  Deg,
  Dot,
  Edge,
  getCenterDot, getOriginByRect,
  getRectByOrigin,
  getRotatedCorner,
  getShadow, getVectorAngle,
  getVectorByModal,
  inversionRotateMatrix, MatrixComplexT,
  plusVector,
  Rect,
  rotateMatrix,
  ScrapEdgeMap, subVector, Vector,
  vectorInDot1, ViewPortsDelta
} from './rect';

/**
 * 角的任意缩放
 * @param corner：鼠标选中的角
 * @param curPoint：currentPoint鼠标拖动到的新位置
 * @param rect
 */
export function zoomFreeCornerFree(corner: Corner, curPoint: Dot, rect: Rect): Rect {
  const sPoint = getRotatedCorner(-corner, rect);
  const newCenterPoint = getCenterDot(sPoint, curPoint);
  const newTopLeftPoint = inversionRotateMatrix(curPoint, newCenterPoint, rect.ro);
  return getRectByOrigin(newTopLeftPoint, newCenterPoint, rect.ro, corner);
}

function getRectByRotatedAcrossPoint(acrossPoint: Dot, sPoint: Dot, corner: Corner, ro: Deg): Rect {
  const newCenterPoint = getCenterDot(sPoint, acrossPoint);
  const newAcrossPoint = inversionRotateMatrix(acrossPoint, newCenterPoint, ro);
  return getRectByOrigin(newAcrossPoint, newCenterPoint, ro, corner);
}

/**
 * 角的锁长宽比缩放
 */
export function zoomLockCornerFree(corner: Corner, curPoint: Dot, rect: Rect): Rect {
  const proportion = rect.width / rect.height;
  const sPoint = getRotatedCorner(-corner, rect);
  let newCenterPoint = getCenterDot(sPoint, curPoint);
  let newAcrossPoint = inversionRotateMatrix(curPoint, newCenterPoint, rect.ro);

  // 修正tempRect
  const newRect = getRectByOrigin(newAcrossPoint, newCenterPoint, rect.ro, corner);
  if (newRect.width / newRect.height > proportion) { // width多了diffLen
    const diffLen = newRect.width - newRect.height * proportion;
    if ([Corner.topRight, Corner.bottomRight].indexOf(corner) > -1) {
      newAcrossPoint.x -= diffLen;
    } else {
      newAcrossPoint.x += diffLen;
    }
  } else {
    const diffLen = newRect.height - newRect.width / proportion;
    if ([Corner.topLeft, Corner.topRight].indexOf(corner) > -1) {
      newAcrossPoint.y += diffLen;
    } else {
      newAcrossPoint.y -= diffLen;
    }
  }

  newAcrossPoint = rotateMatrix(newAcrossPoint, newCenterPoint, rect.ro);
  return getRectByRotatedAcrossPoint(newAcrossPoint, sPoint, corner, rect.ro);
}

export function zoomCorner(isLock: boolean, corner: Corner, curPoint: Dot, rect: Rect): Rect {
  return (isLock ? zoomLockCornerFree : zoomFreeCornerFree )(corner, curPoint, rect);
}

/**
 * 边的缩放
 */
export function zoomEdgeFree(edge: Edge, curPoint: Dot, rect: Rect): Rect {
  const sPoint = getRotatedCorner(ScrapEdgeMap[edge][1], rect);
  const bPoint = getRotatedCorner(ScrapEdgeMap[edge][0], rect);

  const vector1 = vectorInDot1(sPoint, curPoint);
  const vector2 = vectorInDot1(sPoint, bPoint);
  const newDistance = getShadow(vector1, vector2); // 新的高度

  const safeDistance = newDistance > 0 ? newDistance : 1;

  let vectorH, vectorV, modal;
  vectorH = getVectorByModal(vector2, safeDistance);

  if (edge === Edge.top || edge === Edge.bottom) {
    modal = rect.width;
  } else {
    modal = rect.height;
  }
  vectorV = getVectorByModal({ x: vector2.y, y: -vector2.x }, modal);

  const tempCorner = plusVector(vectorV, vectorH);
  const rotatedTopLeftPoint = { x: tempCorner.x + sPoint.x, y: tempCorner.y + sPoint.y };
  const newCenterPoint = getCenterDot(sPoint, rotatedTopLeftPoint);
  const newTopLeftPoint = inversionRotateMatrix(rotatedTopLeftPoint, newCenterPoint, rect.ro);
  return getRectByOrigin(newTopLeftPoint, newCenterPoint, rect.ro, ScrapEdgeMap[edge][2]);
}

/**
 * 旋转
 */
export function rotateFree(curPoint: Dot, rect: Rect): Rect {
  const vectorY: Vector = { x: 0, y: -1 };
  const centerPoint = getOriginByRect(rect);
  const rotatedVector = subVector(curPoint, centerPoint);
  let angle = getVectorAngle(vectorY, rotatedVector);
  angle = rotatedVector.x > 0 ? angle : 360 - angle;
  return {
    ...rect,
    ro: angle
  }
}

// /**
//  * 编辑器视窗的处理
//  */
// export function zoomViewPorts(viewDelta: ViewPortsDelta, matrix: MatrixComplexT): MatrixComplexT {
//   const newMatrix = { ...matrix };
//   if (viewDelta.metaKey || viewDelta.ctrlKey) { // 缩放
//     if (viewDelta.deltaY > 0) { // 缩小
//
//     } else { // 放大
//
//     }
//   } else { // 拖动
//     if (viewDelta.deltaY > 0) { // 向上拖动
//
//     } else { // 向下拖动
//
//     }
//     if (viewDelta.deltaX > 0) { // 向左拖动
//
//     } else { // 向右拖动
//
//     }
//   }
// }
