import React from 'react';
import './__users.scss';
import ListElem from '../../Common/ListElem/ListElem'
import {Field, reduxForm} from "redux-form";

const form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
             <span class="settings_text">Добавить пользователя</span>	
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
        props.delUser(id)
    }
    const onAddUser = (id) => {
        props.addUser(id)
    }

    let usersElements = props.users.map((e,n) => {  

    return <ListElem first={true} name='list-elem' items={{name: e.name, admin: e.admin}} 
    key={n.toString()}
    elemChangeCallBack={onDellUser} elemDellCallBack={onDellUser}/>
    })
    const onNetSubmit = (formData) => {
        props.addUser(formData)
    }
    return <div className="Settings__users">
        {/* <__header text={"Список пользователей"} clazz="Common__header Common__header_red"/> */}
        <header className="Common__header Common__header_red">Список пользователей</header>
            {usersElements}
            <ReduxForm  onSubmit={onAddUser} />
        </div>
}

export default __users;