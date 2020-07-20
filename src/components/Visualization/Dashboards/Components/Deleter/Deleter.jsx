import React from 'react';
import './Saver.scss';
import {connect} from "react-redux";
import {onDashDeleteThunk}  from "../../../../redux/dashboards-reducer";

const rawDeleter = (props) => {
    return <img onClick={props.onDashDeleteThunk.bind(this,props.id,props.dbName,props.indexName)} className='saver__wait' src={require('../close.svg')}></img>
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