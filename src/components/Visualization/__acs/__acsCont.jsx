import  {getAcs,setTimeFilterThunk,changeUploads,setParamFilterThunk,changeUpdatesParams} from "../../../components/redux/acs-reducer";
import {connect} from "react-redux";
import __acs from './__acs'


let mapStateToProps = (state) => {
    return {
        bar1:  state.acs.logs.bar1,
        bar2:  state.acs.logs.bar2,
    }
}
let mapDispatchToProps = {

}

const AcsLogs = connect(mapStateToProps, mapDispatchToProps)(__acs);

export default AcsLogs;