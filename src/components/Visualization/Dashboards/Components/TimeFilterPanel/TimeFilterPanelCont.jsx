import  {setTimeFilterThunk} from "../../../../redux/dashboards-reducer";
// import  {changelastViewed} from "../../../../redux/auth-reducer";
import {connect} from "react-redux";
import TimeFilterPanel from './TimeFilterPanel'


let mapStateToProps = (state) => {
  return {
 }
}
let mapDispatchToProps = {
    setTimeFilterThunk,
    // changelastViewed
}

const TimeFilterPanelCont = connect(mapStateToProps, mapDispatchToProps)(TimeFilterPanel);

export default TimeFilterPanelCont;