import React from 'react'
import App from './App'
import {getCookie} from './components/JS/core'
import {connect} from "react-redux";
class rawAppCont extends React.Component {
    componentDidMount() {
        // this.props.getUsersThunk();
        // console.log('!')
    }

    render() {
        return  <App state={this.props.state} dispatch={this.props.dispatch} store={this.props.store}/>
             }

}

let mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
let mapDispatchToProps ={
     
}

const AppCont = connect(mapStateToProps, mapDispatchToProps)(rawAppCont);

export default AppCont;