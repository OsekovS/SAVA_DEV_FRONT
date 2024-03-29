import React from 'react';
import './TableHeader.scss'

const TableHeader = (props) => {
    //onClick={()=>{console.log('click')}}
//onClick={()=>{props.clickCallBack(e,props.indexName,props.id)}}
    let Elements = Object.values(props.items).map((e,n) => {
        if(e.field===props.current.field) {
            let clazzName = props.current.direction === 'asc'?"logs-table__arrow logs-table__arrow_up":"logs-table__arrow logs-table__arrow_down"
            return  <td onClick={()=>{props.clickCallBack(e,props.indexName,props.id)}} key={n} >{e.text} <img className={clazzName} src={require('./active.svg')}></img></td>
        }//
        else return  <td onClick={()=>{props.clickCallBack(e,props.indexName,props.id)}} key={n} >{e.text} <img className="logs-table__arrow logs-table__arrow_down" src={require('./non-active.svg')}></img></td>//<img src={require('./multimedia.svg')}></img>
    })
    // Modules_table Modules_table-logs
    return <table className={"Modules_table Table__"+props.className}>
            <tbody>
                <tr className={props.className}  >
                    {Elements}
                </tr>
            </tbody>
        </table>
}

export default TableHeader;