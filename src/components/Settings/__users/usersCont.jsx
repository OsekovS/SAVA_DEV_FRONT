import {addUseActionCreator} from "../../redux/users-reducer";
import __users from "./__users";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addUser: (obj) => {
            dispatch(addUseActionCreator(obj));
        }
    }
}

const usersCont = connect(mapStateToProps, mapDispatchToProps)(__users);

export default usersCont;