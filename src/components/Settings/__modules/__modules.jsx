import React from 'react';
import './__modules.scss';
import Sidebar from './Sidebar/Sidebar'
import {BrowserRouter, Route} from 'react-router-dom'
import CamerasCont from './Cameras/CamerasCont'
import AcsCont from './Acs/AcsCont'
import IssCont from './Iss/IssCont'

const __modules = (props) => {
    console.log(props)
    return <BrowserRouter>
    <div className="Settings__modules">
        <Sidebar></Sidebar>
        <div className="Settings__infoHandler">
            <Route path='/settings/modules cameras' render={()=><CamerasCont />}></Route>
            <Route path='/settings/modules acs' render={()=><AcsCont  />}></Route>
            <Route path='/settings/modules iss' render={()=><IssCont />}></Route>
        </div>     
    </div>
    </BrowserRouter>
}

export default __modules;