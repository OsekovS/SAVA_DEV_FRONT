import {connect} from "react-redux";
import CircleDiagram from './CircleDiagram'
import  {getAcs,setTimeFilterThunk,changeUploadModeThunk,setParamFilterThunk,changeUploadsThunk,changeMainField,changeMainFieldList} from "../../../../components/redux/acs-dashboards-reducer";

      
let mapStateToProps = (state) => {
    return {
        // filters: state.acs.dashboards.filters
    }
}


let mapDispatchToProps = {
    getAcs,
    setTimeFilterThunk,
    setParamFilterThunk,
    changeUploadsThunk,
    changeUploadModeThunk,
    changeMainField,
    changeMainFieldList
}

const CircleDiagramCont = (connect(mapStateToProps,mapDispatchToProps)(CircleDiagram));

export default CircleDiagramCont
