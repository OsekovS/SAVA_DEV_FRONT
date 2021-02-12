import React from 'react';
import './Saver.scss';
import {connect} from "react-redux";
import {onSaveDashParamsThunk}  from "../../../../redux/dashboards-reducer";

const rawSaver = (props) => {
    if(props.display==='wait') return <div data-title="сохранение изменений" className='saver comment' ><img  onClick={props.onSaveDashParamsThunk.bind(this,props.id,props.dbName)} src={require('./icon.svg')}></img></div>
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