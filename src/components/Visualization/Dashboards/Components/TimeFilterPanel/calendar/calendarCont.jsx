import  {setTimeFilterThunk} from "../../../../../redux/acs-dashboards-reducer";
import {connect} from "react-redux";
import calendar from './calendar'


let mapStateToProps = (state) => {
  return {
 }
}
let mapDispatchToProps = {
    setTimeFilterThunk
}

const calendarCont = connect(mapStateToProps, mapDispatchToProps)(calendar);

export default calendarCont;