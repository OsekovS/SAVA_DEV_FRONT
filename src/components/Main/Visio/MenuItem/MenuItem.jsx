import React from 'react';
import './MenuItem.scss';
// import label from '../../../Common/label'
const __mainMenuItem = (props) => {
    return <div className="Common__mainMenuItem" >
    <header className="Common__header Common__header_grey"
        ><span>{props.head['text']}</span>
        <span>{props.head.events}</span>
        <span>{props.head.exceptions}</span>
        <span>{props.head.errors}</span>
        </header>

    <div>
        <pre>
        {props.body['text']}
        </pre>
    </div>
    </div>
}

export default __mainMenuItem;