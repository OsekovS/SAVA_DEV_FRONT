import React from 'react';
import './__users.scss';
import ListElem from '../../Common/ListElem/ListElem'
import {Field, reduxForm} from "redux-form";

const form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
             <span className="settings_text">Добавить пользователя</span>	
            <p><label>Логин: <Field name="login" placeholder={"Логин"} component={"input"}/></label></p>
            <p><label>Пароль: <Field name="password" placeholder={"Пароль"} type="password" component={"input"}/></label></p>
            <p><label>Повторный пароль: <Field name="password_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label></p>
            <p><label>Права администратора: <Field name="admin"  component={"input"} type="checkbox"/></label></p>
            <div>
                <button>Добавить</button>
            </div>
        </form>
    )
}




const ReduxForm =  reduxForm({form: 'addUser'})(form)

const __users = (props) => {

    const onDellUser = (id) => {
        props.delUserThunk(id)
    }
    const onAddUser = (user) => {
        props.addUserThunk(user)
    }
    console.log(props.users)
    let usersElements = props.users.map((e,n) => {  

    return <ListElem name='list-elem' items={e} 
    key={e.id}
    elemChangeCallBack={onDellUser} elemDellCallBack={onDellUser}/>
    })

    return <div className="Settings__users">
        {/* <__header text={"Список пользователей"} clazz="Common__header Common__header_red"/> */}
            <table className="Modules_table Modules_table__cam-dev">
                    <tbody>
                        {usersElements}  
                    </tbody>
                </table>
            <ReduxForm  onSubmit={onAddUser} />
        </div>
}

export default __users;