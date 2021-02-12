import {getEvensAndAdressesThunk, onChangeEventFilterThunk, onAddEventThunk, onDellEventThunk, onAddAdressThunk, onDellAdressThunk, onEditAdressEventsThunk} from "../../redux/notific-settings-reducer";
import Email from "./Email";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        events: state.notific.events,
        addresses: state.notific.addresses,
        modules: state.auth.briefUserInfo.modules,
        modulesTranslate: state.auth.modulesTranslate,
        isAdmin: state.auth.briefUserInfo.admin
        
    }
}
let mapDispatchToProps = {
    getEvensAndAdressesThunk,
    onChangeEventFilterThunk,
    onAddEventThunk,
    onDellEventThunk,
    onAddAdressThunk,
    onDellAdressThunk,
    onEditAdressEventsThunk
}

const EmailCont = connect(mapStateToProps, mapDispatchToProps)(Email);

export default EmailCont;