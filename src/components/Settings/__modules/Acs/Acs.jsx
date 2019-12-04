import React from 'react';
import './Acs.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../../../Common/ListElem/ListElem'
import {Field, reduxForm} from "redux-form";


const objects_form = (props) => {
    if(props.mode==='addObj')  return (
        <div className="modal-form-keeper modal-form-keeper__small" >
            <header className="Common__header Common__header_red">Добавить объект</header>
            <form className="modal-form" onSubmit={props.handleSubmit}>
                <p><label>Название: <Field name="obj_name" placeholder={"Название объекта"} component={"input"} type="text"/></label></p>           
                <div>
                    <button>Добавить</button> <button onClick={props.callback.bind(this,'view')}>Отменить</button>
                </div>
            </form>
        </div>
        )
    else return null
    
}

const ObjectsReduxForm =  reduxForm({form: 'addAcsObj'})(objects_form)

const endps_form = (props) => {
    let objectsElements = props.objects.map((e,n) => <option style={{width:100}} value={e.id} key={n.toString()}>{e.name}</option>)
    console.log(props.mode)
    if(props.mode==='addEndp') return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Добавить конечную точку</header>
            <form className="modal-form" onSubmit={props.handleSubmit}>
            <label>Объект: 
                <Field name="obj_num" component={"select"}  >
                    {objectsElements}
                </Field>
            </label>
            <label>Ip адрес: <Field name="ip" placeholder={"Ip"} component={"input"} type="text"/></label>
            <label>Имя: <Field name="name" placeholder={"Имя"} component={"input"} type="text"/></label>
            <label>Порт: <Field name="port" placeholder={"Имя"} component={"input"} type="text"/></label>
            <label>Логин: <Field name="login" placeholder={"Логин"} component={"input"} type="text"/></label>
            <label>Пароль: <Field name="password" placeholder={"Пароль"} type="password" component={"input"}/></label>
            <label>Повторный пароль: <Field name="password_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label>           
            <div>
                <button >Сохранить</button><button onClick={props.callback.bind(this,'view')}>Отменить</button>
            </div>
        </form>
        </div>
    )
    else return null
}

const EndpsReduxForm =  reduxForm({form: 'addAcsEndp'})(endps_form)

const Acs = (props) => {

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

// let objForm = false ? <frameElement><ObjectsReduxForm objects={props.objects}  onSubmit={onAddObj} /> <button>Добавить</button></frameElement> 
// : <button>Добавить</button> ;
    return <div className="Settings__acs">
            <header className="Common__header Common__header_red">Объекты инфраструктуры</header>
                <table className="Modules_table Modules_table__cam-dev">
                    <tbody>
                        {objectsElements}  
                    </tbody>
                </table>
                <button onClick={onChangeMode.bind(this,'addObj')}>Добавить</button>
                <ObjectsReduxForm mode={props.mode} onSubmit={onAddObj} callback={onChangeMode}/>
            <header className="Common__header Common__header_red">Список конечных точек</header>
                <table className="Modules_table Modules_table__cam-dev">
                    <tbody>
                        <ListElem  name='list-elem list-elem__cameras list-elem__title' items={['', 'объект', 'ip адрес','имя' , 'порт', 'логин']  }/>
                        {endpointsElemens}  
                    </tbody>
                 </table>
                 <button onClick={onChangeMode.bind(this,'addEndp')}>Добавить</button>
             <EndpsReduxForm objects={props.objects} mode={props.mode} onSubmit={onAddEndpoint}  callback={onChangeMode}/>
        </div>
}

export default Acs;