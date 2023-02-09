import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface ITitleSectionProps {

}

const initialContent = "~# "
const typedContent = "~# cd ICUNIX"
const finalContent = "~# ICUNIX/"
const cursor = "|"

// typing effect
export default function TitleSection (props: ITitleSectionProps) {
  const [title,setTitle] = useState<string>(initialContent)
  const [count,setCount] = useState<number>(3);
  const navigate = useNavigate();
  
  // blinks cursor
  function blinkCursor():void{
    setInterval(() => {
      setTitle((prev)=>prev + cursor);
      setTimeout(() => {
        setTitle((prev)=>prev.slice(0, -1));
      }, 500);
    }, 1000);
  }

  useEffect(() => {
    if(count >= typedContent.length){
      setTimeout(() => {
        setTitle(finalContent)
      }, 371);
      blinkCursor();
      return;
    }

    // set time between 20 and 300ms
    const id = setInterval((): void => {
      setTitle((prev)=>prev + typedContent[count]);
      setCount((count)=>count+1);

    }, Math.floor(Math.random() * 200) + 40);

    return () => clearInterval(id);
    
  }, [count]);

  // function for onclick event
  function handleOnClick(e:React.MouseEvent<HTMLHeadingElement>){
    e.preventDefault();
    // goto index
    navigate("/");
  }

  return (
    <h1 id="title" onClick={handleOnClick}>
      {title}
    </h1>
  );
}
