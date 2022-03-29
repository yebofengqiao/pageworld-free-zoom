import { Corner, Dot, Edge, Rect } from './rect';
/**
 * 角的任意缩放
 * @param corner：鼠标选中的角
 * @param curPoint：currentPoint鼠标拖动到的新位置
 * @param rect
 */
export declare function zoomFreeCornerFree(corner: Corner, curPoint: Dot, rect: Rect): Rect;
/**
 * 角的锁长宽比缩放
 */
export declare function zoomLockCornerFree(corner: Corner, curPoint: Dot, rect: Rect): Rect;
export declare function zoomCorner(isLock: boolean, corner: Corner, curPoint: Dot, rect: Rect): Rect;
/**
 * 边的缩放
 */
export declare function zoomEdgeFree(edge: Edge, curPoint: Dot, rect: Rect): Rect;
/**
 * 旋转
 */
export declare function rotateFree(curPoint: Dot, rect: Rect): Rect;
