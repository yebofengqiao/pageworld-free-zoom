# @pageworld/freezoom v1.0.0

## Installation

Using pnpm:

```shell
pnpm i @pageworld/freezoom
```

## Types

```ts
/* the four corner of a rect */
enum Corner {
  topLeft = 1,
  topRight = 2,
  bottomRight = -1,
  bottomLeft = -2,
}

enum Edge {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}

type Rect = {
  width: number;
  height: number;
  left: number;
  top: number;
  ro: number;
}
```

## Using

### zoomFreeCornerFree

```ts
declare function zoomFreeCornerFree(corner: Corner, curPoint: Dot, rect: Rect): Rect;
```

### zoomLockCornerFree

```ts
declare function zoomLockCornerFree(corner: Corner, curPoint: Dot, rect: Rect): Rect;
```
### zoomEdgeFree

```ts
declare function zoomEdgeFree(edge: Edge, curPoint: Dot, rect: Rect): Rect;
```
