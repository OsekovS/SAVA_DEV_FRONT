import React from 'react';
import './MotionArrow.scss';
import {connect} from "react-redux";
import {onDashShiftThunk}  from "../../../../redux/dashboards-reducer";

const rawDeleter = (props) => {
    let {direct, id, dbName, indexName, style} = props
    return <div  style={style!==undefined?style:{}} className={'Arrow Arrow__'+direct} onClick={()=>{props.onDashShiftThunk(id, indexName, dbName, direct)}}></div>
    // return <div data-title="удалить"  className={'Deleter comment'} ><img onClick={props.onDashDeleteThunk.bind(this,props.id,props.dbName,props.indexName)} src={require('../close.svg')}></img></div>
    
}

let mapStateToProps = (state) => {
    return {
   }
}

let mapDispatchToProps = {
  onDashShiftThunk
}
  
  const Deleter = connect(mapStateToProps, mapDispatchToProps)(rawDeleter);

export default Deleter;