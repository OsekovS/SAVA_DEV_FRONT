import React from 'react';
import {Field, reduxForm} from "redux-form";



const form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <p><label>ip: <Field placeholder={props.ip} name={"ip"} component={"input"}/></label></p>
            <p><label>mask: <Field placeholder={props.mask} name={"mask"} component={"input"}/></label></p>
            <p><label>gw: <Field placeholder={props.gw} name={"gw"} component={"input"}/></label></p>
            <div>
                <button>Настроить</button>
            </div>
        </form>
    )
}

const ReduxForm =  reduxForm({form: 'net'})(form)

const Net = (props) => {
    const onNetSubmit = (formData) => {
        props.updateNetSetting(formData)
    }

    return <div>
        <span className="settings_text">Настройки сети<br></br></span>	
        <ReduxForm ip={props.ip} mask={props.mask} gw={props.gw} onSubmit={onNetSubmit} />
    </div>
}

export default Net;