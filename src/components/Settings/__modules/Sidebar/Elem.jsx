import React from 'react';
import {NavLink} from 'react-router-dom'
class Elem extends React.Component {
    constructor(props) {
        super(props);
        
    }
// handleClick(e){
//     console.log(this)
//     this.setState({ active: this.state.active + " aside-panel__item_active"  });
    
// }



render(props) {
    let clazz = this.props.name
        if(this.props.active) clazz += " aside-panel__item_active"
    return (
        <NavLink to={this.props.to}>
            <li  className={clazz}
            onClick={(e) => this.props.func(this.props.id)}>
                {this.props.text}
            </li>        
        </NavLink> 
    )
}
}
export default Elem;
