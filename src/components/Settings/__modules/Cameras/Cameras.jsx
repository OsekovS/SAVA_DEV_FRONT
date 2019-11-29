import React from 'react';
import './Cameras.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../../../Common/ListElem/ListElem'
import {Field, reduxForm} from "redux-form";

const form = (props) => {
    let objectsElements = props.objects.map(e => <option value={e.name}>{e.name}</option>)
    return (
        <form onSubmit={props.handleSubmit}>
            <span class="settings_text">Добавить конечную точку</span>	
            <p><label>Логин: <Field name="login" placeholder={"Логин"} component={"input"}/></label></p>
            <p><label>Пароль: <Field name="password" placeholder={"Пароль"} type="password" component={"input"}/></label></p>
            <p><label>Повторный пароль: <Field name="password_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label></p>
            <p><label>Права администратора: <Field name="admin"  component={"input"} type="checkbox"/></label></p>
            <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component={"select"}>
            {objectsElements}
          </Field>
        </div>
            <div>
                <button>Добавить</button>
            </div>
        </form>
    )
}

const ReduxForm =  reduxForm({form: 'addUser'})(form)

const Cameras = (props) => {
    let objectsElements = props.objects.map(e => <ListElem name='' items={e} />)
    let camerasElements = props.cameras.map(e => <ListElem name='' items={e} />)
    let registratorsElements = props.registrators.map(e => <ListElem name='' items={e} />)

    const onAddCamera = (formData) => {
        props.addCamera(formData)
    }

    return <div >
        <__header text={"Объекты инфраструктуры"} clazz="Common__header Common__header_red"/>
        {objectsElements}
        <__header text={"Список камер"} clazz="Common__header Common__header_red"/>
        {camerasElements}
        <ReduxForm objects={props.objects}  onSubmit={onAddCamera} />
        <__header text={"Список регистраторов"} clazz="Common__header Common__header_red"/>
        {registratorsElements}
        </div>
}

export default Cameras;