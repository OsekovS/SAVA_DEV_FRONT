import React from 'react';


const LogElem = (props) => {

    // let Elements = Object.values(props.items).map((e,n) => {
    //     if(n>0 || props.first)
    //     return <td name='list-elem' key={n} >{e}</td>
    // })

    return <tr className={props.name}  >
        <td>{props.items.time}</td>
        <td>{props.items.significance}</td>
        <td>{props.items.object}</td>
        <td>{props.items.name}</td>
        <td>{props.items.device}</td>
        <td>{props.items.event}</td>
        <td>{props.items.route}</td>
        <td>'Персонал'</td>
    </tr>
}

export default LogElem;

const gen = (accumulator, currentValue) => {
    accumulator += '<span>'+currentValue+'</span>';
return accumulator;
}