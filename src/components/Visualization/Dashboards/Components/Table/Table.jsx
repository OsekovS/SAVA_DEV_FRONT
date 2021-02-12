import React from 'react';
// import TableHeader from './TableHeader/TableHeader.jsx'
import LogElem from './LogElem/LogElem.jsx'
import Resizer from '../Resizer/Resizer.jsx'
import './Table.scss'
const Table = (props) => {
    // console.log(props)
let {id,indexName,dbName,style, onClickCallback, resizer,onSettings, changeHeaderElemPos,
    changeSortThunk,changeDashSize,onHeaderElemChose, modules} = props
const {isResizer, type, minVal} = resizer;

let Elements = props.logs.map((e,number) => <LogElem signStyle={modules[dbName].indexes[indexName].events} viewed={props.headerElements} name={props.curLog===number?'Modules_table__current':''} items={e} onClickCallback={()=>{onClickCallback(number,id,dbName)}}/>)
let headerElementsLastNum = props.headerElements.length - 1
let headerElements = Object.values(props.headerElements).map((e,n) => {
    if(onSettings) {
        let innerText =e.text.length>0?e.text:''
        return  <td className={"logs-table__elemOnRedact"}  onClick={()=>{onHeaderElemChose(n)}} style={{width:e.colWidth}}  key={n} >
            {/* <img  className={"logs-table__arrow-left"} src={require('./horizontal.svg')}></img> */}
            {n!==0?<div onClick={(e)=>{e.preventDefault();changeHeaderElemPos(n,id,dbName,'left')}} className={"logs-table__arrow-left"}></div>:<></>}
            <span>{innerText}</span>
            {n!==headerElementsLastNum?<div onClick={(e)=>{e.preventDefault();changeHeaderElemPos(n,id,dbName,'right')}}  className={"logs-table__arrow-right"}></div>:<></>}
            {/* <img className={"logs-table__arrow-right"} src={require('./horizontal.svg')}></img> */}
            </td>
    }
    else {
        if(e.field===props.sortParam.field) {
            let clazzName = props.sortParam.direction === 'asc'?"logs-table__arrow logs-table__arrow_up":"logs-table__arrow logs-table__arrow_down"
            return  <td style={{width:e.colWidth}} onClick={()=>{changeSortThunk(e,indexName,id,dbName)}} key={n} >{e.text.length>0?<span>{e.text}</span>:''}
            <img className={clazzName} src={require('./active.svg')} ></img></td>
        }//
        else return  <td style={{width:e.colWidth}} onClick={()=>{changeSortThunk(e,indexName,id,dbName)}} key={n} >{e.text.length>0?<span>{e.text}</span>:''}
            <img className={"logs-table__arrow logs-table__arrow_down"} src={require('./non-active.svg')}
                ></img>
               
            </td>//<img src={require('./multimedia.svg')}></img>
    }
    
})
return <>
            
            <div style={style}  className='table-wrapper'>
                <table className={"Modules_table Table__white-black Table__"+props.clazz+(props.onSettings?' Table__onSettings':'')}>
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
                {isResizer?<Resizer changeSize={changeDashSize} id={id} indexName={indexName} dbName={dbName} type={'Vertical'} type={type} minVal={minVal}/>:null}
            </div>
        </>
}
export default Table;
// if(e.field===props.sortParam.field) {
//     let clazzName = props.sortParam.direction === 'asc'?"logs-table__arrow logs-table__arrow_up":"logs-table__arrow logs-table__arrow_down"
//     return  <td style={{width:e.colWidth}} onClick={()=>{onSettings?deleteHeaderElem(n,id,dbName): changeSortThunk(e,indexName,id,dbName)}} key={n} >{e.text.length>0?<span>{e.text}</span>:''}
//      <img className={onSettings?'':clazzName} src={require(onSettings?'./delete.svg':'./active.svg')} ></img></td>
// }//
// else return  <td style={{width:e.colWidth}} onClick={()=>{onSettings?deleteHeaderElem(n,id,dbName): changeSortThunk(e,indexName,id,dbName)}} key={n} >{e.text.length>0?<span>{e.text}</span>:''}
//     <img className={onSettings?'':"logs-table__arrow logs-table__arrow_down"} src={require(onSettings?'./delete.svg':'./non-active.svg')}
//         ></img></td>//<img src={require('./multimedia.svg')}></img>