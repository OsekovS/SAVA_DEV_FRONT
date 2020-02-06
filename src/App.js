import React from 'react'
import './App.scss'
import Header from './components/Header/Header'
import NavBar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import {getCookie} from './components/JS/core'
import {Visualization__acs,Visualization__iss} from './components/Visualization/Visualization'
import {Settings__lic,Settings__modules,Settings__users,Settings__common} from './components/Settings/Settings'
import {BrowserRouter, Route} from 'react-router-dom'
import LoginForm from './components/loginForm/LoginForm'



class App extends React.Component {
  constructor(props){
    super(props)
    this.ReactModules = []
    this.Paths = {}
    this.sidebars = {}
  }
 

  componentWillUpdate(neww){
    if(this.ReactModules.length===0&&neww.state.auth.briefUserInfo.modules!==undefined){
      const modules = neww.state.auth.briefUserInfo.modules
      // let sidebars = {}
      // dashboards
      // console.log(key)
      console.log(this.props)
        for (const ModuleKey in modules) {
          if (modules.hasOwnProperty(ModuleKey)) {
            this.sidebars[ModuleKey]={}
            let indexes = modules[ModuleKey].indexes
            for (const IndexKey in indexes) {
              if (indexes.hasOwnProperty(IndexKey)) {
                let {sidebar} = indexes[IndexKey]
                this.sidebars[ModuleKey][IndexKey] = sidebar
                // sidebar={sidebars[ModuleKey]}
                this.ReactModules.push(
                  <Route path={sidebar.to} render={()=><Visualization__acs  indexes={indexes} dbName={ModuleKey} />}></Route>
                );
                if(!this.Paths[ModuleKey])this.Paths[ModuleKey]={}
                this.Paths[ModuleKey][IndexKey] = sidebar.to
              }
            }
          }
        }

        
        // updateSidebar('dashboards',sidebars)
        // console.log(key)
        console.log(this.ReactModules)
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
    {Object.keys(this.Paths).length===0?null:<Route exact path='/' render={()=><Main sidebars={this.sidebars}  paths={this.Paths}  />}></Route>}
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