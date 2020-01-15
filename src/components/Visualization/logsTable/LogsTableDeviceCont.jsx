import {connect} from "react-redux";
import rawLogsTable from './LogsTable'
import  {getAcs,setTimeFilterThunk,changeUploads,setParamFilterThunk,changeUpdatesParams,changePageThunk,changeShowedLogsThunk,changeSortThunk} from "../../../components/redux/acs-reducer";

      
let mapStateToProps = (state) => {
    return {
        logs: state.acs.logs.logs,
        timeFilter: state.acs.logs.timeFilter,
        uploads: state.acs.logs.uploads,
        paramFilter: state.acs.logs.paramFilter,
        pagination: state.acs.logs.pagination,
        sortParam: state.acs.logs.sortParam
    }
}


let mapDispatchToProps = {
    getAcs,
    setTimeFilterThunk,
    setParamFilterThunk,
    changeUploads,
    changeUpdatesParams,
    changePageThunk,
    changeShowedLogsThunk,
    changeSortThunk
}

const LogsTableDeviceCont = (connect(mapStateToProps,mapDispatchToProps)(rawLogsTable));

export default LogsTableDeviceCont
