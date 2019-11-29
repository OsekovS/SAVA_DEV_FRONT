import React from 'react';
// import __MenuItem from './__menuItem/__MenuItem';
import Visio from './Visio/Visio'
import Sett from './Sett/Sett'
import './Main.scss';

const Main = (props) => {
    return <main>
        <Visio
        cameras={props.cameras}
      acs={props.acs}
      iss={props.iss}/>
      <Sett/>
    </main>
}

export default Main;