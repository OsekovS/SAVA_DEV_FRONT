// import {addCamCreator} from "../../../redux/cameras-reducer";
import Acs from "./Acs";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
            objects: state.acs.settings.objects,
            endpoints: state.acs.settings.endpoints,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        // addCam: (obj) => {
        //     dispatch(addCamCreator(obj));
        // }
    }
}

const AcsCont = connect(mapStateToProps, mapDispatchToProps)(Acs);

export default AcsCont;