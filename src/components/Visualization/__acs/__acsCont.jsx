import  {getAcs} from "../../../components/redux/acs-reducer";
import {connect} from "react-redux";
import React from 'react';
import __acs from './__acs'

class rawAcs extends React.Component {
    componentDidMount() {
        console.log('acslogsmount')
        this.props.getAcs({"need": "logs"});
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <__acs 
            logs={this.props.logs} 
        />
    }
}

let mapStateToProps = (state) => {
    return {
        logs: state.acs.logs
    }
}
let mapDispatchToProps = {
    getAcs
}

const AcsLogs = connect(mapStateToProps, mapDispatchToProps)(rawAcs);

export default AcsLogs;