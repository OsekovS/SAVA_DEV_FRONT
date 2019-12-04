import React from 'react';
import NetCont from './Net/NetCont'
import TimezoneCont from './Timezone/TimezoneCont'
import NotificationServerCont from './NotificationServer/NotificationServerCont'
import './__common.scss';


const __common = (props) => {
    return <div className="Common">
        <NetCont></NetCont>
        <TimezoneCont ></TimezoneCont>
        
        <NotificationServerCont ></NotificationServerCont>
    </div>
        }
export default __common;