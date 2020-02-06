import React from 'react';
import './MenuItem.scss';
import {changeLinkCreator} from '../../../redux/nav-bar-reducer'
import {changeSideBarCreator,uploadSidebar} from '../../../redux/mod-sidebar-reducer'
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom'
class rawMainMenuItem extends React.Component {
    componentDidMount() {
        let {modSidebar,dbName,sidebar} = this.props
        if(modSidebar.dashboards[dbName]===undefined) this.props.uploadSidebar('dashboards',sidebar,dbName)
        // if(props.state[dbName]===undefined)props.uploadSidebar(type,sidebar,dbName)
    }
  
    
    render() {
        const onClick = (to,dbName,key) => {
            this.props.changeLinkCreator(to)
            this.props.changeSideBarCreator('dashboards',dbName,key)
        }
        const briefIndexesInfo = []
    
        console.log(this.props)
        const addedClass = this.props.loaded?'':'Common__mainMenuItem_centered'
        let {to,indexes,dbName} = this.props
        for (const index in indexes) {
            if (indexes.hasOwnProperty(index)&&indexes[index].logsCount!==undefined) {
                let events = indexes[index].events
                let eventsCount = []
                
                if(indexes[index].logsCount.length!==0){
                    indexes[index].logsCount.forEach(event => {
                        // console.log(event)
                        eventsCount.push(<span className={'label'+event.key}>{event.doc_count>999?'999+':event.doc_count}</span>) 
                    });
                }else eventsCount.push(<span>Новых событий не обнаружено</span>)
                briefIndexesInfo.push(
                    <NavLink to={to[index]}><li onClick={onClick.bind(this,to[index],dbName,index)}><h3>{indexes[index].title}</h3><span className='mini'>   (Последний просмотр {indexes[index].lastViewed})</span>{eventsCount}</li></NavLink>
                )
            }
        }
        return <div className={"Common__mainMenuItem "+addedClass}  >
        <header className="Common__header Common__header_grey Common__header_menu-item"
            ><span>{this.props.head['text']}</span>
            </header>
    
        <div>
            {this.props.loaded?<ul>{briefIndexesInfo}</ul>
            :<div class="lds-ring"><div></div><div></div><div></div><div></div></div>}
           
        </div>
        </div>
    }
  }

let mapStateToProps = (state) => {
    return {
        modSidebar: state.modSidebar
    }
}

let mapDispatchToProps = {
    changeSideBarCreator,
    changeLinkCreator,
    uploadSidebar
}


const __mainMenuItem = connect(mapStateToProps, mapDispatchToProps)(rawMainMenuItem);


export default __mainMenuItem;