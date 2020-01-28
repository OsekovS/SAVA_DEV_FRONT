import React from 'react';
import FilterPanel from '../Components/FilterPanel/FilterPanel'
import PagesBar from './pagesBar/PagesBar'
import Table from '../Components/Table/Table'
import ShowedLogsBar from './ShowedLogsBar/ShowedLogsBar'
import TimeFilterPanel from '../Components/TimeFilterPanel/TimeFilterPanel'
import Saver from '../Components/Saver/Saver'
import './Logtable.scss'
// import  {getFromDate} from "../../../../components/redux/acs-reducer";
class rawLogsTable extends React.Component {
    constructor(props) {
        super(props);

        if(this.props.uploads.uploads){
          this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id)},
          this.props.uploads.timeKind*this.props.uploads.timeNum);
        }

    }

    componentDidMount() {
      console.log(this.props)
      this.props.getAcs(this.props.id)
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
        this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id)}, this.props.uploads.timeKind*this.props.uploads.timeNum);
      }else if(nextProps.uploads.uploads&&!this.isObjEqual(nextProps.uploads,this.props.uploads)){
        clearInterval(this.intervalId);
        this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id)}, nextProps.uploads.timeKind*nextProps.uploads.timeNum);
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
        return <div className={"logs-table-wrapper"+' '+this.props.className}>
                  <header className="Common__header Common__header_red Common__header_with-filter">
                    {this.props.title+ ''}
                    
                    <TimeFilterPanel id={this.props.id}  uploads={this.props.uploads} indexName={this.props.indexName} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}></TimeFilterPanel>
                    {/* <Calendar id={this.props.id} applyParentCallback={(startDate, endDate)=>{this.props.setTimeFilterThunk(startDate, endDate, this.props.indexName, this.props.id)}} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}/> */}

                    {/* <UploadTimeSetter  handleSubmit={(updateForm,event)=>{
                      this.props.changeUploadsThunk(updateForm,this.props.indexName,this.props.id);
                      // this.props.changeUploadModeThunk(true,this.props.indexName,this.props.id)
                    }}
                        timeKind={this.props.uploads.timeKind} timeNum={this.props.uploads.timeNum}
                        from_number={this.props.uploads.from_number} from_time_type={this.props.uploads.from_time_type}  id={this.props.id}/> */}
                    <FilterPanel configObj={this.props.filters[this.props.indexName]} iniState={this.props.paramFilter} submitCallBack={(filter)=>{this.props.setParamFilterThunk(filter,this.props.indexName,this.props.id)}} id={this.props.id}/>
                    <Saver  id={this.props.id} display={this.props.saver}/>
                  </header>    
                  <Table clazz={this.props.clazz} logs={this.props.logs} headerElements={this.props.headerElements} curLog={this.props.curLog} onClickCallback={this.props.onChangeCurrentLog} sortParam={this.props.sortParam} changeSortThunk={this.props.changeSortThunk} indexName={this.props.indexName} id={this.props.id}/>
                  <footer>
                    <span>Всего событий: {this.props.pagination.total}</span>
                    <ShowedLogsBar showedLogs={this.props.pagination.showedLogs} showedLogsList={this.props.pagination.showedLogsList} onClickCallback={this.props.changeShowedLogsThunk} indexName={this.props.indexName} id={this.props.id}/>
                    <PagesBar callBack={this.props.changePageThunk} pagination={this.props.pagination} indexName={this.props.indexName} id={this.props.id}/>
                    {this.props.curLog !== null ?<div className="additional-info"><h2>Дополнительная информация о выбранном событии:</h2><ul>{footerElements}</ul></div>:null}
                  </footer>
            </div>
    }
  }




export default rawLogsTable;
