import React from 'react'
import {Redirect} from "react-router-dom"
import {connect} from "react-redux";
import {checkCookies} from '../../../redux/auth-reducer'

  
export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component{
        componentDidMount() {
            // console.log('!')
            this.props.checkCookies()
            // console.log("fBlood") 
        }
        componentWillReceiveProps(newprops){
            // console.log(newprops.lic.remained)
            // console.log(this.props.lic.remained)
            // console.log(newprops.lic.remained!==this.props.lic.remained)
            // console.log(newprops.lic.remained==0)
            if(newprops.lic.remained!==this.props.lic.remained&&newprops.lic.remained===0) {
                console.log(':)')
                this.intervalId = setInterval(()=>{alert('Внимание! срок действия лицензии истек '+newprops.lic.lic_end)},90000);
            }
            
        }
        render() {
            // if(this.props.auth.isAuth==null) {return <div></div>}
            if(!this.props.auth.isAuth) {return <Redirect to = "/login" />}
            // console.log('COmponent')
            return <Component {...this.props} />
        }
    }
    let mapStateToProps = (state) => {
        return {
            auth: state.auth,
            lic: state.lic
        }
    }
    let mapDispatchToProps = {
        checkCookies
      }
    const connectedWithAuthRedirect = (connect(mapStateToProps,mapDispatchToProps)(RedirectComponent));

    return connectedWithAuthRedirect
}