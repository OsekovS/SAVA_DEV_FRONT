import React from 'react';
// import TableHeader from './TableHeader/TableHeader.jsx'
import LogElem from './LogElem/LogElem.jsx'
import Resizer from '../Resizer/Resizer.jsx'
import './Table.scss'
const Table = (props) => {
let {id,indexName,dbName,style, onClickCallback, resizer,onSettings,deleteHeaderElem,
    changeSortThunk,changeDashSize,onHeaderElemChose, modules} = props
const {isResizer, type, minVal} = resizer;

let Elements = props.logs.map((e,number) => <LogElem signStyle={modules[dbName].indexes[indexName].events} viewed={props.headerElements} name={props.curLog===number?'Modules_table__current':''} items={e} onClickCallback={()=>{onClickCallback(number,id,dbName)}}/>)

let headerElements = Object.values(props.headerElements).map((e,n) => {
    if(onSettings) {
        if(e.field===props.sortParam.field) {
            return  <td  onClick={()=>{onHeaderElemChose(n)}} style={{width:e.colWidth}}  key={n} >{e.text.length>0?<span>{e.text}</span>:''}
                        <img onClick={()=>{deleteHeaderElem(n,id,dbName)}} src={require('./delete.svg')} ></img>
                {/* <Resizer changeSize={(delta)=>{changeHeaderElemSize(delta,id,dbName,n)}} changeSize={changeHeaderElemSize} id={id} indexName={indexName} dbName={dbName} type={['width']} minVal={['minWidth']}  isAbsolutePos={true}/> */}
            </td>
        }//
        else return  <td onClick={()=>{onHeaderElemChose(n)}} style={{width:e.colWidth}} key={n} >{e.text.length>0?<span>{e.text}</span>:''}
                <img  onClick={(e)=>{deleteHeaderElem(n,id,dbName);e.stopPropagation()}} src={require('./delete.svg')} ></img>
                {/* <Resizer changeSize={(...args)=>{console.log(args)}} id={id} indexName={indexName} dbName={dbName} type={['width']} minVal={['minWidth']}  isAbsolutePos={true}/> */}
            </td>//<img src={require('./multimedia.svg')}></img>
    }else {
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