import React from 'react';
import './MenuItem.scss';
import __header from '../../../Common/__header/__header'
const __mainMenuItem = (props) => {
    return <div className="Common__mainMenuItem" >
        <__header 
        text={props.head['text']}
            clazz="Common__header Common__header_grey"
            />
        <div>
            <pre>
            {props.body['text']}
            </pre>
        </div>
        </div>
}

export default __mainMenuItem;