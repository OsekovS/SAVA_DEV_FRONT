import  {changeUploadsThunk} from "../../../../../redux/acs-dashboards-reducer";
import {connect} from "react-redux";
import UploadTimeSetter from './UploadTimeSetter'


let mapStateToProps = (state) => {
  return {
 }
}
let mapDispatchToProps = {
  changeUploadsThunk
}

const UploadTimeSetterCont = connect(mapStateToProps, mapDispatchToProps)(UploadTimeSetter);

export default UploadTimeSetterCont;