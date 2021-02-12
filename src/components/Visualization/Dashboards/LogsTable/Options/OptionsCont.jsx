import {connect} from "react-redux";
import Options from './Options'
import  {changeHeaderElemSize, changeViewedFields} from "../../../../redux/dashboards-reducer";

      
let mapStateToProps = (state) => {
    return {
    }
}


let mapDispatchToProps = {
    changeHeaderElemSize,
    changeViewedFields
}

const OptionsCont = (connect(mapStateToProps,mapDispatchToProps)(Options));

export default OptionsCont

