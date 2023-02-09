import * as React from 'react';
import WTHTerminal from '../Terminal/WTHTerminal';
import Icubutton from '../../Icunixbtn/Icunixbtn';

export interface IRightSectionProps {
}


export default function RightSection (props: IRightSectionProps) {
  
  
  return (
    <div id='auth_btns'>
      <Icubutton func={()=>{WTHTerminal.getInstance().runCommand("register")}} name="register" size={5}/>
      <Icubutton func={()=>{WTHTerminal.getInstance().runCommand("login")}} name="login" size={5}/>
    </div>
  );
}