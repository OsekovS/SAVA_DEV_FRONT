import React from 'react';
import {connect} from "react-redux";
import {onChangeUserSawThunk}  from "../../../../redux/auth-reducer";
import './MarkAsRead.scss'

class rawMarkAsRead extends React.Component {
  constructor(props) {
      super(props);
      // let {indexName,dbName,modules} = props
      let checkedEvents = []
      // Object.keys(modules[dbName].indexes[indexName].logsCount).forEach(element => {
      //   checkedEvents[element.key] = false
      // });
      this.state = {
        isCollbased: true,
        checkedEvents
            }
      //в состоянии хранится значение нашего фильтра по "главному" полю
      //остальные отправляются в фильтр
      // if(this.props.uploads.uploads){
      //   this.intervalId = setInterval(()=>{this.props.getAcs(this.props.id,this.props.indexName,this.props.dbName)},
      //   this.props.uploads.timeKind*this.props.uploads.timeNum);
      // }
      this.changeCheckedList = this.changeCheckedList.bind(this)
  }
  changeCheckedList(key,e){
    let checked = e.target.checked
    this.setState((state)=>{ 
      const stateCopy = {...state}
      
      let index = state.checkedEvents.indexOf(key)
      console.log(index)
      if(index===-1) 
      stateCopy.checkedEvents = [...state.checkedEvents,key]
      else stateCopy.checkedEvents = state.checkedEvents.filter(element => {
          return  element !== key
      });
      return stateCopy
    });
  }
  //
  render() {  
    
    let {display,id,indexName,onChangeUserSawThunk,dbName,modules} = this.props, {isCollbased,checkedEvents} = this.state, eventsList = [],
    logsCount = modules[dbName].indexes[indexName].logsCount
    // console.log(checkedEvents)
    let list = Object.keys(logsCount)
    list.forEach(key => {
        const event = logsCount[key]//<span  className={'label'+'_'+event.style}></span>
        if(event.doc_count>0)
      eventsList.push(<li ><p>{event.key} ({event.doc_count>999?'999+':event.doc_count} c {event.lastTime})</p> <input onChange={(e)=>{this.changeCheckedList(event.key,e);e.stopPropagation();e.nativeEvent.stopImmediatePropagation();}} type="checkbox"/></li>) 
    });
    return <span className='MarkAsRead' onClick={(e)=>{if(e.target.className=='MarkAsRead'||e.target.tagName=='IMG')this.setState({ isCollbased: !isCollbased })}}>Отметить как прочитанные<img   src={require('./pointing.svg')}></img>
        {isCollbased?null:<div><ul>
          {eventsList}
        </ul>
        <button onClick={()=>{onChangeUserSawThunk(indexName,id,dbName,checkedEvents);this.setState({ isCollbased: !isCollbased })}}>Отправить <img   src={require('./horizArrow.svg')}></img></button>
          </div>}
      </span>
  
  }
}

// const rawMarkAsRead = ({display,id,indexName,onChangeUserSawThunk,dbName}) => {
//   if(display==='wait') return <span className='markAsRead__wait' onClick={()=>onChangeUserSawThunk(indexName,id,dbName)}>Отметить как прочитанные<img   src={require('./icon.svg')}></img></span>
//   else return <span >Отметить как прочитанные<div class="lds-ring"><div></div><div></div><div></div><div></div></div></span>
// }

let mapStateToProps = (state) => {
  return {
    modules:state.auth.briefUserInfo.modules
 }
}
let mapDispatchToProps = {
  onChangeUserSawThunk
}
  
  const LogsCount = connect(mapStateToProps, mapDispatchToProps)(rawMarkAsRead);

export default LogsCount;