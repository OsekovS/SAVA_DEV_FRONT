import React from 'react';
import './__UserPanel.scss';

const __UserPanel = (props) => {
    return <div  className="Header__UserPanel">
        <img src={require("./user.png")} alt="Пользователь"></img>
        <span>{props.briefUserInfo.name}</span>
        {/* <span>{props.briefUserInfo.admin}</span> */}
        <button></button>
        </div>
}

export default __UserPanel;