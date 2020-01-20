import React from 'react';
import TableHeader from './TableHeader/TableHeader.jsx'
import LogElem from './LogElem/LogElem.jsx'

const Table = (props) => {

let Elements = props.logs.map((e,number) => <LogElem viewed={props.headerElements} name={props.curLog===number?'Modules_table__current':''} items={e} onClickCallback={()=>{props.onClickCallback(number,props.id)}}/>)


return <>
            {Elements.length  > 0 ?<TableHeader className={'logs-table__header'} items={props.headerElements} current={props.sortParam} clickCallBack={props.changeSortThunk} indexName={props.indexName} id={props.id}/>:null}         
            <div className='table-wrapper'>
                <table className="Modules_table Modules_table-logs">
                    <tbody>
                        {Elements.length  > 0 ?
                        Elements  :
                        <div className="Modules-table__empty" ><img src={require("./Anonymous-Package.svg")} atl="события не найдены"></img></div>}  
                    </tbody>
                </table>
            </div>
        </>
}
export default Table;
