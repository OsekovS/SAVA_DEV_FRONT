import React from 'react';
// import * as axios from 'axios'
import Calendar from '../TimeFilterPanel/calendar/calendar'
// import {connect} from "react-redux";
// import {createReportThunk}  from "../../../../redux/dashboards-reducer";
import Dropdown from '../FilterPanel/dropdown/dropdown'
import './Pdf.scss'
{/* <img onClick={onCreatePdfThunk.bind(this,props.id)} className='pdf__wait' src={require('./icon.svg')}></img> */}
// const Pdf = (props) => {
//     if(props.display==='wait') return <a href="php/upload-file.php?filename=file.pdf"><img  className='pdf__wait' src={require('./re.svg')}></img></a>
//         else return <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
// }
//<a href="upload-file.php?filename=file.pdf"><img onClick={onCreatePdfThunk.bind(this,props.id)} className='pdf__wait' src={require('./icon.svg')}></img></a>
class PdfMaker extends React.Component{
    constructor(props){
        super(props)
        // console.log(props)
        let title = 'Отчет с ' +this.props.timeFilter.from.format('DD.MM.YYYY HH:mm') + ' по '+this.props.timeFilter.to.format('DD.MM.YYYY HH:mm'),
        // console.log(props)
        // let fieldsInTable = Object.keys(props.fields)
        // fieldsInTable.push('time')//необходимо в excel добавить поле время
        // Object.keys(this.props.fields)
        allFieldsInTable = Object.keys(props.fields).map((e,n) => {
            return {
                value: e,
                label: props.fields[e].translate,
            } 
        })
        allFieldsInTable.push({value: 'time',label: 'Время',})
        this.state = {
            allFieldsInTable,
            fieldsInTable: [],
            params: {...props.iniState},
            display: 'collapsed',
            title,
            timeFilter: props.timeFilter,
            mainField: Object.keys(props.configObj)[2],
            clickButtonText: "Сгенерировать отчет",
            mode: 'pdf',
            trend: true
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
                        <div className="multi-select__cont"><span>{this.props.fields[key].translate}</span><Dropdown selected={this.state.params[key]===undefined?[]:this.state.params[key]} iniState={this.state.params[key]===undefined?[]:this.state.params[key]} name={key} options={options} 
                        preview={this.props.fields[key].translate} onChangeCallBack={(this.onChangeFilterField.bind(this))}/>
                    </div>
                        
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
        // let fields = Object.keys(this.props.fields)
        // fields.push('time')//необходимо в excel добавить поле время
        console.log(this.state)
        this.props.createReportThunk(this.state, this.props.indexName)
        this.setState({display: 'collapsed'});
    }
    // Изменился ли фильтр
    componentWillReceiveProps(nextProps){
        //если отличаются исходные данные для фильтра
        if(!this.isObjEqual(nextProps.iniState,this.state.params)) this.setState({params: nextProps.iniState});
    }
    render() {
        // console.log(this.state.fieldsInTable)
        let {from, to} = this.state.timeFilter
        if(this.state.display==='collapsed')
            return  <img onClick={()=>{this.setState({ display: 'deployed' });}} className='pdf__wait' src={require('./report.svg')}></img>
        else {
            let { timeFilter, mode, trend, fieldsInTable, allFieldsInTable} = this.state
            let fields = Object.keys(this.props.configObj).map((e,n) => {
                //начальное значение - отдельная запара
                if(n===2) return <option selected value={e}>{this.props.fields[e].translate}</option>
                else if(e!=='translate') return <option value={e}>{this.props.fields[e].translate}</option>
            })
            if(mode === 'excel') fields.push(<option value='time'>Время</option>) //необходимо в excel добавить поле время
            return  <div className="modal-form-keeper param-pdf-panel param-panel"  >
                <div>
                {/* onSubmit={this.onSubmit} */}
                    <header><span>Настройки отчета</span><button onClick={()=>{this.setState({ display: 'collapsed' });}}><img src={require('../close.svg')}></img></button></header>
                        <ul className="modal-form-keeper__mode-toggler">
                            <li className={mode==='excel'?'active':''} onClick={()=>{this.setState({ mode: 'excel' });}}>
                                Excel формат  <img   src={require('./excelIcon.svg')}></img>
                            </li>
                            <li className={mode==='pdf'?'active':''} onClick={()=>{this.setState({ mode: 'pdf' });}}>
                                Pdf формат  <img   src={require('./pdfIcon.svg')}></img>
                            </li>
                        </ul>
                        <div className='modal-form_light-grey pdf-maker'  >
                            <h3>Название отчета:</h3>
                                <label className='param-pdf-panel_title-input__label'><input onChange={this.handleTitleChange} type="text" value={this.state.title} className='param-pdf-panel_title-input'/></label>
                                
                            <h3>{'Настройка временного интервала с '+from.format('DD.MM.YYYY HH:mm')+' по '+to.format('DD.MM.YYYY HH:mm')}</h3>
                            <Calendar standalone={false} timeFilter={timeFilter} applyCallback={this.applyCalendarCallback.bind(this)}/>
                            <h3>Настройка фильтра</h3>
                                <div className='param-pdf-panel_filters'>
                                    <div>{this.makeFilter()}</div>
                                </div>
                                {mode==='pdf'?<>
                                        <h3>Группировать отчет в таблице по полю:</h3>
                                        <select onChange={(event)=>{this.changeMainField(event.target.value)}}>
                                            {fields}
                                        </select>
                                    </>:
                                    <>
                                        <h3>Сортировать записи в таблице по полю:</h3>
                                        <select onChange={(event)=>{this.changeMainField(event.target.value)}}>
                                            {fields}
                                        </select>
                                        <div>
                                            <h3 className='param-pdf-panel_filters__isAskSort'>Сортировать по возрастанию
                                            <input checked={trend} onChange={()=>{this.setState({ trend: !trend})}} type="checkbox"></input>
                                            </h3>
                                            <h3>Поля, которые необходимо вывести в таблицу (выберите хотя бы 1):</h3>
                                            <Dropdown selected={fieldsInTable} iniState={[]} name={'key'} options={allFieldsInTable} 
                                                preview={'...'} onChangeCallBack={(keyState)=>{this.setState({fieldsInTable: keyState})}}/>
                                        </div>

                                    </>
                                }
                            <div>
                                <button onClick={this.onSubmit}>{this.state.clickButtonText}</button>
                                {/* <input type="submit" value={this.state.clickButtonText}/> */}
                                <button onClick={()=>{this.setState({ display: 'collapsed' });}}>Отменить</button>
                            </div>
                        </div>  
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