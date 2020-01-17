import  {getDashboardsThunk} from "../../../components/redux/acs-reducer";
import {connect} from "react-redux";
import __acs from './__acs'


let mapStateToProps = (state) => {
    return {
        dashboards: state.acs.dashboards
    }
}
let mapDispatchToProps = {
    getDashboardsThunk
}

const AcsLogs = connect(mapStateToProps, mapDispatchToProps)(__acs);

export default AcsLogs;