import React from 'react';
import './Header.scss';

import __AverEvents from './__AverEvents/__AverEvents';
import __UserPanel from './__UserPanel/__UserPanel';
import __Ref from './__Ref/__Ref';
import {connect} from "react-redux";
const rawHeader = (props) => {
    return <header className="Header">
        <img className="header__logo" src={require("./header__logo.PNG")} atl="Наш логотип"></img>
        <div className="Header__infoPanel">
            <__AverEvents allEvents={props.allEvents}/>
            <__UserPanel briefUserInfo={props.briefUserInfo}/>
            <__Ref></__Ref>
        </div>
    </header>
}

let mapStateToProps = (state) => {
    return {
        allEvents: state.allEvents.all
    }
  }
  
  let mapDispatchToProps = {
    
  }
  
  const Header = connect(mapStateToProps, mapDispatchToProps)(rawHeader);

export default Header;