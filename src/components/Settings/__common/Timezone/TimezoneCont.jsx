import {updateTimezoneActionThunk, delTimezoneActionCreator, addTimezoneActionCreator} from "../../../redux/timezone-settings-reducer";
import Timezone from "./Timezone";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        ntp_servers: state.timezone.ntp_servers
    }
}
let mapDispatchToProps = {
    updateTimezoneActionThunk,
    delTimezoneActionCreator,
    addTimezoneActionCreator
}

const TimezoneCont = connect(mapStateToProps, mapDispatchToProps)(Timezone);

export default TimezoneCont;