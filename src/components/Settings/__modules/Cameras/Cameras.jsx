import React from 'react';
import './Cameras.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../../../Common/ListElem/ListElem'
import {Field, reduxForm} from "redux-form";

const cameras_form = (props) => {
    let objectsElements = props.objects.map(e => <option value={e.numb}>{e.name}</option>)
    return (
        <form onSubmit={props.handleSubmit}>
            <span class="settings_text">Добавить конечную точку</span>	
            <label>Объект: 
                <Field name="obj_num" component={"select"} >
                    {objectsElements}
                </Field>
            </label>
            <p><label>Ip: <Field name="ip" placeholder={"Ip"} component={"input"}/></label></p>
            <p><label>Имя: <Field name="name" placeholder={"Имя"} component={"input"}/></label></p>
            <p><label>Логин: <Field name="login" placeholder={"Логин"} component={"input"}/></label></p>
            <p><label>Пароль: <Field name="password" placeholder={"Пароль"} type="password" component={"input"}/></label></p>
            <p><label>Повторный пароль: <Field name="password_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label></p>           
            <div>
                <button>Добавить</button>
            </div>
        </form>
    )
}

const CamerasReduxForm =  reduxForm({form: 'addCamCam'})(cameras_form)

const objects_form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <span class="settings_text">Добавить объект</span>	
            <p><label>Название: <Field name="obj_name" placeholder={"Название объекта"} component={"input"}/></label></p>           
            <div>
                <button>Добавить</button>
            </div>
        </form>
    )
}

const ObjectsReduxForm =  reduxForm({form: 'addCamObj'})(objects_form)

const regs_form = (props) => {
    let objectsElements = props.objects.map(e => <option value={e.numb}>{e.name}</option>)
    return (
        <form onSubmit={props.handleSubmit}>
            <span class="settings_text">Добавить конечную точку</span>	
            <label>Объект: 
                <Field name="obj_num" component={"select"} >
                    {objectsElements}
                </Field>
            </label>
            <p><label>Ip: <Field name="ip" placeholder={"Ip"} component={"input"}/></label></p>
            <p><label>Имя: <Field name="name" placeholder={"Имя"} component={"input"}/></label></p>
            <p><label>Логин: <Field name="login" placeholder={"Логин"} component={"input"}/></label></p>
            <p><label>Пароль: <Field name="password" placeholder={"Пароль"} type="password" component={"input"}/></label></p>
            <p><label>Повторный пароль: <Field name="password_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label></p>           
            <div>
                <button>Добавить</button>
            </div>
        </form>
    )
}

const RegsReduxForm =  reduxForm({form: 'addCamReg'})(regs_form)

const Cameras = (props) => {
    let objectsElements = props.objects.map(e => <ListElem name='' items={e} />)
    let camerasElements = props.cameras.map(e => <ListElem name='' items={e} />)
    let registratorsElements = props.registrators.map(e => <ListElem name='' items={e} />)

    const onAddCamera = (formData) => {
        props.addCam(formData)
    }

    const onAddRegistrator = (formData) => {
        props.addReg(formData)
    }

    const onAddObject = (formData) => {
        props.addObj(formData)
    }
    
    return <div >
        <__header text={"Объекты инфраструктуры"} clazz="Common__header Common__header_red"/>
        {objectsElements}
        <ObjectsReduxForm  onSubmit={onAddObject} />
        <__header text={"Список камер"} clazz="Common__header Common__header_red"/>
        {camerasElements}
        <CamerasReduxForm objects={props.objects}  onSubmit={onAddCamera} />
        <__header text={"Список регистраторов"} clazz="Common__header Common__header_red"/>
        {registratorsElements}
        <RegsReduxForm objects={props.objects}  onSubmit={onAddRegistrator} />
        </div>
}

export default Cameras;