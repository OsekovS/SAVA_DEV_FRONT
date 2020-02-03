import  {getDashboardsThunk} from "../../../components/redux/acs-dashboards-reducer";
import {connect} from "react-redux";
import __acs from './__acs'


let mapStateToProps = (state) => {
    return {
        dashboards: state.dashboards.dashboards.iss,
   }
}
let mapDispatchToProps = {
    getDashboardsThunk
}

const AcsLogs = connect(mapStateToProps, mapDispatchToProps)(__acs);

export default AcsLogs;