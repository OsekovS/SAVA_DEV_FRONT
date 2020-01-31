import React from 'react';
import {connect} from "react-redux";
import {onChangeUserSawThunk}  from "../../../../redux/auth-reducer";

const rawMarkAsRead = ({display,id,indexName,onChangeUserSawThunk,dbName}) => {
  if(display==='wait') return <span className='markAsRead__wait' onClick={()=>onChangeUserSawThunk(indexName,id,dbName)}>Отметить как прочитанные<img   src={require('./icon.svg')}></img></span>
  else return <span >Отметить как прочитанные<div class="lds-ring"><div></div><div></div><div></div><div></div></div></span>
}

let mapStateToProps = (state) => {
  return {
 }
}
let mapDispatchToProps = {
  onChangeUserSawThunk
}
  
  const LogsCount = connect(mapStateToProps, mapDispatchToProps)(rawMarkAsRead);

export default LogsCount;