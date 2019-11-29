import React from 'react';
import './Sidebar.scss'
import Elem from './Elem'
import {NavLink} from 'react-router-dom'

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
        this.state.actives = {0:false,1:true,2:false}
        // console.log(this)
    }
    handleClick(evt){
        // console.log(evt)
        this.setState({actives:{[evt]:true}})
        this.render()
        // console.log(this)
    }
    render() {
    // console.log(this.state.actives)
    return <aside className="aside-panel">
            <menu>
                <ul>
                    <Elem id={0} func={this.handleClick.bind(this)}
                    active={this.state.actives[0]}
                    name="aside-panel_cameras-control" 
                    to='/settings/modules/cameras' 
                    text="SAVA камеры"/>
                    <Elem id={1} func={this.handleClick.bind(this)}
                     active={this.state.actives[1]}
                    name="aside-panel_users-control" 
                    to='/settings/modules/acs' 
                    text="SAVA СКУД"/>         
                    <Elem id={2} func={this.handleClick.bind(this)}
                     active={this.state.actives[2]}
                     name="aside-panel_users-control" 
                    to='/settings/modules/iss' 
                    text="SAVA СЗИ"/>         
                </ul>
            </menu>
        </aside>
}
}
export default Sidebar;