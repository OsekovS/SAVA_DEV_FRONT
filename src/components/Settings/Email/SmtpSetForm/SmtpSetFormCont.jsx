import  {smtpSettigsThunkThunk, smtpTestThunk} from "../../../redux/notific-settings-reducer";
import {connect} from "react-redux";
import SmtpSetForm from './SmtpSetForm'


let mapStateToProps = (state) => {
  return {
    smtp: state.notific.smtp,
 }
}
let mapDispatchToProps = {
  smtpSettigsThunkThunk,
  smtpTestThunk
}

const SmtpSetFormCont = connect(mapStateToProps, mapDispatchToProps)(SmtpSetForm);

export default SmtpSetFormCont;