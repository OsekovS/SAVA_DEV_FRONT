import {changeSideBarCreator,uploadSidebar} from "../redux/mod-sidebar-reducer";
import {changeLinkCreator} from '../redux/nav-bar-reducer'
import {connect} from "react-redux";
import rawSidebar from "./Sidebar";

let mapStateToProps = (state) => {
    return {state: state.modSidebar.dashboards}
}

let mapDispatchToProps = {
    changeSideBarCreator,
    changeLinkCreator,
    uploadSidebar
}
const Sidebar = connect(mapStateToProps, mapDispatchToProps)(rawSidebar);

export default Sidebar;