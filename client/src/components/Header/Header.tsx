import  React from 'react';
import TitleSection from './TitleSection';
import RightSection from './RightSection';
import './Header.css';

export interface IHeaderProps {
}

export default function Header (props: IHeaderProps) {

  return (
    <div id='header'>
      <TitleSection/>
      <RightSection/>
    </div>
  );
}
