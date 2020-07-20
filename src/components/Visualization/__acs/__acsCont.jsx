import  {getDashboardsThunk} from "../../../components/redux/dashboards-reducer";
import {connect} from "react-redux";
import __acs from './__acs'


let mapStateToProps = (state) => {
    return {
        dashboards: state.dashboards,
        paths: state.paths,
        sidebar: state.modSidebar
    }
}
let mapDispatchToProps = {
    getDashboardsThunk
}

const AcsLogs = connect(mapStateToProps, mapDispatchToProps)(__acs);

export default AcsLogs;