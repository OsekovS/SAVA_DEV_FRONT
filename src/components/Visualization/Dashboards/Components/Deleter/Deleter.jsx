import React from 'react';
import './Deleter.scss';
import {connect} from "react-redux";
import {onDashDeleteThunk}  from "../../../../redux/dashboards-reducer";

const rawDeleter = (props) => {
    return <div data-title="удалить"  className={'Deleter comment'} ><img onClick={props.onDashDeleteThunk.bind(this,props.id,props.dbName,props.indexName)} src={require('../close.svg')}></img></div>
    
}

let mapStateToProps = (state) => {
    return {
   }
}

let mapDispatchToProps = {
onDashDeleteThunk
}
  
  const Deleter = connect(mapStateToProps, mapDispatchToProps)(rawDeleter);

export default Deleter;