import {connect} from "react-redux";
import {createReportThunk}  from "../../../../redux/dashboards-reducer";
import Pdf from './Pdf.jsx'      

let mapStateToProps = (state) => {
    return {
        // filters: state.acs.dashboards.filters
        // modules: state.auth.briefUserInfo.modules
    }
}


let mapDispatchToProps = {
    createReportThunk
}

const PdfCont = (connect(mapStateToProps,mapDispatchToProps)(Pdf));

export default PdfCont
