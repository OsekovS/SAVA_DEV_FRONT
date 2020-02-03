import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import {BrowserRouter, Route} from 'react-router-dom'
import './__iss.scss';
import __header from '../../Common/__header/__header'
import LogsTableDeviceCont from '../Dashboards/LogsTable/LogsTableDeviceCont'
import CircleDiagramCont from '../Dashboards/CircleDiagram/CircleDiagramCont'

class __acs extends React.Component {
  constructor(props){
    super(props)
    this.makeDashboards=this.makeDashboards.bind(this)
  }
  componentDidMount() {
    //вызвать нужно только 1 раз
    if(this.props.dashboards===null)
    this.props.getDashboardsThunk()
  }
  makeDashboards(indexName,clazz){
    console.log(this.props)
    let a = []
   Object.values(this.props.dashboards).forEach((e,n) => {
      if(e.body.indexName===indexName && e.type==="Table")  a.push(<div><Sidebar></Sidebar><LogsTableDeviceCont fields={this.props.indexes[e.body.indexName].fields} filter={this.props.indexes[e.body.indexName].filter} dbName={this.props.dbName} clazz={e.body.indexName} {...e.body}  title={e.name} key={e.id} id={e.id} className={"Modules_table_"+clazz}/></div>)//id={n} 
      })
      Object.values(this.props.dashboards).forEach((e,n) => {
        if(e.body.indexName===indexName && e.type==="Circle_Diagram") a.push(<CircleDiagramCont fields={this.props.indexes[e.body.indexName].fields} filter={this.props.indexes[e.body.indexName].filter} dbName={this.props.dbName} {...e.body} key={e.id} id={e.id} />    )//id={n}
    
    });

  return a
  }
  render() {
        let dashboards = []

    let propsDashboards = this.props.dashboards
    // console.log(this.props)
    if(this.props.dashboards){
      return <BrowserRouter>
      <div className="Visualization__acs">
              <Route path='/visualization iss' render={()=>
                {return <>
                  {this.makeDashboards("sns_event","devices-events")}
                </>}}
              ></Route>
      </div>
      </BrowserRouter>
    }
  else{return null}
}
}
export default __acs;