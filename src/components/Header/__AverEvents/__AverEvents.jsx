import React from 'react';
import './__AverEvents.scss';

const __AverEvents = (props) => {
    return <div  className="Header__AverEvents">
            !
            <span className="Header__exceptions">{props.allEvents.exceptions}</span>
            <br/>
            <span className="Header__errors">{props.allEvents.errors}</span>
        </div>
}

export default __AverEvents;