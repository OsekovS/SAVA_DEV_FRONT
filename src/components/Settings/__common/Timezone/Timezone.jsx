import React from 'react';
import {Field, reduxForm} from "redux-form";



const form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <p><label>NTP server1:<Field name="ntp_server1" placeholder={props.ntp_server1} name={"ntp_server1"} component={"input"}/></label></p>
            <p><label>NTP server2:<Field name="ntp_server2" placeholder={props.ntp_server2} name={"ntp_server2"} component={"input"}/></label></p>
            <p><label>NTP server3:<Field name="ntp_server3" placeholder={props.ntp_server3} name={"ntp_server3"} component={"input"}/></label></p>
            <p><label>NTP server4:<Field name="ntp_server4" placeholder={props.ntp_server4} name={"ntp_server4"} component={"input"}/></label></p>
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

    return <div>
        <span className="settings_text">Настройки часового пояса></span>	
        <ReduxForm ntp_server1={props.ntp_server1} ntp_server2={props.ntp_server2} ntp_server3={props.ntp_server3} ntp_server4={props.ntp_server4} onSubmit={onNetSubmit} />
    </div>
}

export default Timezone;