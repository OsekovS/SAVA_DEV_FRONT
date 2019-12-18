import {   delFieldThunk, changeElemThunk,
     getCameras, addFieldThunk} from "../../../redux/cameras-reducer";
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
            delFieldThunk = {this.props.delFieldThunk}
            addFieldThunk = {this.props.addFieldThunk}
            changeElemThunk ={this.props.changeElemThunk}
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
        delFieldThunk,
        getCameras,
        addFieldThunk,
        changeElemThunk
}



const CamerasCont = connect(mapStateToProps, mapDispatchToProps)(rawCameras);

export default CamerasCont;