import {Component} from 'react'
import React from 'react';
import './UploadTimeSetter.scss'
import moment from "moment"
class UploadTimeSetter extends Component {
  constructor(props) {
    super(props);
    let uploadsLetter, nowMoment = moment(Date.now()), fromMoment = moment(new Date(props.lastViewed)),fromLetterEnd,
    {fromNum, fromLetter} = props.lastViewed
    uploadsLetter = props.defineLetter(props.timeNum/1000)
    fromLetterEnd = props.defineLetter(fromNum)
    this.state = {
      timeNum: props.timeNum,
      uploadsLetter: uploadsLetter,
      fromLetter,fromLetterEnd,
      fromNum,
      timeKind: props.timeKind,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.makeSpecialString = props.makeSpecialString.bind(this,this.props)
  }
  time_upload_letters = [
    {rus: ["секунду", "секунды", "секунд"], val: 1},
    {rus: ["минуту", "минуты", "минут"], val: 60},
  ]
  from_time_letters = [
    {rus: ["секунду", "секунды", "секунд"], val: 'seconds'},
    {rus: ["минуту", "минуты", "минут"], val: 'minutes'},
    {rus: ["час", "часа", "часов"], val: 'hours'},
    {rus: ["день", "дня", "дней"], val: 'days'},
    {rus: ["месяц", "месяца", "месяцев"], val: 'months'},
  ]
  onInputChange(event,number,letter,minValue){
    let value
    value= Number.parseInt(event.target.value)//===""?1:event.target.value
    console.log(value)

    if(isNaN(value) || value > minValue){
      if(number==="timeNum") this.setState({[letter]: this.props.defineLetter((value)), [number]: value*1000});
      else this.setState({[letter]: this.props.defineLetter((value)), [number]: (value)});
    }
    console.log(this.props.defineLetter((value)))
  }
  onSelectChange(key,event){

      this.setState({[key]: event.target.value})
    
  }
  
  onSubmit(event){
    event.preventDefault()
    const {id,indexName,dbName} = this.props
    this.props.changeUploadsThunk(this.state,id,indexName,dbName)
    this.props.setLastViewThunk({fromNum:this.state.fromNum,fromLetter:this.state.fromLetter},indexName,
      (typeof dbName==='object'?dbName.name:dbName))
    this.props.onApply()
  }


  render () { 
    console.log(this.state)
      let timeTypes = this.time_upload_letters.map((e,n) =>{
        if(this.props.timeKind===e.val) return <option selected value={e.val} key={n.toString()}>{e.rus[this.state.uploadsLetter]}</option>
        else return <option value={e.val} key={n.toString()}>{e.rus[this.state.uploadsLetter]}</option>
      })
      let fromTimeTypes = this.from_time_letters.map((e,n) =>{
        if(this.state.fromLetter===e.val) return <option selected value={e.val} key={n.toString()}>{e.rus[this.state.fromLetterEnd]}</option>
        else return <option value={e.val} key={n.toString()}>{e.rus[this.state.fromLetterEnd]}</option>
      })

      return (
        <div className={'upload-time-setter upload-time-setter'+this.props.id}>
          <form  className="upload-time-setter__settings" onSubmit={this.onSubmit} >
            <div>
              <label className='comment' data-title="желательное значение - более 5 секунд">Интервал обновления: <br/> 
                <input   type="number" value={this.state.timeNum/1000}  
                  onChange={(e)=>{this.onInputChange(e,'timeNum','uploadsLetter',0)}} />
                <select onChange={this.onSelectChange.bind(this,"timeKind")}>
                  {timeTypes}
                </select>
              </label>
              <label>Показать за последние: <br/> 
                <input type="number" value={this.state.fromNum} onChange={(e)=>{this.onInputChange(e,'fromNum','fromLetterEnd',0)}} />
                <select onChange={this.onSelectChange.bind(this,"fromLetter")}>
                  {fromTimeTypes}
                </select>
              </label>
            </div>
              <input type="submit" value="Применить"/>
          </form>
        </div>
      );
  }
}


export default UploadTimeSetter