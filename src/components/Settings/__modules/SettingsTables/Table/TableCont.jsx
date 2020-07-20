import {connect} from "react-redux";
import Table from './Table'
import  {getTableList, delFieldThunk, addFieldThunk, changeFieldThunk} from "../../../../redux/modules-settings-reducer";

      
let mapStateToProps = (state) => {
    return {
        // settings: state.modulesSettings
    }
}


let mapDispatchToProps = {
    getTableList,
    delFieldThunk,
    addFieldThunk,
    changeFieldThunk
}

const TableCont = (connect(mapStateToProps,mapDispatchToProps)(Table));

export default TableCont
