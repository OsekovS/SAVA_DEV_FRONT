import React from 'react';
import FilterPanel from '../Components/FilterPanel/FilterPanel'
import PagesBar from './pagesBar/PagesBar'
import Table from '../Components/Table/Table'
import ShowedLogsBar from './ShowedLogsBar/ShowedLogsBar'
import TimeFilterPanel from '../Components/TimeFilterPanel/TimeFilterPanelCont'
import Saver from '../Components/Saver/Saver'
import MarkAsRead from '../Components/MarkAsRead/MarkAsRead'
import Pdf from '../Components/Pdf/Pdf'
import './Logtable.scss'
// import  {getFromDate} from "../../../../components/redux/acs-reducer";
class rawLogsTable extends React.Component {
    constructor(props) {
        super(props);

        if(this.props.uploads.uploads){
          this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id,this.props.indexName,this.props.dbName)},
          this.props.uploads.timeKind*this.props.uploads.timeNum);
        }

    }

    componentDidMount() {
      // console.log(this.props)
      this.props.getAcs(this.props.id,this.props.indexName,this.props.dbName)
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
/* <input onChange={()=>this.props.changeUploadModeThunk(false,this.props.indexName,this.props.id)} type="radio" name={"time_period"+this.props.id} value="configured_time" checked={!this.props.uploads.uploads}/>
  <input onChange={()=>this.props.changeUploadModeThunk(true,this.props.indexName,this.props.id)} type="radio" name={"time_period"+this.props.id} value="bynow_time" checked={this.props.uploads.uploads} /> */
    render() {  
      // console.log(this.props)
        let curLog,footerElements
        if(this.props.curLog!==null&&this.props.logs.length!==0){
            curLog = this.props.logs[this.props.curLog]
            footerElements = this.props.footerElements.map((e) => {
            return <li>
              {e.text+curLog[e.field]}
            </li>
        })}
        // console.log(this.props) 
        const {id,indexName,dbName, timeFilter, fields} = this.props
        const personal = {id,indexName,dbName}                 
        return <div className={"logs-table-wrapper"+' '+this.props.className}>
                  <header className="Common__header Common__header_grey Common__header_with-filter">
                    {this.props.title+ ''}
                    
                    <TimeFilterPanel id={id} dbName={dbName} uploads={this.props.uploads} indexName={indexName} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}></TimeFilterPanel>
                    {/* <LogsCount indexName={this.props.indexName} indexName={this.props.indexName}/> */}
                    <MarkAsRead indexName={indexName} display={this.props.markAsRead} id={this.props.id} dbName={this.props.dbName}></MarkAsRead>
                    <FilterPanel fields={fields} configObj={this.props.filter} iniState={this.props.paramFilter} submitCallBack={(filter)=>{this.props.setParamFilterThunk(filter,dbName,indexName,id)}} id={id}/>
                    <Saver  id={id} display={this.props.saver}/>
                    <Pdf fields={fields} configObj={this.props.filter} iniState={this.props.paramFilter} timeFilter={timeFilter} indexName={indexName}/>
                  </header>    
                  <Table clazz={this.props.clazz} logs={this.props.logs} headerElements={this.props.headerElements} curLog={this.props.curLog} onClickCallback={this.props.onChangeCurrentLog} sortParam={this.props.sortParam} changeSortThunk={this.props.changeSortThunk}  id={id} dbName={dbName} indexName={indexName}/>
                  <footer>
                    <span>Всего событий: {this.props.pagination.total}</span>
                    <ShowedLogsBar showedLogs={this.props.pagination.showedLogs} showedLogsList={this.props.pagination.showedLogsList} onClickCallback={this.props.changeShowedLogsThunk} personal={personal} />
                    <PagesBar callBack={this.props.changePageThunk} pagination={this.props.pagination} personal={personal} />
                    {this.props.curLog !== null ?<div className="additional-info"><h2>Дополнительная информация о выбранном событии:</h2><ul>{footerElements}</ul></div>:null}
                  </footer>
            </div>
    }
  }




export default rawLogsTable;
