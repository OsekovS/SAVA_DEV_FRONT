import {updateNetActionCreator} from "../../../redux/net-settings-reducer";
import Net from "./Net";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        ip: state.net.ip,
        mask: state.net.mask,
        gw: state.net.gw
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        updateNetSetting: (obj) => {
           
            dispatch(updateNetActionCreator(obj));
        },
    }
}

const NetCont = connect(mapStateToProps, mapDispatchToProps)(Net);

export default NetCont;