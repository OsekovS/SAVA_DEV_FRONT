import Dropdown from './dropdown/dropdown.jsx'
import React from 'react';
import {configObj} from './configObj.js'
import './FilterPanel.scss'
import ObjectDropdown from './dropdown/ObjectDropdown.jsx'
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberrysssssssssssssssssssssssssssssssssss' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'vanilla1', label: 'Vanilla1' },
    { value: 'vanilla2', label: 'Vanilla2' },
    { value: 'vanilla3', label: 'Vanilla3' },
    { value: 'vanilla4', label: 'Vanilla4' }
  ]
  
  class FilterPanel extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {
            params: {...props.iniState},
            opened: true
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        console.log(this.state)
      }
    
  onChangeField = (keyState,key)=>{
    //   console.log(key)
    //   console.log(keyState)
    //   this.setState(state => ({
    //     params[key] = keyState
        
    // }));
    this.setState(state => {
        state.params[key] = keyState 
        return state
      })
    // console.log(this.state)
    
    
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), false);
  }

  // Вызывается до рендера
  componentWillMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), false);
  }
onSubmit(event){
    event.preventDefault()
    this.setState({ display: 'collapsed' });
    this.props.submitCallBack(this.state.params)
}
onCancel(){
    this.setState({ display: 'collapsed' });
}
// Отлавливаем клик на любую область
handleClickOutside(e) {
  // Получаем ссылку на элемент, при клике на который, скрытие не будет происходить
  const emojiBlock = document.getElementsByClassName('filter')[0]
  // console.log(emojiBlock)
  // Проверяем, есть ли в списке родительских или дочерних элементов, вышеуказанный компонент
  if (!e.path.includes(emojiBlock)) {
    // Если в области кликнутого элемента нету "emojiBlock", то проверяем ниже
    // Не произведен ли клик на кнопку, открывающую окно смайлов
    // const svgSmileBtn = document.querySelector('.chat-input__smile-btn');
    // Если клик не производился и на кнопку открытия окна смайлов, то скрываем блок. if (!e.path.includes(svgSmileBtn))
     this.setState({ display: 'collapsed' });
  }else{
    this.setState({ display: 'deployed' });
  }
}
    render() {
    if(this.state.display==='deployed'){
        let filter = []
        let options
        let devices
        let objects
        for (const key in configObj) {
            if (configObj.hasOwnProperty(key)) {
                if(Array.isArray(configObj[key])){
                    // console.log(configObj[key])
                    options = configObj[key].map((e,n) => {
                        return {
                            value: e,
                            label: e,
                        } 
                    }
                    )
                    // this.state[key]=[]
                    // console.log(configObj.translate)
                    filter.push(
                        <Dropdown iniState={this.state.params[key]===undefined?[]:this.state.params[key]} name={key} options={options} preview={configObj.translate[key]} onChangeCallBack={(this.onChangeField.bind(this))}/>
                    )
                }else if(key==='object'){

                    options = Object.keys(configObj[key]).map((e)=>{
                        return {
                            value: e,
                            label: e,
                        }
                    })
                    // this.state[key]=[]
                    let needObj = {}
                    if(this.state.params['object']!==undefined){
                        for (const object of this.state.params['object']) {
                            needObj[object]= configObj['object'][object];
                        }
                    }
                    

                    console.log(needObj)
                    objects = <Dropdown  iniState={this.state.params[key]===undefined?[]:this.state.params[key]}  name={key} options={options} preview={configObj.translate[key]}  onChangeCallBack={(this.onChangeField.bind(this))}/>
                    // devices = <ObjectDropdown  iniState={this.state[key]===undefined?[]:this.state[key]}  name={'devices'}  preview={'конечные точки'}  obj={needObj}  onChangeCallBack={(this.onChangeField.bind(this))}/>

                }  
        }
        }
    return <div className='filter'>
        <span>Настроить фильтр</span>
        <form onSubmit={this.onSubmit} >
        <div className="wrapper">
            {objects}
            {devices}
            {filter}
            
        </div>
        <input type="submit" value="Применить"/><button onClick={this.onCancel}>Отменить</button>
        </form>
        {/* <button onClick={this.onSubmit.bind(this)}>Применить настройки для фильтра</button> */}
        </div>
    }
    else return <button className='filter'>Настроить фильтр</button>
}
}
//   const FilterPanel = (props) => {
    
// }

export default FilterPanel;