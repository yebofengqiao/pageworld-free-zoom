/**
 * 对Rect的建模
 */
export declare enum Corner {
    topLeft = 1,
    topRight = 2,
    bottomRight = -1,
    bottomLeft = -2
}
export declare enum Edge {
    top = "top",
    right = "right",
    bottom = "bottom",
    left = "left"
}
export declare enum Quadrant {
    OR = 0,
    QD1 = 1,
    QD2 = 2,
    QD3 = 3,
    QD4 = 4
}
export declare const ScrapEdgeMap: {
    top: Corner[];
    right: Corner[];
    bottom: Corner[];
    left: Corner[];
};
export declare type Dot = {
    x: number;
    y: number;
};
export declare type ViewPortsDelta = {
    deltaX: number;
    deltaY: number;
    metaKey: boolean;
    ctrlKey: boolean;
};
/**
 * 向量的复合变换矩阵
 * [ vertX horX tranX
 *   vertY horY tranY
 *   0     0    1     ]
 */
export declare type MatrixComplexT = {
    vertX: number;
    vertY: number;
    horX: number;
    horY: number;
    tranX: number;
    tranY: number;
};
/**
 * 视窗标准矩形：视窗下的标准图形有两个特征
 * 1、用以下参数描述图形：宽、高、左上角点、顺时钟方向旋转
 * 2、左手系垂直坐标系
 */
export declare type Rect = {
    width: number;
    height: number;
    left: number;
    top: number;
    ro: number;
};
export declare type Origin = Dot;
export declare type TopLeftDot = Dot;
export declare type Vector = Dot;
export declare type Deg = number;
export declare type Rad = number;
/**
 * 获取Rect(视窗标准矩形)的旋转原点
 * @param rect
 */
export declare function getOriginByRect(rect: Rect): Origin;
/**
 * 获取Rect(视窗标准矩阵形)的角向量
 */
export declare function getCornerByRect(rect: Rect, corner: Corner): Vector;
/**
 * 获取旋转后的角向量
 */
export declare function getRotatedCorner(corner: Corner, rect: Rect): Vector;
/**
 * 非标准坐标系旋转-复合变换 平移 -> 旋转 -> 平移
 * @param vector
 * @param origin
 * @param angle
 */
export declare function rotateMatrix(vector: Vector, origin: Origin, angle: Deg): Vector;
/**
 * 非标准坐标系逆旋转-复合变换 平移 -> 逆旋转 -> 平移
 */
export declare function inversionRotateMatrix(vector: Vector, origin: Origin, angle: Deg): Vector;
/**
 * 生成rect
 */
export declare function getRectByOrigin(cornerDot: Dot, origin: Dot, angle: Deg, corner: Corner): Rect;
export declare function getRectByAcrossCorner(cornerDot: Dot, acrossDot: Dot, angle: Deg, corner: Corner): Rect;
/**
 * ===========坐标系相关的工具========
 */
/**
 * 获取两个点的中点
 * @param p1
 * @param p2
 */
export declare function getCenterDot(p1: Dot, p2: Dot): Dot;
/**
 * ============数学公式运算简化==========
 */
/**
 * angle -> radian 角度(0 - 360) -> 弧度(0 - 2Math.PI)
 */
export declare function getRadianByAngle(angle: Deg): Rad;
export declare function getAngleByRadian(rad: Rad): Deg;
/**
 * 保留后4位即可
 * @param angle
 */
export declare function cos(angle: Deg): number;
export declare function sin(angle: Deg): number;
/**
 * ==============关于向量的运算==============
 */
/**
 * 相对于dot1为坐标系原点的相对向量
 */
export declare function vectorInDot1(dot1: Dot, dot2: Dot): Dot;
/**
 * 计算vector1在vector2的投影
 */
export declare function getShadow(vector1: Vector, vector2: Vector): number;
/**
 * 根据模和同向的向量求向量
 */
export declare function getVectorByModal(vector: Vector, modal: number): Vector;
/**
 * 向量加法
 */
export declare function plusVector(vector1: Vector, vector2: Vector): Vector;
/**
 * 向量的模
 */
export declare function getNorm(vector: Vector): number;
/**
 * 向量减法 vector1 - vector2
 */
export declare function subVector(vector1: Vector, vector2: Vector): Vector;
/**
 * 求两个向量的夹角
 */
export declare function getVectorAngle(vector1: Vector, vector2: Vector): Deg;
