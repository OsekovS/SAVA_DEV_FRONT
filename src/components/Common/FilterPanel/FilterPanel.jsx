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
    state = {
      opened: true
  };
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
                    filter.push(
                        <Dropdown options={options} preview={key} onChangeCallBack={(this.onChangeField.bind(this))}/>
                    )
                }else if(key==='Объекты'){

                    options = Object.keys(configObj[key]).map((e)=>{
                        return {
                            value: e,
                            label: e,
                        }
                    })
                    // this.state[key]=[]
                    let needObj = {}
                    if(this.state['Объекты']!==undefined){
                        for (const object of this.state['Объекты']) {
                            needObj[object]= configObj['Объекты'][object];
                        }
                    }
                    
                    // for (const object in configObj['Объекты']) {
                        
                    //     if (configObj['Объекты'].hasOwnProperty(object)) {
                    //         console.log(this.state['Объекты'][object]!==undefined)
                    //         // console.log(this.state['Объекты'][object])
                    //         if(this.state['Объекты']!==undefined&&this.state['Объекты'][object]!==undefined)
                    //         needObj[object] = configObj['Объекты'][object];
                            
                    //     }
                    // }
                    console.log(needObj)
                    objects = <Dropdown options={options} preview={'Объекты'}  onChangeCallBack={(this.onChangeField.bind(this))}/>
                    devices = <ObjectDropdown obj={needObj}/>

                }  
        }
        }
    return <div className='filter'>{objects}{devices}{filter}</div>
    }
    else return null
}
}
//   const FilterPanel = (props) => {
    
// }

export default FilterPanel;