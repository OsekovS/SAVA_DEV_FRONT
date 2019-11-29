import {updateTimezoneActionCreator} from "../../../redux/timezone-settings-reducer";
import Timezone from "./Timezone";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        ntp_server1: state.timezone.ntp_server1,
        ntp_server2: state.timezone.ntp_server2,
        ntp_server3: state.timezone.ntp_server3,
        ntp_server4: state.timezone.ntp_server4,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        updateSettings: (obj) => {
            dispatch(updateTimezoneActionCreator(obj));
        }
    }
}

const TimezoneCont = connect(mapStateToProps, mapDispatchToProps)(Timezone);

export default TimezoneCont;