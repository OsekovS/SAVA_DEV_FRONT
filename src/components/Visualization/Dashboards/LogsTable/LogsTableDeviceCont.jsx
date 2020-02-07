import {connect} from "react-redux";
import rawLogsTable from './LogsTable'
import  {getAcs,changeUploadModeThunk,setParamFilterThunk,changePageThunk,changeShowedLogsThunk,changeSortThunk,onChangeCurrentLog} from "../../../../components/redux/acs-dashboards-reducer";

      
let mapStateToProps = (state) => {
    return {
        // filters: state.acs.dashboards.filters
        modules: state.auth.briefUserInfo.modules
    }
}


let mapDispatchToProps = {
    getAcs,
    setParamFilterThunk,
    changeUploadModeThunk,
    changePageThunk,
    changeShowedLogsThunk,
    changeSortThunk,
    onChangeCurrentLog,
}

const LogsTableDeviceCont = (connect(mapStateToProps,mapDispatchToProps)(rawLogsTable));

export default LogsTableDeviceCont
