import {connect} from "react-redux";
import {deleteHeaderElem, changeDashSize,changeHeaderElemSize}  from "../../../../redux/dashboards-reducer";
import Table from './Table.jsx'      

let mapStateToProps = (state) => {
    return {
        // filters: state.acs.dashboards.filters
        modules: state.auth.briefUserInfo.modules
    }
}


let mapDispatchToProps = {
    deleteHeaderElem,
    changeDashSize,
    changeHeaderElemSize
}

const TableCont = (connect(mapStateToProps,mapDispatchToProps)(Table));

export default TableCont

