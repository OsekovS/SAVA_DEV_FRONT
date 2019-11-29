import React from 'react';
import './__mainMenuItem.scss';
import {createMarkup} from '../../JS/core'
import __header from '../__header/__header'
const __mainMenuItem = (props) => {
    return <div className="Common__mainMenuItem" >
        <__header 
        text={props.head['html']}
            clazz="Common__header Common__header_grey"
            />
        <div dangerouslySetInnerHTML={createMarkup(props.body['html'])}>
        </div>
        </div>
}

export default __mainMenuItem;