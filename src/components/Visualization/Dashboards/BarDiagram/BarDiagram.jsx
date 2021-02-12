import React from 'react';
import FilterPanel from '../Components/FilterPanel/FilterPanel'
import Saver from '../Components/Saver/Saver'
import Deleter from '../Components/Deleter/Deleter'
import Resizer from '../Components/Resizer/Resizer.jsx'
import ChangedInput from '../Components/ChangedInput/ChangedInputCont.jsx'
import MotionArrow from '../Components/MotionArrow/MotionArrow'
import BarDiagramCore from './BarDiagramCore'
import './BarDiagram.scss';
//тип соб приоритет опц поле 1 опц поле 3
class BarDiagram extends React.Component {
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
  //   componentWillReceiveProps(nextProps){
  //     //улучшение для общей страницы дошиков
  //     let {dbName,infoDbName} = this.props
  //     let sendedDbName =(dbName!=='sava_core'?dbName:{name:infoDbName})
      
  //     //если существует таймер и отключены обновл
  //     if(this.intervalId!==undefined&&nextProps.uploads.uploads===false){
  //       clearInterval(this.intervalId);
  //     }
  //     //включены обновления а были выключены
  //     else if(nextProps.uploads.uploads&&nextProps.uploads.uploads!==this.props.uploads.uploads){
  //       this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id, this.props.indexName, sendedDbName)}, this.props.uploads.timeKind*this.props.uploads.timeNum);
  //     }else if(nextProps.uploads.uploads&&!this.isObjEqual(nextProps.uploads,this.props.uploads)){
  //       clearInterval(this.intervalId);
  //       this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id, this.props.indexName, sendedDbName)}, nextProps.uploads.timeKind*nextProps.uploads.timeNum);
  //     }
  // }

   onSetFilterSettings(filter){
     const {id,indexName,dbName,field,infoDbName} = this.props
     //улучшение для общей страницы дошиков
     let sendedDbName =(dbName!=='sava_core'?dbName:{name:infoDbName})
     let obj = {...filter.secondField}
     obj[this.props.field]=filter.mainField[field]
    this.props.setParamFilterThunk(obj,sendedDbName,indexName,id)
    
   }
    render() {  
        let {style, filter, field, paramFilter, logs, id, indexName, dbName, modules, uploads, title,
          changeDashSize, serNum, isLast, infoDbName, setParamFilterThunk, fields} = this.props

      const {width, height} = style,
        headerStyle = (width<420)?'':' Common__header_big',
        downOffset = 30 //сдвиг снизу
       return <div  style={{ width, height:(height+downOffset)}}  className="dashboard-wrapper dashboard-wrapper_pie" >
                <header className={"Common__header Common__header_grey Common__header_with-filter"+headerStyle}>   
                <ChangedInput title={title} id={id} dbName={dbName} type={'Bar_Diagram'}/>            
                    <div  className='dashboard-wrapper__settings-cont'>
                      <FilterPanel imgSrc={require('../Components/FilterPanel/filter_white.svg')} single={true} fields={fields} 
                          configObj={filter} iniState={paramFilter} 
                          submitCallBack={(filter)=>{setParamFilterThunk(filter,dbName,indexName,id)}} id={id}
                      />  
                      <Saver  id={id} dbName = {dbName==='sava_core'?{name: infoDbName}:dbName} display={this.props.saver}/>
                      <Deleter id={id} dbName = {dbName}  indexName={indexName}  />
                    </div>
                </header>  
                <BarDiagramCore data={logs} width={width} height={height}/>
                {/* <div className="logs-table-wrapper__pie-settings">
                  <span>Параметр: </span>
                    <select onChange={(event)=>{this.props.changeMainFieldThunk(event.target.value,
                      dbName==='sava_core'?{name: infoDbName}:dbName,indexName,id)}} >
                      {fields}
                    </select>
                    <span>Выбранные значения параметра: {mainFieldList}</span>
                </div> */}
                <Resizer changeSize={changeDashSize} id={id} indexName={indexName} dbName={dbName} type={['width']} minVal={['minWidth']} isAbsolutePos={true}/>
                <Resizer changeSize={changeDashSize} id={id} indexName={indexName} dbName={dbName} type={['height']} minVal={['minHeight']}  isAbsolutePos={true}/>
                {serNum===0?null:<MotionArrow id={id} dbName = {dbName}  indexName={indexName} direct={'left'}/>}
                {isLast?null:<MotionArrow id={id} dbName = {dbName}  indexName={indexName} direct={'right'}/>}
            </div>
    }
    
  }

export default BarDiagram;