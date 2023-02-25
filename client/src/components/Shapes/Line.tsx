import * as React from 'react';
import LineSvg from '../../img/LineSvg';
import VerticalCurvedLineSvg from '../../img/CurvedLine';
import { cNull } from '../../util/cNull';

export interface ILineProps {
  x1:number;
  x2:number;
  y1:number;
  y2:number;
  r?:number;
}

export default function Line ({x1,y1,x2,y2,r}: ILineProps) {
  let linePath = document.querySelector('svg #CurvedLine');
  let path:React.SVGProps<SVGPathElement>;
  let animation:React.SVGProps<SVGElement>;
  let dx1 = x1 , dy1=y1 ,dx2 = x2, dy2 = y2;
  function curvedVertical(x1,y1,x2,y2):string{
    let dData = [];
    let Mx = x1 + (x2-x1) / 2;
    let My = y1 + (y2-y1) / 2;
    dData.push('M',x1,y1);
    dData.push('C',x1,My,x2,My,x2,y2) 
    console.log("함수 결과값"+dData.join(' '));
    return dData.join(' ');
  }
  if(cNull(r) !== 0){
    dy1 = y1+r;
    dy2 = y2-r;
}
  path.d = curvedVertical(dx1, dy1, dx2, dy2);
  path.strokeDasharray =  path.pathLength;
  path.strokeDashoffset = path.pathLength;
  animation.attributeName = "stroke-dashoffset"
  animation.begin = "0s"
  animation.dur = "4s"
  animation.to = "0"


  return (
    <VerticalCurvedLineSvg PathTag={path} AnimateTag={animation} />
  );
}
