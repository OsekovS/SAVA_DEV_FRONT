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
        // console.log(props)
        if(props.single)
        this.state = {
            params: {...props.iniState},
            display: 'collapsed'
        }
        else{
            let params = {}
            Object.keys(props.configObj).forEach(key => {
                params[key]= props.iniState[key]!==undefined?{...props.iniState[key]}:{}
            });
            this.state = {
                params,
                display: 'collapsed'
            };
        }
        // console.log(this.state.params)
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.generateFiltersList = this.generateFiltersList.bind(this);
        this.onChangeField = this.onChangeField.bind(this);
      }
    //keyState,key,groupName
  onChangeField = (keyState,key,groupName)=>{
    //   console.log(this.state)
    //   console.log(args)
    if(this.props.single){
        this.setState(state => {
            state.params[key] = keyState 
            return state
          })
    }else{
        this.setState(state => {
            state.params[groupName][key] = keyState 
            return state
          })
    }
      
  }

generateFiltersList(configObj,filterState,groupName){
    let filter = []
    let options
    // console.log(configObj)
    // console.log(groupName)
    let onChangeCallBack
    if(this.props.single||groupName==='secondField') onChangeCallBack = (keyState,key)=>{this.onChangeField(keyState,key,'secondField')}
    else {onChangeCallBack = (keyState,key)=>{this.onChangeField(keyState,key,'mainField')}}//onChangeCallBack = this.props.configObj[groupName].callback} //(keyState,key)=>{this.onChangeField(keyState,key,'mainField')}}
    for (const key in configObj) {
        if (configObj.hasOwnProperty(key)) {
            if(Array.isArray(configObj[key])){
                // console.log(configObj[key])
                options = configObj[key].map((e,n) => {
                    return {
                        value: e,
                        label: e,
                    } 
                })
                
                
                filter.push(
                    <Dropdown selected={filterState[key]===undefined?[]:filterState[key]} iniState={filterState[key]===undefined?[]:filterState[key]} name={key} options={options} 
                    preview={this.props.fields[key].translate} onChangeCallBack={onChangeCallBack}/>
                )
            }
        }
    }
    return filter
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
        
        let filter = []
    if(this.state.display==='deployed'){
         
        if(this.props.single){
            // console.log(this.props.configObj)
            // console.log(this.state.params)
            filter = this.generateFiltersList(this.props.configObj,this.state.params)
        }else Object.keys(this.props.configObj).map((key,n) => {

            // console.log(this.props.configObj[key])
            // console.log(this.state.params[key])
                filter.push(
                    <div className="wrapper"><h2>{this.props.configObj[key].title}</h2>
                        {this.generateFiltersList(this.props.configObj[key].body,this.state.params[key],key)}
                    </div>
                )
               
            }
        )
        //this.props.configObj.translate[key]
    return <div className="modal-form-keeper param-panel param-filter-panel"  >
    <div>
        <header><span><img src={require('./filter.svg')}></img>Настройки параметрического фильтра</span><button onClick={()=>{this.setState({ display: 'collapsed' });}}><img src={require('../close.svg')}></img></button></header>
            <form onSubmit={this.onSubmit} >
            <div className={this.props.single?"wrapper":"wrapper wrapper__columned"}>
                {filter}  
            </div>
            <input type="submit" value="Применить"/><button onClick={this.onCancel}>Отменить</button>
        </form>  
    </div>
                   
</div>
    }
    else return <span className={'param-filter-panel param-panel param-filter-panel__collapsed'} onClick={()=>{this.setState({ display: 'deployed' });}}><img src={require('./filter.svg')}></img></span> 
    // <button className={'filter filter'+this.props.id}>Настроить фильтр</button>
}
}

export default FilterPanel;