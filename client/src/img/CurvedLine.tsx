import * as React from 'react';
import { cNull } from '../util/cNull';

export interface ICurvedLineSvgProps {
    PathTag?:React.SVGProps<SVGElement>;
    AnimateTag:React.SVGProps<SVGElement>;
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
export default function VerticalCurvedLineSvg ({PathTag,AnimateTag}: ICurvedLineSvgProps) {

    return (
        <g id="CurvedLine">
            <>
                {PathTag}
                {AnimateTag}
            </>
        </g>
    );
}