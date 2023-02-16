import * as React from 'react';
import StyledButton from './icunixbtnStyle';

export interface IIcunixbtnProps {
    name:string;
    size:number;
    func?():void;
}
/**
 * @param {string}name 버튼에 들어갈 문자열
 * @param {number}size 버튼의 크기(비율 고정)
 * @param {Function}func 버튼이 눌렸을때 실행할 함수
 */

export default function Icunixbtn ({name,size,func=():any=>{}}: IIcunixbtnProps) {
  return (
  <>
    <StyledButton onClick={func}
      buttonSize={size}
      fontSize={size}
    >{name}</StyledButton>
  </>
  );
}
