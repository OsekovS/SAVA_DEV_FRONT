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
            ...props.iniState,
            opened: true
        };
        console.log(this.state)
      }
    
  onChangeField = (keyState,key)=>{
    //   console.log(key)
    //   console.log(keyState)
      this.setState(state => ({
        [key]: keyState
        
    }));
    // console.log(this.state)
    
    
  }
    render() {
    if(this.props.display){
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
                        <Dropdown iniState={this.state[key]===undefined?[]:this.state[key]} name={key} options={options} preview={configObj.translate[key]} onChangeCallBack={(this.onChangeField.bind(this))}/>
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
                    if(this.state['object']!==undefined){
                        for (const object of this.state['object']) {
                            needObj[object]= configObj['object'][object];
                        }
                    }
                    

                    console.log(needObj)
                    objects = <Dropdown  iniState={this.state[key]===undefined?[]:this.state[key]}  name={key} options={options} preview={configObj.translate[key]}  onChangeCallBack={(this.onChangeField.bind(this))}/>
                    // devices = <ObjectDropdown  iniState={this.state[key]===undefined?[]:this.state[key]}  name={'devices'}  preview={'конечные точки'}  obj={needObj}  onChangeCallBack={(this.onChangeField.bind(this))}/>

                }  
        }
        }
    return <div className='filter'>
        <div className="wrapper">
            {objects}
            {devices}
            {filter}
        </div>
        <button onClick={this.props.submitCallBack.bind(this,this.state)}>Применить настройки для фильтра</button>
        </div>
    }
    else return null
}
}
//   const FilterPanel = (props) => {
    
// }

export default FilterPanel;