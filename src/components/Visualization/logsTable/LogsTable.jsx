import React from 'react';
import Calendar from './calendar/calendar'
import FilterPanel from '../../Common/FilterPanel/FilterPanel'
import UploadTimeSetter from './uploadTimeSetter/UploadTimeSetter.jsx'
import LogElem from './LogElem/LogElem'
import PagesBar from './pagesBar/PagesBar'
import TableHeader from '../../Common/TableHeader/TableHeader.jsx'
import ShowedLogsBar from './ShowedLogsBar/ShowedLogsBar'
import './Logtable.scss'
import moment from "moment"
class rawLogsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            filterMode: false,
            uploadsSetter: 'collapsed'
        }
        console.log(this.props)
        if(this.props.uploads.uploads){
          this.intervalId = setInterval(
            ()=>{
            
              // console.log(a.format('YYYY/MM/DD HH:mm:ss')) 
            this.props.getAcs({
              "need": "logs",
              "timeFilter": {
                from: this.getFromDate(this.props.uploads.from_number,this.props.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),//+'-'+this.props.uploads.from_number+this.props.uploads.from_time_type,//+'/'+this.props.uploads.from_time_type,
                to:  this.props.uploads.to
              },
              "paramsFilter": this.props.paramFilter,
              logsCount: this.props.pagination.showedLogs,
              curPage: this.props.pagination.currentPage,
              sortParam: this.props.sortParam
          })},
          this.props.uploads.timeKind*this.props.uploads.timeNum);
        }
        this.onChangeFilterMode = this.onChangeFilterMode.bind(this);
        this.ChangeUploadsDisplay = this.ChangeUploadsDisplay.bind(this)

    }
    getFromDate(from_number,from_time_type){
      let a = moment(Date.now())//.subtract(60, "days")
        switch(from_time_type){
          case 's':
            return a.subtract(from_number, "seconds")
          case 'm':
            return a.subtract(from_number, "minutes")
          case 'h':
            return a.subtract(from_number, "hours")
          case 'd':
            return a.subtract(from_number, "days")
          case 'M':
            return a.subtract(from_number, "months")
        }
    }
    componentDidMount() {
      if(!this.props.uploads.uploads){
        this.props.getAcs({"need": "logs",
            "timeFilter": {
                from: this.props.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
                to: this.props.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
            },
            "paramsFilter": this.props.paramFilter,//?????????????????????????????????????????????????????????????????????
            logsCount: this.props.pagination.showedLogs,
            curPage: this.props.pagination.currentPage,
            sortParam: this.props.sortParam
        });
      }else{
        
        this.props.getAcs({
          "need": "logs",
          "timeFilter": {
            from: this.getFromDate(this.props.uploads.from_number,this.props.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),//'now-'+this.props.uploads.from_number+this.props.uploads.from_time_type,//+'/'+this.props.uploads.from_time_type,
            to:  this.props.uploads.to
          },
          "paramsFilter": this.props.paramFilter,
          logsCount: this.props.pagination.showedLogs,
          curPage: this.props.pagination.currentPage,
          sortParam: this.props.sortParam
      })
      }
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
      // Проверяем изменился ли фильтр и временные рамки
      let equal = this.isObjEqual(nextProps.uploads,this.props.uploads) && this.isObjEqual(nextProps.paramFilter,this.props.paramFilter)  && this.isObjEqual(this.props.paramFilter,nextProps.paramFilter) 
      if(!equal){
        if(this.intervalId!==undefined){
          clearInterval(this.intervalId);
        }
      if(nextProps.uploads.uploads){ 
        
       this.props.getAcs({
          "need": "logs",
          "timeFilter": {
            from: this.getFromDate(nextProps.uploads.from_number,nextProps.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),//'now-'+nextProps.uploads.from_number+nextProps.uploads.from_time_type,//+'/'+nextProps.uploads.from_time_type,
            to:  nextProps.uploads.to
          },
          "paramsFilter": nextProps.paramFilter,
          logsCount: this.props.pagination.showedLogs,
          curPage: this.props.pagination.currentPage,
          sortParam: this.props.sortParam
      })
        this.intervalId = setInterval(
        ()=>{
          this.props.getAcs({
          "need": "logs",
          "timeFilter": {
            from: this.getFromDate(this.props.uploads.from_number,this.props.uploads.from_time_type).format('YYYY/MM/DD HH:mm:ss'),//'now-'+nextProps.uploads.from_number+nextProps.uploads.from_time_type,//+'/'+nextProps.uploads.from_time_type,
            to:  nextProps.uploads.to
          },
          "paramsFilter": nextProps.paramFilter,
          logsCount: this.props.pagination.showedLogs,
          curPage: this.props.pagination.currentPage,
          sortParam: this.props.sortParam
      })},
        nextProps.uploads.timeKind*nextProps.uploads.timeNum);
      }
    }
  }
  
    
    onChangeFilterMode = (user) => {
      this.setState(state => ({
        filterMode: !this.state.filterMode
      }));
    }
  
    
    ChangeUploadsDisplay=()=>{
        this.setState(state => ({
          uploadsSetter: state.uploadsSetter==='collapsed'?'deployed':'collapsed'
        }));
    }

    headerElements = [
                      {text:'Дата', type:'date', field:'time'},
                      {text:'Тип события', type:'text', field:'significance'},
                      {text:'Объект', type:'text', field:'object'},
                      {text:'Конечная точка', type:'text', field:'device'},
                      {text:'Событие', type:'text', field:'event'},
                      {text:'Направление', type:'text', field:'route'},
                      {text:'Владелец', type:'text', field:'person'}
                    ]
    footerElements = [
                      {text:'Номер карты: ', field:'pass_number'},
                      {text:'ip конечной точки: ', field:'ip_device'},      
    ]
    tableHeader(){
      let elements = this.headerElements.map((e,numb) => <td key={numb}>{e}</td>)
      return <tr>{elements}</tr>
    }
    render() {  
        let Elements = this.props.logs.map((e,number) => <LogElem viewed={this.headerElements} name={this.props.curLog===number?'Modules_table__current':''} items={e} onClickCallback={()=>{this.props.onChangeCurrentLog(number)}}/>)

        let curLog,footerElements
        if(this.props.curLog!==null&&this.props.logs.length!==0){
            curLog = this.props.logs[this.props.curLog]
            footerElements = this.footerElements.map((e) => {
            return <li>
              {e.text+curLog[e.field]}
            </li>
        })}
        //devices-logs
        return <div className="logs-table-wrapper">
                  <header className="Common__header Common__header_red Common__header_with-filter">
                    События СКУД
                    <input onChange={()=>this.props.changeUploads(false)} type="radio" name="time_period" value="configured_time" checked={!this.props.uploads.uploads}/>
                    <Calendar applyParentCallback={this.props.setTimeFilterThunk} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}/>
                    <input onChange={()=>this.props.changeUploads(true)} type="radio" name="time_period" value="bynow_time" checked={this.props.uploads.uploads}/>
                    <UploadTimeSetter  handleSubmit={(updateForm,event)=>{
                      this.props.changeUpdatesParams(updateForm);
                      this.props.changeUploads(true)
                    }}
                        timeKind={this.props.uploads.timeKind} timeNum={this.props.uploads.timeNum}
                        from_number={this.props.uploads.from_number} from_time_type={this.props.uploads.from_time_type}/>
                    <FilterPanel iniState={this.props.paramFilter} submitCallBack={(filter)=>{this.props.setParamFilterThunk(filter)}}/>
                  </header>    
                  {Elements.length  > 0 ?<TableHeader className={'logs-table__header'} items={this.headerElements} current={this.props.sortParam} clickCallBack={this.props.changeSortThunk}/>:null}
                  
                  <div className='table-wrapper'>
                    <table className="Modules_table Modules_table-logs">
                        <tbody>
                            {Elements.length  > 0 ?
                            Elements  :
                            <div className="Modules-table__empty" ><img src={require("./Anonymous-Package.svg")} atl="события не найдены"></img></div>}  
                        </tbody>
                    </table>
                  </div>
                  <footer>
                    <span>Всего событий: {this.props.pagination.total}</span>
                    <ShowedLogsBar showedLogs={this.props.pagination.showedLogs} showedLogsList={this.props.pagination.showedLogsList} onClickCallback={this.props.changeShowedLogsThunk}/>
                    <PagesBar callBack={this.props.changePageThunk.bind(this)} pagination={this.props.pagination}/>
                    {this.props.curLog !== null ?<div className="additional-info"><h2>Дополнительная информация о выбранном событии:</h2><ul>{footerElements}</ul></div>:null}
                  </footer>
            </div>
    }
  }




export default rawLogsTable;