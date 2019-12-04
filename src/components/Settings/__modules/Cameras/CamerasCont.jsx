import {addCamCreator, addRegCreator, addObjCreator ,delCamCreator, delRegCreator, delObjCreator, changeModeCreator} from "../../../redux/cameras-reducer";
import Cameras from "./Cameras";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
            objects: state.cameras.settings.objects,
            cameras: state.cameras.settings.cameras,
            registrators: state.cameras.settings.registrators,
            mode: state.cameras.settings.mode
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addCam: (obj) => {
            dispatch(addCamCreator(obj));
        },
        delCam: (id) => {
            dispatch(delCamCreator(id));
        },
        addReg: (obj) => {
            dispatch(addRegCreator(obj));
        },
        delReg: (id) => {
            dispatch(delRegCreator(id));
        },
        addObj: (obj) => {
            dispatch(addObjCreator(obj));
        },
        delObj: (id) => {
            dispatch(delObjCreator(id));
        },
        changeMode: (mode) => {
            dispatch(changeModeCreator(mode));
        },
    }
}

const CamerasCont = connect(mapStateToProps, mapDispatchToProps)(Cameras);

export default CamerasCont;