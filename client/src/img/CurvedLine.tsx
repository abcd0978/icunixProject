import * as React from 'react';
import { cNull } from '../util/cNull';
import './CurvedLine.css';
export interface ICurvedLineSvgProps {
    PathTag?:string;
    distance:number;
}
/**
 * @param {number} r when Line is used for connecting Circles of same radius, 
 */ 
// export default function HorizontalCurvedLineSvg ({x1,y1,x2,y2,r}: ICurvedLineSvgProps) {
//     let radius = r;
//     let dx1=x1, dy1=y1, dx2=x2, dy2=y2;
//     if(cNull(r) !== 0){
//         dy1 = y1+r;
//         dy2 = y2-r;
//     }
//     return (
//     <line x1={dx1} y1={dy1} x2={dx2} y2={dy2} stroke="black" />
//     );
// }
/**
 * @param {number} r when Line is used for connecting Circles of same radius, 
 */ 
export default function VerticalCurvedLineSvg ({PathTag,distance}: ICurvedLineSvgProps) {

    return (
        <g id="CurvedLine">
            <>
                <path d={PathTag} strokeDasharray={Math.ceil(distance)+1} strokeDashoffset={Math.ceil(distance)+1}/>
            </>
        </g>
    );
}