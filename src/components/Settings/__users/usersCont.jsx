import {addUser, delUser, getUsers} from "../../redux/users-reducer";
import __users from "./__users";
import {connect} from "react-redux";
import React from 'react'
class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers();
        // console.log('!')
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            { this.props.isFetching ? <img src={require("../../Common/load.gif")} /> :  <__users 
                users={this.props.users} 
                addUser={this.props.addUser}
                delUser={this.props.delUser}/> }
           
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.users.users,
        isFetching: state.users.isFetching
    }
}
let mapDispatchToProps ={
        addUser,
        delUser,
        getUsers
}

const usersCont = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

export default usersCont;