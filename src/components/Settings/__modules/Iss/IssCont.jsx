// import {addCamCreator} from "../../../redux/cameras-reducer";
import Iss from "./Iss";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
            objects: state.iss.settings.objects,
            endpoints: state.iss.settings.endpoints,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        // addCam: (obj) => {
        //     dispatch(addCamCreator(obj));
        // }
    }
}

const IssCont = connect(mapStateToProps, mapDispatchToProps)(Iss);

export default IssCont;