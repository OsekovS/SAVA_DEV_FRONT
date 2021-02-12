import React from 'react';
import './__UserPanel.scss';

import {connect} from "react-redux";
import {logOut} from '../../redux/auth-reducer'
import {clearDash} from '../../redux/dashboards-reducer'
class rawUserPanel extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {opened: false}
    
        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleClick = this.handleClick.bind(this);
        this.onLogOut = this.onLogOut.bind(this);
      }
        handleClick() {
            this.setState(state => ({
                opened: !state.opened
            }));
          }
  
        onLogOut = () => {

            this.props.logOut()
            this.props.clearDash()
        }

    render(){
        if(this.state.opened){
            return <div onClick={this.handleClick} className="Header__UserPanel Header__UserPanel_opened" >
            <img width='36' height='36' src={require("./user.png")} alt="Пользователь"></img>
            <span >{this.props.briefUserInfo.name}</span>
            <div>
                <span>{this.props.briefUserInfo.admin}</span>
                <button className="Header__Butt Header__Butt_Up"></button>
            </div>
            <span className="Header__Exit" onClick={this.onLogOut}>Выйти<img  src={require("./logout.svg")} alt="Выйти"></img></span>
        </div>
        }
        else{
            return <div onClick={this.handleClick}  className="Header__UserPanel comment"  data-title="выход">
                <img width='36' height='36' src={require("./user.png")} alt="Пользователь"></img>
                <span > {this.props.briefUserInfo.name}</span>
                <button className="Header__Butt Header__Butt_Down"></button>
            </div>
        }
    }
}

let mapStateToProps = (state) => {
    return {

    }
}


let mapDispatchToProps ={
    logOut,
    clearDash
}

const __UserPanel = connect(mapStateToProps, mapDispatchToProps)(rawUserPanel);

export default __UserPanel;