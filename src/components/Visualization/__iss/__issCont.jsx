import  {getIss} from "../../../components/redux/iss-reducer";
import {connect} from "react-redux";
import React from 'react';
import __iss from './__iss'

class rawIss extends React.Component {
    componentDidMount() {
        console.log('camlogsmount')
        this.props.getIss({"need": "logs"});
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <__iss 
            logs={this.props.logs} 
        />
    }
}

let mapStateToProps = (state) => {
    return {
        logs: state.iss.logs
    }
}
let mapDispatchToProps = {
    getIss
}

const IssLogs = connect(mapStateToProps, mapDispatchToProps)(rawIss);

export default IssLogs;