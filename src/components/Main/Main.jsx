import React from 'react';
import  {getNotification} from "../redux/all-events-reducer";
import Visio from './Visio/Visio'
import Sett from './Sett/Sett'
import './Main.scss';
import {connect} from "react-redux";

class rawMain extends React.Component {
  componentDidMount() {
      this.props.getNotification();
  }


  render() {
      return <main>
        <Visio
          cameras_dahua={this.props.cameras_dahua}
          acs_castle_ep2={this.props.acs_castle_ep2}
          iss={this.props.iss}/>
        <Sett/>
      </main>
  }
}

let mapStateToProps = (state) => {
  return {
    cameras_dahua: state.allEvents.cameras_dahua,
    acs_castle_ep2: state.allEvents.acs_castle_ep2,
    iss: state.allEvents.iss
  }
}

let mapDispatchToProps = {
  getNotification
}

const Main = connect(mapStateToProps, mapDispatchToProps)(rawMain);

export default Main;