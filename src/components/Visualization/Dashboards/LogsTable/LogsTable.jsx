import React from 'react';
import FilterPanel from '../Components/FilterPanel/FilterPanel'
import PagesBar from './pagesBar/PagesBar'
import Options from './Options/OptionsCont'
import Table from '../Components/Table/TableCont'
import ShowedLogsBar from './ShowedLogsBar/ShowedLogsBar'
import TimeFilterPanel from '../Components/TimeFilterPanel/TimeFilterPanelCont'
import Saver from '../Components/Saver/Saver'
import MarkAsRead from '../Components/MarkAsRead/MarkAsRead'
import Pdf from '../Components/Pdf/PdfCont'
import ChangedInput from '../Components/ChangedInput/ChangedInputCont.jsx'
import Resizer from '../Components/Resizer/Resizer.jsx'
import MotionArrow from '../Components/MotionArrow/MotionArrow'
import './Logtable.scss'

// import  {getFromDate} from "../../../../components/redux/acs-reducer";
class rawLogsTable extends React.Component {
    constructor(props) {
        super(props);

        if(this.props.uploads.uploads){
          this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id,this.props.indexName,this.props.dbName)},
          this.props.uploads.timeKind*this.props.uploads.timeNum);
        }
        this.state = {
          onSettings: false,
          changedElemNumb:  null         
        }
        this.onClickOnElem = this.onClickOnElem.bind(this)
    }

    componentDidMount() {
      // console.log(this.props)
      this.props.getAcs(this.props.id,this.props.indexName,this.props.dbName,true)
    }
    componentWillUnmount(){
      if(this.intervalId!==undefined) clearInterval(this.intervalId);
    }

    //Проверка одинаковости объектов
    isObjEqual(obj1,obj2){
      if(Object.keys(obj1).length!==Object.keys(obj2).length) return false //Объекты не совпадат если у них разное количество свойств
      for(var propName in obj1){
        if (!obj2.hasOwnProperty(propName)||obj1[propName].valueOf() !== obj2[propName].valueOf()) { // Есть ли свойства в обоих объектах и Одинаковы ли значения свойст  
          return false;
        }
      }
      return true
    }
    // Изменяется интервал
    componentWillReceiveProps(nextProps){
      // проверяем что показ "текущего лога" возможен
      if(this.props.curLog!==null&&nextProps.logs.length<nextProps.curLog){
        nextProps.onChangeCurrentLog(null,nextProps.id,nextProps.dbName)
      }
      // console.log(this.props.uploads.uploads)
      let newLength = nextProps.headerElements.length 
      //действие происходит в случае удаления элемента 
      if(newLength < this.props.headerElements.length &&newLength>0) this.setState({changedElemNumb: this.state.changedElemNumb-1})
      // if(newLength==0) this.setState({onSettings: false})
      
      // onSettings
      //если существует таймер и отключены обновл
      if(this.intervalId!==undefined&&nextProps.uploads.uploads===false){
        clearInterval(this.intervalId);
      }
      //включены обновления а были выключены
      else if(nextProps.uploads.uploads&&nextProps.uploads.uploads!==this.props.uploads.uploads){
        this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id,this.props.indexName,this.props.dbName)}, this.props.uploads.timeKind*this.props.uploads.timeNum);
      }else if(nextProps.uploads.uploads&&!this.isObjEqual(nextProps.uploads,this.props.uploads)){
        clearInterval(this.intervalId);
        this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id,this.props.indexName,this.props.dbName)}, nextProps.uploads.timeKind*nextProps.uploads.timeNum);
      }
  }
  onClickOnElem(number,id,dbName){
   
    this.props.onChangeCurrentLog(number,id,dbName)
  }
    render() {  
      // 
      let curLog, 
       {onSettings,changedElemNumb} = this.state, footerElements
      const {id,indexName,dbName, timeFilter, fields,modules,uploads, style, name,title,collapsed,changeCollapseMode,
        changeDashSize, headerElements,  indexElements, serNum, isLast, setParamFilterThunk,
        paramFilter, filter} = this.props,
        footerElementsJS = this.props.footerElements
       
        // console.log(this.props)
        // console.log(this.props)
        if(this.props.curLog!==null&&this.props.logs.length!==0&&this.props.logs.length>this.props.curLog){
            curLog = this.props.logs[this.props.curLog]
            //.filter((e)=>curLog[e.field]!=='None') добавили
            footerElements = footerElementsJS.filter((e)=>curLog[e.field]!=='None').map((e) => {
            return <li>
              {<span>{e.text+': '}</span>} {curLog[e.field].length>0?curLog[e.field]:'-'}
              {/* {<span>{e.text+' ('+e.field+'):'}</span>} {curLog[e.field].length>0?curLog[e.field]:'-'} */}
            </li>
            // <span>{e.text}</span>  e.text+
        })}
        
        const lastViewed = modules[dbName].indexes[indexName].lastViewed
        const personal = {id,indexName,dbName} 
        // height = this.props.curLog !== null ?style.height+115:style.height
        // style={{ backgroundColor: "#44014C"}}    style={{ maxHeight: style.heigth-60}}     style={{ maxHeight: height}}         
        return <div   className={"dashboard-wrapper dashboard-wrapper_table"+' '+this.props.className}>
                  <header className="Common__header Common__header_grey Common__header_with-filter">
                    <div>
                      <ChangedInput title={title} id={id} dbName={dbName} lastViewed={lastViewed} 
                        timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}
                        type={'Table'} uploads={uploads}
                      /> 
                      {/* <TimeFilterPanel lastViewed={lastViewed} id={id} dbName={dbName} uploads={uploads} indexName={indexName} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}></TimeFilterPanel> */}
                    </div>
                    <div className='dashboard-wrapper__settings-cont'>
                      <MarkAsRead indexName={indexName} display={this.props.markAsRead} id={id} dbName={dbName}></MarkAsRead>
                      {/* <div  className='dashboard-wrapper__settings-cont'> */}
                        <div data-title="настройки таблицы" className='settings-icon comment'>
                          <img src={require(this.state.onSettings?"./settings-active.svg":"../../../img/settings.svg")}
                          onClick={()=>{this.setState({onSettings: !this.state.onSettings,changedElemNumb: 0})}}></img>
                        </div>
                        <FilterPanel imgSrc={require('../Components/FilterPanel/filter_white.svg')} single={true} fields={fields}
                           configObj={filter} iniState={paramFilter} 
                           submitCallBack={(filter)=>{setParamFilterThunk(filter,dbName,indexName,id)}} id={id}/>
                        <TimeFilterPanel lastViewed={lastViewed} id={id} dbName={dbName} uploads={uploads} indexName={indexName} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}></TimeFilterPanel>
                        <Saver  id={id}  dbName = {dbName}  display={this.props.saver}/>
                        <Pdf fields={fields} configObj={this.props.filter} iniState={this.props.paramFilter} timeFilter={timeFilter} indexName={indexName}/>
                        <span data-title="свернуть таблицу"  className="collapser comment" onClick={()=>{changeCollapseMode(id,dbName,!collapsed)}}></span>
                      {/* </div> */}
                      {/* <span className="collapser" onClick={()=>{this.setState({collapsed: !this.state.collapsed})}}></span> */}
                    </div>
                  </header>    
                  {/* this.setState({onSettings: {args}}) */}
                  {
                    collapsed?null:
                    <>            
                      {onSettings&&changedElemNumb !== null?<Options changedElemNumb={changedElemNumb} onSettings={onSettings}  id={id} dbName={dbName} 
                        headerElements={headerElements}  indexElements={indexElements} footerElements={footerElementsJS}/>:null }
                      <Table onSettings={onSettings} style={{ minHeight: style.height-90}}  clazz={this.props.clazz} logs={this.props.logs} headerElements={this.props.headerElements} curLog={this.props.curLog} onClickCallback={this.onClickOnElem} sortParam={this.props.sortParam} 
                        resizer={{isResizer:false,type: ['height'], minVal: ['minHeight']}}  changeSortThunk={this.props.changeSortThunk}  id={id} dbName={dbName} indexName={indexName} 
                        onHeaderElemChose={(numb)=>{this.setState({changedElemNumb: numb})}} />
                      {this.props.curLog !== null ? <Resizer changeSize={changeDashSize} id={id} indexName={indexName} dbName={dbName} type={['height']} minVal={['minHeight']}  isAbsolutePos={false}/>:null}
                      <footer>
                        <span>Всего событий: {this.props.pagination.total}</span>
                        <ShowedLogsBar showedLogs={this.props.pagination.showedLogs} showedLogsList={this.props.pagination.showedLogsList} onClickCallback={this.props.changeShowedLogsThunk} personal={personal} />
 
                        <PagesBar callBack={this.props.changePageThunk} pagination={this.props.pagination} personal={personal} />

                        {this.props.curLog !== null ?<div className="additional-info">
                          <h2>Дополнительная информация о выбранном событии:</h2>
                          <ul style={{ height: style.footerHeight}}>
                            {footerElements}
                            </ul>
                          </div>:null}
                      </footer>
                      {/* <Resizer id={id} indexName={indexName} dbName={dbName} type={'height'} minVal={'minHeight'}/> */}
                     {this.props.curLog !== null ?
                     <Resizer changeSize={changeDashSize} id={id} indexName={indexName} dbName={dbName} type={['footerHeight']} minVal={['minFooterHeight']} isAbsolutePos={true}/>:
                      <Resizer changeSize={changeDashSize} id={id} indexName={indexName} dbName={dbName} type={['height']} minVal={['minHeight']}  isAbsolutePos={true}/>}
                      {serNum===0?null:<MotionArrow style={style} id={id} dbName = {dbName}  indexName={indexName} direct={'left'}/>}
                      {isLast?null:<MotionArrow style={style} id={id} dbName = {dbName}  indexName={indexName} direct={'right'}/>}
                
                    </>
                  }
                  
            </div>
    }
  }




export default rawLogsTable;