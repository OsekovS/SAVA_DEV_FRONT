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
  constructor(props){
    super(props)
    this.ReactModules = []
    this.Paths = {}
    //заполняем компонентами модулей массив
    // console.log(this.props.state.auth)
    // const modules = this.props.state.auth
    // console.log(modules)
    // if(modules!==undefined){
    //   for (const key in this.modules) {
    //     if (this.modules.hasOwnProperty(key)) {
    //       this.ReactModules.push(modules[key].react);
    //       this.Paths.push(modules[key].path)
    //     }
    //   }
    // }

  }
 
  // componentWillReceiveProps(neww){
  //   if(this.ReactModules.length===0&&neww.state.auth.briefUserInfo.modules!==undefined){
  //     const modules = neww.state.auth.briefUserInfo.modules
  //     // console.log(key)
  //       for (const key in modules) {
  //         // console.log(key)
  //         if (modules.hasOwnProperty(key)) {
  //           this.ReactModules.push(this.modules[key].react);
  //           this.Paths[key] = this.modules[key].path
  //           // console.log(this.modules[key].react)
  //           // console.log(this.modules[key].path)
  //         }
  //       }
  //       // console.log(this.ReactModules)
  //       console.log(this.Paths)
  //     }
  // }
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
  modules={
    cameras: {
      react: <Route path='/visualization cameras' render={()=><Visualization__cameras  />}></Route>,
      path: '/visualization cameras',
    },
    acs_castle_ep2: {
      react: <Route path='/visualization acs devicesLogs' render={()=><Visualization__acs dbName={'acs_castle_ep2'} />}></Route>,
      path: '/visualization acs devicesLogs',
    },
    iss: {
      react: <Route path='/visualization iss' render={()=><Visualization__iss   />}></Route>,
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