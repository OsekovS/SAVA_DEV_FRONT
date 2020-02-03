import React from 'react';
import './LogElem.scss'
const colorsSignificance = ['#087011','#fff600','#ff0000','','#ff0000','#ff0000']
const LogElem = (props) => {
    let Elements = Object.values(props.viewed).map((e,n) => {
        if(e.field==="significance") {return  <td key={n} ><div className='list-elem__circle' style={{backgroundColor: colorsSignificance[props.items[e.field]]}} ></div></td>}
        else return  <td key={n} >{props.items[e.field]}</td>
    })
    return  <tr onClick={props.onClickCallback} className={props.name}  >
                {Elements}
            </tr>
}

export default LogElem;