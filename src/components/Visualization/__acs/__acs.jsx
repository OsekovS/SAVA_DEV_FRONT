import React from 'react';
import Sidebar from '../../Sidebar/SidebarDashboardsCont'
import {BrowserRouter, Route} from 'react-router-dom'
import './__acs.scss';
import __header from '../../Common/__header/__header'
import LogsTableDeviceCont from '../Dashboards/LogsTable/LogsTableDeviceCont'
import CircleDiagramCont from '../Dashboards/CircleDiagram/CircleDiagramCont'
import BarDiagramCont from '../Dashboards/BarDiagram/BarDiagramCont'
import DashCreator from '../Dashboards/DashCreator/DashCreatorCont'
import ComSidebar from '../../ComSidebar/ComSidebarCont'
// import ModulesLinker from '../ModulesLinker/ModulesLinkerCont'

class __acs extends React.Component {
  constructor(props){
    super(props)
    this.makeDashboards=this.makeDashboards.bind(this)
    this.makeRoutes=this.makeRoutes.bind(this)
    this.state = {
      current: props.dbName,
      // onLoad: null/
    }
  }
  componentDidMount() {
    //вызвать нужно только 1 раз
    // console.log(this.state.current)
    // console.log(this.props.dashboards)
    // if(this.props.dashboards[this.state.current]===null){
      // this.props.getDashboardsThunk(this.state.current)
      // this.setState({onLoad: moduleKey})
    // }
    
  }
  componentWillReceiveProps(props) {
    let sidebar = props.sidebar.dashboards,
    {dashboards} = this.props
    // console.log(sidebar)
    // console.log(this.props.dashboards)
    for (const moduleKey in sidebar) {
      if (sidebar.hasOwnProperty(moduleKey)) {
        let indexes = sidebar[moduleKey]
        for (const indexKey in indexes) {
          if (indexes.hasOwnProperty(indexKey)&&indexes[indexKey].active) {
            this.setState({current: moduleKey})
            //данные дашборды не загрузились и не загружаются еще
            if(this.props.dashboards[moduleKey]===null&&this.state.current!==moduleKey) {
              console.log('!!!!!!!!!')
              // this.props.getDashboardsThunk(moduleKey)
            }
          }
        }
      }
    }
    // if(this.props.dashboards[this.props.dbName]===null)
    // this.props.getDashboardsThunk(this.props.dbName)
  }
  makeDashboards(indexName,clazz){
    let a = [],
    {modules, dashboards} = this.props,
    {current} = this.state,
    indexes = modules[current].indexes

    let dashLen = Object.values(this.props.dashboards[this.state.current]).length - 1;
    Object.values(this.props.dashboards[this.state.current]).forEach((e,n) => {
      if(e.body.indexName===indexName){
        if(e.type==="Table")  a.push(<LogsTableDeviceCont fields={indexes[e.body.indexName].fields} filter={indexes[e.body.indexName].filter} dbName={this.state.current} clazz={e.body.indexName} {...e.body}
            title={e.name} key={e.id} id={e.id} className={"Modules_table_"+clazz} isLast = { n === dashLen } serNum = {n}/>
        )
        if(e.type==="Circle_Diagram") a.push(<CircleDiagramCont fields={indexes[e.body.indexName].fields} filter={indexes[e.body.indexName].filter}
            dbName={this.state.current} {...e.body} title={e.name} key={e.id} id={e.id} isLast = { n === dashLen } serNum = {n}/>    )//id={n}
        if(e.type==="Bar_Diagram") a.push(<BarDiagramCont fields={indexes[e.body.indexName].fields} filter={indexes[e.body.indexName].filter}
          dbName={this.state.current} {...e.body} title={e.name} key={e.id} id={e.id} isLast = { n === dashLen } serNum = {n}/>    )//id={n}
        }
      });
      a.push(
        <DashCreator innerText={'Добавить дашборд +'} isCommon={false} className={'DashCreator__red-button'} indexName={indexName} indexes={indexes} dbName={current} />
      )
      return a

  }
  makeRoutes(paths){
    let Routes = [], index
    for (const key in paths) {
        index = paths[key]
        for(const indexKey in index){
          if (paths.hasOwnProperty(key)&&index.hasOwnProperty(indexKey)) {
            Routes.push(
              <Route path={index[indexKey]} render={()=>
                {return <>
                  {this.makeDashboards(indexKey,"user-events")}
                </>}}></Route>
            )
        }
      }
    }
    //console.log(Routes)
    return Routes
  }
  render() {

    let {dashboards, paths, modulesName} = this.props, Routes
    if(dashboards[this.state.current]){
      if(Object.keys(paths)!==0)
      Routes = this.makeRoutes(paths)
      // console.log(Routes)
      return <BrowserRouter >
      <div className="Visualization__acs">
        {/* ГОРИЗОНТАЛЬНЫЙ САЙДБАР УБРАН ДЛЯ ВЕРСИИ МОСГАЗ */}
        {Object.keys(modulesName).length>1?<ComSidebar modulesName={modulesName} current={this.state.current}/>:null}
        {Routes}
      </div>
      </BrowserRouter>
    }
  else{return null}
}
}
export default __acs;