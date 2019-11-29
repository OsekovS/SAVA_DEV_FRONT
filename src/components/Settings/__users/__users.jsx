import React from 'react';
import './__users.scss';
import __header from '../../Common/__header/__header'
import ListElem from '../../Common/ListElem/ListElem'

const __users = (props) => {
    let usersElements = props.users.map(e => <ListElem name='' items={e} />)
    return <div className="Settings__users">
        <__header text={"Список пользователей"} clazz="Common__header Common__header_red"/>
            {usersElements}
        </div>
}

export default __users;