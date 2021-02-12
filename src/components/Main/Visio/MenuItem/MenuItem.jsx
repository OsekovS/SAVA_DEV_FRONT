import React from 'react';
import './MenuItem.scss';
import {changeLinkCreator} from '../../../redux/nav-bar-reducer'
import {changeSideBarCreator,uploadSidebar} from '../../../redux/mod-sidebar-reducer'
import {changeFilterByClickOnMenuItemThunk} from '../../../redux/change-dash-from-menu-reducer'
import {setComplexSetThunkFromMain,getDashboardsThunk} from '../../../redux/dashboards-reducer'
import {connect} from "react-redux";
import {NavLink} from 'react-router-dom'
class rawMainMenuItem extends React.Component {
    constructor(props) {
        super(props)
        props.getDashboardsThunk(props.dbName)
    }
    componentDidMount() {
        let {modSidebar,dbName,sidebar,settings} = this.props
        console.log(this.props)

        // первое условие - на случай, что параметр есть
        if(modSidebar!==undefined && settings!==undefined && modSidebar.dashboards[dbName]===undefined) {
            this.props.uploadSidebar('dashboards',sidebar,dbName)
            this.props.uploadSidebar('settings',settings.sidebar,dbName)
        }

    }

    render() {
        
        const onClick = (to,dbName,key) => {
            this.props.changeLinkCreator(to)
            this.props.changeSideBarCreator('dashboards',dbName,key)
        }
        const briefIndexesInfo = []
        const addedClass = this.props.loaded?'':'Common__mainMenuItem_centered'
        let {to,indexes,dbName} = this.props
        if(to===undefined||indexes===undefined||dbName===undefined) return null
        let indexNum = 0
        for (const index in indexes) {
            if (indexes.hasOwnProperty(index)&&indexes[index].logsCount!==undefined) {
                let events = indexes[index].events
                let eventsCount = []
                if(indexes[index].logsCount!==null&&indexes[index].logsCount.length!==0){
                    let list = Object.keys(indexes[index].logsCount)
                    list.forEach(key => {
                        const event = indexes[index].logsCount[key]
                        if(event.doc_count>0)
                        eventsCount.push(<p  className={'info-parh label'+'_'+event.style} onClick={()=>this.props.setComplexSetThunkFromMain({severity: [event.key]},dbName,index,null,event.lastTime)}>{event.key}: {event.doc_count>999?'999+':event.doc_count} <span>(с {event.lastTime}).</span></p>) 
                    });
                    
                    // eventsCount
                }else eventsCount.push(<span>Новых событий не обнаружено</span>)
                briefIndexesInfo.push(
                    // eventsCount
                    <NavLink to={to[index]}><li onClick={onClick.bind(this,to[index],dbName,indexNum)}><h3>{indexes[index].title}</h3><span className='mini'> </span>{eventsCount}</li></NavLink>
                )
                indexNum++
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
    uploadSidebar,
    changeFilterByClickOnMenuItemThunk,
    getDashboardsThunk,
    setComplexSetThunkFromMain
}


const __mainMenuItem = connect(mapStateToProps, mapDispatchToProps)(rawMainMenuItem);


export default __mainMenuItem;
