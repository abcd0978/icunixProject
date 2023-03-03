import * as React from 'react';
import './CircleSvg.css';

export interface ICircleSvgProps {
    data:string;
    x:number;
    y:number;
}
function filterDigits(data){
    if(Math.log10(data) > 5){
        return 6
    }else{
        return 9
    }
}
/**
 * @param {string} data not allow number over 10m
 */
export default function CircleSvg (props: ICircleSvgProps) {
  return (
        <g id="Circle">
            <circle
                stroke="#010101"
                fill="white"
                cx={props.x}
                cy={props.y}
                r="10">
            </circle>
            <text 
                x={props.x}
                y={props.y}
                textAnchor="middle" 
                stroke="#000000"
                strokeWidth=".1px" 
                dy=".3em"
                fontSize={filterDigits(props.data)}
                >
                    {props.data}
            </text>
        </g>
  );
}
