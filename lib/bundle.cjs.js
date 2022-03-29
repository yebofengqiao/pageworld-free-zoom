"use strict";var t,o,e;Object.defineProperty(exports,"__esModule",{value:!0}),exports.Corner=void 0,(t=exports.Corner||(exports.Corner={}))[t.topLeft=1]="topLeft",t[t.topRight=2]="topRight",t[t.bottomRight=-1]="bottomRight",t[t.bottomLeft=-2]="bottomLeft",exports.Edge=void 0,(o=exports.Edge||(exports.Edge={})).top="top",o.right="right",o.bottom="bottom",o.left="left",exports.Quadrant=void 0,(e=exports.Quadrant||(exports.Quadrant={}))[e.OR=0]="OR",e[e.QD1=1]="QD1",e[e.QD2=2]="QD2",e[e.QD3=3]="QD3",e[e.QD4=4]="QD4";const r={[exports.Edge.top]:[exports.Corner.topRight,exports.Corner.bottomRight,exports.Corner.topLeft],[exports.Edge.right]:[exports.Corner.bottomRight,exports.Corner.bottomLeft,exports.Corner.topRight],[exports.Edge.bottom]:[exports.Corner.bottomLeft,exports.Corner.topLeft,exports.Corner.bottomRight],[exports.Edge.left]:[exports.Corner.topLeft,exports.Corner.topRight,exports.Corner.bottomLeft]};function n(t){return{x:t.left+t.width/2,y:t.top+t.height/2}}function x(t,o){return{[exports.Corner.topLeft]:()=>({x:t.left,y:t.top}),[exports.Corner.topRight]:()=>({x:t.left+t.width,y:t.top}),[exports.Corner.bottomRight]:()=>({x:t.left+t.width,y:t.top+t.height}),[exports.Corner.bottomLeft]:()=>({x:t.left,y:t.top+t.height})}[o]()}function s(t,o){return p(x(o,t),n(o),o.ro)}function p(t,o,e){return{x:t.x*c(e)-t.y*u(e)-o.x*c(e)+o.y*u(e)+o.x,y:t.x*u(e)+t.y*c(e)-o.x*u(e)-o.y*c(e)+o.y}}function i(t,o,e){return{x:t.x*c(e)+t.y*u(e)-o.x*c(e)-o.y*u(e)+o.x,y:-t.x*u(e)+t.y*c(e)+o.x*u(e)-o.y*c(e)+o.y}}function h(t,o,e,r){let n={left:0,top:0};const x={width:2*Math.abs(o.x-t.x),height:2*Math.abs(o.y-t.y),ro:e};return r===exports.Corner.topLeft&&(n={left:t.x,top:t.y}),r===exports.Corner.topRight&&(n={left:t.x-x.width,top:t.y}),r===exports.Corner.bottomLeft&&(n={left:t.x,top:t.y-x.height}),r===exports.Corner.bottomRight&&(n={left:t.x-x.width,top:t.y-x.height}),Object.assign(Object.assign({},n),x)}function g(t,o){return{x:t.x+(o.x-t.x)/2,y:t.y+(o.y-t.y)/2}}function y(t){return t/360*2*Math.PI}function f(t){return 360*t/(2*Math.PI)}function c(t){return Math.cos(y(t))}function u(t){return Math.sin(y(t))}function a(t){return Math.pow(t,2)}function d(t,o){return{x:o.x-t.x,y:o.y-t.y}}function C(t,o){return(t.x*o.x+t.y*o.y)/Math.sqrt(Math.pow(o.x,2)+Math.pow(o.y,2))}function b(t,o){const e=Math.sqrt(a(o)/(a(t.x)+a(t.y)));return o>=0?{x:e*t.x,y:e*t.y}:{x:-e*t.x,y:-e*t.y}}function l(t,o){return{x:t.x+o.x,y:t.y+o.y}}function R(t){return Math.sqrt(a(t.x)+a(t.y))}function m(t,o){return{x:t.x-o.x,y:t.y-o.y}}function M(t,o){return e=(t.x*o.x+t.y*o.y)/(R(t)*R(o)),f(Math.acos(e));var e}function w(t,o,e){const r=g(s(-t,e),o);return h(i(o,r,e.ro),r,e.ro,t)}function L(t,o,e){const r=e.width/e.height,n=s(-t,e);let x=g(n,o),y=i(o,x,e.ro);const f=h(y,x,e.ro,t);if(f.width/f.height>r){const o=f.width-f.height*r;[exports.Corner.topRight,exports.Corner.bottomRight].indexOf(t)>-1?y.x-=o:y.x+=o}else{const o=f.height-f.width/r;[exports.Corner.topLeft,exports.Corner.topRight].indexOf(t)>-1?y.y+=o:y.y-=o}return y=p(y,x,e.ro),function(t,o,e,r){const n=g(o,t);return h(i(t,n,r),n,r,e)}(y,n,t,e.ro)}exports.ScrapEdgeMap=r,exports.cos=c,exports.getAngleByRadian=f,exports.getCenterDot=g,exports.getCornerByRect=x,exports.getNorm=R,exports.getOriginByRect=n,exports.getRadianByAngle=y,exports.getRectByAcrossCorner=function(t,o,e,r){let n={left:0,top:0};const x={width:Math.abs(o.x-t.x),height:Math.abs(o.y-t.y),ro:e};return r===exports.Corner.topLeft&&(n={left:t.x,top:t.y}),r===exports.Corner.topRight&&(n={left:o.x-x.width,top:o.y}),r===exports.Corner.bottomLeft&&(n={left:o.x,top:o.y-x.height}),r===exports.Corner.bottomRight&&(n={left:o.x-x.width,top:o.y-x.height}),Object.assign(Object.assign({},n),x)},exports.getRectByOrigin=h,exports.getRotatedCorner=s,exports.getShadow=C,exports.getVectorAngle=M,exports.getVectorByModal=b,exports.inversionRotateMatrix=i,exports.plusVector=l,exports.rotateFree=function(t,o){const e=m(t,n(o));let r=M({x:0,y:-1},e);return r=e.x>0?r:360-r,Object.assign(Object.assign({},o),{ro:r})},exports.rotateMatrix=p,exports.sin=u,exports.subVector=m,exports.vectorInDot1=d,exports.zoomCorner=function(t,o,e,r){return(t?L:w)(o,e,r)},exports.zoomEdgeFree=function(t,o,e){const n=s(r[t][1],e),x=s(r[t][0],e),p=d(n,o),y=d(n,x),f=C(p,y);let c,u,a;c=b(y,f>0?f:1),a=t===exports.Edge.top||t===exports.Edge.bottom?e.width:e.height,u=b({x:y.y,y:-y.x},a);const R=l(u,c),m={x:R.x+n.x,y:R.y+n.y},M=g(n,m);return h(i(m,M,e.ro),M,e.ro,r[t][2])},exports.zoomFreeCornerFree=w,exports.zoomLockCornerFree=L;