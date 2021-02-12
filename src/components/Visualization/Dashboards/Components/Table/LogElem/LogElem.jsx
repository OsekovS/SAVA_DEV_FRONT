import React from 'react';
import './LogElem.scss'
const colorsSeverity = {'Low':'#087011','Middle':'#fff600','High':'#ff0000'}//,'','#ff0000','#ff0000'
const LogElem = (props) => {
    // console.log(props)
    let Elements = Object.values(props.viewed).map((e,n) => {
        if(e.field==="severity") {return  <td key={n} ><div className='list-elem__circle' style={{backgroundColor: colorsSeverity[props.signStyle[props.items.severity]]}} ></div></td>}
        else return  <td key={n} >{props.items[e.field].length>90?props.items[e.field].slice(0,90)+'...':props.items[e.field]}</td>
    })
    return  <tr onClick={props.onClickCallback} className={props.name}  >
                {Elements}
            </tr>
}

export default LogElem;