import {addCam, addReg, addObj,
    delCam, delReg, delObj, 
    changeMode, getCameras} from "../../../redux/cameras-reducer";
import Cameras from "./Cameras";
import {connect} from "react-redux";
import React from 'react'

class rawCameras extends React.Component {
    componentDidMount() {
        this.props.getCameras({"need": "settings"});
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <Cameras 
            mode={this.props.mode} 
            objects={this.props.objects}
            cameras={this.props.cameras}
            registrators={this.props.registrators}
            addCam = {this.props.addCam}
            delCam = {this.props.delCam}
            addReg = {this.props.addReg}
            delReg = {this.props.delReg}
            addObj = {this.props.addObj}
            delObj = {this.props.delObj}
            changeMode = {this.props.changeMode}
        />
    }
}


let mapStateToProps = (state) => {
    return {
            objects: state.cameras.settings.objects,
            cameras: state.cameras.settings.cameras,
            registrators: state.cameras.settings.registrators,
            mode: state.cameras.settings.mode,


    }
}
let mapDispatchToProps =  {
        addCam,
        delCam,
        addReg,
        delReg,
        addObj,
        delObj,
        changeMode,
        getCameras
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         addCam: (obj) => {
//             dispatch(addCamCreator(obj));
//         },
//         delCam: (id) => {
//             dispatch(delCamCreator(id));
//         },
//         addReg: (obj) => {
//             dispatch(addRegCreator(obj));
//         },
//         delReg: (id) => {
//             dispatch(delRegCreator(id));
//         },
//         addObj: (obj) => {
//             dispatch(addObjCreator(obj));
//         },
//         delObj: (id) => {
//             dispatch(delObjCreator(id));
//         },
//         changeMode: (mode) => {
//             dispatch(changeModeCreator(mode));
//         },
//         getCameras
//     }
// }


const CamerasCont = connect(mapStateToProps, mapDispatchToProps)(rawCameras);

export default CamerasCont;