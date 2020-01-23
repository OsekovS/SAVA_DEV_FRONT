import React from 'react';
import FilterPanel from '../Components/FilterPanel/FilterPanel'
import TimeFilterPanel from '../Components/TimeFilterPanel/TimeFilterPanel'
import { Chart, Pies, Transform } from 'rumble-charts';
import './CircleDiagram.scss';
import Dropdown from '../Components/FilterPanel/dropdown/dropdown'
import {Field, reduxForm} from "redux-form";
// import Dropdown from "@khanacademy/react-multi-select";
const form = (props) => {
    let fields = Object.keys(props.filter).map((e,n) => {
        //начальное значение - отдельная запара
        // if(e===props.curField) return <option selected value={e}>{props.filter.translate[e]}</option>
        // else 
        return <option value={e}>{props.filter.translate[e]}</option>
    })
    return <form onSubmit={props.handleSubmit}>
                        <Field name="mainField" component={'select'}>
                            {fields}
                        </Field>
            <div>
                <button >Построить диаграмму</button> 
            </div>
        </form>
      
}

const MainObjForm =  reduxForm({form: 'curMainObj'})(form)

class CircleDiagram extends React.Component {
    constructor(props) {
        super(props);
        //в состоянии хранится значение нашего фильтра по "главному" полю
        //остальные отправляются в фильтр
       

        
        
        if(this.props.uploads.uploads){
          this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id)},
          this.props.uploads.timeKind*this.props.uploads.timeNum);
        }

    }

    componentDidMount() {
    //   console.log(this.state)
      this.props.getAcs(this.props.id)
    }
    componentWillUnmount(){
      if(this.intervalId!==undefined) clearInterval(this.intervalId);
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
    // Изменяется интервал
    componentWillReceiveProps(nextProps){
      //если существует таймер и отключены обновл
      if(this.intervalId!==undefined&&nextProps.uploads.uploads===false){
        clearInterval(this.intervalId);
      }
      //включены обновления а были выключены
      else if(nextProps.uploads.uploads&&nextProps.uploads.uploads!==this.props.uploads.uploads){
        this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id)}, this.props.uploads.timeKind*this.props.uploads.timeNum);
      }else if(nextProps.uploads.uploads&&!this.isObjEqual(nextProps.uploads,this.props.uploads)){
        clearInterval(this.intervalId);
        this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id)}, nextProps.uploads.timeKind*nextProps.uploads.timeNum);
      }
  }

   
   

    render() {  

    let secondField = {...this.props.filters[this.props.indexName]}
    let mainField =  (this.props.paramFilter===[]||this.props.paramFilter[this.props.field]===undefined)?
    this.props.filters[this.props.indexName][this.props.field]:
    this.props.paramFilter[this.props.field]
    //this.props.filters[this.props.indexName][this.props.field]
    // console.log(this.props)
    delete secondField[this.props.field]
   
        const series = [{
            data: this.props.logs
        }];
        let filter = this.props.filters[this.props.indexName]

        // console.log(fields)
        let mainFieldOptions = filter[this.props.field].map((e,n) => {
            return {
                value: e,
                label: e,
            } 
        })
        let fields = Object.keys(filter).map((e,n) => {
            //начальное значение - отдельная запара
            if(e===this.props.field) return <option selected value={e}>{filter.translate[e]}</option>
            else return <option value={e}>{filter.translate[e]}</option>
        })
        // console.log(this.props)   
        // console.log(fields)    
        // console.log(filter)                                              allowed={filter[this.props.field]}
        return <div className="logs-table-wrapper">
                    <header className="Common__header Common__header_red Common__header_with-filter">
                        {this.props.title}
                        <input onChange={()=>this.props.changeUploadModeThunk(false,this.props.indexName,this.props.id)} type="radio" name={"time_period"+this.props.id} value="configured_time" checked={!this.props.uploads.uploads}/>
                        <TimeFilterPanel id={this.props.id}  uploads={this.props.uploads} indexName={this.props.indexName} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}></TimeFilterPanel>
                    {/* <Calendar id={this.props.id} applyParentCallback={(startDate, endDate)=>{this.props.setTimeFilterThunk(startDate, endDate, this.props.indexName, this.props.id)}} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}/> */}

                    {/* <UploadTimeSetter  handleSubmit={(updateForm,event)=>{
                      this.props.changeUploadsThunk(updateForm,this.props.indexName,this.props.id);
                      // this.props.changeUploadModeThunk(true,this.props.indexName,this.props.id)
                    }}
                        timeKind={this.props.uploads.timeKind} timeNum={this.props.uploads.timeNum}
                        from_number={this.props.uploads.from_number} from_time_type={this.props.uploads.from_time_type}  id={this.props.id}/> */}
                    <FilterPanel configObj={this.props.filters[this.props.indexName]} iniState={this.props.paramFilter} submitCallBack={(filter)=>{this.props.setParamFilterThunk(filter,this.props.indexName,this.props.id)}} id={this.props.id}/>
                        
                        {/* <Calendar id={this.props.id} applyParentCallback={(startDate, endDate)=>{this.props.setTimeFilterThunk(startDate, endDate, this.props.indexName, this.props.id)}} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}/>
                        <input onChange={()=>this.props.changeUploadModeThunk(true,this.props.indexName,this.props.id)} type="radio" name={"time_period"+this.props.id} value="bynow_time" checked={this.props.uploads.uploads} />
                        <UploadTimeSetter  handleSubmit={(updateForm,event)=>{
                        this.props.changeUploadsThunk(updateForm,this.props.indexName,this.props.id);
                        // this.props.changeUploadModeThunk(true,this.props.indexName,this.props.id)
                        }}
                            timeKind={this.props.uploads.timeKind} timeNum={this.props.uploads.timeNum}
                            from_number={this.props.uploads.from_number} from_time_type={this.props.uploads.from_time_type}  id={this.props.id}/> */}
                            {/* iniState={this.state.mainField}  */}
                        {/* <Dropdown  iniState={[iniMain]} name='mainField' options={fields} preview={filter.translate[this.props.field]}  onChangeCallBack={(this.onChangeMainField.bind(this))}/> */}
                        
                        {/* <MainObjForm filter ={filter} onSubmit={this.onChangeMainField}  /> */}
                        <select onChange={(event)=>{this.props.changeMainField(event.target.value,this.props.id)}}>
                            {fields}
                        </select>
                        <button onClick={()=>{this.props.getAcs(this.props.id)}}>Построить диаграмму</button>
                        
                        <Dropdown selected={this.props.paramFilter[this.props.field]===undefined?[]:this.props.paramFilter[this.props.field]} iniState={[]} name={this.props.field} options={mainFieldOptions} preview={filter.translate[this.props.field]}  onChangeCallBack={(keyState)=>{this.props.changeMainFieldList(this.props.id,keyState)}}/>
                        <FilterPanel configObj={secondField} iniState={this.props.paramFilter} submitCallBack={(filter)=>{this.props.setParamFilterThunk(filter,this.props.indexName,this.props.id)}} id={this.props.id}/>
                    </header>  
                    <Chart width={600} height={250} series={series}>
                        <Transform method={['transpose', 'stack']}>
                            <Pies combined={true} />
                        </Transform>
                    </Chart>  
                  {/* <Table logs={this.props.logs} headerElements={this.props.headerElements} curLog={this.props.curLog} onClickCallback={this.props.onChangeCurrentLog} sortParam={this.props.sortParam} changeSortThunk={this.props.changeSortThunk} indexName={this.props.indexName} id={this.props.id}/>
                  <footer>
                    <span>Всего событий: {this.props.pagination.total}</span>
                    <ShowedLogsBar showedLogs={this.props.pagination.showedLogs} showedLogsList={this.props.pagination.showedLogsList} onClickCallback={this.props.changeShowedLogsThunk} indexName={this.props.indexName} id={this.props.id}/>
                    <PagesBar callBack={this.props.changePageThunk} pagination={this.props.pagination} indexName={this.props.indexName} id={this.props.id}/>
                    {this.props.curLog !== null ?<div className="additional-info"><h2>Дополнительная информация о выбранном событии:</h2><ul>{footerElements}</ul></div>:null}
                  </footer> */}
            </div>
    }
  }









