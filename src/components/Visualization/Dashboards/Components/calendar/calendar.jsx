import React from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import {FormControl} from 'react-bootstrap'
import moment from "moment"
import './calendar.scss'

class Wrapper extends React.Component {
 
    constructor(props){
        super(props);
        let start = this.props.timeFilter.from;
        let end =  this.props.timeFilter.to;
        this.dateOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          };       

        this.state = {
            start : start,
            end : end,
        }
        this.applyCallback = this.applyCallback.bind(this);
        this.props.applyParentCallback = this.props.applyParentCallback.bind(this);
    }
 
    applyCallback(startDate, endDate){
        this.setState({
            start: startDate,
            end : endDate,
        })
        this.props.applyParentCallback(startDate, endDate);
    }

    render(){  
        // console.log(this.props)
            let now = new Date();
            let start = this.props.timeFilter.from;
            let end =  this.props.timeFilter.to;
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
//DateTimeRangeContainer 
            return(
                    <DateTimeRangeContainer
                        ranges={ranges}
                        start={start}
                        end={end}
                        local={local}
                        maxDate={maxDate}
                        applyCallback={this.applyCallback}
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
                    </DateTimeRangeContainer>
            );
        }
}
export default Wrapper