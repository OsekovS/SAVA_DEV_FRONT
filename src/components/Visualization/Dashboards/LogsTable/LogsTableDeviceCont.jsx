import {connect} from "react-redux";
import rawLogsTable from './LogsTable'
import  {getAcs,setTimeFilterThunk,changeUploadModeThunk,setParamFilterThunk,changeUpdatesParams,changePageThunk,changeShowedLogsThunk,changeSortThunk,onChangeCurrentLog,getFromDate,changeUploadsThunk} from "../../../../components/redux/acs-reducer";

      
let mapStateToProps = (state) => {
    return {
        filters: state.acs.filters
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
