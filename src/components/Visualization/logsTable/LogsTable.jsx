import React from 'react';
import Calendar from './calendar/calendar'
import FilterPanel from '../../Common/FilterPanel/FilterPanel'
import moment from "moment"
import UploadTimeSetter from './uploadTimeSetter/UploadTimeSetter.jsx'
import LogElem from './LogElem/LogElem'
import PagesBar from './pagesBar/PagesBar'
import './Logtable.scss'
class rawLogsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            filterMode: false,
            uploadsSetter: 'collapsed'
        }
        console.log(this.props)
        this.intervalId = setInterval(
          ()=>{console.log('---------------GETACS------------------') 
          this.props.getAcs({
            "need": "logs",
            "timeFilter": {
              from: 'now-'+this.props.uploads.from_number+this.props.uploads.from_time_type+'/'+this.props.uploads.from_time_type,
              to:  this.props.uploads.to
            },
            "paramsFilter": this.props.paramFilter,
            logsCount: this.props.pagination.showedLogs,
            curPage: this.props.pagination.currentPage
        })},
        this.props.uploads.timeKind*this.props.uploads.timeNum);
        this.onChangeFilterMode = this.onChangeFilterMode.bind(this);
        this.ChangeUploadsDisplay = this.ChangeUploadsDisplay.bind(this)
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
            curPage: this.props.pagination.currentPage
        });
      }else{
        this.props.getAcs({
          "need": "logs",
          "timeFilter": {
            from: 'now-'+this.props.uploads.from_number+this.props.uploads.from_time_type+'/'+this.props.uploads.from_time_type,
            to:  this.props.uploads.to
          },
          "paramsFilter": this.props.paramFilter,
          logsCount: this.props.pagination.showedLogs,
          curPage: this.props.pagination.currentPage
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
          // console.log('change')  
          return false;
        }
      }
      return true
    }
    // Изменяется интервал
    componentWillReceiveProps(nextProps){
      // console.log(nextProps)
      // console.log(this.intervalId)
      // console.log(nextProps)
      // console.log(this.props)
      // Проверяем изменился ли фильтр и временные рамки
      let equal = this.isObjEqual(nextProps.uploads,this.props.uploads) && this.isObjEqual(nextProps.paramFilter,this.props.paramFilter)  && this.isObjEqual(this.props.paramFilter,nextProps.paramFilter) 
      if(!equal){//this.state.intervalId!==undefined
        console.log('CHANGE!!!!!!!!!!!!!!')  
        if(this.intervalId!==undefined){
          clearInterval(this.intervalId);
          // console.log('clearTim')  
        }
      if(nextProps.uploads.uploads){ 
        this.props.getAcs({
          "need": "logs",
          "timeFilter": {
            from: 'now-'+nextProps.uploads.from_number+nextProps.uploads.from_time_type+'/'+nextProps.uploads.from_time_type,
            to:  nextProps.uploads.to
          },
          "paramsFilter": nextProps.paramFilter,
          logsCount: this.props.pagination.showedLogs,
          curPage: this.props.pagination.currentPage
      })
        // console.log('setTim')
        this.intervalId = setInterval(
        ()=>this.props.getAcs({
          "need": "logs",
          "timeFilter": {
            from: 'now-'+nextProps.uploads.from_number+nextProps.uploads.from_time_type+'/'+nextProps.uploads.from_time_type,
            to:  nextProps.uploads.to
          },
          "paramsFilter": nextProps.paramFilter,
          logsCount: this.props.pagination.showedLogs,
          curPage: this.props.pagination.currentPage
      }),
        nextProps.uploads.timeKind*nextProps.uploads.timeNum);
      }
      // console.log(this.intervalId)
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
    headerElements = ['Дата','Тип события','Объект','Конечная точка','Событие','Направление','Владелец']
    tableHeader(){
      let elements = this.headerElements.map((e,numb) => <td key={numb}>{e}</td>)
      return <tr>{elements}</tr>
    }
    render() {  
        let Elements = this.props.logs.map(e => <LogElem name='' items={e} />)
        Elements.unshift(this.tableHeader())
        // , this.props.timeFilter, this.props.paramFilter, e, this.props.pagination.currentPage
        let showedLogsList = this.props.pagination.showedLogsList.map((e,index) => {
        if(e===this.props.pagination.showedLogs) return <li onClick={this.props.changeShowedLogsThunk.bind(this, e)} className="showed-logs__current" key={index} >{e}</li>
        else return <li onClick={this.props.changeShowedLogsThunk.bind(this, e)} key={index} >{e}</li>
        })
        // .bind(this,this.props.paramFilter, this.props.pagination.showedLogs, this.props.pagination.currentPage)
        // console.log(this.props.pagination)
        return <div className="devices-logs">
            <header className="Common__header Common__header_red Common__header_with-filter">
            События СКУД
            <input onChange={()=>this.props.changeUploads(false)} type="radio" name="time_period" value="configured_time" checked={!this.props.uploads.uploads}/>
            <Calendar applyParentCallback={this.props.setTimeFilterThunk} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}/>
            <input onChange={()=>this.props.changeUploads(true)} type="radio" name="time_period" value="bynow_time" checked={this.props.uploads.uploads}/>
            <UploadTimeSetter  handleSubmit={(updateForm,event)=>{
              // console.log(numbers)
              // console.log(timeTypes)
              event.preventDefault()
              this.props.changeUpdatesParams(updateForm);
              this.props.changeUploads(true)
              this.setState(state => ({
                    uploadsSetter:'collapsed' 
                    }))
                  }}
                timeKind={this.props.uploads.timeKind} timeNum={this.props.uploads.timeNum} ChangeDisplay={this.ChangeUploadsDisplay} display={this.state.uploadsSetter}
                from_number={this.props.uploads.from_number} from_time_type={this.props.uploads.from_time_type}/>
            <button onClick={this.onChangeFilterMode}>Настроить фильтр</button>
            </header>
            {/* this.props.uploads.uploads, this.props.timeFilter, filter, this.props.pagination.showedLogs, this.props.pagination.currentPage */}
            <FilterPanel iniState={this.props.paramFilter} display={this.state.filterMode} submitCallBack={(filter)=>{this.props.setParamFilterThunk(filter);this.onChangeFilterMode()}}/>
            <div className='table-wrapper'>
            <table className="Modules_table Modules_table__cam-dev">
                <tbody>
                    {Elements.length  > 0 ?
                    Elements  :
                    <div className="Modules-table__empty" ><img src={require("./Anonymous-Package.svg")} atl="события не найдены"></img></div>}  
                </tbody>
            </table>
            </div>
            <footer>
            <span>Всего событий: {this.props.pagination.total}</span>
            {/* !!!!!!!!!!!! */}
            <ul className="showed-logs">
                {showedLogsList}
            </ul>
            <PagesBar callBack={this.props.changePageThunk.bind(this)} pagination={this.props.pagination}/>
                  {/* !!!!!!!!!!!! 
                  , this.props.timeFilter, this.props.paramFilter, this.props.pagination.showedLogs*/}

            </footer>
            {/* props.bar1.series */}

            </div>
    }
  }




export default rawLogsTable;
