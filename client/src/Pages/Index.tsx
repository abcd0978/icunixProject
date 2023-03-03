import * as React from 'react';
import WTHTerminal from '../components/Terminal/WTHTerminal';

export interface IIndexProps {
}

export default function Index (props: IIndexProps) {
  return (
    <div>
        {WTHTerminal.getInstance().render()}
    </div>
  );
}
