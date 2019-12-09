import  {getCameras} from "../../../components/redux/cameras-reducer";
import {connect} from "react-redux";
import React from 'react';
import __cameras from './__cameras'

class rawCameras extends React.Component {
    componentDidMount() {
        console.log('camlogsmount')
        this.props.getCameras({"need": "logs"});
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <__cameras 
            logs={this.props.logs} 
        />
    }
}

let mapStateToProps = (state) => {
    return {
        logs: state.cameras.logs
    }
}
let mapDispatchToProps = {
    getCameras
}

const CamerasLogs = connect(mapStateToProps, mapDispatchToProps)(rawCameras);

export default CamerasLogs;