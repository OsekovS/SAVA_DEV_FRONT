import {addEndpCreator, delEndpCreator, addObjCreator, delObjCreator} from "../../../redux/acs-reducer";
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
        addEndp: (id) => {
            dispatch(addEndpCreator(id));
        },
        delEndp: (id) => {
            dispatch(delEndpCreator(id));
        },
        addObj: (obj) => {
            dispatch(addObjCreator(obj));
        },
        delObj: (id) => {
            dispatch(delObjCreator(id));
        },

    }
}

const AcsCont = connect(mapStateToProps, mapDispatchToProps)(Acs);

export default AcsCont;