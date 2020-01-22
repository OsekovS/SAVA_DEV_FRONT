import {connect} from "react-redux";
import CircleDiagram from './CircleDiagram'
import  {getAcs,setTimeFilterThunk,changeUploadModeThunk,setParamFilterThunk,changeUploadsThunk,ChangeMainFieldThunk,changeMainField,changeMainFieldList} from "../../../../components/redux/acs-reducer";

      
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
    // ChangeMainFieldThunk,
    changeMainField,
    changeMainFieldList
}

const CircleDiagramCont = (connect(mapStateToProps,mapDispatchToProps)(CircleDiagram));

export default CircleDiagramCont
