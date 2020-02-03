import React from 'react';
import './MenuItem.scss';
import {changeLinkCreator} from '../../../redux/nav-bar-reducer'
import {connect} from "react-redux";

class rawMainMenuItem extends React.Component {
    componentDidMount() {
        
    }
  
  
    render() {
        const onClick = (to) => {
            this.props.changeLink(to)
        }
        const briefIndexesInfo = []
        const indexes= this.props.indexes
    
        for (const index in indexes) {
            if (indexes.hasOwnProperty(index)&&indexes[index].logsCount!==undefined) {
                let events = indexes[index].events
                let eventsCount = []
                // console.log(indexes)
                // for (const key in indexes[index].logsCount) {
                //     if (object.hasOwnProperty(indexes[index].logsCount)) {
                //         const element = object[key];
                        
                //     }
                // }
                indexes[index].logsCount.forEach(event => {
                    // console.log(event)
                    eventsCount.push(<span className={'label'+event.key}>{event.doc_count>999?'999+':event.doc_count}</span>) 
                });
                // events.forEach(event => {
                //     eventsCount.push(<span>{indexes[index].logsCount[event]}</span>) 
                // });
                briefIndexesInfo.push(
                    <li><h3>{indexes[index].title}</h3><span className='mini'>   (Последний просмотр {indexes[index].lastViewed})</span>{eventsCount>999?'999+':eventsCount}</li>
                )
            }
        }
        return <div className="Common__mainMenuItem" onClick={onClick.bind(this,this.props.to)} >
        <header className="Common__header Common__header_grey Common__header_menu-item"
            ><span>{this.props.head['text']}</span>
            </header>
    
        <div>
           <ul>
               {briefIndexesInfo}
           </ul>
        </div>
        </div>
    }
  }

let mapStateToProps = (state) => {
    return {
        
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        changeLink: (to) => {
            dispatch(changeLinkCreator(to));
        }
    }
}

const __mainMenuItem = connect(mapStateToProps, mapDispatchToProps)(rawMainMenuItem);


export default __mainMenuItem;