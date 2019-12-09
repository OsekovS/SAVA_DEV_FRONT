import  {addEndp, delEndp, addObj,
    delObj, changeMode, getAcs} from "../../../redux/acs-reducer";
import Acs from "./Acs";
import {connect} from "react-redux";
import React from 'react';

class rawAcs extends React.Component {
    componentDidMount() {
        console.log('acsmount')
        this.props.getAcs({"need": "settings"});
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <Acs 
            mode={this.props.mode} 
            objects={this.props.objects}
            endpoints={this.props.endpoints}

            addEndp={this.props.addEndp}
            delEndp={this.props.delEndp}
            addObj={this.props.addObj}
            delObj={this.props.delObj}
            changeMode={this.props.changeMode}
        />
    }
}

let mapStateToProps = (state) => {
    return {
            objects: state.acs.settings.objects,
            endpoints: state.acs.settings.endpoints,
            mode: state.acs.settings.mode
    }
}
let mapDispatchToProps = {
    addEndp,
    delEndp,
    addObj,
    delObj,
    changeMode, getAcs
}

const AcsCont = connect(mapStateToProps, mapDispatchToProps)(rawAcs);

export default AcsCont;