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
            display: 'collapsed'
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


onSubmit(event){
    event.preventDefault()
    this.setState({ display: 'collapsed' });
    this.props.submitCallBack(this.state.params)
}
onCancel(){
    this.setState({ display: 'collapsed' });
}

    render() {
    if(this.state.display==='deployed'){
        console.log('!')
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
    return <div className="modal-form-keeper param-filter-panel"  >
    <div>
        <header><span><img src={require('./filter.svg')}></img>Настройки параметрического фильтра</span><button onClick={()=>{this.setState({ display: 'collapsed' });}}><img src={require('../close.svg')}></img></button></header>
            <form onSubmit={this.onSubmit} >
            <div className="wrapper">
                {objects}
                {devices}
                {filter}
                
            </div>
            <input type="submit" value="Применить"/><button onClick={this.onCancel}>Отменить</button>
        </form>  
    </div>
                   
</div>
    }
    else return <span className={'param-filter-panel param-filter-panel__collapsed'} onClick={()=>{this.setState({ display: 'deployed' });}}><img src={require('./filter.svg')}></img></span> 
    // <button className={'filter filter'+this.props.id}>Настроить фильтр</button>
}
}

export default FilterPanel;