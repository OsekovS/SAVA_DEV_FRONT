// import {   delFieldThunk, changeElemThunk,
//      getCameras, addFieldThunk} from "../../../redux/cameras-reducer";
// import Cameras from "./Cameras";
import {connect} from "react-redux";
import React from 'react'
import SettingsTables from './SettingsTables'
// class SidebarSettings extends React.Component {
//     componentDidMount() {
//         // this.props.getCameras({"need": "settings"});
//     }

//     render() {
//         console.log(this.props)
//         return <></>
//     }
//     // render() {
//     //     return <Cameras 
//     //         mode={this.props.mode} 
//     //         objects={this.props.objects}
//     //         cameras={this.props.cameras}
//     //         registrators={this.props.registrators}
//     //         delFieldThunk = {this.props.delFieldThunk}
//     //         addFieldThunk = {this.props.addFieldThunk}
//     //         changeElemThunk ={this.props.changeElemThunk}
//     //     />
//     // }
// }


let mapStateToProps = (state) => {
    return {
        
        // objects: state.cameras.settings.objects,
        // cameras: state.cameras.settings.cameras,
        // registrators: state.cameras.settings.registrators,
        // mode: state.cameras.settings.mode,
    }
}
let mapDispatchToProps =  {
    // delFieldThunk,
    // getCameras,
    // addFieldThunk,
    // changeElemThunk
}



const SidebarSettingsCont = connect(mapStateToProps, mapDispatchToProps)(SettingsTables);

export default SidebarSettingsCont;