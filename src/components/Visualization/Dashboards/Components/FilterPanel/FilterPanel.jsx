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
       
      }
    
  onChangeField = (keyState,key)=>{
    this.setState(state => {
        state.params[key] = keyState 
        return state
      })  
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
  const emojiBlock = document.getElementsByClassName('filter'+this.props.id)[0]
  
  // console.log(emojiBlock)
  // Проверяем, есть ли в списке родительских или дочерних элементов, вышеуказанный компонент
  if (!e.path.includes(emojiBlock)) {
    // console.log(e.path)
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
        for (const key in this.props.configObj) {
            if (this.props.configObj.hasOwnProperty(key)) {
                if(Array.isArray(this.props.configObj[key])){
                    // console.log(this.props.configObj[key])
                    options = this.props.configObj[key].map((e,n) => {
                        return {
                            value: e,
                            label: e,
                        } 
                    }
                    )
                    filter.push(
                        <Dropdown selected={this.state.params[key]===undefined?[]:this.state.params[key]} iniState={this.state.params[key]===undefined?[]:this.state.params[key]} name={key} options={options} 
                        preview={this.props.configObj.translate[key]} onChangeCallBack={(this.onChangeField.bind(this))}/>
                    )
                }
            }
        }
    return <div className={'filter filter'+this.props.id}>
        <span>Настроить фильтр</span>
        <form onSubmit={this.onSubmit} >
        <div className="wrapper">
            {objects}
            {devices}
            {filter}
            
        </div>
        <input type="submit" value="Применить"/><button onClick={this.onCancel}>Отменить</button>
        </form>
        </div>
    }
    else return <button className={'filter filter'+this.props.id}>Настроить фильтр</button>
}
}

export default FilterPanel;