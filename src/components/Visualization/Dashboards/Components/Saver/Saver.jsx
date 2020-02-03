import React from 'react';
import './Saver.scss';
import {connect} from "react-redux";
import {onSaveDashParamsThunk}  from "../../../../redux/acs-dashboards-reducer";

const rawSaver = (props) => {
    if(props.display==='wait') return <img onClick={props.onSaveDashParamsThunk.bind(this,props.id,props.dbName)} className='saver__wait' src={require('./icon.svg')}></img>
        else return <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
}

let mapStateToProps = (state) => {
    return {
   }
}

let mapDispatchToProps = {
onSaveDashParamsThunk
}
  
  const Saver = connect(mapStateToProps, mapDispatchToProps)(rawSaver);

export default Saver;