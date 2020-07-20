import React from 'react';
import './LogElem.scss'
const colorsSignificance = {'Low':'#087011','Middle':'#fff600','High':'#ff0000','низкий':'#087011','Средний':'#fff600','top':'#ff0000'}//,'','#ff0000','#ff0000'
const LogElem = (props) => {
    console.log(props)
    let Elements = Object.values(props.viewed).map((e,n) => {
        if(e.field==="significance") {return  <td key={n} ><div className='list-elem__circle' style={{backgroundColor: colorsSignificance[props.signStyle[props.items.significance]]}} ></div></td>}
        else return  <td key={n} >{props.items[e.field].length>90?props.items[e.field].slice(0,90)+'...':props.items[e.field]}</td>
    })
    return  <tr onClick={props.onClickCallback} className={props.name}  >
                {Elements}
            </tr>
}

export default LogElem;