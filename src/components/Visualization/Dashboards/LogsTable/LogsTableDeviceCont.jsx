import {connect} from "react-redux";
import rawLogsTable from './LogsTable'
import  {getAcs,setTimeFilterThunk,changeUploadModeThunk,setParamFilterThunk,changeUpdatesParams,changePageThunk,changeShowedLogsThunk,changeSortThunk,onChangeCurrentLog,getFromDate,changeUploadsThunk} from "../../../../components/redux/acs-reducer";

      
let mapStateToProps = (state) => {
    return {
        // logs: state.acs.logs.logs,
        // timeFilter: state.acs.logs.timeFilter,
        // uploads: state.acs.logs.uploads,
        // paramFilter: state.acs.logs.paramFilter,
        // pagination: state.acs.logs.pagination,
        // sortParam: state.acs.logs.sortParam,
        // curLog: state.acs.logs.curLog,
        // getFromDate: getFromDate
    }
}


let mapDispatchToProps = {
    getAcs,
    setTimeFilterThunk,
    setParamFilterThunk,
    changeUploadsThunk,
    changeUploadModeThunk,
    changePageThunk,
    changeShowedLogsThunk,
    changeSortThunk,
    onChangeCurrentLog,
}

const LogsTableDeviceCont = (connect(mapStateToProps,mapDispatchToProps)(rawLogsTable));

export default LogsTableDeviceCont
