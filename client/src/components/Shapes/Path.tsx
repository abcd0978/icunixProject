import * as React from 'react';
import { cNull } from '../../util/cNull';

export interface IPathProps {
    attributes:object;
    //d:String;
}
 
export default function Path ({attributes}: IPathProps) {

    return (
        <path d={attributes.d} />
    );
}