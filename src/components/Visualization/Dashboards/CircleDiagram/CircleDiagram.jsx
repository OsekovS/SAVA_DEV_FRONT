import React from 'react';
import FilterPanel from '../Components/FilterPanel/FilterPanel'
import TimeFilterPanel from '../Components/TimeFilterPanel/TimeFilterPanelCont'
import Saver from '../Components/Saver/Saver'
import Deleter from '../Components/Deleter/Deleter'
import Resizer from '../Components/Resizer/Resizer.jsx'
import ChangedInput from '../Components/ChangedInput/ChangedInputCont.jsx'
import MotionArrow from '../Components/MotionArrow/MotionArrow'
import { Chart, Pies, Transform , Handlers} from 'rumble-charts';
import './CircleDiagram.scss';
//тип соб приоритет опц поле 1 опц поле 3
class CircleDiagram extends React.Component {
    constructor(props) {
        super(props);
        //в состоянии хранится значение нашего фильтра по "главному" полю
        //остальные отправляются в фильтр
        if(this.props.uploads.uploads){
          let {dbName, infoDbName} = this.props
          let sendedDbName =(dbName!=='sava_core'?dbName:{name:infoDbName})
          this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id,this.props.indexName,sendedDbName)},
          this.props.uploads.timeKind*this.props.uploads.timeNum);
        }
        this.onClickOnSector = this.onClickOnSector.bind(this)
        this.onClickOnListElem = this.onClickOnListElem.bind(this)
        
    }

    componentDidMount() {
      let {dbName, infoDbName, id, indexName} = this.props
      let sendedDbName =(dbName!=='sava_core'?dbName:{name:infoDbName})
      this.props.getAcs(id,indexName,sendedDbName)
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
      //улучшение для общей страницы дошиков
      let {dbName,infoDbName} = this.props
      let sendedDbName =(dbName!=='sava_core'?dbName:{name:infoDbName})
      
      //если существует таймер и отключены обновл
      if(this.intervalId!==undefined&&nextProps.uploads.uploads===false){
        clearInterval(this.intervalId);
      }
      //включены обновления а были выключены
      else if(nextProps.uploads.uploads&&nextProps.uploads.uploads!==this.props.uploads.uploads){
        this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id, this.props.indexName, sendedDbName)}, this.props.uploads.timeKind*this.props.uploads.timeNum);
      }else if(nextProps.uploads.uploads&&!this.isObjEqual(nextProps.uploads,this.props.uploads)){
        clearInterval(this.intervalId);
        this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id, this.props.indexName, sendedDbName)}, nextProps.uploads.timeKind*nextProps.uploads.timeNum);
      }
  }

   onSetFilterSettings(filter){
     const {id,indexName,dbName,field,infoDbName} = this.props
     //улучшение для общей страницы дошиков
     let sendedDbName =(dbName!=='sava_core'?dbName:{name:infoDbName})
     let obj = {...filter.secondField}
     obj[this.props.field]=filter.mainField[field]
    this.props.setParamFilterThunk(obj,sendedDbName,indexName,id)
    
   }
   handleMouseMove(...args){
     console.log(args)
   }
   onClickOnSector(e) {
    let sectorColor = e.target.getAttribute('fill'),
    {getAtClickOnCircleDiagram, dbName, indexName,id} = this.props
    
    this.colors.some((element, numb) => {
      if(element===sectorColor) {
        console.log(numb)
        getAtClickOnCircleDiagram(id,indexName,dbName,numb)
        return true;
      }
    });
   }
   onClickOnListElem(numb) {
    let {getAtClickOnCircleDiagram, dbName, indexName,id} = this.props
    getAtClickOnCircleDiagram(id,indexName,dbName,numb)
   }
    render() {  
        let {style, filter, field, paramFilter, logs, id, indexName, dbName, modules, uploads, title,
          handleMouseMove, changeDashSize, serNum, isLast, infoDbName} = this.props,
          mainFieldList
        if(paramFilter[field]===undefined)
        mainFieldList = 'выбраны все поля'
          else {
          mainFieldList = ' '+paramFilter[field].join(', ')
          if(mainFieldList.length>50) mainFieldList=' '+mainFieldList.slice(0,37)+'... '
          } 
          let allLogsEmpty=true
        let secondField = {...filter}
        let allInMainField = secondField[field]
        delete secondField[field]
    // console.log(logs)
        const series = [{
            data: logs.count//bigData//
        }];

        let fields = Object.keys(filter).map((e,n) => {
            //начальное значение - отдельная запара
            if(e===field) return <option selected value={e}>{this.props.fields[e].translate}</option>
            else if(e!=='translate') return <option value={e}>{this.props.fields[e].translate}</option>
        })
        let ourColors = []
             
      const categories = logs.labels!==undefined?logs.labels.map((elem,numb)=>{
        ourColors.push(this.colors[numb])
        if(logs.count[numb]!==0) allLogsEmpty=false
        return <li onClick={()=>{this.onClickOnListElem(numb)}} key={numb}><div style={{backgroundColor: this.colors[numb]}}></div>{elem+' ('+logs.count[numb]+' событий)'}</li>
      }):[]
      
      const configObj = {
        mainField:{
          body: {
            [field]: allInMainField
          },
          title: 'Основной параметр: '
        },
        secondField:{
          body: secondField,
          title: 'Дополнительные параметры: ',
        }
       
      },
      width = style.width,
      headerStyle = (width<420)?'':' Common__header_big', 
      lastViewed = modules[(dbName!=='sava_core'?dbName:this.props.infoDbName)].indexes[indexName].lastViewed
      let info = allLogsEmpty?<div className={width>550?"Modules-table__empty":"Modules-table__empty Modules-table__empty-minified"} ><img src={require("../Components/Table/Anonymous-Package.svg")} atl="события не найдены"></img></div>:                  
      <div>
        <Chart width={180} height={180} series={series}>
          <Handlers onMouseMove={handleMouseMove} optimized={false}>
            <Transform method={['transpose', 'stack']}>
                <Pies  pieAttributes={{
                  onClick: this.onClickOnSector,
                  // onMouseLeave: e => e.target.style.fillOpacity = 0.5
                }}
                combined={true} colors={ourColors} />
            </Transform>
          </Handlers>
        </Chart>
        <ul>
          {categories}
        </ul>
     </div>
       return <div  style={{ width}}  className="dashboard-wrapper dashboard-wrapper_pie" >
                <header className={"Common__header Common__header_grey Common__header_with-filter"+headerStyle}>   
                    <ChangedInput title={title} id={id} dbName={dbName} lastViewed={lastViewed}
                      timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}} uploads={uploads}
                      type={'Circle_Diagram'}
                    />            
                    <div  className='dashboard-wrapper__settings-cont'>
                      <FilterPanel imgSrc={require('../Components/FilterPanel/filter_white.svg')} single={false} fields={this.props.fields} configObj={configObj} iniState={this.props.paramFilter} submitCallBack={this.onSetFilterSettings.bind(this)} id={id}/>
                      <TimeFilterPanel lastViewed={lastViewed} id={id}  uploads={uploads} indexName={indexName} dbName={dbName==='sava_core'?{name: infoDbName}:dbName} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}></TimeFilterPanel>
                      <Saver  id={id} dbName = {dbName==='sava_core'?{name: infoDbName}:dbName} display={this.props.saver}/>
                      <Deleter id={id} dbName = {dbName}  indexName={indexName}  />
                    </div>
                    {/* <div className='dashboard-wrapper__timeFilter'>
                      <TimeFilterPanel lastViewed={lastViewed} id={id}  uploads={uploads} indexName={indexName} dbName={dbName} timeFilter={{from:this.props.timeFilter.from, to:this.props.timeFilter.to}}></TimeFilterPanel>
                    </div> */}
                </header>  
                {info}
                <div className="logs-table-wrapper__pie-settings">
                  <span>Параметр: </span>
                    <select onChange={(event)=>{this.props.changeMainFieldThunk(event.target.value,
                      dbName==='sava_core'?{name: infoDbName}:dbName,indexName,id)}} >
                      {fields}
                    </select>
                    <span>Выбранные значения параметра: {mainFieldList}</span>
                </div>
                <Resizer changeSize={changeDashSize} id={id} indexName={indexName} dbName={dbName} type={['width']} minVal={['minWidth']} isAbsolutePos={true}/>
                {/* <MotionArrow id={id} dbName = {dbName}  indexName={indexName} direct={'top'}/> */}
                {serNum===0?null:<MotionArrow id={id} dbName = {dbName}  indexName={indexName} direct={'left'}/>}
                {isLast?null:<MotionArrow id={id} dbName = {dbName}  indexName={indexName} direct={'right'}/>}
                {/* <MotionArrow id={id} dbName = {dbName}  indexName={indexName} direct={'bottom'}/> */}
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

export default CircleDiagram;