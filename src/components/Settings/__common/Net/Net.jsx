import React from 'react';
import {Field, reduxForm} from "redux-form";
import './Net.scss';
{/* <p><label>ip: <Field placeholder={props.ip} name={"ip"} component={"input"} type="text"/></label></p>
<p><label>mask: <Field placeholder={props.mask} name={"mask"} component={"input"} type="text"/></label></p>
<p><label>gw: <Field placeholder={props.gw} name={"gw"} component={"input"} type="text"/></label></p> */}

const form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>ip: <Field placeholder={props.ip} name={"ip"} component={"input"} type="text"/></label>
            <label>mask: <Field placeholder={props.mask} name={"mask"} component={"input"} type="text"/></label>
            <label>gw: <Field placeholder={props.gw} name={"gw"} component={"input"} type="text"/></label>
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

    return <div className="Settings__net">
        <h2 className="h2__center">Настройки сети</h2>	
        <ReduxForm ip={props.ip} mask={props.mask} gw={props.gw} onSubmit={onNetSubmit} />
    </div>
}

export default Net;