import React from 'react';
// import  {getLogsCountThumk} from "../redux/auth-reducer";
import Visio from './Visio/Visio'
import Sett from './Sett/Sett'
import CommonDash from './CommonDash/CommonDash'
import './Main.scss';
import {connect} from "react-redux";

class rawMain extends React.Component {
  // componentDidMount() {
  //   this.intervalId = setInterval(()=>{this.props.getLogsCountThumk()},
  //         5000);
  //     // this.props.getLogsCountThumk();
  // }
  componentWillUnmount(){
    if(this.intervalId!==undefined) clearInterval(this.intervalId);
  }

  render() {
      return <main>
        <Visio {...this.props}/>
        {this.props.isAdmin?<Sett/>:null}
        <CommonDash/>
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
  // getLogsCountThumk
}

const Main = connect(mapStateToProps,mapDispatchToProps)(rawMain);

export default Main;