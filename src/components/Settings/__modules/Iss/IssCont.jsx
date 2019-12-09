import {addEndp,
    delEndp,
    addObj,
    delObj,
    changeMode, getIss} from "../../../redux/iss-reducer";
import Iss from "./Iss";
import {connect} from "react-redux";
import React from 'react';

class rawIss extends React.Component {
    componentDidMount() {
        console.log('issmount')
        this.props.getIss({"need": "settings"});
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <Iss 
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
            objects: state.iss.settings.objects,
            endpoints: state.iss.settings.endpoints,
            mode: state.iss.settings.mode
    }
}
let mapDispatchToProps =  {
        addEndp,
        delEndp,
        addObj,
        delObj,
        changeMode,
        getIss
}

const IssCont = connect(mapStateToProps, mapDispatchToProps)(rawIss);

export default IssCont;