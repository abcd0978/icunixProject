import * as React from 'react';
import CircleSvg from '../../img/CircleSvg';

export interface ICircleProps {
    data:string;
    x:number;
    y:number;
}

export default function Circle (props: ICircleProps) {
  return (
       <CircleSvg data={props.data} x={props.x} y={props.y} />
  );
}
