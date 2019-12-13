import React from 'react';
import './__UserPanel.scss';

import {connect} from "react-redux";
import {logOut} from '../../redux/auth-reducer'
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

        }

    render(){
        if(this.state.opened){
            return <div onClick={this.handleClick} className="Header__UserPanel Header__UserPanel_opened" >
            <img width='45' height='45' src={require("./user.png")} alt="Пользователь"></img>
            <span >{this.props.briefUserInfo.name}</span>
            <div>
                <span>{this.props.briefUserInfo.admin}</span>
                <button className="Header__ButtDown"></button>
            </div>
            <button onClick={this.onLogOut}>Выйти</button>
        </div>
        }
        else{
            return <div onClick={this.handleClick}  className="Header__UserPanel">
                <img width='45' height='45' src={require("./user.png")} alt="Пользователь"></img>
                <span > {this.props.briefUserInfo.name}</span>
                <button className="Header__ButtDown"></button>
            </div>
        }
    }
}

let mapStateToProps = (state) => {
    return {

    }
}


let mapDispatchToProps ={
    logOut
}

const __UserPanel = connect(mapStateToProps, mapDispatchToProps)(rawUserPanel);

export default __UserPanel;