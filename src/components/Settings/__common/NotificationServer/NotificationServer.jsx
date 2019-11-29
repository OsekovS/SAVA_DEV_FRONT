import React from 'react';
import {Field, reduxForm} from "redux-form";



const form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <p><label>Адрес на который отправлять уведомление<Field placeholder={props.to} name={"to"} component={"input"}/></label></p>
            <p><label>Адрес с которого отправлять уведомление<Field placeholder={props.from} name={"from"} component={"input"}/></label></p>
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

    return <div>
        <span className="settings_text">Настройки уведомлений</span>
        <ReduxForm to={props.to} from={props.from} onSubmit={onSubmit} />
    </div>
}

export default NotificationServer;