import * as React from 'react';
import './Footer.css'
import { ReactComponent as GithubLogo }from '../../img/githubLogo.svg';

export interface IFooterProps {
}

export default function Footer (props: IFooterProps) {

  // add github links for each member
  return (
    <div id='footer'>
      <p>
        author : 김민규, 한세환, 박수원
      </p>
      <a href="https://github.com/abcd0978/whatthehellomgnowayayayaya">
        <GithubLogo />
      </a>
    </div>
  );
}
