import React from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import {FormControl} from 'react-bootstrap'
import moment from "moment"
import './calendar.scss'

class Wrapper extends React.Component {
 
    constructor(props){
        super(props);
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
        let end =  moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),0,0));
        this.dateOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          };
        this.state = {
            start : start,
            end : end
        }
 
        this.applyCallback = this.applyCallback.bind(this);
    }
 
    applyCallback(startDate, endDate){
        this.setState({
                start: startDate,
                end : endDate
            }
        )
    }
 
    render(){
            let now = new Date();
            let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
            let end = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),0,0));//moment(start).add(1, "days").subtract(2, "hour");
            let ranges = {
                "Today Only": [moment(start), moment(end)],
                "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
                "3 Days": [moment(start).subtract(3, "days"), moment(end)]
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
            return(
                    <DateTimeRangeContainer 
                        ranges={ranges}
                        start={this.state.start}
                        end={this.state.end}
                        local={local}
                        maxDate={maxDate}
                        applyCallback={this.applyCallback}
                    >    
                        <FormControl
                        id="formControlsTextB"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        value={'C ' +new Date(this.state.start).toLocaleString("ru", this.dateOptions) + ' по '+new Date(this.state.end).toLocaleString("ru", this.dateOptions)}
                        /> 
                    </DateTimeRangeContainer>
            );
        }
}
export default Wrapper