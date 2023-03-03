import * as React from 'react';
import { useState, useEffect } from 'react';


export interface ITypingProps {
    content:string;
    initialContent?:string;
    typedContent?:string;
    finalContent?:string;
    minMaxtypingDuration?:Array<number>;
    FixedtypingDuration?:number;
    cursorFlag:boolean
}

const initialContent = "~# "
const typedContent = "~# cd ICUNIX"
const finalContent = "~# ICUNIX/"
const cursor = "|"

/**
 * @param {string}content 타이핑할 문자열
 * @param {string}initialContent 초기문자열,(content매개변수를 사용하지 않을시에 사용함,optinal default:"")
 * @param {string}typedContent 초기문자열이 있을경우에 추가해서 타이핑할 문자열,(content매개변수를 사용하지 않을시에 사용함,optinal default:"")
 * @param {string}finalContent initialContent+typedContent가 결과와 다를때 앞의 두개를 입력후 300ms뒤에 finalContent로 바뀐다.(optinal default:"")
 * @param {Array}minMaxtypingDuration 최소,최대 타이핑시간의 간격, 단위는 ms(크기2인 Number array)
 * @param {number}FixedtypingDuration 고정된 타이핑시간의 간격
 * @param {boolean}cursorFlag 커서 존재유무
 */
export default function TypingSection ({content, initialContent="", typedContent="", finalContent="", minMaxtypingDuration=[40,200], FixedtypingDuration=200, cursorFlag}: ITypingProps) {
    
    
    const [titleWithInitial,setTitleWithInitial] = useState<string>(initialContent)
    const [title,setTitle] = useState<string>("")
    const [countWithInitial,setCountWithInitial] = useState<number>(initialContent.length);
    const [count, setCount] = useState<number>(0);

    // blinks cursor
    function blinkCursor():void{
    setInterval(() => {
        setTitle((prev)=>prev + cursor);
        setTimeout(() => {
        setTitle((prev)=>prev.slice(0, -1));
        }, 500);
    }, 1000);
    }

    function getnumber():void{
        
    }

    useEffect(() => {
    let countWeUse:number;
    let contentWeUse:string;

    if(initialContent.length>0){
        countWeUse = countWithInitial;
        contentWeUse = typedContent
    }else{
        countWeUse = count;
        contentWeUse = content
    }

    if(countWeUse >= contentWeUse.length){

        if(finalContent.length>0){
            setTimeout(() => {
             setTitleWithInitial(finalContent)
             }, 371);
        }   
        if(cursorFlag){
            blinkCursor();
        }
        return;
    }

    // set time between 20 and 300ms
    const id = setInterval((): void => {
        setTitle((prev)=>prev + typedContent[count]);
        setCount((count)=>count+1);
    }, Math.floor(Math.random() * minMaxtypingDuration[1]) + minMaxtypingDuration[0]); // 최대 0.2초, 최소 0.04초

    return () => clearInterval(id);

    }, [count]);

    return (
    <p>
        {title}
    </p>
    );
}