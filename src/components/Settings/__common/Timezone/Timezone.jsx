import React from 'react';
import {Field, reduxForm} from "redux-form";
import './Timezone.scss'


const form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>NTP server1:<Field name="ntp_server1" placeholder={props.ntp_server1} name={"ntp_server1"} component={"input"} type="text"/></label>
            <label>NTP server2:<Field name="ntp_server2" placeholder={props.ntp_server2} name={"ntp_server2"} component={"input"} type="text"/></label>
            <label>NTP server3:<Field name="ntp_server3" placeholder={props.ntp_server3} name={"ntp_server3"} component={"input"} type="text"/></label>
            <label>NTP server4:<Field name="ntp_server4" placeholder={props.ntp_server4} name={"ntp_server4"} component={"input"} type="text"/></label>
            <div>
                <button>Настроить</button>
            </div>
        </form>
    )
}

const ReduxForm =  reduxForm({form: 'timezone'})(form)

const Timezone = (props) => {
    const onNetSubmit = (formData) => {
        props.updateSettings(formData)
    }

    return <div className="Settings__Timezone">
        <h2 className="h2__center">Настройки часового пояса</h2>	
        <ReduxForm ntp_server1={props.ntp_server1} ntp_server2={props.ntp_server2} ntp_server3={props.ntp_server3} ntp_server4={props.ntp_server4} onSubmit={onNetSubmit} />
    </div>
}

export default Timezone;