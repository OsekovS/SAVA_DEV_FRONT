import React from 'react';
import './__modules.scss';
import Sidebar from './Sidebar/Sidebar'
import {BrowserRouter, Route} from 'react-router-dom'
import Cameras from './Cameras/Cameras'
import Iss from './Acs/Acs'
import Acs from './Iss/Iss'

const __modules = (props) => {
    console.log(props)
    return <BrowserRouter>
    <div className="Settings__modules">
        <Sidebar></Sidebar>
        <div className="Settings__infoHandler">
            <Route path='/settings/modules/cameras' render={()=><Cameras 
      cameras={props.cameras} />}></Route>
            <Route path='/settings/modules/acs' render={()=><Acs 
      iss={props.iss} />}></Route>
            <Route path='/settings/modules/iss' render={()=><Iss 
      acs={props.acs} />}></Route>
        </div>     
    </div>
    </BrowserRouter>
}

export default __modules;