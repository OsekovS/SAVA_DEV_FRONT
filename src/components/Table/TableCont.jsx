// import  {smtpSettigsThunkThunk, smtpTestThunk} from "../../../redux/notific-settings-reducer";
import {connect} from "react-redux";
import DiskInfoPanel from './DiskInfoPanel'


let mapStateToProps = (state) => {
  return {
    // smtp: state.notific.smtp,
 }
}
let mapDispatchToProps = {
  // smtpSettigsThunkThunk,
  // smtpTestThunk
}

const DiskInfoPanelCont = connect(mapStateToProps, mapDispatchToProps)(DiskInfoPanel);

export default DiskInfoPanelCont;