import React from 'react';
// import s from './Header.module.css';
import './NavBar.scss';
import {NavLink} from 'react-router-dom'
const NavBar = (props) => {
    // console.log(props)
    return <span className="NavPanel">
        <NavLink to={process.env.PUBLIC_URL + '/'+props.navInfo[0].link}>{props.navInfo[0].text}</NavLink>
        </span>
}

export default NavBar;