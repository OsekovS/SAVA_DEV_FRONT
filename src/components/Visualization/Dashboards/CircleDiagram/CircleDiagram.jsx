import React from 'react';
import FilterPanel from '../Components/FilterPanel/FilterPanel'
import TimeFilterPanel from '../Components/TimeFilterPanel/TimeFilterPanelCont'
import Saver from '../Components/Saver/Saver'
// import Pdf from '../Components/Pdf/Pdf'
import { Chart, Pies, Transform , Layer, Dots,Labels} from 'rumble-charts';
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
       
        // this.props.getAcs(this.props.id)
        // console.log('CONSTRUCTOR')
        
        if(this.props.uploads.uploads){
          this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id,this.props.indexName,this.props.dbName)},
          this.props.uploads.timeKind*this.props.uploads.timeNum);
        }
        

    }

    componentDidMount() {
    //   console.log('MOUNT')
    // console.log(this.props.logs)
    // if(this.props.logs.length===0) 
    this.props.getAcs(this.props.id,this.props.indexName,this.props.dbName)
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
        this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id,this.props.indexName,this.props.dbName)}, this.props.uploads.timeKind*this.props.uploads.timeNum);
      }else if(nextProps.uploads.uploads&&!this.isObjEqual(nextProps.uploads,this.props.uploads)){
        clearInterval(this.intervalId);
        this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id,this.props.indexName,this.props.dbName)}, nextProps.uploads.timeKind*nextProps.uploads.timeNum);
      }
  }

   
   

    render() {  
      // console.log(this.props)
    let secondField = {...this.props.filter}
    let mainField =  (this.props.paramFilter===[]||this.props.paramFilter[this.props.field]===undefined)?
    this.props.filter[this.props.field]:
    this.props.paramFilter[this.props.field]
    //this.props.filter[this.props.field]
    // console.log(this.props)
    delete secondField[this.props.field]
        // let bigData = [1,2,3,4,5,6,7,8,9,10,11,12,13,12,11,10,9,8,7,6,5,4,3,2,1,1,2,3,4,5,6,7,8,9,10,11,12,13,12,11,10,9,8,7,6,5,4,3,2,1,2,3,4,5,6,7,8,9,10,11,12,13,12,11,10,9,8,7,6,5,4,3,2]
        const series = [{
            data: this.props.logs.count//bigData//
        }];
        let filter = this.props.filter

        // console.log(filter)
        let mainFieldOptions = filter[this.props.field].map((e,n) => {
            return {
                value: e,
                label: e,
            } 
        })
        //filter.translate[e]
        let fields = Object.keys(filter).map((e,n) => {
            //начальное значение - отдельная запара
            if(e===this.props.field) return <option selected value={e}>{this.props.fields[e].translate}</option>
            else if(e!=='translate') return <option value={e}>{this.props.fields[e].translate}</option>
        })
        let ourColors = []
             
      const categories = this.props.logs.labels!==undefined?this.props.logs.labels.map((elem,numb)=>{
        ourColors.push(this.colors[numb])
        return <li key={numb}><div style={{backgroundColor: this.colors[numb]}}></div>{elem+' ('+this.props.logs.count[numb]+' событий)'}</li>
      }):[]
      const {id,indexName,dbName} = this.props
       return <div className="logs-table-wrapper logs-table-wrapper_pie" >
                    <header className="Common__header Common__header_grey Common__header_with-filter">
                        {this.props.title}
                        <TimeFilterPanel id={id}  uploads={this.props.uploads} indexName={indexName} dbName={dbName} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}></TimeFilterPanel>
                        {/* <FilterPanel configObj={this.props.filters[this.props.indexName]} iniState={this.props.paramFilter} submitCallBack={(filter)=>{this.props.setParamFilterThunk(filter,this.props.indexName,this.props.id)}} id={this.props.id}/> */}
                        <FilterPanel fields={this.props.fields} configObj={secondField} iniState={this.props.paramFilter} submitCallBack={(filter)=>{this.props.setParamFilterThunk(filter,dbName,indexName,id)}} id={id}/>
                        <Saver  id={id} dbName = {dbName} display={this.props.saver}/>
                        {/* <Pdf  id={this.props.id} display={this.props.saver}/> */}
                    </header>  
                   <div>
                    <Chart width={180} height={180} series={series}>
                        <Transform method={['transpose', 'stack']}>
                            <Pies combined={true} colors={ourColors}/>
                        </Transform>
                    </Chart>
                    <ul>
                      {categories}
                    </ul>
                   </div>
                    <div className="logs-table-wrapper__pie-settings">
                      <span>Параметр: </span>
                        <select onChange={(event)=>{this.props.changeMainField(event.target.value,id,dbName)}}>
                          {fields}
                        </select>
                        <span>Выбранные значения параметра: </span>
                        <Dropdown selected={this.props.paramFilter[this.props.field]===undefined?[]:this.props.paramFilter[this.props.field]} iniState={[]} name={this.props.field} options={mainFieldOptions} preview={this.props.fields[this.props.field].translate}  onChangeCallBack={(keyState)=>{this.props.changeMainFieldList(id,dbName,keyState)}}/>
                        <button onClick={()=>{this.props.getAcs(this.props.id,this.props.indexName,this.props.dbName)}}>Построить диаграмму</button>
                    </div>
            </div>
    }
    colors = [
      '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
      '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
      '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f',
      '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5',
      '#393b79', '#5254a3', '#6b6ecf', '#9c9ede', '#637939',
      '#8ca252', '#b5cf6b', '#cedb9c', '#8c6d31', '#bd9e39',
      '#e7ba52', '#e7cb94', '#843c39', '#ad494a', '#d6616b',
      '#e7969c', '#7b4173', '#a55194', '#ce6dbd', '#de9ed6',
      '#3182bd', '#6baed6', '#9ecae1', '#c6dbef', '#e6550d',
      '#fd8d3c', '#fdae6b', '#fdd0a2', '#31a354', '#74c476',
      '#a1d99b', '#c7e9c0', '#756bb1', '#9e9ac8', '#bcbddc',
      '#dadaeb', '#636363', '#969696', '#bdbdbd', '#d9d9d9'
    ]
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