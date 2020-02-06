import React from 'react'
import './App.scss'
import Header from './components/Header/Header'
import NavBar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import {getCookie} from './components/JS/core'
import {Visualization__acs,Visualization__iss} from './components/Visualization/Visualization'
import {Settings__lic,Settings__modules,Settings__users,Settings__common} from './components/Settings/Settings'
import {BrowserRouter, Route} from 'react-router-dom'
import {connect} from "react-redux";
import LoginForm from './components/loginForm/LoginForm'
class App extends React.Component {
  constructor(props){
    super(props)
    this.ReactModules = []
    this.Paths = {}

  }
 

  componentWillUpdate(neww){
    if(this.ReactModules.length===0&&neww.state.auth.briefUserInfo.modules!==undefined){
      const modules = neww.state.auth.briefUserInfo.modules
      // console.log(key)
        for (const key in modules) {
          // console.log(key)
          if (modules.hasOwnProperty(key)) {
            this.ReactModules.push(this.modules[key].react);
            this.Paths[key] = this.modules[key].path
            // console.log(this.modules[key].react)
            // console.log(this.modules[key].path)
          }
        }
        // console.log(this.ReactModules)
        console.log(this.Paths)
      }
  }
  // sidebar={this.props.state.modSidebar.dashboards['iss']} sidebar={this.props.state.modSidebar.dashboards['acs']}
  modules={
    cameras: {
      react: <Route path='/visualization cameras' render={()=><Visualization__acs  />}></Route>,
      path: '/visualization cameras',
    },
    acs_castle_ep2: {
      react: <Route path='/visualization acs devicesLogs' render={()=><Visualization__acs sidebar={this.props.state.briefUserInfo.modules['acs']} indexes={this.props.state.auth.briefUserInfo.modules['acs_castle_ep2'].indexes} dbName={'acs_castle_ep2'} />}></Route>,
      path: '/visualization acs devicesLogs',
    },
    iss: {
      react: <Route path='/visualization iss' render={()=><Visualization__iss sidebar={this.props.state.modSidebar.dashboards['iss']}  indexes={this.props.state.auth.briefUserInfo.modules['iss'].indexes} dbName={'iss'} />}></Route>,
      path: '/visualization iss',
    }
  }

  render() {
 
    return (<div className='app-wrapper'>
    <Header />
    {this.ReactModules===undefined?null:this.ReactModules}
    {Object.keys(this.Paths).length===0?null:<Route exact path='/' render={()=><Main  paths={this.Paths}  />}></Route>}
    <Route path='/setting module acs' render={()=><Settings__modules  />}></Route>
    <Route path='/setting users' render={()=><Settings__users />}></Route>
    <Route path='/setting common' render={()=><Settings__common  />}></Route>
    <Route path='/setting lic' render = { () =>  <Settings__lic />  } exactd       />
    <Route path='/login' render = { () =>  <LoginForm /> }></Route>
      
</div>)
// else return <Route><LoginForm /></Route>
  

}
}

export default App;