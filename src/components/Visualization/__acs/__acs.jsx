import React from 'react';
import Sidebar from '../Sidebar/Sidebar'
import {BrowserRouter, Route} from 'react-router-dom'
import './__acs.scss';
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
      if(e.body.indexName===indexName && e.type==="Table")  a.push(<div><Sidebar></Sidebar><LogsTableDeviceCont clazz={e.body.indexName} {...e.body}  title={e.name} key={e.id} id={e.id} className={"Modules_table_"+clazz}/></div>)//id={n} 
      })
      Object.values(this.props.dashboards).forEach((e,n) => {
        if(e.body.indexName===indexName && e.type==="Circle_Diagram") a.push(<CircleDiagramCont   {...e.body} key={e.id} id={e.id} />    )//id={n}
    
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
              <Route path='/visualization acs devicesLogs' render={()=>
                {return <>
                  {this.makeDashboards("acs_castle_ep2_event","devices-events")}
                </>}}
              ></Route>
              <Route path='/visualization acs usersLogs' render={()=>
                {return <>{this.makeDashboards("acs_castle_ep2_userlog","user-events")}</>}
              }></Route>
      </div>
      </BrowserRouter>
    }
  else{return null}
}
}
export default __acs;
// export default __modules;

// class __acs extends React.Component {
//   componentDidMount() {
//     this.props.getDashboardsThunk()
//   }
//   componentWillReceiveProps(nextProps){
//     // console.log(this.props)
//     // console.log(nextProps)
// }
//   render() {
//     // console.log(this.props.logs.length)
//     let dashboards = []

//     let propsDashboards = this.props.dashboards
//     console.log(this.props)
    
//     if(this.props.dashboards){
      
//       //footerElements={propsDashboards[1].body.footerElements} headerElements={propsDashboards[1].body.headerElements } index={propsDashboards[1].body.indexName}
//       dashboards.push(<LogsTableDeviceCont {...propsDashboards[0].body}  title="События СКУД" key={propsDashboards[0].id} id={propsDashboards[0].id} className="Modules_table_devices-events"/>)
//       dashboards.push(<LogsTableDeviceCont {...propsDashboards[1].body} title="События Пользователей"  key={propsDashboards[1].id}  id={propsDashboards[1].id} className="Modules_table_user-events"/>)
//       dashboards.push(<CircleDiagramCont   {...propsDashboards[2].body} key={propsDashboards[2].id}  id={2}/>)
//     }else{
//       dashboards = null
//     }


//     return <div className="Visualization__acs">
//       {dashboards}
//       {/* <LogsTableDeviceCont title="События СКУД" footerElements={this.footerElements} headerElements={this.headerElements }/> */}

      
//     </div>
//   }
// }

// export default __acs;