// import Chart from '../../Graphs/Chart'
// import Layer from '../../Graphs/Layer'
// import Ticks from '../../Graphs/Ticks'
// import Bars from '../../Graphs/Bars'
// import LogsTableDeviceCont from '../logsTable/LogsTableDeviceCont'



    // <Chart width={600} height={250} series={series}>
    //     <Transform method={['transpose', 'stack']}>
    //         <Pies combined={true} />
    //     </Transform>
    // </Chart>

    // let xLabels1
    // let xLabels2
    // let clientWidth = document.body.clientWidth    
    // if(clientWidth<1400){
    //   xLabels1 = this.props.bar1.xLabels.filter((e,n) => n%2==0)
    //   xLabels2 = this.props.bar2.xLabels.filter((e,n) => n%2==0)
    // }else{
    //   xLabels1 = this.props.bar1.xLabels;
    //   xLabels2 = this.props.bar2.xLabels;
    // }
    //  <Chart width={ clientWidth/2} height={300} series={this.props.bar1.series} minY={0}>
    //     <Layer width='90%' height='90%' position='top center'>
    //       <Ticks
    //         axis='y'
    //         lineLength='100%'
    //         lineVisible={true}
    //         lineStyle={{stroke:'lightgray'}}
    //         labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray',fontSize:'0.7em'}}
    //         labelAttributes={{x: -5}}
    //         labelFormat={label => label}
    //       />
    //       <Ticks
    //         axis='x'
    //         ticks={{maxTicks:clientWidth<1400? 12:24}}
    //         labels = {xLabels1}
    //             label={({index, props}) => props.labels[index]}
    //         labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge',fill:'black',fontSize:'0.7em'}}
    //         labelAttributes={{y: 3}}
    //       />
    //       <Bars
    //         groupPadding='0%'
    //         innerPadding='0.3%'
    //       />
    //     </Layer>
    //   </Chart>


export default CircleDiagram;