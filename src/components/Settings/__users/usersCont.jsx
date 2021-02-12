import {addUserThunk, delUserThunk, getUsersThunk, changePassThunk} from "../../redux/users-reducer";
import __users from "./__users";
import {connect} from "react-redux";
import React from 'react'
class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunk();
        // console.log('!')
    }
    // users={this.props.users} 
    // addUserThunk={this.props.addUserThunk}
    // delUserThunk={this.props.delUserThunk}
    // changePassThunk={this.props.changePassThunk}
    render() {
        return  <__users {...this.props}/>
             }

}

let mapStateToProps = (state) => {
    return {
        users: state.users.users,
        isFetching: state.users.isFetching,
        modules: state.auth.briefUserInfo.modules,
        modulesTranslate: state.auth.modulesTranslate,
        isAdmin: state.auth.briefUserInfo.admin
    }
}
let mapDispatchToProps ={
        addUserThunk,
        delUserThunk,
        getUsersThunk,
        changePassThunk
}

const usersCont = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

export default usersCont;