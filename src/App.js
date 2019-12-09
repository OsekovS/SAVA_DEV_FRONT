import React from 'react'
import './App.scss'
import Header from './components/Header/Header'
import NavBar from './components/Navbar/Navbar'
import Main from './components/Main/Main'
import {getCookie} from './components/JS/core'
import {Visualization__cameras,Visualization__acs,Visualization__iss} from './components/Visualization/Visualization'
import {Settings__lic,Settings__modules,Settings__users,Settings__common} from './components/Settings/Settings'
import {BrowserRouter, Route} from 'react-router-dom'
import * as axios from 'axios'


class App extends React.Component {
  componentDidMount() {
      console.log('APP')
      // this.props.getIss({"need": "settings"});
  }

  getStarterPack(){

        let starterPack = axios.get("starter-pack.php").then(response => {
          let json = JSON.parse(response);
          // dispatch(uploadIss(json));
      }).catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
      
      
  }

  render() {
      return <div className='app-wrapper'>
                  <Header allEvents={this.props.state.headerInfo.allEvents}
                  briefUserInfo={this.props.state.headerInfo.briefUserInfo}/>
                  <NavBar />
                  <Route exact path='/' render={()=><Main  cameras={this.props.state.allEvents.cameras}
                  acs={this.props.state.allEvents.acs} iss={this.props.state.allEvents.iss}  />}></Route>
                  <Route path='/visualization cameras' render={()=><Visualization__cameras  logs={this.props.state.cameras.logs} />}></Route>
                  <Route path='/visualization acs' render={()=><Visualization__acs  logs={this.props.state.acs.logs} />}></Route>
                  <Route path='/visualization iss' render={()=><Visualization__iss  logs={this.props.state.iss.logs} />}></Route> 
                  <Route path='/setting module acs' render={()=><Settings__modules acs={this.props.state.acs.settings} iss={this.props.state.iss.settings} />}></Route>
                  <Route path='/setting users' render={()=><Settings__users />}></Route>
                  <Route path='/setting common' render={()=><Settings__common common={this.props.state.net} notific={this.props.state.notific}
                  timezone={this.props.state.timezone}  dispatch={this.props.dispatch}  />}></Route>
                  <Route path='/setting lic' render = { () =>  <Settings__lic lic = {this.props.state.lic}/>  }
                    exactd       />
              </div>
  }
}

// const App = (props) => {
  
//   // setCookie('dsffd', 'Jdsdfohn', {secure: true, 'max-age': 3600}); 
//   return (
//     <div className='app-wrapper'>
//       <Header allEvents={props.state.headerInfo.allEvents}
//       briefUserInfo={props.state.headerInfo.briefUserInfo}/>
//        <NavBar />
//       <Route exact path='/' render={()=><Main  cameras={props.state.allEvents.cameras}
//       acs={props.state.allEvents.acs} iss={props.state.allEvents.iss}  />}></Route>
//       <Route path='/visualization cameras' render={()=><Visualization__cameras  logs={props.state.cameras.logs} />}></Route>
//       <Route path='/visualization acs' render={()=><Visualization__acs  logs={props.state.acs.logs} />}></Route>
//       <Route path='/visualization iss' render={()=><Visualization__iss  logs={props.state.iss.logs} />}></Route> 
//       <Route path='/setting module acs' render={()=><Settings__modules acs={props.state.acs.settings} iss={props.state.iss.settings} />}></Route>
//       <Route path='/setting users' render={()=><Settings__users />}></Route>
//       <Route path='/setting common' render={()=><Settings__common common={props.state.net} notific={props.state.notific}
//       timezone={props.state.timezone}  dispatch={props.dispatch}  />}></Route>
//       <Route path='/setting lic' render = { () =>  <Settings__lic lic = {props.state.lic}/>  }
//         exactd       />
//     </div>
//   )
// }

export default App;