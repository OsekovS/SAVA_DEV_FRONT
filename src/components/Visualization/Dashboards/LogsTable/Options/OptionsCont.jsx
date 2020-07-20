import {connect} from "react-redux";
import Options from './Options'
import  {changeHeaderElemSize, addHeaderElem, addFooterElem} from "../../../../redux/dashboards-reducer";

      
let mapStateToProps = (state) => {
    return {
    }
}


let mapDispatchToProps = {
    changeHeaderElemSize,
    addHeaderElem,
    addFooterElem
}

const OptionsCont = (connect(mapStateToProps,mapDispatchToProps)(Options));

export default OptionsCont

