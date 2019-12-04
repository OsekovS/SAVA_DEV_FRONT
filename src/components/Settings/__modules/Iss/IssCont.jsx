import {addEndpCreator, delEndpCreator, addObjCreator, delObjCreator,changeModeCreator} from "../../../redux/iss-reducer";
import Iss from "./Iss";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
            objects: state.iss.settings.objects,
            endpoints: state.iss.settings.endpoints,
            mode: state.iss.settings.mode
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
        changeMode: (mode) => {
            dispatch(changeModeCreator(mode));
        },
    }
}

const IssCont = connect(mapStateToProps, mapDispatchToProps)(Iss);

export default IssCont;