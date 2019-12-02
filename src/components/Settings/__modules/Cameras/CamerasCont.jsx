import {addCamCreator, addRegCreator, addObjCreator} from "../../../redux/cameras-reducer";
import Cameras from "./Cameras";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
            objects: state.cameras.settings.objects,
            cameras: state.cameras.settings.cameras,
            registrators: state.cameras.settings.registrators,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addCam: (obj) => {
            dispatch(addCamCreator(obj));
        },
        addReg: (obj) => {
            dispatch(addRegCreator(obj));
        },
        addObj: (obj) => {
            dispatch(addObjCreator(obj));
        }
    }
}

const CamerasCont = connect(mapStateToProps, mapDispatchToProps)(Cameras);

export default CamerasCont;