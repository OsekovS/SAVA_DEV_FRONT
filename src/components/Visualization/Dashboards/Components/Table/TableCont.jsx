import {connect} from "react-redux";
import {changeDashSize,changeHeaderElemSize,changeHeaderElemPos}  from "../../../../redux/dashboards-reducer";
import Table from './Table.jsx'      

let mapStateToProps = (state) => {
    return {
        // filters: state.acs.dashboards.filters
        modules: state.auth.briefUserInfo.modules
    }
}


let mapDispatchToProps = {
    changeDashSize,
    changeHeaderElemSize,
    changeHeaderElemPos
}

const TableCont = (connect(mapStateToProps,mapDispatchToProps)(Table));

export default TableCont

