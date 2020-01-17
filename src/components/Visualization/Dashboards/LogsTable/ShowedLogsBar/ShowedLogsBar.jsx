import React from 'react';

const ShowedLogsBar = (props) => {
    let showedLogsList = props.showedLogsList.map((e,index) => {
        if(e===props.showedLogs) return <li onClick={()=>props.onClickCallback(e,props.indexName,props.id)} className="showed-logs__current" key={index} >{e}</li>
        else return <li onClick={()=>props.onClickCallback(e,props.indexName,props.id)} key={index} >{e}</li>
        })
    return <ul className="showed-logs">
                {showedLogsList}
            </ul>
}

export default ShowedLogsBar;