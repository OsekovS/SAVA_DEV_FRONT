import React from 'react';
import './DiskInfoPanel.scss';
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import Table from "../../Table/Table";
import FilterPanel from "../../Visualization/Dashboards/Components/FilterPanel/FilterPanel";
import {onClearThunk} from "../../redux/dashboards-reducer"
import Calendar from "../../Visualization/Dashboards/Components/TimeFilterPanel/calendar/calendar"
import moment from "moment"
const dataDeleteFormRaw = (props) => {
    console.log(props)
    if(props.view){
        return (
            <div className="modal-form-keeper clear-form" >
                <div>
                    <header className="Common__header Common__header_red">Удаление данных из таблицы {props.tbName}</header>
                <form className='modal-form_light-grey' onSubmit={props.handleSubmit}>
                    {/* <div>  */}
                    <h3>
                        Выберите события, которые необходимо удалить из таблицы
                    
                    <FilterPanel isInvert={true} single={true} fields={props.fields} configObj={props.filter} iniState={props.filterState} 
                            submitCallBack={(filter)=>{props.onParamFilterSet(filter)}} id={'-'} imgSrc={require('../../Visualization/Dashboards/Components/FilterPanel/filter_black.svg')}/>
                    </h3>
                    {/* <label>Выберите события, которые необходимо удалить из таблицы <FilterPanel single={true} fields={props.fields} configObj={props.filter} iniState={props.filterState} 
                        submitCallBack={(filter)=>{console.log(filter)}} id={'-'}/></label> */}
                    <h3>
                        Период, за который необходимо удалить события: 
                    </h3>
                    <Calendar timeFilter={props.timeFilter} applyCallback={props.onTimeFilterSet}/>
                    <p>
                        <label className={'passw'}>Введите пароль от своей учетной записи:
                                <Field name='passw' placeholder={'ваш пароль'} component={"input"} type="password"/> 
                        </label>
                    </p>
                    <div>
                        <input type="submit" value="Удалить"/>
                        <button onClick={(e)=>{e.preventDefault();props.onCancel()}}> Отменить</button>
                    </div>
                </form>
                </div>

            </div>
        ) 
    }else return null
}

const DeleteForm =  reduxForm({form: 'dataDeleteForm'})(dataDeleteFormRaw)

class rawUserPanel extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            deleteMode: false,
            iniFilter: {},
            timeFilter: {
                from: moment(new Date()),
                to: moment(new Date()).subtract('10', 'days')
            }
        }
        // Эта привязка обязательна для работы `this` в колбэке.
        
        this.onDiskClear = this.onDiskClear.bind(this);
        this.onTimeFilterSet = this.onTimeFilterSet.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onChangeModeToDelete = this.onChangeModeToDelete.bind(this);
        this.onParamsFilterSet = this.onParamsFilterSet.bind(this);
        
      }



    onChangeModeToDelete(numb){
        let curModule
        //ищем модуль с данной таблицей
        for (const module in this.props.modules) {
            if (this.props.modules.hasOwnProperty(module)) {
                console.log(this.props.modules[module].indexes)
                for (const index in this.props.modules[module].indexes) {
                    if ( this.props.modules[module].indexes.hasOwnProperty(index) && index===this.props.diskInfo[numb]["Название таблицы elasticsearch"]) 
                    curModule = module
                }
            }
        }
        this.setState(state => ({
            deleteMode: !state.deleteMode,
            curIndex: this.props.diskInfo[numb]["Название таблицы elasticsearch"],
            curModule
        }));
    }
    handleClick() {
        this.setState(state => ({
            opened: !state.opened
        }));
    }
    onDiskClear(passw) {
        if(passw.passw !== undefined) {
            let {curIndex, timeFilter, iniFilter} = this.state
            this.props.onClearThunk(curIndex, timeFilter, iniFilter, passw.passw)
            this.setState(state => ({
                opened: false,
                deleteMode: false
            }));
        }
        else alert('Введите пароль от своей учетной записи')
    }
    onTimeFilterSet (startDate, endDate) {
        this.setState(state => ({
            timeFilter: {
                from: startDate,
                to: endDate
            }
        }));
    }
    onParamsFilterSet(newFilterState) {
        this.setState(state => ({
            iniFilter: newFilterState
        }))
    }
    render(){
        let {opened, deleteMode, curIndex, iniFilter, curModule,timeFilter} = this.state
        if(opened){
            return  <div className="modal-form-keeper" >
                <div className="DiskInfo">
                    <header className="Common__header Common__header_red" >Информация о памяти, занимаемой данными в различных таблицах</header>
                    <div >
                        <Table elements={this.props.diskInfo} icons={this.props.rights==='администратор'?[{path:require('./rubbish.svg'),callBack: this.onChangeModeToDelete,width:'26',height:'26'}]:[]}/>
                        <p>Оставшееся место на диске: {this.props.diskAvail}</p>
                        <button onClick={this.handleClick} >Закрыть</button>
                    </div>
                    
                </div>
                <DeleteForm tbName={curIndex}  onSubmit={this.onDiskClear}  view={deleteMode} onCancel={()=>{this.setState({deleteMode: false})}} filterState={iniFilter}
                    onTimeFilterSet = {this.onTimeFilterSet} timeFilter = {timeFilter} onParamFilterSet = {this.onParamsFilterSet}
                    fields={deleteMode?this.props.modules[curModule].indexes[curIndex].fields:null} filter={deleteMode?this.props.modules[curModule].indexes[curIndex].filter:null}/>
            </div>
        }
        else{
            return  <div  data-title="дисковое пространство" className="DiskInfo__img comment"><img  onClick={this.handleClick} width='36' height='36' src={require("./drive.svg")} alt="Диск"></img></div>
        }
    }
}

let mapStateToProps = (state) => {
    return {
        diskInfo: state.auth.briefUserInfo.diskInfo,
        modules: state.auth.briefUserInfo.modules,
        diskAvail: state.auth.briefUserInfo.diskAvail,
        rights: state.auth.briefUserInfo.admin
    }
}


let mapDispatchToProps ={
    onClearThunk
}

const __UserPanel = connect(mapStateToProps, mapDispatchToProps)(rawUserPanel);

export default __UserPanel;
