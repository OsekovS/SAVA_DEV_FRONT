import {addUserThunk, delUserThunk, getUsersThunk, changePassThunk} from "../../redux/users-reducer";
import __users from "./__users";
import {connect} from "react-redux";
import React from 'react'
class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunk();
        // console.log('!')
    }

    render() {
        return  <__users 
                users={this.props.users} 
                addUserThunk={this.props.addUserThunk}
                delUserThunk={this.props.delUserThunk}
                changePassThunk={this.props.changePassThunk}/>
             }

}

let mapStateToProps = (state) => {
    return {
        users: state.users.users,
        isFetching: state.users.isFetching,
        // mode: state.users.mode
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