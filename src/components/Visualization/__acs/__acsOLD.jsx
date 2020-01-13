import React from 'react';
import './__acs.scss';
import LogElem from '../../Common/ListElem/LogElem'
import __header from '../../Common/__header/__header'
import Chart from '../../Graphs/Chart'
import Layer from '../../Graphs/Layer'
import Ticks from '../../Graphs/Ticks'
import Bars from '../../Graphs/Bars'

import LogsTable from '../logsTable/LogsTable'
import Calendar from '../../Common/calendar/calendar'
import FilterPanel from '../../Common/FilterPanel/FilterPanel'
import moment from "moment"
import UploadTimeSetter from '../../Common/uploadTimeSetter/UploadTimeSetter.jsx'

class __acs extends React.Component {
  constructor(props) {
    super(props);
    
    // console.log(this.props.timeFilter.from.format('YYYY/MM/DD hh:mm:ss'))
    // console.log(this.props.timeFilter.to)
    // console.log(this.props.timeFilter.to.format('YYYY/MM/DD hh:mm:ss'))
    this.state={
      filterMode: false,
      from: this.props.timeFilter.from,
      to: this.props.timeFilter.to,
      uploadsSetter: 'collapsed'
      // filterParam: {
      //   event: ["Доступ запрещен. Отсутствует разрешение на проход.", "Зарегистрирован проход."],
      //   person: ["Артем Артишев", "Николай Таратьев"]
      // }
    }
    // console.log(this.state)
    this.func = this.func.bind(this)
    // this.changeUploads = this.changeUploads.bind(this)
    this.onChangeFilterMode = this.onChangeFilterMode.bind(this);
    this.ChangeUploadsDisplay = this.ChangeUploadsDisplay.bind(this)
  }
  func(){
    // console.log(':)')
    let now = new Date()
    // let fromDate =
    this.setState(state => ({
      to:  moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0)))
    }));
    this.props.getAcs({
      "need": "logs",
      "timeFilter": {
        from: this.state.from.format('YYYY/MM/DD HH:mm:ss'),
        to:  this.state.to.format('YYYY/MM/DD HH:mm:ss')
      },
      "paramsFilter": this.state.filterParam
  });
  }
  componentDidMount() {
    // console.log(this.state)
    console.log('Mount')
    this.props.getAcs({"need": "logs",
    "timeFilter": {
      // from: this.state.from.format('YYYY/MM/DD HH:mm:ss'),
      // to:  this.state.to.format('YYYY/MM/DD HH:mm:ss'),
      from: this.props.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
      to: this.props.timeFilter.to.format('YYYY/MM/DD HH:mm:ss'),
    },
    "paramsFilter": this.state.filterParam
  });
    // console.log(this.state.uploads)
    // this.intervalId = setInterval(this.func.bind(this), 5000);
  }
  componentWillUnmount(){
    console.log('unMount')
    if(this.state.intervalId!==undefined) clearInterval(this.intervalId);
  }
  // Изменяется интервал
  componentWillReceiveProps(nextProps){
    // console.log(this.state)
    // console.log(nextProps.uploads.timeKind*nextProps.uploads.timeNum)
    // console.log(nextProps)
    // console.log(this.state.intervalId)
    if(!nextProps.uploads.uploads||this.state.intervalId!==undefined){
      clearInterval(this.state.intervalId);
      console.log(this.props.paramFilter)
      console.log(nextProps.paramFilter)
      for(var propName in nextProps.paramFilter){

        if (! this.props.paramFilter.hasOwnProperty(propName)) { // Есть ли свойства в обоих объектах
          console.log('change')  
          return false;
        }
        if(nextProps.paramFilter[propName].valueOf() !== this.props.paramFilter.valueOf()){ // Одинаковы ли значения свойст 
            // if(! deepEqual(obj1[propName], obj2[propName]) ){ // проверка объекта в объекте
            console.log('change')   
            // return false;
            // }

       }
    }
    if(nextProps.uploads.uploads){ 
      console.log('setTim')
      this.state.intervalId = setInterval(
      ()=>this.props.getAcs({
        "need": "logs",
        "timeFilter": {
          from: 'now-'+nextProps.uploads.from_number+nextProps.uploads.from_time_type+'/'+nextProps.uploads.from_time_type,
          to:  nextProps.uploads.to
        },
        // "paramsFilter": this.state.filterParam
    }),
      nextProps.uploads.timeKind*nextProps.uploads.timeNum);
    }
    console.log(this.state.intervalId)
  }
}

  

  onChangeFilterMode = (user) => {
    this.setState(state => ({
      filterMode: !this.state.filterMode
    }));
  }

  onPageChanged = (pageNumber) => {
      this.props.getUsers(pageNumber, this.props.pageSize);
  }

 
  
  ChangeUploadsDisplay=()=>{
      this.setState(state => ({
        uploadsSetter: state.uploadsSetter==='collapsed'?'deployed':'collapsed'
      }));
    }
  render() {
    // console.log(this.props.logs.length)
    let series = {bar2: {series: [{
      data: [13, 17, 19]           
      }],
      xLabels : ['xz','e','x']
    }}
    
        let xLabels1
        let xLabels2
        let Elements = this.props.logs.map(e => <LogElem name='' items={e} />)
        let clientWidth = document.body.clientWidth
        
        if(clientWidth<1400){
          xLabels1 = this.props.bar1.xLabels.filter((e,n) => n%2==0)
          xLabels2 = this.props.bar2.xLabels.filter((e,n) => n%2==0)
        }else{
          xLabels1 = this.props.bar1.xLabels;
          xLabels2 = this.props.bar2.xLabels;
        }
        // console.log(this.props.timeFilter.from)
        // console.log(this.props.timeFilter.to)
        let paginationList = []
        let index = this.props.pagination.fromPage
        for (index; index < this.props.pagination.fromPage+this.props.pagination.showedPages; index++) {
          if(index===this.props.pagination.currentPage)
          paginationList.push(<li className="pages-bar__curr-page" key={index}>{index}</li>)
          else paginationList.push(<li key={index}>{index}</li>)
        }
        paginationList.push(<li className="pages-bar__ellipsis" key={index+1}>...</li>)
        paginationList.push(<li key={index+2}>{this.props.pagination.lastPage}</li>)

        let showedLogsList = this.props.pagination.showedLogsList.map((e,index) => {
          if(e===this.props.pagination.showedLogs) return <li className="showed-logs__current" key={index} >{e}</li>
          else return <li key={index} >{e}</li>
        })
        
        console.log(this.props.pagination)
        return <div className="Visualization__cameras">
          <LogsTable/>
            <header className="Common__header Common__header_red Common__header_with-filter">
              Логи СКУД
              <input onChange={()=>this.props.changeUploads(false)} type="radio" name="time_period" value="configured_time" checked={!this.props.uploads.uploads}/>
              <Calendar applyParentCallback={this.props.setTimeFilterThunk.bind(this,this.props.paramFilter)} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}/>
              <input onChange={()=>this.props.changeUploads(true)} type="radio" name="time_period" value="bynow_time" checked={this.props.uploads.uploads}/>
              <UploadTimeSetter  onSubmit={(updateForm)=>{
                this.props.changeUpdatesParams(updateForm);
                this.setState(state => ({
                   uploadsSetter:'collapsed' 
                   }))}}
               timeKind={this.props.uploads.timeKind} timeNum={this.props.uploads.timeNum} ChangeDisplay={this.ChangeUploadsDisplay} display={this.state.uploadsSetter}
               from_number={this.props.uploads.from_number} from_time_type={this.props.uploads.from_time_type}/>
              <button onClick={this.onChangeFilterMode}>Настроить фильтр</button>
            </header>
            <FilterPanel display={this.state.filterMode} submitCallBack={(filter)=>{this.props.setParamFilterThunk(this.props.uploads.uploads,this.props.timeFilter,filter);this.onChangeFilterMode()}}/>
            <div className='table-wrapper'>
              <table className="Modules_table Modules_table__cam-dev">
                  <tbody>
                      {Elements}  
                  </tbody>
              </table>
            </div>
            <footer>
              <span>Всего логов: {this.props.pagination.total}</span>
              <ul className="showed-logs">
                {showedLogsList}
              </ul>
              <ul className="pages-bar">
                  {paginationList}
              </ul>
            </footer>
            {/* props.bar1.series */}
            <Chart width={ clientWidth/2} height={300} series={this.props.bar1.series} minY={0}>
              <Layer width='90%' height='90%' position='top center'>
                <Ticks
                  axis='y'
                  lineLength='100%'
                  // maxTicks = {clientWidth<1400? 12:24}
                  //ticks={{minDistance:1.6}}
                  lineVisible={true}
                  lineStyle={{stroke:'lightgray'}}
                  labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray',fontSize:'0.7em'}}
                  labelAttributes={{x: -5}}
                  labelFormat={label => label}
                />
                {/* xLabels2 */}
                <Ticks
                  axis='x'
                  ticks={{maxTicks:clientWidth<1400? 12:24}}
                  // maxTicks = {clientWidth<1400? 12:24}
                  labels = {xLabels1}
                      label={({index, props}) => props.labels[index]}
                  labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge',fill:'black',fontSize:'0.7em'}}
                  labelAttributes={{y: 3}}
                />
                <Bars
                  groupPadding='0%'
                  innerPadding='0.3%'
                />
              </Layer>
            </Chart>
            <Chart width={clientWidth/2} height={300} series={this.props.bar2.series} minY={0}>
              <Layer width='90%' height='90%' position='top center'>
                <Ticks
                  axis='y'
                  lineLength='100%'
                  // ticks={{maxTicks:24}}
                  // maxTicks = {clientWidith<1400? 12:24}
                  lineVisible={true}
                  lineStyle={{stroke:'lightgray'}}
                  labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray',fontSize:'0.7em'}}
                  labelAttributes={{x: -5}}
                  labelFormat={label => label}
                />
                {/* series.xLabels */}
                <Ticks
                  axis='x'
                  ticks={{maxTicks:clientWidth<1400? 12:24}}
                  // maxTicks = {clientWidth<1400? 12:24}
                  labels = {xLabels2}
                    label={({index, props}) => props.labels[index]}
                  labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge',fill:'black',fontSize:'0.7em'}}
                  labelAttributes={{y: 3}}
                />
                <Bars
                  groupPadding='0%'
                  innerPadding='0.3%'
                />
              </Layer>
            </Chart>
            </div>
  }
}





export default __acs;