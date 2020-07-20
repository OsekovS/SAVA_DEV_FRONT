import React from 'react';
import NetCont from './Net/NetCont'
import TimezoneCont from './Timezone/TimezoneCont'
import './__common.scss';


const __common = (props) => {
    return <div className="Common">
        <NetCont></NetCont>
        <TimezoneCont ></TimezoneCont>
    </div>
        }
export default __common;