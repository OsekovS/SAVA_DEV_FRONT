import React from 'react';
// import TableHeader from './TableHeader/TableHeader.jsx'
import LogElem from './LogElem/LogElem.jsx'
import './Table.scss'
const Table = (props) => {

let Elements = props.logs.map((e,number) => <LogElem viewed={props.headerElements} name={props.curLog===number?'Modules_table__current':''} items={e} onClickCallback={()=>{props.onClickCallback(number,props.id)}}/>)

let headerElements = Object.values(props.headerElements).map((e,n) => {
    if(e.field===props.sortParam.field) {
        let clazzName = props.sortParam.direction === 'asc'?"logs-table__arrow logs-table__arrow_up":"logs-table__arrow logs-table__arrow_down"
        return  <td onClick={()=>{props.changeSortThunk(e,props.indexName,props.id)}} key={n} >{e.text} <img className={clazzName} src={require('./active.svg')}></img></td>
    }//
    else return  <td onClick={()=>{props.changeSortThunk(e,props.indexName,props.id)}} key={n} >{e.text} <img className="logs-table__arrow logs-table__arrow_down" src={require('./non-active.svg')}></img></td>//<img src={require('./multimedia.svg')}></img>
})
return <>
            
            <div className='table-wrapper'>
                <table className={"Modules_table Table__"+props.clazz}>
                    <tbody>
                    {Elements.length  > 0 ?
                        <tr>{headerElements}</tr>:null
                    }
                     {/* <TableHeader className={"logs-table__header Modules_table Table__"+props.clazz} items={props.headerElements} current={props.sortParam} clickCallBack={props.changeSortThunk} indexName={props.indexName} id={props.id}/>:null}          */}
                        {Elements.length  > 0 ?
                        Elements  :
                        <div className="Modules-table__empty" ><img src={require("./Anonymous-Package.svg")} atl="события не найдены"></img></div>}  
                    </tbody>
                </table>
            </div>
        </>
}
export default Table;
