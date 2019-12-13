import React from 'react';
import {connect} from "react-redux";
import './NavBar.scss';
import {NavLink} from 'react-router-dom'
import {changeLinkDirectCreator} from "../redux/nav-bar-reducer";
import {withAuthRedirect} from '../utils/HOCs/AutoRedirect/AutoRedirect'
import {compose} from "redux";
// rawNavBar
const rawNavBar = (props) => {
    const onClick = (to) => {
        props.changeLink(to)
    }
    let barString = props.navInfo.map((e,n,array) => {
        if(n<array.length-1)
        return <NavLink to={'/'+e.link}
        key={n.toString()}><span onClick={onClick.bind(this,e.link)}>/ {e.text}</span> </NavLink>
        else 
        return <NavLink to={'/'+e.link}
        key={n.toString()}><span >/ {e.text}</span> </NavLink>
    })
    // if(!props.auth.isAuth) return null
    return <p className="NavPanel">
        {barString}
        </p>
}

let mapStateToProps = (state) => {
    return {
        navInfo: state.navBar.state,
        // auth: state.auth
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        changeLink: (to) => {
            dispatch(changeLinkDirectCreator(to));
        }
    }
}
// let mapDispatchToProps = {
//     checkCookies
//   }
 const  NavBar = (connect(mapStateToProps,mapDispatchToProps)(rawNavBar));
// const NavBar = compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     withAuthRedirect
//     )(rawNavBar)

// const NavBar = connect(mapStateToProps, mapDispatchToProps)(rawNavBar);
export default NavBar;