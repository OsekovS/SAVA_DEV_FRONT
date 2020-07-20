import React from 'react';

const LogElem = (props) => {
    
    let Elements = Object.values(props.viewed).map((e,n) => {
        return  <td key={n} >{props.items[e.field]}</td>
    })
    return  <tr onClick={props.onClickCallback} className={props.name}  >
                {Elements}
            </tr>
}

export default LogElem;