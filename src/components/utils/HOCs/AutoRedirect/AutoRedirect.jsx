import React from 'react'
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import {checkCookies} from '../../../redux/auth-reducer'
let mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
  }
  
export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component{
        componentDidMount() {
            this.props.checkCookies()
            // console.log("fBlood") 
        }
        render() {
            // console.log(this.props)
            if(!this.props.auth.isAuth) {return <Redirect to = "/login" />}
            // console.log('COmponent')
            return <Component {...this.props} />
        }
    }
    let mapDispatchToProps = {
        checkCookies
      }
    const connectedWithAuthRedirect = (connect(mapStateToProps,mapDispatchToProps)(RedirectComponent));

    return connectedWithAuthRedirect
}