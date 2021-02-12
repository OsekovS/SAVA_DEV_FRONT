import React from 'react';
import './Header.scss';
import {compose} from 'redux'
import __UserPanel from './__UserPanel/__UserPanel';
import __Ref from './__Ref/__Ref';
import {connect} from "react-redux";
import {withAuthRedirect} from '../utils/HOCs/AutoRedirect/AutoRedirect'
import Navbar from '../Navbar/Navbar'
import DiskInfoPanel from './DiskInfoPanel/DiskInfoPanelCont'
class rawHeader extends React.Component{
    
    render() {

        return <><header className="Header">
        <img className="header__logo" src={require("./header__logo.PNG")} atl="Наш логотип"></img>
        <DiskInfoPanel/>
        <div className="Header__infoPanel">
            <__UserPanel briefUserInfo={this.props.briefUserInfo}/>
            {/* <__Ref></__Ref> */}
        </div>    
        </header>
        <Navbar></Navbar>
        </>
    }
}


let mapStateToProps = (state) => {
    return {
        briefUserInfo: state.auth.briefUserInfo
    }
  }
  
let mapDispatchToProps = {

}
const Header = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(rawHeader)
  

export default Header;