import React from 'react';
import './__modules.scss';
import Sidebar from './Sidebar/Sidebar'
import {BrowserRouter, Route} from 'react-router-dom'
import CamerasCont from './Cameras/CamerasCont'
import AcsCont from './Acs/AcsCont'
// import IssCont from './Iss/IssCont'

const __modules = (props) => {
    console.log(props)
    return <BrowserRouter>
    <div className="Settings__modules">
        <Sidebar></Sidebar>
        <div className="Settings__infoHandler">
            <Route path='/setting module cameras' render={()=><CamerasCont />}></Route>
            <Route path='/setting module acs' render={()=><AcsCont  />}></Route>
            {/* <Route path='/setting module iss' render={()=><IssCont />}></Route> */}
        </div>     
    </div>
    </BrowserRouter>
}

export default __modules;