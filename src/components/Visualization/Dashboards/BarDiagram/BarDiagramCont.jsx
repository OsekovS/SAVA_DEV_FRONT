import {connect} from "react-redux";
import BarDiagram from './BarDiagram'
import  {getAcs,setParamFilterThunk,changeDashSize//setTimeFilterThunk
    // ,changeUploadModeThunk,setParamFilterThunk,
    // changeUploadsThunk,changeMainFieldThunk,changeMainFieldList, getAtClickOnCircleDiagram
} from "../../../../components/redux/dashboards-reducer";

      
let mapStateToProps = (state) => {
    return {
        // filters: state.acs.dashboards.filters
        modules: state.auth.briefUserInfo.modules
    }
}


let mapDispatchToProps = {
    getAcs,
    // setTimeFilterThunk,
    setParamFilterThunk,
    // changeUploadsThunk,
    // changeUploadModeThunk,
    // changeMainFieldThunk,
    // changeMainFieldList,
    // getAtClickOnCircleDiagram,
    changeDashSize
}

const BarDiagramCont = (connect(mapStateToProps,mapDispatchToProps)(BarDiagram));

export default BarDiagramCont
