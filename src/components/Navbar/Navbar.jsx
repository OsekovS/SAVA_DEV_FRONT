import React from 'react';
import {connect} from "react-redux";
import './NavBar.scss';
import {NavLink} from 'react-router-dom'
import {changeLinkDirectCreator} from "../redux/nav-bar-reducer";

// onClick={e => {
//     e.preventDefault()
//     onClick.bind(this,e.link)
// }}

const rawNavBar = (props) => {
    const onClick = (to) => {
        props.changeLink(to)
    }
    let barString = props.navInfo.map((e,n,array) => {
        if(n<array.length-1)
        return <NavLink to={process.env.PUBLIC_URL + '/'+e.link}
        key={n.toString()}><span onClick={onClick.bind(this,e.link)}>/ {e.text}</span> </NavLink>
        else 
        return <NavLink to={process.env.PUBLIC_URL + '/'+e.link}
        key={n.toString()}><span >/ {e.text}</span> </NavLink>
    })
    return <p className="NavPanel">
        {barString}
        </p>
}

let mapStateToProps = (state) => {
    return {
        navInfo: state.navBar.state
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        changeLink: (to) => {
            dispatch(changeLinkDirectCreator(to));
        }
    }
}

const NavBar = connect(mapStateToProps, mapDispatchToProps)(rawNavBar);
export default NavBar;