import  {setTimeFilterThunk} from "../../../../redux/acs-dashboards-reducer";
import {connect} from "react-redux";
import TimeFilterPanel from './TimeFilterPanel'


let mapStateToProps = (state) => {
  return {
 }
}
let mapDispatchToProps = {
    setTimeFilterThunk
}

const TimeFilterPanelCont = connect(mapStateToProps, mapDispatchToProps)(TimeFilterPanel);

export default TimeFilterPanelCont;