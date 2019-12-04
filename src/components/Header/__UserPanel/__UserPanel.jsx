import React from 'react';
import './__UserPanel.scss';

const __UserPanel = (props) => {
    let onClick = () => {

    }

    return <div  className="Header__UserPanel" onClick>
        <img src={require("./user.png")} alt="Пользователь"></img>
        <span>{props.briefUserInfo.name}</span>
        {/* <span>{props.briefUserInfo.admin}</span> */}
        <button></button>
        </div>
}

export default __UserPanel;