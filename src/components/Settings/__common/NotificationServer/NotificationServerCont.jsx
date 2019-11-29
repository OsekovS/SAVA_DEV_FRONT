import {updateActionCreator} from "../../../redux/notific-settings-reducer";
import NotificationServer from "./NotificationServer";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        from: state.notific.from,
        to: state.notific.to
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        updateSettings: (obj) => {
            dispatch(updateActionCreator(obj));
        },
    }
}

const NotificationServerCont = connect(mapStateToProps, mapDispatchToProps)(NotificationServer);

export default NotificationServerCont;