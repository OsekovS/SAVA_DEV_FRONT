import {getEvensAndAdressesThunk, onChangeEventFilterThunk} from "../../../redux/notific-settings-reducer";
import Email from "./Email";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        events: state.notific.events,
        addressees: state.notific.addressees,
        modules: state.auth.briefUserInfo.modules,
        modulesTranslate: state.auth.modulesTranslate
    }
}
let mapDispatchToProps = {
    getEvensAndAdressesThunk,
    onChangeEventFilterThunk
}

const EmailCont = connect(mapStateToProps, mapDispatchToProps)(Email);

export default EmailCont;