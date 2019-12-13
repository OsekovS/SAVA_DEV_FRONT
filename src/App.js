import React from 'react'
import './App.scss'
import Header from './components/Header/Header'
import NavBar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import {getCookie} from './components/JS/core'
import {Visualization__cameras,Visualization__acs,Visualization__iss} from './components/Visualization/Visualization'
import {Settings__lic,Settings__modules,Settings__users,Settings__common} from './components/Settings/Settings'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from "react-redux";
import LoginForm from './components/loginForm/LoginForm'
class App extends React.Component {
 

  render() {
   
    
    // if(this.props.state.auth.isAuth)
    return (<div className='app-wrapper'>
    <Header />
    {/* <NavBar /> */}
    <Route exact path='/' render={()=><Main    />}></Route>
    <Route path='/visualization cameras' render={()=><Visualization__cameras  />}></Route>
    <Route path='/visualization acs' render={()=><Visualization__acs  />}></Route>
    <Route path='/visualization iss' render={()=><Visualization__iss   />}></Route> 
    <Route path='/setting module acs' render={()=><Settings__modules  />}></Route>
    <Route path='/setting users' render={()=><Settings__users />}></Route>
    <Route path='/setting common' render={()=><Settings__common  />}></Route>
    <Route path='/setting lic' render = { () =>  <Settings__lic />  }
      exactd       />
      <Route path='/login' render = { () =>  <LoginForm /> }></Route>
      
</div>)
// else return <Route><LoginForm /></Route>
  

}
}

export default App;