import React from 'react';
import './Elem.scss';
import {createMarkup} from '../../JS/core'

const ListElem = (props) => {

    return <li className={props.name} 
    dangerouslySetInnerHTML={createMarkup(
        Object.values(props.items).reduce(gen,'') +
        '<img src=""/><img src=""/>'
        )}>
       
    </li>
}

export default ListElem;

const gen = (accumulator, currentValue) => {
    accumulator += '<span>'+currentValue+'</span>';
return accumulator;
}