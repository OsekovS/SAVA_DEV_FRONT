import {Field, reduxForm} from "redux-form";
import {Component} from 'react'
import React from 'react';
import ReactDOM  from 'react-dom'
import './UploadTimeSetter.scss'



class UploadTimeSetter extends Component {
  constructor(props) {
    super(props);
    // let value = this.props.from_number
    let uploadsLetter, fromLetter
    fromLetter = this.props.defineLetter(this.props.from_number)
    uploadsLetter = this.props.defineLetter(this.props.timeNum/1000)
    this.state = {
      timeNum: this.props.timeNum,
      from_number: this.props.from_number,
      uploadsLetter: uploadsLetter,
      fromLetter: fromLetter,
      timeKind: this.props.timeKind,
      from_time_type: this.props.from_time_type,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.makeSpecialString = this.props.makeSpecialString.bind(this,this.props)
  }
  time_upload_letters = [
    {rus: ["секунду", "секунды", "секунд"], val: 1},
    {rus: ["минуту", "минуты", "минут"], val: 60},
  ]
  time_from_letters = [
    {rus: ["секунду", "секунды", "секунд"], val: 's', sex: 'w'},
    {rus: ["минуту", "минуты", "минут"], val: 'm', sex: 'w'},
    {rus: ["час", "часа", "часов"], val: 'h', sex: 'm'},
    {rus: ["день", "дня", "дней"], val: 'd', sex: 'm'},
    {rus: ["месяц", "месяца", "месяцев"], val: 'M', sex: 'm'},
  ]
 
  onInputChange(event,number,letter){
    let value
    value=event.target.value
    if(value>0){
      if(number==="timeNum") this.setState({[letter]: this.props.defineLetter((value)), [number]: value*1000});
      else this.setState({[letter]: this.props.defineLetter((value)), [number]: value});
    }
  }
  onSelectChange(key,event){
    this.setState({[key]: event.target.value})
  }
  
  onSubmit(event){
    event.preventDefault()
    this.props.changeUploadsThunk(this.state,this.props.indexName,this.props.id)
    this.props.onApply()
  }


  render () { 
    
      let timeTypes = this.time_upload_letters.map((e,n) =>{
        if(this.props.timeKind===e.val) return <option selected value={e.val} key={n.toString()}>{e.rus[this.state.uploadsLetter]}</option>
        else return <option value={e.val} key={n.toString()}>{e.rus[this.state.uploadsLetter]}</option>
      })
      let fromTimeTypes = this.time_from_letters.map((e,n) =>{
        if(this.props.from_time_type===e.val) return <option selected value={e.val} key={n.toString()}>{e.rus[this.state.fromLetter]}</option>
        else return <option value={e.val} key={n.toString()}>{e.rus[this.state.fromLetter]}</option>
      })
      

      return (
        <div className={'upload-time-setter upload-time-setter'+this.props.id}>
          <span  >{this.makeSpecialString(this.props)}</span>
          <form  className="upload-time-setter__settings" onSubmit={this.onSubmit} >
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
              <input type="submit" value="Применить"/>
              {/* <button onClick={this.onCancel.bind(this)}>Отменить</button> */}
              {/* onClick={this.props.handleSubmit.bind(this,this.state)} */}
          </form>
        </div>
      );
  }
}


export default UploadTimeSetter