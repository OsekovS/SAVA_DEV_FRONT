import React from 'react';
import './ObjectDropdown.scss'
import Dropdown from './dropdown.jsx'
import {configObj} from '../configObj'
const ObjectsTable = (props) => {
    if(props.display){
        let objects = Object.keys(props.objects).map((e,n) => {
            return <li  key={n.toString()}>
                    <div style={{backgroundColor: props.objects[e].color}}></div>
                    {e}
                </li>})
            return <ul className="filter__objects-list">
                {objects}
            </ul>
    }
    else return null
    
}

class ObjectDropdown extends React.Component {
    state = {
      selected: [],
      closed: true
    }
    changeView = (e)=>{
        console.log(e.target.tagName)
     if(e.target.tagName==='SPAN'){ this.setState(state => ({
          closed:  !this.state.closed
        }));}
    }
    render() {
      const {selected} = this.state;
      let options = []
      for (const key in this.props.obj) {
          if (this.props.obj.hasOwnProperty(key)) {
            this.props.obj[key].devices.forEach(device => {
                    device.names.forEach(name => {
                    options.push(
                        {
                            value: name+' ('+device.ip+')',
                            label: name+' ('+device.ip+')',  
                            labelColor: this.props.obj[key].color,
                            padding: '2px 20px'
                        }
                    )
                })
                }
            );
            }
      }
     
      return <div onClick={this.changeView.bind(this)} className="filter__devices">
        <Dropdown options={options} preview={'!'}/>
        <ObjectsTable display={!this.state.closed} objects={this.props.obj}/>
      </div>
    }
  }

  export default ObjectDropdown