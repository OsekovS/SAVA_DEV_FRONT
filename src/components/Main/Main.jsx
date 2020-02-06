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
        <Visio {...this.props}/>
        <Sett/>
      </main>
  }
}

let mapStateToProps = (state) => {
  return {
    sidebar: state.modSidebar,
    modules: state.auth.briefUserInfo.modules
  }
}

let mapDispatchToProps = {
  getLogsCountThumk
}

const Main = connect(mapStateToProps,mapDispatchToProps)(rawMain);

export default Main;