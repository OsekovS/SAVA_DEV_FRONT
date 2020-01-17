import React from 'react';
import './Iss.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../ListElem/ListElem'
import {Field, reduxForm} from "redux-form";

const objects_form = (props) => {
    if(props.mode==='addObj') return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Добавить объект</header>
            <form className="modal-form" onSubmit={props.handleSubmit}>
                <p><label>Название: <Field name="obj_name" placeholder={"Название объекта"} component={"input"} type="text"/></label></p>           
                <div>
                    <button>Добавить</button><button onClick={props.callback.bind(this,'view')}>Отмена</button>
                </div>
            </form>
        </div>
    )
    else return null
}

const ObjectsReduxForm =  reduxForm({form: 'addIssObj'})(objects_form)

const endps_form = (props) => {
    let objectsElements = props.objects.map((e,n) => <option value={e.id} key={n.toString()}>{e.name}</option>)
    if(props.mode==='addEndp') return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Добавить конечную точку</header>
            <form className="modal-form" onSubmit={props.handleSubmit}>
                <label>Объект: 
                    <Field name="obj_num" component={"select"} >
                        {objectsElements}
                    </Field>
                </label>
                <p><label>Ip адрес: <Field name="ip" placeholder={"Ip"} component={"input"} type="text"/></label></p>
                <p><label>Имя: <Field name="name" placeholder={"Имя"} component={"input"} type="text"/></label></p>
                <p><label>Порт: <Field name="port" placeholder={"Имя"} component={"input"} type="text"/></label></p>
                <p><label>Логин: <Field name="login" placeholder={"Логин"} component={"input"} type="text"/></label></p>
                <p><label>Пароль: <Field name="password" placeholder={"Пароль"} type="password" component={"input"}/></label></p>
                <p><label>Повторный пароль: <Field name="password_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label></p>           
                <div>
                    <button>Добавить</button><button onClick={props.callback.bind(this,'view')}>Отмена</button>
                </div>
            </form>
        </div>
    )
    else return null
}

const EndpsReduxForm =  reduxForm({form: 'addIssEndp'})(endps_form)

const Iss = (props) => {


    const onDelObj = (id) => {
        props.delObj(id)
    }

    const onAddEndpoint = (id) => {
        props.addEndp(id)
    }
    
    const onDellEndpoint = (id) => {
        props.delEndp(id)
    }

    const onAddObj = (id) => {
        props.addObj(id)
    }
    const onChangeMode = (mode) =>{
        props.changeMode(mode)
    }

    let objectsElements = props.objects.map((e,n) => <ListElem name='list-elem' items={e} key={n.toString()}
    elemChangeCallBack={onDelObj} elemDellCallBack={onDelObj}/>)
    
    let endpointsElemens = props.endpoints.map((e,n) => <ListElem name='list-elem' items={e} key={n.toString()}
    elemChangeCallBack={onDelObj} elemDellCallBack={onDellEndpoint}/>)

    return <div className="Settings__iss">
            <header className="Common__header Common__header_red">Объекты инфраструктуры</header>
            <table className="Modules_table Modules_table__cam-dev">
                <tbody>
                    {objectsElements}  
                </tbody>
            </table>
            <button onClick={onChangeMode.bind(this,'addObj')}>Добавить</button>
            <ObjectsReduxForm objects={props.objects}  onSubmit={onAddObj}   mode={props.mode} callback={onChangeMode} />
            <header className="Common__header Common__header_red">Список конечных точек</header>
            <table className="Modules_table Modules_table__cam-dev">
                <tbody>
                    {/* <ListElem  name='list-elem list-elem__cameras list-elem__title' items={['', 'объект' , 'порт', 'ip адрес']  }/> */}
                    {endpointsElemens}  
                </tbody>
            </table>
            <button onClick={onChangeMode.bind(this,'addEndp')}>Добавить</button>
            <EndpsReduxForm objects={props.objects}  onSubmit={onAddEndpoint}  mode={props.mode} callback={onChangeMode} />
        </div>
}

export default Iss;