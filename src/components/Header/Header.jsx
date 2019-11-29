import React from 'react';
import './Header.scss';

import __AverEvents from './__AverEvents/__AverEvents';
import __UserPanel from './__UserPanel/__UserPanel';
import __Ref from './__Ref/__Ref';

const Header = (props) => {
    return <header className="Header">
        <img className="header__logo" src={require("./header__logo.PNG")} atl="Наш логотип"></img>
        <div className="Header__infoPanel">
            <__AverEvents allEvents={props.allEvents}/>
            <__UserPanel briefUserInfo={props.briefUserInfo}/>
            <__Ref></__Ref>
        </div>
    </header>
}

export default Header;