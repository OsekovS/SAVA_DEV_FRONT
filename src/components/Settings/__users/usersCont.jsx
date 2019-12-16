import {addUserThunk, delUserThunk, getUsersThunk} from "../../redux/users-reducer";
import __users from "./__users";
import {connect} from "react-redux";
import React from 'react'
class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunk();
        // console.log('!')
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return  <__users 
                users={this.props.users} 
                addUserThunk={this.props.addUserThunk}
                delUserThunk={this.props.delUserThunk}/>
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
        // changeMode
}

const usersCont = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

export default usersCont;