import React from 'react';
import {Field, reduxForm} from "redux-form";
import './Net.scss';


const form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label>ip: <Field value={props.ip} placeholder={props.ip} name={"ip"} component={"input"} type="text"/></label>
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
    return <div className="Settings__net">
        <h2 className="h2__center">Настройки сети</h2>	
        <ReduxForm ip={props.ip} mask={props.mask} gw={props.gw} onSubmit={props.changeNetActionThunk} />
    </div>
}

export default Net;