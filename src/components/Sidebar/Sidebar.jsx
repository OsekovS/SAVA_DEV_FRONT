import React from 'react';
import './Sidebar.scss'
import Elem from './Elem'


class rawSidebar extends React.Component {
    constructor(props){
      super(props)
    }
    onChangeSb = (type,dbName,key,to) => {
        this.props.changeSideBarCreator(type,dbName,key)
        this.props.changeLinkCreator(to)
    }
    render() {
      
        let {type, dbName ,state} = this.props
        console.log(state)
        let elems = []
        if(Object.keys(state).length!==0&&(state[dbName]!==undefined||type==='settings')){
            let curState=(type==='dashboards')?state[this.props.dbName]:state
            elems = Object.keys(curState).map((key,n) => <Elem key={n} callBack={this.onChangeSb.bind(this,type,dbName,key,curState[key].to)}
            active={curState[key].active}
            to={curState[key].to}
            text={curState[key].text}/>)
        }
        return <aside className="aside-panel">
                 <menu>
                     <ul>
                         {elems.length > 0 ? elems: null}
                    </ul>
                 </menu>
            </aside>
    }
}

export default rawSidebar;