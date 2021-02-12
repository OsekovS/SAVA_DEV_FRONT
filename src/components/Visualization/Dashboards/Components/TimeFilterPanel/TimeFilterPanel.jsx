import React from 'react';
import {Component} from 'react'
import UploadTimeSetter from './uploadTimeSetter/UploadTimeSetterCont.jsx'
import Calendar from './calendar/calendar'
import moment from "moment"
import  './TimeFilterPanel.scss'
class TimeFilterPanel extends Component {
    constructor(props) {
   
      super(props);
      let lastViewed = props.lastViewed//JSON.parse()
      let preview = this.props.uploads.uploads? ' с '+(moment(new Date()).subtract(lastViewed.fromNum, lastViewed.fromLetter)).format('DD.MM.YYYY HH:mm'):' с ' +this.props.timeFilter.from.format('DD.MM.YYYY HH:mm') + ' по '+this.props.timeFilter.to.format('DD.MM.YYYY HH:mm')   
      
      this.makeSpecialString = this.makeSpecialString.bind(this)
      this.state = {
        display: 'collapsed',
        preview 
      };
    }
    time_upload_letters = [
      {rus: ["секунда", "секунды", "секунд"], val: 1},
      {rus: ["минута", "минуты", "минут"], val: 60},
    ]
    time_from_letters = [
      {rus: ["секунда", "секунды", "секунд"], val: 's', sex: 'w'},
      {rus: ["минута", "минуты", "минут"], val: 'm', sex: 'w'},
      {rus: ["час", "часа", "часов"], val: 'h', sex: 'm'},
      {rus: ["день", "дня", "дней"], val: 'd', sex: 'm'},
      {rus: ["месяц", "месяца", "месяцев"], val: 'M', sex: 'm'},
    ]
    defineLetter(value){
      if(value[value.length-1] === '1' && value !== '11')
        {
          return 0
        }
        else if((value[value.length-1] === '2' ||
        value[value.length-1] === '3' ||
        value[value.length-1] === '4') && value[0] !== '1' )
        {
          return 1
        }
        else
        {
          return 2
        }
    }
    makeSpecialString(props){
      let str1,str2
      this.time_from_letters.forEach(element => {
        if(element.val===props.from_time_type){
          if(props.from_number!=='1'){
            str1 = ' за последние'
            str2= props.from_number+' '
          }
          else{
            str2=''
            if(element.sex==='m') str1 = ' за последний'
            else str1 = ' за последнюю'
          }
          str2 += element.rus[this.defineLetter((props.from_number))]
        }
      });
      return str1+' '+str2
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

    componentWillReceiveProps(newprops){
      const props=this.props
      // console.log(newprops.uploads)
      // console.log(props.uploads)
      // console.log(newprops.timeFilter)
      // console.log(newprops.lastViewed)
      // console.log(this.isObjEqual(newprops.lastViewed,this.props.lastViewed))
      if(!this.isObjEqual(newprops.uploads,props.uploads)||!this.isObjEqual(newprops.timeFilter,props.timeFilter)||this.isObjEqual(newprops.lastViewed,this.props.lastViewed)){
        if(newprops.uploads.uploads||!this.isObjEqual(newprops.lastViewed,this.props.lastViewed)) {
          let lastViewed = newprops.lastViewed//JSON.parse()
          this.setState({preview:' с ' + (moment(new Date()).subtract(lastViewed.fromNum, lastViewed.fromLetter)).format('DD.MM.YYYY HH:mm')})
          // this.setState({preview: ' с ' +  newprops.lastViewed.replace(/\//g, ".") + ' (с момента последнего прочтения)' });
        }
          
        else
          this.setState({preview: ' c ' +newprops.timeFilter.from.format('DD.MM.YYYY HH:mm') + ' по '+newprops.timeFilter.to.format('DD.MM.YYYY HH:mm') });
      }
    }

    applyCalendarCallback(startDate, endDate){
      const {id,indexName,dbName} = this.props
      this.props.setTimeFilterThunk(startDate, endDate, indexName, id, dbName);
      this.setState({ display: 'collapsed' });
      // this.props.changelastViewed('nope',dbName)
  }
  // <Calendar standalone={true} timeFilter={timeFilter} applyCallback={this.applyCalendarCallback.bind(this)}/> <></>
    render(){
        let viget 
        // console.log(this.state.display)
        const {id,indexName,dbName,timeFilter,lastViewed} = this.props
        // console.log(timeFilter)

        let {timeKind, timeNum, from_number, from_time_type} = this.props.uploads
        if(this.state.display=== 'interval') viget = <Calendar standalone={true} timeFilter={timeFilter} applyCallback={this.applyCalendarCallback.bind(this)}/>
        else viget = <UploadTimeSetter lastViewed={lastViewed} id={id} indexName={indexName} dbName={dbName} defineLetter={this.defineLetter} makeSpecialString={this.makeSpecialString} timeKind={timeKind} timeNum={timeNum}  from_number={from_number} from_time_type={from_time_type}  onApply={()=>{this.setState({ display: 'collapsed' })}}/>
        if(this.state.display==='collapsed') return <span data-title="изменение временных настроек" style={{fontSize:'16px'}} className='time-filter-panel__collapsed comment' onClick={()=>{this.setState({ display: 'uploads' });}}><img src={require('./calendar.svg')}></img></span>
        // if(this.state.display==='collapsed') return <span data-title="изменение временных настроек" style={{fontSize:'16px'}} className='time-filter-panel__collapsed comment' onClick={()=>{this.setState({ display: 'uploads' });}}>{this.state.preview}<img src={require('./calendar.svg')}></img></span>
        else return <div className="modal-form-keeper time-filter-panel"  >
                        <div >
                            <header><span><img src={require('./calendar.svg')}></img>Временные настройки</span><button onClick={()=>{this.setState({ display: 'collapsed' });}}><img src={require('../close.svg')}></img></button></header>
                            <ul className="modal-form-keeper__mode-toggler">
                                <li className={this.state.display==='interval'?'active':''} onClick={()=>{this.setState({ display: 'interval' });}}>В режиме временного интервала</li>
                                <li className={this.state.display==='uploads'?'active':''} onClick={()=>{this.setState({ display: 'uploads' });}}>В режиме обновлений</li>
                            </ul>
                            {viget}    
                        </div>
                                       
                      </div>
    }
}

export default TimeFilterPanel;