import {addUser, delUser} from "../../redux/users-reducer";
import __users from "./__users";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
let mapDispatchToProps ={
        addUser,
        delUser
}

const usersCont = connect(mapStateToProps, mapDispatchToProps)(__users);

export default usersCont;