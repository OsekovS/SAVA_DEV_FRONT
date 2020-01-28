import React from 'react';
import {Component} from 'react'
import UploadTimeSetter from './uploadTimeSetter/UploadTimeSetterCont.jsx'
import Calendar from './calendar/calendarCont'
import  './TimeFilterPanel.scss'
class TimeFilterPanel extends Component {
    constructor(props) {
      super(props);
      
      this.onApply = this.onApply.bind(this)
      this.makeSpecialString = this.makeSpecialString.bind(this)
      this.state = {
        display: 'collapsed',
        preview: this.props.uploads.uploads?this.makeSpecialString(props):'C ' +this.props.timeFilter.from.format('DD.MM.YYYY HH:mm') + ' по '+this.props.timeFilter.to.format('DD.MM.YYYY HH:mm')
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
    componentWillReceiveProps(newprops){
      this.setState({ preview: newprops.uploads.uploads?this.makeSpecialString(newprops.uploads):' c ' +newprops.timeFilter.from.format('DD.MM.YYYY HH:mm') + ' по '+newprops.timeFilter.to.format('DD.MM.YYYY HH:mm') });
    }
    onApply(){
      this.setState({ display: 'collapsed' });
    }
   
    render(){
        let viget 
        let {timeKind, timeNum, from_number, from_time_type} = this.props.uploads
        if(this.state.display=== 'interval') viget = <Calendar id={this.props.id} indexName={this.props.indexName} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}} onApply={this.onApply}/>
        else viget = <UploadTimeSetter indexName={this.props.indexName} defineLetter={this.defineLetter} makeSpecialString={this.makeSpecialString} timeKind={timeKind} timeNum={timeNum}  from_number={from_number} from_time_type={from_time_type} id={this.props.id} onApply={this.onApply}/>
        if(this.state.display==='collapsed') return <span className='time-filter-panel__collapsed' onClick={()=>{this.setState({ display: 'uploads' });}}>{this.state.preview}<img src={require('./calendar.svg')}></img></span>
        else return <div className="modal-form-keeper time-filter-panel"  >
                        <div>
                            <header><span><img src={require('./calendar.svg')}></img>Временные настройки</span><button onClick={()=>{this.setState({ display: 'collapsed' });}}><img src={require('../close.svg')}></img></button></header>
                            <ul>
                                <li className={this.state.display==='interval'?'active':''} onClick={()=>{this.setState({ display: 'interval' });}}>В режиме временного интервала</li>
                                <li className={this.state.display==='uploads'?'active':''} onClick={()=>{this.setState({ display: 'uploads' });}}>В режиме обновлений</li>
                            </ul>
                            {viget}    
                        </div>
                                       
                </div>
    }
}

export default TimeFilterPanel;

//     // this.ChangeDisplay = this.ChangeDisplay.bind(this);
    
//     // this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   // Вызывается после удаления компонента из DOM
//   componentWillUnmount() {
//     document.removeEventListener('click', this.handleClickOutside.bind(this), false);
//   }

//   // Вызывается до рендера
//   componentWillMount() {
//     document.addEventListener('click', this.handleClickOutside.bind(this), false);
//   }

// // Отлавливаем клик на любую область
// handleClickOutside(e) {
//   // Получаем ссылку на элемент, при клике на который, скрытие не будет происходить
  
//   const emojiBlock = document.getElementsByClassName('upload-time-setter'+this.props.id)[0];
//   // console.log(emojiBlock)
//   // Проверяем, есть ли в списке родительских или дочерних элементов, вышеуказанный компонент
//   if (!e.path.includes(emojiBlock)) {
//     // Если в области кликнутого элемента нету "emojiBlock", то проверяем ниже
//     // Не произведен ли клик на кнопку, открывающую окно смайлов
//     // const svgSmileBtn = document.querySelector('.chat-input__smile-btn');
//     // Если клик не производился и на кнопку открытия окна смайлов, то скрываем блок. if (!e.path.includes(svgSmileBtn))
//      this.setState({ display: 'collapsed' });
//   }else{
//     this.setState({ display: 'deployed' });
//   }
// }