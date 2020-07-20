// import  {addDashBoardThunk} from "../../../redux/dashboards-reducer";
import {connect} from "react-redux";
import rawModules from './__modules'


let mapStateToProps = (state) => {
  return {
    modules: state.auth.briefUserInfo.modules,
    settings: state.modulesSettings,
    sidebar: state.modSidebar.settings
  }
}
let mapDispatchToProps = {
    // addDashBoardThunk
}

const Modules = connect(mapStateToProps, mapDispatchToProps)(rawModules);

export default Modules;