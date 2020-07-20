import  {changeUploadsThunk} from "../../../../../redux/dashboards-reducer";
import  {setLastViewThunk} from "../../../../../redux/auth-reducer";
import {connect} from "react-redux";
import UploadTimeSetter from './UploadTimeSetter'


let mapStateToProps = (state) => {
  return {
 }
}
let mapDispatchToProps = {
  changeUploadsThunk,
  setLastViewThunk
}

const UploadTimeSetterCont = connect(mapStateToProps, mapDispatchToProps)(UploadTimeSetter);

export default UploadTimeSetterCont;