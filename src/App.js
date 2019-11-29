import React from 'react'
import './App.scss'
import Header from './components/Header/Header'
import NavBar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import {getCookie} from './components/JS/core'
import {Visualization__cameras,Visualization__acs,Visualization__iss} from './components/Visualization/Visualization'
import {Settings__lic,Settings__modules,Settings__users,Settings__common} from './components/Settings/Settings'
import {BrowserRouter, Route} from 'react-router-dom'


// import Settings from './components/Settings/Settings';

const App = (props) => {
  
  // setCookie('dsffd', 'Jdsdfohn', {secure: true, 'max-age': 3600}); 
  return (
    <div className='app-wrapper'>
      <Header allEvents={props.state.headerInfo.allEvents}
      briefUserInfo={props.state.headerInfo.briefUserInfo}/>
       <NavBar navInfo={props.state.navBar.state}/>
       
      <Route path='/main' render={()=><Main 
      cameras={props.state.allEvents.cameras}
      acs={props.state.allEvents.acs}
      iss={props.state.allEvents.iss}
      />}></Route>
      <Route path='/visualization/cameras' render={()=><Visualization__cameras 
      logs={props.state.cameras.logs} />}></Route>
      <Route path='/visualization/acss' render={()=><Visualization__acs 
      logs={props.state.acs.logs} />}></Route>
      <Route path='/visualization/iss' render={()=><Visualization__iss 
      logs={props.state.iss.logs} />}></Route> 
      <Route path='/settings/modules' render={()=><Settings__modules 
      
      acs={props.state.acs.settings} 
      iss={props.state.iss.settings} />}></Route>
      <Route path='/settings/users' render={()=><Settings__users 
       />}></Route>
      <Route path='/settings/common' render={()=><Settings__common 
      common={props.state.net}
      notific={props.state.notific}
      timezone={props.state.timezone}
      dispatch={props.dispatch}
      />}></Route>
      <Route path='/settings/lic' render = { () =>  <Settings__lic lic = {props.state.lic}/>  }
        exactd       />
    </div>
  )
}

export default App;