import React from 'react';

const ShowedLogsBar = (props) => {
    const {indexName,dbName,id} = props.personal
    let showedLogsList = props.showedLogsList.map((e,index) => {
        if(e===props.showedLogs) return <li onClick={()=>props.onClickCallback(e,indexName,dbName,id)} className="showed-logs__current" key={index} >{e}</li>
        else return <li onClick={()=>props.onClickCallback(e,indexName,dbName,id)} key={index} >{e}</li>
        })
    return <ul className="showed-logs">
                {showedLogsList}
            </ul>
}

export default ShowedLogsBar;