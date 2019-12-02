import React from 'react';
import './Acs.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../../../Common/ListElem/ListElem'
import {Field, reduxForm} from "redux-form";


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

const endps_form = (props) => {
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
            <p><label>Порт: <Field name="port" placeholder={"Имя"} component={"input"}/></label></p>
            <p><label>Логин: <Field name="login" placeholder={"Логин"} component={"input"}/></label></p>
            <p><label>Пароль: <Field name="password" placeholder={"Пароль"} type="password" component={"input"}/></label></p>
            <p><label>Повторный пароль: <Field name="password_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label></p>           
            <div>
                <button>Добавить</button>
            </div>
        </form>
    )
}

const EndpsReduxForm =  reduxForm({form: 'addCamReg'})(endps_form)

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
    
    

    let objectsElements = props.objects.map((e,n) => <ListElem name='list-elem' items={e} key={n.toString()}
elemChangeCallBack={onDelObj} elemDellCallBack={onDelObj}/>)

let endpointsElemens = props.endpoints.map((e,n) => <ListElem name='list-elem' items={e} key={n.toString()}
elemChangeCallBack={onDelObj} elemDellCallBack={onDellEndpoint}/>)
    return <div >
            <header className="Common__header Common__header_red">Объекты инфраструктуры</header>
                <table className="Modules_table Modules_table__cam-dev">
                    <tbody>
                        {objectsElements}  
                    </tbody>
            </table>
            <ObjectsReduxForm objects={props.objects}  onSubmit={onAddObj} />
            <header className="Common__header Common__header_red">Список конечных точек</header>
                <table className="Modules_table Modules_table__cam-dev">
                    <tbody>
                        <ListElem  name='list-elem list-elem__cameras list-elem__title' items={['', 'объект' , 'порт', 'ip адрес']  }/>
                        {endpointsElemens}  
                    </tbody>
             </table>
             <EndpsReduxForm objects={props.objects}  onSubmit={onAddEndpoint} />
        </div>
}

export default Acs;