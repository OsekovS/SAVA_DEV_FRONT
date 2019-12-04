import React from 'react';
import {Field, reduxForm} from "redux-form";
import './NotificationServer.scss'

const form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>Адрес на который отправлять уведомление:<Field placeholder={props.to} name={"to"} component={"input"} type="text"/></label>
            <label>Адрес с которого отправлять уведомление:<Field placeholder={props.from} name={"from"} component={"input"} type="text"/></label>
            <div>
                <button>Настроить</button>
            </div>
        </form>
    )
}

const ReduxForm =  reduxForm({form: 'notific'})(form)

const NotificationServer = (props) => {
    const onSubmit = (formData) => {
        props.updateSettings(formData)
    }

    return <div className="Settings__notification-server">
        <h2 className="h2__center">Настройки уведомлений</h2>
        <ReduxForm to={props.to} from={props.from} onSubmit={onSubmit} />
    </div>
}

export default NotificationServer;