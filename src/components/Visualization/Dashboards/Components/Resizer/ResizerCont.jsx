import {connect} from "react-redux";
import Resizer from './Resizer'
import  {changeSize} from "../../../../redux/dashboards-reducer";

      
let mapStateToProps = (state) => {
    return {
        // filters: state.acs.dashboards.filters
        // modules: state.auth.briefUserInfo.modules
    }
}


let mapDispatchToProps = {
    changeSize
}

const ResizerCont = (connect(mapStateToProps,mapDispatchToProps)(Resizer));

export default ResizerCont
