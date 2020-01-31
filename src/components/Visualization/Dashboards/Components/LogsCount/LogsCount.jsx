import React from 'react';
import './LogsCount.scss';
import {connect} from "react-redux";
// import {onSaveDashParamsThunk}  from "../../../../redux/acs-dashboards-reducer";

const rawLogsCount = ({indexes,indexName,dbName}) => {
  // console.log(props)
  const logsCount = indexes[dbName].indexes[indexName].logsCount
  const labels = []
  for (const key in logsCount) {
    if (logsCount.hasOwnProperty(key)) {
      labels.push(
        <span className={key}>{logsCount[key]>999?'999+':logsCount[key]}</span>
      )      
    }
  }
  return <div className='LogsCount'>{labels}</div>
}

let mapStateToProps = (state) => {
    return {
      indexes: state.auth.briefUserInfo.modules
   }
}

let mapDispatchToProps = {
// onSaveDashParamsThunk
}
  
  const LogsCount = connect(mapStateToProps, mapDispatchToProps)(rawLogsCount);

export default LogsCount;