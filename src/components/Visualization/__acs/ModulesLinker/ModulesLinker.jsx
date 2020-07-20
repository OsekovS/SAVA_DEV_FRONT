import React from 'react';
import Sidebar from '../../Sidebar/SidebarDashboardsCont'
import {BrowserRouter, Route} from 'react-router-dom'
import './__acs.scss';
import __header from '../../Common/__header/__header'
import LogsTableDeviceCont from '../Dashboards/LogsTable/LogsTableDeviceCont'
import CircleDiagramCont from '../Dashboards/CircleDiagram/CircleDiagramCont'
import DashCreator from '../Dashboards/DashCreator/DashCreatorCont'
import ModulesLinker from '../ModulesLinker/ModulesLinkerCont'

class __acs extends React.Component {
  constructor(props){
    super(props)
    this.makeDashboards=this.makeDashboards.bind(this)
  }
  componentDidMount() {
    //вызвать нужно только 1 раз
    if(this.props.dashboards[this.props.dbName]===null)
    this.props.getDashboardsThunk(this.props.dbName)
  }
  makeDashboards(indexName,clazz){
    // console.log(this.props)
    let a = []
   Object.values(this.props.dashboards[this.props.dbName]).forEach((e,n) => {
      if(e.body.indexName===indexName && e.type==="Table")  a.push(
        <div>
          <Sidebar dbName={this.props.dbName} sidebar={this.props.sidebar}  type= 'dashboards'></Sidebar>
          <LogsTableDeviceCont fields={this.props.indexes[e.body.indexName].fields} filter={this.props.indexes[e.body.indexName].filter} dbName={this.props.dbName} clazz={e.body.indexName} {...e.body}  title={e.name} key={e.id} id={e.id} className={"Modules_table_"+clazz}/>
        </div>)//id={n} 
      })
      Object.values(this.props.dashboards[this.props.dbName]).forEach((e,n) => {
        if(e.body.indexName===indexName && e.type==="Circle_Diagram") a.push(<CircleDiagramCont fields={this.props.indexes[e.body.indexName].fields} filter={this.props.indexes[e.body.indexName].filter} dbName={this.props.dbName} {...e.body} key={e.id} id={e.id} />    )//id={n}
    });
    a.push(
      <DashCreator indexName={indexName} indexes={this.props.indexes} dbName={this.props.dbName} />
    )
  return a
  }
  render() {
    if(this.props.dashboards[this.props.dbName]){
     
      return <BrowserRouter >
      <ModulesLinker/>
      <div className="Visualization__acs">
              <Route path='/visualization acs devicesLogs' render={()=>
                {return <>
                  {this.makeDashboards("acs_castle_ep2_event","devices-events")}
                </>}}
              ></Route>
              <Route path='/visualization acs usersLogs' render={()=>
                {return <>{this.makeDashboards("acs_castle_ep2_userlog","user-events")}</>}
              }></Route>
              <Route path='/visualization iss' render={()=>
                {return <>{this.makeDashboards("sns_event","user-events")}</>}
              }></Route>
      </div>
      </BrowserRouter>
    }
  else{return null}
}
}
export default __acs;