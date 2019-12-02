import React from 'react';
import './Cameras.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../../../Common/ListElem/ListElem'
import {Field, reduxForm} from "redux-form";

const cameras_form = (props) => {
    let objectsElements = props.objects.map((e,n) => <option value={e.id} key={n.toString()}>{e.name}</option>)
    return (
        <form onSubmit={props.handleSubmit}>
            <span className="settings_text">Добавить конечную точку</span>	
            <label>Объект: 
                <Field name="obj_num" component={"select"} >
                    {objectsElements}
                </Field>
            </label>
            <p><label>Ip адрес: <Field name="ip" placeholder={"Ip"} component={"input"}/></label></p>
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
            <span className="settings_text">Добавить объект</span>	
            <p><label>Название: <Field name="obj_name" placeholder={"Название объекта"} component={"input"}/></label></p>           
            <div>
                <button>Добавить</button>
            </div>
        </form>
    )
}

const ObjectsReduxForm =  reduxForm({form: 'addCamObj'})(objects_form)

const regs_form = (props) => {
    let objectsElements = props.objects.map((e,n) => <option value={e.id} key={n.toString()}>{e.name}</option>)
    return (
        <form onSubmit={props.handleSubmit}>
            <span className="settings_text">Добавить конечную точку</span>	
            <label>Объект: 
                <Field name="obj_num" component={"select"} >
                    {objectsElements}
                </Field>
            </label>
            <p><label>Ip адрес: <Field name="ip" placeholder={"Ip"} component={"input"}/></label></p>
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

    const onAddCamera = (formData) => {
        props.addCam(formData)
    }

    const onAddRegistrator = (formData) => {
        props.addReg(formData)
    }

    const onAddObject = (formData) => {
        props.addObj(formData)
    }

    const onDelCamera = (id) => {
        // console.log(ip)
        props.delCam(id)
    }

    const onDelRegistrator = (id) => {
        props.delReg(id)
    }

    const onDelObject = (id) => {
        props.delObj(id)
    }

    const onChangeCamera = (formData) => {
        console.log('change')
        // props.delCam(formData)
    }

    const onChangeRegistrator = (formData) => {
        props.changeReg(formData)
    }

    const onChangeObject = (formData) => {
        props.changeObj(formData)
    }
    let objectsElements = props.objects.map((e,n) =>{ 
        return <ListElem name='list-elem' items={e} key={n.toString()}
        elemChangeCallBack={onChangeObject} elemDellCallBack={onDelObject} />})

    let camerasElements = props.cameras.map((e,n) => <ListElem name='list-elem' items={e} key={n.toString()}
        elemChangeCallBack={onChangeCamera} elemDellCallBack={onDelCamera}/>)


    let registratorsElements = props.registrators.map((e,n) => <ListElem name='list-elem' items={e} key={n.toString()}
        elemChangeCallBack={onChangeRegistrator} elemDellCallBack={onDelRegistrator}/>)

    return <div >
        <header className="Common__header Common__header_red">Объекты инфраструктуры</header>
        <table className="Modules_table Modules_table__cam-obj">
            <tbody>
                {objectsElements}
            </tbody>
        </table>
        <ObjectsReduxForm  onSubmit={onAddObject} />
        <header className="Common__header Common__header_red">Список камер</header>
        <table className="Modules_table Modules_table__cam-dev">
            <tbody>
                <ListElem  name='list-elem list-elem__cameras list-elem__title' items={['','объект', 'имя' , 'ip адрес', 'логин']  }/>
                {camerasElements}   
            </tbody>
        </table>
        <CamerasReduxForm objects={props.objects}  onSubmit={onAddCamera} />
        <header className="Common__header Common__header_red">Список регистраторов</header>
        <table className="Modules_table Modules_table__cam-dev">
            <tbody>
                {registratorsElements}
            </tbody>
        </table>
        <RegsReduxForm objects={props.objects}  onSubmit={onAddRegistrator} />
        </div>
}

export default Cameras;