import React from 'react';
import './Acs.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../../../Common/ListElem/ListElem'


// const form = (props) => {
//     return (
//         <form onSubmit={props.handleSubmit}>
//             <span class="settings_text">Добавить конечную точку</span>	
//             <p><label>Логин: <Field name="login" placeholder={"Логин"} component={"input"}/></label></p>
//             <p><label>Пароль: <Field name="password" placeholder={"Пароль"} type="password" component={"input"}/></label></p>
//             <p><label>Повторный пароль: <Field name="password_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label></p>
//             <p><label>Права администратора: <Field name="admin"  component={"input"} type="checkbox"/></label></p>
//             <label>Favorite Color</label>
//         <div>
//           <Field name="favoriteColor" component={select}>
//             <option></option>
//             <option value="ff0000">Red</option>
//             <option value="00ff00">Green</option>
//             <option value="0000ff">Blue</option>
//           </Field>
//         </div>
//             <div>
//                 <button>Добавить</button>
//             </div>
//         </form>
//     )
// }

// const ReduxForm =  reduxForm({form: 'addUser'})(form)


const Acs = (props) => {
    let objectsElements= props.objects.map(e => <ListElem name='' items={e} />)
    let endpointsElemens= props.endpoints.map(e => <ListElem name='' items={e} />)
    return <div >
            <__header text={"Объекты инфраструктуры"} clazz="Common__header Common__header_red"/>
            {objectsElements}
            <__header text={"Список конечных точек"} clazz="Common__header Common__header_red"/>
            {endpointsElemens}
        </div>
}

export default Acs;