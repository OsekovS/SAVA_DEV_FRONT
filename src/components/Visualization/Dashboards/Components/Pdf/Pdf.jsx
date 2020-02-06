import React from 'react';
import * as axios from 'axios'
import Calendar from '../TimeFilterPanel/calendar/calendar'
import {connect} from "react-redux";
import {onCreatePdfThunk}  from "../../../../redux/acs-dashboards-reducer";
import Dropdown from '../FilterPanel/dropdown/dropdown'
import './Pdf.scss'
{/* <img onClick={onCreatePdfThunk.bind(this,props.id)} className='pdf__wait' src={require('./icon.svg')}></img> */}
const Pdf = (props) => {
    if(props.display==='wait') return <a href="php/upload-file.php?filename=file.pdf"><img  className='pdf__wait' src={require('./icon.svg')}></img></a>
        else return <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
}
//<a href="upload-file.php?filename=file.pdf"><img onClick={onCreatePdfThunk.bind(this,props.id)} className='pdf__wait' src={require('./icon.svg')}></img></a>
class PdfMaker extends React.Component{
    constructor(props){
        super(props)
        let title = 'Отчет с ' +this.props.timeFilter.from.format('DD.MM.YYYY HH:mm') + ' по '+this.props.timeFilter.to.format('DD.MM.YYYY HH:mm')
        this.state = {
            params: {...props.iniState},
            display: 'collapsed',
            title,
            timeFilter: props.timeFilter,
            mainField: undefined,
            clickButtonText: "Сотворить pdf"
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.changeMainField = this.changeMainField.bind(this);
        this.makeFilter = this.makeFilter.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }
    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }
    applyCalendarCallback(startDate, endDate){
        
        this.setState({ 
            title :'Отчет с ' +startDate.format('DD.MM.YYYY HH:mm') + ' по '+endDate.format('DD.MM.YYYY HH:mm'),
            timeFilter: {from:startDate,to:endDate}
         });
    // this.props.onApply()//'C ' +this.props.timeFilter.from.format('DD.MM.YYYY HH:mm') + ' по '+this.props.timeFilter.to.format('DD.MM.YYYY HH:mm')
    }
    onChangeFilterField = (keyState,key)=>{
        this.setState(state => {
            state.params[key] = keyState 
            return state
          })  
      }
      changeMainField = (mainField)=>{
        this.setState({mainField});
      }
    makeFilter(){
        let filter = []
        let options
        for (const key in this.props.configObj) {
            if (this.props.configObj.hasOwnProperty(key)) {
                if(Array.isArray(this.props.configObj[key])){
                    // console.log(this.props.configObj[key])
                    options = this.props.configObj[key].map((e,n) => {
                        return {
                            value: e,
                            label: e,
                        } 
                    })
                    filter.push(
                        <Dropdown selected={this.state.params[key]===undefined?[]:this.state.params[key]} iniState={this.state.params[key]===undefined?[]:this.state.params[key]} name={key} options={options} 
                        preview={this.props.fields[key].translate} onChangeCallBack={(this.onChangeFilterField.bind(this))}/>
                    )
                }
            }
        }
        return filter
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
    onSubmit(){
        // this.props.createPdfThunk
        let obj = {params:[{}]}
        obj.params[0].timerange = {
            "starttime": this.state.timeFilter.from.format('YYYY/MM/DD HH:mm:ss'),
            "endtime": this.state.timeFilter.to.format('YYYY/MM/DD HH:mm:ss')
        }
        obj.params[0].filter = this.state.params
        obj.params[0].grouping = {
            "name": "по объектам",
            "argument": this.state.mainField
        }
        obj.params[0].type = this.state.title
        obj.params[0].indexName = this.props.indexName
        let reqObj={
            str:JSON.stringify(obj)
        }
        console.log(reqObj)
        this.setState({clickButtonText: 'ожидайте окончания создания отчета..'});
        // axios.get(`php/upload-file.php`);
        axios.post("php/make-file.php", reqObj).then(response => {
            this.setState({clickButtonText: "Сотворить pdf"});
            // console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('href', 'php/upload-file.php');
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
           
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });;


        this.setState({display: 'collapsed'});
    }
    // Изменился ли фильтр
    componentWillReceiveProps(nextProps){
        //если отличаются исходные данные для фильтра
        if(!this.isObjEqual(nextProps.iniState,this.state.params)) this.setState({params: nextProps.iniState});
    }
    render() {
        // console.log(this.state.iniState)
        if(this.state.display==='collapsed')
            return  <img onClick={()=>{this.setState({ display: 'deployed' });}} className='pdf__wait' src={require('./icon.svg')}></img>
        else {
            let fields = Object.keys(this.props.configObj).map((e,n) => {
                //начальное значение - отдельная запара
                if(e===this.props.field) return <option selected value={e}>{this.props.fields[e].translate}</option>
                else if(e!=='translate') return <option value={e}>{this.props.fields[e].translate}</option>
            })
            let { timeFilter} = this.state
            return  <div className="modal-form-keeper param-pdf-panel param-panel"  >
            <div>
                <header><span>Настройки отчета</span><button onClick={()=>{this.setState({ display: 'collapsed' });}}><img src={require('../close.svg')}></img></button></header>
                    <form onSubmit={this.onSubmit} >
                        <h3>Название отчета:</h3>
                            <input onChange={this.handleTitleChange} type="text" value={this.state.title} className='param-pdf-panel_title-input'/>
                            
                        <h3>Настройка временного интервала с ... по ...</h3>
                        <Calendar standalone={false} timeFilter={timeFilter} applyCallback={this.applyCalendarCallback.bind(this)}/>
                        <h3>Настройка фильтра</h3>
                            <div className='param-pdf-panel_filters'>
                                <div>{this.makeFilter()}</div>
                            </div>
                        <h3>Группировать отчет в таблице по полю:</h3>
                            <select onChange={(event)=>{this.changeMainField(event.target.value)}}>
                            {fields}
                            </select>
                    <input type="submit" value={this.state.clickButtonText}/><button onClick={this.onCancel}>Отменить</button>
                </form>  
            </div>
                        
            </div>
        }
            
    }
}

// let mapStateToProps = (state) => {
//     return {
//    }
// }

// let mapDispatchToProps = {
// onCreatePdfThunk
// }
  
//   const Pdf = connect(mapStateToProps, mapDispatchToProps)(rawPdf);

export default PdfMaker;