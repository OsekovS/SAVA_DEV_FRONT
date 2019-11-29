import React from 'react';
import Net from './Net/Net'
import Timezone from './Timezone/Timezone'
import NotificationServer from './NotificationServer/NotificationServer'
import './__common.scss';


const __common = (props) => {
    return <div className="Sett">
        <Net common={props.common} dispatch={props.dispatch}></Net>
        <Timezone timezone={props.timezone} dispatch={props.dispatch}></Timezone>
        <NotificationServer ></NotificationServer>
    </div>
        }
export default __common;