import  {getAcs,SetTimeFilter} from "../../../components/redux/acs-reducer";
import {connect} from "react-redux";
import __acs from './__acs'


let mapStateToProps = (state) => {
    return {
        logs: state.acs.logs.logs,
        bar1:  state.acs.logs.bar1,
        bar2:  state.acs.logs.bar2,
        timeFilter: state.acs.logs.timeFilter
    }
}
let mapDispatchToProps = {
    getAcs,
    SetTimeFilter
}

const AcsLogs = connect(mapStateToProps, mapDispatchToProps)(__acs);

export default AcsLogs;