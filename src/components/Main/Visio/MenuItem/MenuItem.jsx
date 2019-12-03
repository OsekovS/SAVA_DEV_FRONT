import React from 'react';
import './MenuItem.scss';
import {changeLinkCreator} from '../../../redux/nav-bar-reducer'
import {connect} from "react-redux";

const rawMainMenuItem = (props) => {

    const onClick = (to) => {
        props.changeLink(to)
    }

    return <div className="Common__mainMenuItem" onClick={onClick.bind(this,props.to)} >
    <header className="Common__header Common__header_grey"
        ><span>{props.head['text']}</span>
        <span>{props.head.events}</span>
        <span>{props.head.exceptions}</span>
        <span>{props.head.errors}</span>
        </header>

    <div>
        <pre>
        {props.body['text']}
        </pre>
    </div>
    </div>
}

let mapStateToProps = (state) => {
    return {
        
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        changeLink: (to) => {
            dispatch(changeLinkCreator(to));
        }
    }
}

const __mainMenuItem = connect(mapStateToProps, mapDispatchToProps)(rawMainMenuItem);


export default __mainMenuItem;