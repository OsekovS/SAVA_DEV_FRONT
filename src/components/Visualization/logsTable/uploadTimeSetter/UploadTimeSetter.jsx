import {Field, reduxForm} from "redux-form";
import {Component} from 'react'
import React from 'react';
import './UploadTimeSetter.scss'



class UploadTimeSetter extends Component {
  constructor(props) {
    super(props);
    // let value = this.props.from_number
    let uploadsLetter, fromLetter
    fromLetter = this.defineLetter(this.props.from_number)
    uploadsLetter = this.defineLetter(this.props.timeNum/1000)
    this.state = {
      timeNum: this.props.timeNum,
      from_number: this.props.from_number,
      uploadsLetter: uploadsLetter,
      fromLetter: fromLetter,
      timeKind: this.props.timeKind,
      from_time_type: this.props.from_time_type
    };

    this.onInputChange = this.onInputChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
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
  onInputChange(event,number,letter){
    let value
    value=event.target.value
    if(value>0){
      if(number==="timeNum") this.setState({[letter]: this.defineLetter((value)), [number]: value*1000});
      else this.setState({[letter]: this.defineLetter((value)), [number]: value});
    }
  }
  onSelectChange(key,event){
    this.setState({[key]: event.target.value})
  }
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
  render () {
    let str1,str2
    this.time_from_letters.forEach(element => {
      if(element.val===this.props.from_time_type){
        if(this.props.from_number!=='1'){
          str1 = 'Последние'
          str2= this.props.from_number+' '
        }
        else{
          str2=''
          if(element.sex==='m') str1 = 'Последний'
          else str1 = 'Последняя'
        }
        str2 += element.rus[this.defineLetter((this.props.from_number))]
      }
    });
    
    
   
    if(this.props.display==='deployed'){
      let timeTypes = this.time_upload_letters.map((e,n) =>{
        if(this.props.timeKind===e.val) return <option selected value={e.val} key={n.toString()}>{e.rus[this.state.uploadsLetter]}</option>
        else return <option value={e.val} key={n.toString()}>{e.rus[this.state.uploadsLetter]}</option>
      })
      // <option  value={e.val} key={n.toString()}>{e.rus[this.state.uploadsLetter]}</option>
      // )
      let fromTimeTypes = this.time_from_letters.map((e,n) =>{
        if(this.props.from_time_type===e.val) return <option selected value={e.val} key={n.toString()}>{e.rus[this.state.fromLetter]}</option>
        else return <option value={e.val} key={n.toString()}>{e.rus[this.state.fromLetter]}</option>
      })
      

      return (
        <div className='upload-time-setter'>
          <span  onClick={this.props.ChangeDisplay}>{str1} {str2}</span>
          <form  className="upload-time-setter__settings" onSubmit={this.props.handleSubmit.bind(this,this.state)} >
              <label>Интервал обновления: <br/> 
                <input type="number" value={this.state.timeNum/1000} onChange={(e)=>{this.onInputChange(e,'timeNum','uploadsLetter')}} />
                <select onChange={this.onSelectChange.bind(this,"timeKind")}>
                  {timeTypes}
                </select>
              </label>
              <label>Информация за последние: <br/>
              <input type="number" value={this.state.from_number} onChange={(e)=>{this.onInputChange(e,'from_number','fromLetter')}} />
                <select onChange={this.onSelectChange.bind(this,'from_time_type')} >
                  {fromTimeTypes}
                </select>
              </label>
              <button >Применить</button>
              {/* onClick={this.props.handleSubmit.bind(this,this.state)} */}
          </form>
        </div>
      );
      }else {
        
        return <span className={'upload-time-setter__collapsed'} onClick={this.props.ChangeDisplay}>{str1}  {str2}</span>
      }
      // else return <span className={'upload-time-setter__collapsed'} onClick={this.props.ChangeDisplay}>Последние {this.props.timeNum/1000} {this.props.timeKind === 1?'секунд':'минут'}</span>

  }
}


export default UploadTimeSetter