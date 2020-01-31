import React from 'react';
import  {getLogsCountThumk} from "../redux/auth-reducer";
import Visio from './Visio/Visio'
import Sett from './Sett/Sett'
import './Main.scss';
import {connect} from "react-redux";

class rawMain extends React.Component {
  componentDidMount() {
      this.props.getLogsCountThumk();
  }


  render() {
      return <main>
        <Visio {...this.props}
          // cameras_dahua={this.props.cameras_dahua}
          // acs_castle_ep2={this.props.acs_castle_ep2}
          // iss={this.props.iss}
          />
        <Sett/>
      </main>
  }
}

let mapStateToProps = (state) => {
  return {
    // cameras_dahua: state.allEvents.cameras_dahua,
    // acs_castle_ep2: state.allEvents.acs_castle_ep2,
    // iss: state.allEvents.iss,
    modules: state.auth.briefUserInfo.modules
  }
}

let mapDispatchToProps = {
  getLogsCountThumk
}

const Main = connect(mapStateToProps,mapDispatchToProps)(rawMain);

export default Main;