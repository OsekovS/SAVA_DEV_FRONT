import React from 'react';
import './Acs.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../ListElem/ListElem'
import {Field, reduxForm} from "redux-form";


const objects_form = (props) => {
    if(props.mode==='addObj')  return (
        <div className="modal-form-keeper modal-form-keeper__small" >
            <header className="Common__header Common__header_red">Добавить объект</header>
            <form className="modal-form" onSubmit={props.handleSubmit}>
                <p><label>Название: <Field name="name" placeholder={"Название объекта"} component={"input"} type="text"/></label></p>           
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
                <Field name="obj" component={"select"}  >
                    {objectsElements}
                </Field>
            </label>
            <label>ip: <Field name="ip" placeholder={"ip"} component={"input"} type="text"/></label>
            <label>Логин: <Field name="login" placeholder={"Логин"} component={"input"} type="text"/></label>
            <label>Пароль: <Field name="pass" placeholder={"Пароль"} type="password" component={"input"}/></label>
            <label>Повторный пароль: <Field name="pass_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label>           
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

    const onAddField = (formData) => {
        console.log(formData )
        if(props.mode==='addEndp')
        {
             if(formData.obj===undefined)
                formData.obj = Object.values(props.objects)[0].name
            else{
                Object.values(props.objects).map((e) => {
                    if(e.id==formData.obj) formData.obj = e.name
                })
            }
        }
        let a = {form: formData}
        a.mode = props.mode;
        props.addFieldThunk(a)
    }

    const onDelObj = (id) => {
        props.delObj(id)
    }
    
    const onDellEndpoint = (id) => {
        props.delEndp(id)
    }
    
    const onChangeMode = (mode) =>{
        props.changeMode(mode)
    }
console.log(props)
    let objectsElements = props.objects.map((e,n) => <ListElem name='list-elem' items={e} key={n.toString()}
elemChangeCallBack={onDelObj} elemDellCallBack={onDelObj}/>)

let endpointsElemens = props.endpoints.map((e,n) => <ListElem name='list-elem' items={e} key={n.toString()}
elemChangeCallBack={onDelObj} elemDellCallBack={onDellEndpoint}/>)

    return <div className="Settings__acs">
            <header className="Common__header Common__header_red">Объекты инфраструктуры</header>
                <table className="Modules_table Modules_table__cam-dev">
                    <tbody>
                        {objectsElements}  
                    </tbody>
                </table>
                <button onClick={onChangeMode.bind(this,'addObj')}>Добавить</button>
                <ObjectsReduxForm mode={props.mode} onSubmit={onAddField} callback={onChangeMode}/>
            <header className="Common__header Common__header_red">Список конечных точек</header>
                <table className="Modules_table Modules_table__cam-dev">
                    <tbody>
                        {/* <ListElem  name='list-elem list-elem__cameras list-elem__title' items={['', 'ip', 'объект', 'логин']  }/> */}
                        {endpointsElemens}  
                    </tbody>
                </table>
                 <button onClick={onChangeMode.bind(this,'addEndp')}>Добавить</button>
             <EndpsReduxForm objects={props.objects} mode={props.mode} onSubmit={onAddField}  callback={onChangeMode}/>
        </div>
}

export default Acs;