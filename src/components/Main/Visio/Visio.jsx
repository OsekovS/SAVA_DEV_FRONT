import React from 'react';
import __mainMenuItem from './MenuItem/MenuItem'
import __header from '../../Common/__header/__header'
import  {getLogsCountThumk} from "../../redux/auth-reducer";
import {connect} from "react-redux";
// import {NavLink} from 'react-router-dom'
import './Visio.scss';
import { checkPropTypes } from 'prop-types';

class Visio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isCollapsed: true      
        }
    }
    componentDidMount() {
        this.intervalId = setInterval(()=>{
            return (this.state.isCollapsed?null:this.props.getLogsCountThumk())
        }, 5000);
          // this.props.getLogsCountThumk();
      }
    render() {
    let props = this.props
    // console.log(props)
    //||Object.keys(props.paths).length===0
    const MenuItems = props.modules===undefined?null:Object.keys(props.modules).map(key => {
        return  <li>
                    {/* <NavLink to={props.paths[key]}> */}
                    <__mainMenuItem 
                        sidebar={props.sidebars[key]}
                        settings={props.modules[key].settings}
                        dbName={key}
                        head={
                            {
                                text: props.modules[key].title, 
                            }
                        } 
                        loaded={props.modules[key].loaded}
                        indexes={props.modules[key].indexes}
                        to={props.paths[key]}/>
                    {/* </NavLink> */}
                </li>
    });

    return <div className="Visio">
        {/* <__header text={"Визуализация"} clazz="Common__header Common__header_red"/> */}
        <header className={"Common__header Common__header_red Common__header_main"}
        onClick={()=>{this.setState({isCollapsed: !this.state.isCollapsed})}} >        
            <div data-title="визуализация по модулям" className='comment'>
                <span>Визуализация</span>
            </div>
            <img className={'collapser'} src={require("../../img/openForHeader.svg")}></img>
        </header>
        {this.state.isCollapsed? null :
            <ul>
                {MenuItems}
            </ul>
        }
    </div>
}}

let mapStateToProps = (state) => {
    return {
    //   sidebar: state.modSidebar,
    //   modules: state.auth.briefUserInfo.modules
    }
  }
  
  let mapDispatchToProps = {
    getLogsCountThumk
  }
  
  const exportedVisio = connect(mapStateToProps,mapDispatchToProps)(Visio);

export default exportedVisio;

// dbName: "iss"
// head: {text: "SAVA СЗИ «SNS»"}
// indexes: {sns_event: {…}}
// loaded: false
// settings: {sidebar: {…}, Tabels: Array(2)}
// sidebar: {sns_event:
//     active: false
//     text: "Журналы станций"
//     to: "/visualization iss"
// }
// to: {sns_event: "/visualization iss"}