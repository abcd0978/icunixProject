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
  if(cNull(r) !== 0){
    dy1 = y1+r;
    dy2 = y2-r;
  }
  function curvedVertical(x1,y1,x2,y2):string{
    let dData = [];
    let Mx = x1 + (x2-x1) / 2;
    let My = y1 + (y2-y1) / 2;
    dData.push('M',x1,y1);
    dData.push('C',x1,My,x2,My,x2,y2);
    return dData.join(' ');
  }
  function dist(x1, x2, y1, y2){
    return Math.sqrt( (x2-=x1)*x2 + (y2-=y1)*y2 );
}

  return (
    <VerticalCurvedLineSvg PathTag={curvedVertical(dx1, dy1, dx2, dy2)} distance={dist(dx1, dx2, dy1, dy2)} />
  );
}

//test