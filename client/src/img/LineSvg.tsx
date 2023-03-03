import * as React from 'react';
import { cNull } from '../util/cNull';

export interface ILineSvgProps {
    x1:number;
    x2:number;
    y1:number;
    y2:number;
    r?:number;
}
/**
 * @param {number} r when Line is used for connecting Circles of same radius, 
 */ 
export default function LineSvg ({x1,y1,x2,y2,r}: ILineSvgProps) {
    let radius = r;
    let dx1=x1, dy1=y1, dx2=x2, dy2=y2;
    if(cNull(r) !== 0){
        dy1 = y1+r;
        dy2 = y2-r;
    }
    return (
    <line x1={dx1} y1={dy1} x2={dx2} y2={dy2} stroke="black" />
    );
}