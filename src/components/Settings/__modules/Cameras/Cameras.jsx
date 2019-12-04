import React from 'react';
import './Cameras.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../../../Common/ListElem/ListElem'
import {Field, reduxForm} from "redux-form";

const cameras_form = (props) => {
    let objectsElements = props.objects.map((e,n) => <option value={e.id} key={n.toString()}>{e.name}</option>)
    if(props.mode==='addCam') return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Добавить камеру</header>
        <form className="modal-form" onSubmit={props.handleSubmit}>	
            <label>Объект: 
                <Field name="obj_num" component={"select"} >
                    {objectsElements}
                </Field>
            </label>
            <label>Ip адрес: <Field name="ip" placeholder={"Ip"} component={"input"} type="text"/></label>
            <label>Имя: <Field name="name" placeholder={"Имя"} component={"input"} type="text"/></label>
            <label>Логин: <Field name="login" placeholder={"Логин"} component={"input"} type="text"/></label>
            <label>Пароль: <Field name="password" placeholder={"Пароль"} type="password" component={"input"}/></label>
            <label>Повторный пароль: <Field name="password_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label>           
            <div>
                <button>Добавить</button> <button onClick={props.callback.bind(this,'view')}>Отмена</button>
            </div>
        </form>
        </div>  
    )
    else return null
}

const CamerasReduxForm =  reduxForm({form: 'addCamCam'})(cameras_form)

const objects_form = (props) => {
    if(props.mode==='addObj') return (
        <div className="modal-form-keeper modal-form-keeper__small" >
            <header className="Common__header Common__header_red">Добавить объект</header>
        <form className="modal-form" onSubmit={props.handleSubmit}>	
            <label>Название: <Field name="obj_name" placeholder={"Название объекта"} component={"input"} type="text"/></label>         
            <div>
                <button>Добавить</button> <button onClick={props.callback.bind(this,'view')}>Отмена</button>
            </div>
        </form>
        </div>
    )
    else return null
}

const ObjectsReduxForm =  reduxForm({form: 'addCamObj'})(objects_form)

const regs_form = (props) => {
    let objectsElements = props.objects.map((e,n) => <option value={e.id} key={n.toString()}>{e.name}</option>)
    if(props.mode==='addReg') return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Добавить регистратор</header>
        <form className="modal-form" onSubmit={props.handleSubmit}>
            <label>Объект: 
                <Field name="obj_num" component={"select"} >
                    {objectsElements}
                </Field>
            </label>
            <label>Ip адрес: <Field name="ip" placeholder={"Ip"} component={"input"} type="text"/></label>
            <label>Имя: <Field name="name" placeholder={"Имя"} component={"input"} type="text"/></label>
            <label>Логин: <Field name="login" placeholder={"Логин"} component={"input"} type="text"/></label>
            <label>Пароль: <Field name="password" placeholder={"Пароль"} type="password" component={"input"}/></label>
            <label>Повторный пароль: <Field name="password_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label>           
            <div>
                <button>Добавить</button> <button onClick={props.callback.bind(this,'view')}>Отмена</button>
            </div>
        </form>
        </div>
    )
    else return null
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
    const onChangeMode = (mode) =>{
        props.changeMode(mode)
    }
    let objectsElements = props.objects.map((e,n) =>{ 
        return <ListElem name='list-elem' items={e} key={n.toString()}
        elemChangeCallBack={onChangeObject} elemDellCallBack={onDelObject} />})

    let camerasElements = props.cameras.map((e,n) => <ListElem name='list-elem' items={e} key={n.toString()}
        elemChangeCallBack={onChangeCamera} elemDellCallBack={onDelCamera}/>)


    let registratorsElements = props.registrators.map((e,n) => <ListElem name='list-elem' items={e} key={n.toString()}
        elemChangeCallBack={onChangeRegistrator} elemDellCallBack={onDelRegistrator}/>)

    return <div className="Settings__cameras">
        <header className="Common__header Common__header_red">Объекты инфраструктуры</header>
        <table className="Modules_table Modules_table__cam-obj">
            <tbody>
                {objectsElements}
            </tbody>
        </table>
        <button onClick={onChangeMode.bind(this,'addObj')}>Добавить</button>
        <ObjectsReduxForm  onSubmit={onAddObject}  mode={props.mode} callback={onChangeMode}/>
        <header className="Common__header Common__header_red">Список камер</header>
        <table className="Modules_table Modules_table__cam-dev">
            <tbody>
                <ListElem  name='list-elem list-elem__cameras list-elem__title' items={['','объект', 'имя' , 'ip адрес', 'логин']  }/>
                {camerasElements}   
            </tbody>
        </table>
        <button onClick={onChangeMode.bind(this,'addCam')}>Добавить</button>
        <CamerasReduxForm objects={props.objects}  onSubmit={onAddCamera}  mode={props.mode} callback={onChangeMode} />
        <header className="Common__header Common__header_red">Список регистраторов</header>
        <table className="Modules_table Modules_table__cam-dev">
            <tbody>
                {registratorsElements}
            </tbody>
        </table>
        <button onClick={onChangeMode.bind(this,'addReg')}>Добавить</button>
        <RegsReduxForm objects={props.objects}  onSubmit={onAddRegistrator}  mode={props.mode} callback={onChangeMode} />
        </div>
}

export default Cameras;