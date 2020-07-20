import {connect} from "react-redux";
import CircleDiagram from './CircleDiagram'
import  {getAcs,setTimeFilterThunk,changeUploadModeThunk,setParamFilterThunk,changeDashSize,
    changeUploadsThunk,changeMainFieldThunk,changeMainFieldList, getAtClickOnCircleDiagram} from "../../../../components/redux/dashboards-reducer";

      
let mapStateToProps = (state) => {
    return {
        // filters: state.acs.dashboards.filters
        modules: state.auth.briefUserInfo.modules
    }
}


let mapDispatchToProps = {
    getAcs,
    setTimeFilterThunk,
    setParamFilterThunk,
    changeUploadsThunk,
    changeUploadModeThunk,
    changeMainFieldThunk,
    changeMainFieldList,
    getAtClickOnCircleDiagram,
    changeDashSize
}

const CircleDiagramCont = (connect(mapStateToProps,mapDispatchToProps)(CircleDiagram));

export default CircleDiagramCont
