import React from 'react';
import './Options.scss'
class Resizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addedFooterElem: 0,
            addedHeaderElem: 0
        }

    }


    render() {  
        let tableOptions=[<option  value={''}>{''}</option>],footerOptions = [<option  value={''}>{''}</option>],
            {changeHeaderElemSize, onSettings, headerElements,  indexElements,footerElements, 
                changedElemNumb, id, dbName, addHeaderElem, addFooterElem} = this.props,
                field, colWidth,text
                console.log(this.props)
                if(changedElemNumb !== null && changedElemNumb>0) {
                  field = headerElements[changedElemNumb].field
                  colWidth = headerElements[changedElemNumb].colWidth
                  text = headerElements[changedElemNumb].text
                }
            if(onSettings&&Array.isArray(indexElements)) indexElements.forEach((indexElement) => {
                let isAbsentInTable = true
                let isAbsentInFooter = true 
                
                for ( let index = 0; index < headerElements.length; index++) {
                  // console.log(headerElements[index].field)
                  if(headerElements[index].field === indexElement.field) {
                    isAbsentInTable = false
                    break;
                  }
                }
                for ( let index = 0; index < footerElements.length; index++) {
                  if(footerElements[index].field === indexElement.field) {
                    isAbsentInFooter = false
                    break;
                  }
                }
                if(isAbsentInTable) tableOptions.push(<option selected={indexElement.field===this.state.addedHeaderElem} value={indexElement.field}>{indexElement.text+' ('+indexElement.field+')'}</option>)
                if(isAbsentInFooter) footerOptions.push(<option selected={indexElement.field===this.state.addedFooterElem} value={indexElement.field}>{indexElement.text+' ('+indexElement.field+')'}</option>)
              })
            if(onSettings) return <div className='Options'>
                <div>
                    <span>{'Ширина столбца "'+(text===undefined||field===undefined?'(выберите один из заголовков столбца)':(text+'('+field+')'+'": ')) }</span>
                    <input value={colWidth} onChange={(e)=>{changeHeaderElemSize(changedElemNumb,e.target.value,id,dbName)}}  className="collapser" type="number"></input>               
                </div>
                <div>
                    <span >Добавить в таблицу</span>
                    <select onChange={(event)=>{this.setState({ addedHeaderElem: event.target.value })}}>
                        {tableOptions}
                    </select>
                    <button onClick={()=>{addHeaderElem(this.state.addedHeaderElem,id,dbName)}} className='plus'>+</button>
                    {/* <img src={require("./markAsReadIcon.svg")}
                        onClick={()=>{this.setState({onSettings: !this.state.onSettings})}}></img> */}
                </div>  
                <div>
                    <span >Добавить в описание</span>
                    <select onChange={(event)=>{this.setState({ addedFooterElem: event.target.value })}}>
                        {footerOptions}
                    </select>
                    <button onClick={()=>{addFooterElem(this.state.addedFooterElem,id,dbName)}} className='plus'>+</button>
                    {/* <img src={require("./markAsReadIcon.svg")}
                        onClick={()=>{this.setState({onSettings: !this.state.onSettings})}}></img> */}
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