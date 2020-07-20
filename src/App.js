import React from 'react'
import './App.scss'
import Header from './components/Header/Header'
import NavBar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import {getCookie} from './components/JS/core'
import {Visualization__acs,Visualization__iss} from './components/Visualization/Visualization'
import {Settings__lic,Settings__modules,Settings__users,Settings__common,Settings__email} from './components/Settings/Settings'
import {BrowserRouter, Route} from 'react-router-dom'
import LoginForm from './components/loginForm/LoginForm'


class App extends React.Component {
  constructor(props){
    super(props)
    this.ReactModules = []
    this.Paths = {}
    this.sidebars = {}
  }
 

  // componentWillUpdate(neww){
  //   if(this.ReactModules.length===0&&neww.state.auth.briefUserInfo.modules!==undefined){
  //     const modules = neww.state.auth.briefUserInfo.modules
  //       for (const ModuleKey in modules) {
  //         if (modules.hasOwnProperty(ModuleKey)) {
  //           this.sidebars[ModuleKey]={}
  //           let indexes = modules[ModuleKey].indexes
  //           for (const IndexKey in indexes) {
  //             if (indexes.hasOwnProperty(IndexKey)) {
  //               let {sidebar} = indexes[IndexKey]
  //               this.sidebars[ModuleKey][IndexKey] = sidebar
  //               // sidebar={sidebars[ModuleKey]}
  //               this.ReactModules.push(
  //                 <Route path={sidebar.to} render={()=><Visualization__acs  indexes={indexes} dbName={ModuleKey} />}></Route>
  //               );
  //               if(!this.Paths[ModuleKey])this.Paths[ModuleKey]={}
  //               this.Paths[ModuleKey][IndexKey] = sidebar.to
  //             }
  //           }
  //         }
  //       }
  //     }
  //     console.log( this.sidebars)
  // }

  componentWillUpdate(neww){
    if(this.ReactModules.length===0&&neww.state.auth.briefUserInfo.modules!==undefined){
      const modules = neww.state.auth.briefUserInfo.modules,
      modulesName = {}
        for (const ModuleKey in modules) {
          if (modules.hasOwnProperty(ModuleKey)) {
            this.sidebars[ModuleKey]={}
            modulesName[ModuleKey]=this.props.state.auth.briefUserInfo.modules[ModuleKey].title
            let indexes = modules[ModuleKey].indexes
            for (const IndexKey in indexes) {
              if (indexes.hasOwnProperty(IndexKey)) {
                let {sidebar} = indexes[IndexKey]
                this.sidebars[ModuleKey][IndexKey] = sidebar
                if(!this.Paths[ModuleKey])this.Paths[ModuleKey]={}
                this.Paths[ModuleKey][IndexKey] = sidebar.to
              }
            }
          }
        }
        // console.log(modules)
        for (const ModuleKey in modules) {
          let indexes = modules[ModuleKey].indexes
            for (const IndexKey in indexes) {
              if (modules.hasOwnProperty(ModuleKey) && indexes.hasOwnProperty(IndexKey)) {
                let {sidebar} = indexes[IndexKey]
                this.ReactModules.push(
                  <Route path={sidebar.to} render={()=><Visualization__acs modules={modules} modulesName={modulesName}  indexes={indexes} dbName={ModuleKey} />}></Route>
                );
              }
            }
        }
      }
  }

  render() {
    let {modSidebar} = this.props.state, otherModules = null,
    isAdmin = this.props.state.auth.briefUserInfo.admin==='администратор'?true:false
    console.log(isAdmin)
    if(isAdmin) otherModules = <>
    {/* ЗДЕСЬ СИДЯТ МОДУЛЕЙ НАСТРОЙКИ */}
    {/* <Settings__modules  /> */}
      {/* <Route path='/setting module acs' render={()=><Settings__modules  />}></Route> */}
      <Route path='/setting users' render={()=><Settings__users />}></Route>
      <Route path='/setting common' render={()=><Settings__common  />}></Route>
      <Route path='/setting lic' render = { () =>  <Settings__lic />  } exactd/>
      <Route  path='/email alert' render = { () =>  <Settings__email/> }></Route>  
    </> 
        console.log(this.ReactModules)
    return (<div className='app-wrapper'>
    <Header />
    {this.ReactModules===undefined?null:this.ReactModules}

    {Object.keys(this.Paths).length===0?null:<Route exact path='/'   render={()=><Main sidebars={this.sidebars}  paths={this.Paths} isAdmin={isAdmin} />}></Route>}
    {otherModules}
    {/* <Route  path='/heap' render = { () =>  <Settings__email/> }></Route>  */}
    <Route path='/login' render = { () =>  <LoginForm /> }></Route>
</div>)
}
}

export default App;