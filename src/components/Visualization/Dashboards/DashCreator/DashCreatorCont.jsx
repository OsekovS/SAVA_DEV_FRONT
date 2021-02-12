import  {addDashBoardThunk} from "../../../redux/dashboards-reducer";
import {connect} from "react-redux";
import DashCreator from './DashCreator'


let mapStateToProps = (state) => {
  return {
    modules: state.auth.briefUserInfo.modules
 }
}
let mapDispatchToProps = {
    addDashBoardThunk
}

const addDashBoardThunkCont = connect(mapStateToProps, mapDispatchToProps)(DashCreator);

export default addDashBoardThunkCont;