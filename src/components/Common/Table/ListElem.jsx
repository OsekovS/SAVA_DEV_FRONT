import React from 'react';
import './Elem.scss';
import {createMarkup} from '../../JS/core'

const ListElem = (props) => {

    return <tr className={props.name}  
    dangerouslySetInnerHTML={createMarkup(
        Object.values(props.items).reduce(gen,'') +
        '<img width=20 height=20 src="'+require('./change_icon.png')+'"/><img width=20 height=20 src="'+require('./del_icon.png')+'"/>'
        )}>
       
    </tr>
}

export default ListElem;

const gen = (accumulator, currentValue) => {
    accumulator += '<td>'+currentValue+'</td>';
return accumulator;
}

// const ListElem = (props) => {

//     return <li className={props.name}  
//     dangerouslySetInnerHTML={createMarkup(
//         Object.values(props.items).reduce(gen,'') +
//         '<img width=20 height=20 src="'+require('./change_icon.png')+'"/><img width=20 height=20 src="'+require('./del_icon.png')+'"/>'
//         )}>
       
//     </li>
// }

// const gen = (accumulator, currentValue) => {
//     accumulator += '<span>'+currentValue+'</span>';
// return accumulator;
// }