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
          cameras={this.props.cameras}
          acs={this.props.acs}
          iss={this.props.iss}/>
        <Sett/>
      </main>
  }
}

let mapStateToProps = (state) => {
  return {
    cameras: state.allEvents.cameras,
    acs: state.allEvents.acs,
    iss: state.allEvents.iss
  }
}

let mapDispatchToProps = {
  getNotification
}

const Main = connect(mapStateToProps, mapDispatchToProps)(rawMain);

export default Main;