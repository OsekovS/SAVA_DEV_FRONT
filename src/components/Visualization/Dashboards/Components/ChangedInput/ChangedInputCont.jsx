import './ChangedInput.scss';
import {connect} from "react-redux";
import ChangedInput from "./ChangedInput.jsx";
import {onChangeDashNameThunk}  from "../../../../redux/dashboards-reducer";


let mapStateToProps = (state) => {
    return {
   }
}

let mapDispatchToProps = {
    onChangeDashNameThunk
}
  
  const ChangeInputCont = connect(mapStateToProps, mapDispatchToProps)(ChangedInput);

export default ChangeInputCont;