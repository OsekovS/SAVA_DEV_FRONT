import React from 'react';
import './Sidebar.scss'
import Elem from './Elem'
import {changeSideBarCreator,uploadSidebar} from "../../redux/mod-sidebar-reducer";
import {changeLinkCreator} from '../../redux/nav-bar-reducer'
import {connect} from "react-redux";

class rawSidebar extends React.Component {
    constructor(props){
      super(props)
    //   console.log(props)
    //   let {type,sidebar,dbName} = props
    //   if(props.state[dbName]===undefined)props.uploadSidebar(type,sidebar,dbName)
  
    }
    render() {
        const onChangeSb = (type,dbName,key,to) => {
            this.props.changeSideBarCreator(type,dbName,key)
            this.props.changeLinkCreator(to)
        }
        let {type, dbName} = this.props
        let elems = []
        // console.log(Object.keys(this.props.state).length!==0)
        // console.log(Object.keys(this.props.state[this.props.dbName]).length!==0)
        if(Object.keys(this.props.state).length!==0&&this.props.state[this.props.dbName]!==undefined){//&&Object.keys(this.props.state[this.props.dbName]).length!==0
            let state=this.props.state[this.props.dbName]
            elems = Object.keys(state).map((key,n) => <Elem key={n} callBack={onChangeSb.bind(this,type,dbName,key,state[key].to)}
            active={state[key].active}
            to={state[key].to}
            text={state[key].text}/>)
        }
        return <aside className="aside-panel">
                 <menu>
                     <ul>
                         {elems.length>0?elems:null}
                    </ul>
                 </menu>
            </aside>
    }
}

let mapStateToProps = (state) => {
    return {state: state.modSidebar.dashboards}
}

let mapDispatchToProps = {
    changeSideBarCreator,
    changeLinkCreator,
    uploadSidebar
}
const Sidebar = connect(mapStateToProps, mapDispatchToProps)(rawSidebar);

export default Sidebar;