import React from 'react';
import './CommonDash.scss';
import {getDashboardsThunk} from '../../redux/dashboards-reducer'
import LogsTableDeviceCont from '../../Visualization/Dashboards/LogsTable/LogsTableDeviceCont'
import CircleDiagramCont from '../../Visualization/Dashboards/CircleDiagram/CircleDiagramCont'
import DashCreator from '../../Visualization/Dashboards/DashCreator/DashCreatorCont'
import {connect} from "react-redux";

class Sett extends React.Component {
    constructor(props) {
        super(props);
        props.getDashboardsThunk('sava_core')
    }
    makeDashboards(){
        let a = [],
        {modules} = this.props
    //     {current} = this.state,
    //     
    
        let dashLen = Object.values(this.props.dashboards).length - 1;
        Object.values(this.props.dashboards).forEach((e,n) => {
            let curIndex = e.body.indexName,
            filter, fields, infoDbName
            for (const moduleKey in modules) {
                for (const indexKey in modules[moduleKey].indexes) {
                    if (modules.hasOwnProperty(moduleKey) && modules[moduleKey].indexes.hasOwnProperty(indexKey)
                        && indexKey === curIndex) {
                            filter = modules[moduleKey].indexes[indexKey].filter
                            fields = modules[moduleKey].indexes[indexKey].fields
                            infoDbName = moduleKey
                    }
                }   
            }
            // let indexes = 
            if(e.type==="Table")  a.push(<LogsTableDeviceCont fields={fields} filter={filter} dbName={'sava_core'} {...e.body}
                title={e.name} key={e.id} id={e.id}  isLast = { n === dashLen } serNum = {n} infoDbName={infoDbName}/>
            )
            if(e.type==="Circle_Diagram") a.push(<CircleDiagramCont fields={fields} filter={filter} infoDbName={infoDbName}
                dbName={'sava_core'} {...e.body} title={e.name} key={e.id} id={e.id} isLast = { n === dashLen } serNum = {n} />    )//id={n}
        });
        //console.log(a)  this.props.
        a.push(
          <DashCreator innerText={''} isCommon={true} className={'DashCreator__plus'} dbName={'sava_core'} />
        )
      return a
    }
    render() {
        // console.log(this.props)
        return <>{this.props.dashboards!==undefined?this.makeDashboards():null}</>
    }
}
let mapStateToProps = (state) => {
    return {
        modules: state.auth.briefUserInfo.modules,
        dashboards: state.dashboards['sava_core']
    }
  }
  let mapDispatchToProps = {
    getDashboardsThunk
  }
  
  const SettCont = connect(mapStateToProps, mapDispatchToProps)(Sett);
  
export default SettCont;