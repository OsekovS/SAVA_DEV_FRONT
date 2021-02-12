import React from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import {FormControl} from 'react-bootstrap'
import moment from "moment"
import './calendar.scss'

class Wrapper extends React.Component {
 
    constructor(props){
        // console.log(props)
        super(props);
        this.dateOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };       
        this.state = {
            now: new Date(),
            mode: 'oldMode'
        }
        setInterval(()=>{
            this.setState({now: new Date()});
            // console.log('tick');
            document.getElementById('DateTimeInput_end')
        },
            3000)
    }
    // makeSpecialString(){
    //     return 'C ' +this.props.timeFilter.from.format('DD.MM.YYYY HH:mm') + ' по '+this.props.timeFilter.to.format('DD.MM.YYYY HH:mm')// .format('YYYY/MM/DD HH:mm:ss'
    // }
   
    render(){  
            let {now, mode} = this.state;           
            let ranges = {
                "Сегодня": [moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0)), moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),0,0))],
                "Вчера": [moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0)).subtract(1, "days"), moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23,59,0,0)).subtract(1, "days")],
                "3 дня": [moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0)).subtract(3, "days"),  moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),0,0))],
                "7 дней": [moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0)).subtract(7, "days"),  moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),0,0))],
                "Месяц": [moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0)).subtract(1, "months"),  moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),0,0))],
                "3 месяца": [moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0)).subtract(3, "months"),  moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),0,0))],
                "Пол года": [moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0)).subtract(6, "months"),  moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),0,0))],
                "Год": [moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0)).subtract(12, "months"),  moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),0,0))],
            }
            let start = mode==='oldMode' ? this.props.timeFilter.from : ranges[mode][0];
            let end = mode==='oldMode' ?  this.props.timeFilter.to : ranges[mode][1];
            // console.log('CALENDARRRR!',ranges)
            let local = {
                "format":"DD.MM.YYYY, HH:mm",
                "sundayFirst" : false,
                days: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
                months: [
                    'Январь',
                    'Февраль',
                    'Март',
                    'Апрель',
                    'Май',
                    'Июнь',
                    'Июль',
                    'Август',
                    'Сентабрь',
                    'Октябрь',
                    'Ноябрь',
                    'Декабрь',],
                fromDate: 'Дата начала',
                toDate: 'Дата окончания',
                selectingFrom: 'Selecting From',
                selectingTo: 'Selecting To',
                maxDate: 'Максимальная дата',
                close: 'Закрыть',
                apply: 'Применить',            
                cancel: 'Отменить'
            }
            let maxDate = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes()+1,0,0));//moment(start).add(23, "hour")
            let redTheme= 'rgb(236, 28, 36)'
            let whiteTheme= 'rgb(255, 255, 255)'
            let greyTheme = '#e0e0e0'
//                  this.applyCallback.bind(this)}
            if(this.props.standalone){
                return(
                    <DateTimeRangeContainer
                        ranges={ranges}
                        start={start}
                        end={end}
                        local={local}
                        maxDate={maxDate}
                        applyCallback={this.props.applyCallback.bind(this)}
                        rangeCallback={(num,curState)=>{this.setState({mode:curState});}}
                       style={ {
                            fromDate: { backgroundColor: redTheme},
                            toDate: {backgroundColor: redTheme},
                            betweenDates: {backgroundColor: greyTheme},
                            hoverCell: {backgroundColor: redTheme},
                            customRangeButtons: {backgroundColor: whiteTheme},
                            customRangeSelected: {backgroundColor: redTheme},
                            standaloneLayout:{display:'flex', maxWidth:'fit-content'},
                            hoverColourApply: {backgroundColor: redTheme},
                        }}
                        standalone
                    />    
                        )
            }else{

             return(
                    <DateTimeRangeContainer
                        now={now}
                        ranges={ranges}
                        start={start}
                        end={end}
                        local={local}
                        maxDate={maxDate}
                        applyCallback={this.props.applyCallback.bind(this)}
                        rangeCallback={(num,curState)=>{this.setState({mode:curState});}}
                        style={ {
                                fromDate: { backgroundColor: redTheme},
                                toDate: {backgroundColor: redTheme},
                                betweenDates: {backgroundColor: greyTheme},
                                hoverCell: {backgroundColor: redTheme},
                                customRangeButtons: {backgroundColor: whiteTheme},
                                customRangeSelected: {backgroundColor: redTheme},
                                standaloneLayout:{display:'flex', maxWidth:'fit-content'},
                                hoverColourApply: {backgroundColor: redTheme},
                            }}
                        
                            > 
                        <FormControl
                        id={"formControlsTextB"+this.props.id}
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        value={'C ' +start.format('DD.MM.YYYY HH:mm') + ' по '+end.format('DD.MM.YYYY HH:mm')}// .format('YYYY/MM/DD HH:mm:ss')
                        /> 
                        <img src={require('../calendar_black.svg')}></img>
               </DateTimeRangeContainer>
            )
        } 
                       
           
        }
}
export default Wrapper