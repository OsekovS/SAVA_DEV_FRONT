import React from 'react';
import './Sidebar.scss'
import Elem from './Elem'
import {changeSideBarCreator} from "../../../redux/mod-sidebar-reducer";
import {connect} from "react-redux";

const rawSidebar = (props) => {
    const onChangeSb = (key) => {
        props.changeSb(key)
    }
    let elems = props.state.map((e,n) => <Elem key={e.n} callBack={onChangeSb.bind(this,n)}
            active={e.active}
            to={e.to}
            text={e.text}/>)
    return <aside className="aside-panel">
             <menu>
                 <ul>
                     {elems}
                </ul>
             </menu>
        </aside>
}

let mapStateToProps = (state) => {
    return {state: state.modSidebar}
}
let mapDispatchToProps = (dispatch) => {
    return {
        changeSb: (key) => {
            dispatch(changeSideBarCreator(key));
        }
    }
}

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(rawSidebar);

export default Sidebar;