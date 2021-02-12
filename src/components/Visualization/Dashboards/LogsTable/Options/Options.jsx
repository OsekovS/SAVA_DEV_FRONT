import React from 'react';
import './Options.scss'
import Dropdown from '../../Components/FilterPanel/dropdown/dropdown.jsx'
class Resizer extends React.Component {
    constructor(props) {
        super(props);
            // 0: {value: "0", label: "1 этаж"}
            // 1: {value: "1", label: "2"}
            let indexElements = [],
            footerElements = null ,headerElements = null
          
            if(props.headerElements.length !== 0) {
              headerElements = props.headerElements.map((indexElement) => {
                return indexElement.field
              })
            }
            if(props.footerElements.length !== 0) {
              footerElements = props.footerElements.map((indexElement) => {
                return indexElement.field
              })
            }
            indexElements = props.indexElements.map((indexElement) => {
              return {
                value: indexElement.field, 
                label: indexElement.text + ' (' + indexElement.field +')'
              }
            })
            
 
        this.state = {
            addedFooterElem: 0,
            addedHeaderElem: 0,
            indexElements, footerElements, headerElements
        }
        this.onChangeFilterCallBack = this.onChangeFilterCallBack.bind(this);
    }

    onChangeFilterCallBack(content, field,id,dbName){
      this.setState({ [field]: content })
      this.props.changeViewedFields(content, field,id,dbName)
    }
    render() {  
      //  
        let tableOptions=[<option  value={''}>{''}</option>],footerOptions = [<option  value={''}>{''}</option>],
            {changeHeaderElemSize, onSettings, 
                changedElemNumb, id, dbName} = this.props,
                field, colWidth,text, 
                headerElementsFromProps = this.props.headerElements
                console.log(this.state)
                if(changedElemNumb !== null && changedElemNumb>0) {
                  field = headerElementsFromProps[changedElemNumb].field
                  colWidth = headerElementsFromProps[changedElemNumb].colWidth
                  text = headerElementsFromProps[changedElemNumb].text
                }
                let {indexElements, footerElements, headerElements} = this.state
               
            //новый способ способ задания элементов входящих в скрытое описание и непосредственно в таблицу
            if(onSettings) return <div className='Options'>
                <div>
                    <h3>{'Ширина столбца "'+(text===undefined||field===undefined?'(выберите один из заголовков столбца)':(text+'('+field+')'+'": ')) }</h3>
                    <input value={colWidth} onChange={(e)=>{changeHeaderElemSize(changedElemNumb,e.target.value,id,dbName)}}  className="collapser" type="number"></input>               
                </div>

                <div>
                    <h3>Поля таблицы:</h3>
                    <Dropdown selected={headerElements===null?[]:headerElements} iniState={headerElements} name='headerElements' options={indexElements} 
                        preview='выбрано все' onChangeCallBack={(content, field)=>{this.onChangeFilterCallBack(content, field,id,dbName)}}/>            
                </div>
                <div>
                    <h3>Поля описания:</h3>
                    <Dropdown selected={footerElements===null?[]:footerElements} iniState={footerElements} name='footerElements' options={indexElements} 
                        preview='выбрано все' onChangeCallBack={(content, field)=>{this.onChangeFilterCallBack(content, field,id,dbName)}}/>         
                </div>     
            </div>
          else return null 
    }
}
export default Resizer;
// let a ={
// "Чрезвычайная ситуация":{style:'High',lastTime:"2019/01/29 00:00:00"},
// "Тревога":{style:'High',lastTime:"2019/01/29 00:00:00"},
// "Критическая ситуация":{style:'High',lastTime:"2019/01/29 00:00:00"},
// "Ошибка":{style:'Middle',lastTime:"2019/01/29 00:00:00"},
// "Предупреждение":{style:'Middle',lastTime:"2019/01/29 00:00:00"},
// "Замечание":{style:'Middle',lastTime:"2019/01/29 00:00:00"},
// "Информационное сообщение":{style:'Low',lastTime:"2019/01/29 00:00:00"},
// "Отладочное сообщение":{style:'Low',lastTime:"2019/01/29 00:00:00"}}