import React from 'react';
import './Resizer.scss'
class Resizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onChangeMode: false,
            pagePoint: 0
        }
        this.onMouseMove= this.onMouseMove.bind(this)
        this.onMouseUp= this.onMouseUp.bind(this)
    }
    onMouseDown = (event) => {
        // 'minHeight'.toLowerCase().indexOf('height')
        // 'minHeight'.toLowerCase().indexOf('width')
        let a = this.props.type[0].toLowerCase().indexOf('height')!==-1?event.pageY:event.pageX
        this.setState(state => {
            state.onChangeMode = true 
            state.pagePoint = a
            return state
          })
    }

    onMouseUp = () => {

        document.removeEventListener("mousemove", this.onMouseMove);
        this.setState(state => {
            state.onChangeMode = false 
            return state
          })
    }

    onMouseMove = (event) => {
        // console.log(event.pageY-this.state.pageY)   

        let {id,changeSize,dbName,type,minVal} = this.props,
        {pagePoint} = this.state,
        delta = type[0].toLowerCase().indexOf('height')!==-1?event.pageY-pagePoint:event.pageX-pagePoint,
        newPagePoint = type[0].toLowerCase().indexOf('height')!==-1?event.pageY:event.pageX
        
        
        // console.log(minVal)
        // console.log(newPagePoint)
        changeSize(delta, id, dbName,type,minVal)
        this.setState(state => {
            state.pagePoint = newPagePoint
            return state
          })
    }

    render() {  
        let {id,indexName,dbName,type,isAbsolutePos} = this.props,
        {onMouseMove, onMouseUp} = this,
        clazz = type[0].toLowerCase().indexOf('height')!==-1?'Vertical':'Horizontal'
    //    console.log(this.props)
       if(this.state.onChangeMode){
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        //     document.onmousemove = function(e) { // перезапишет существующий обработчик
        //         onMouseMove(e)// выведется только это
        //     };
        //   document.onmouseup = function(e) { // перезапишет существующий обработчик
        //     onMouseUp(e)// выведется только это
        //   };
       }
       
        return <>
                    <div className={"Resizer__"+clazz+(isAbsolutePos?" Resizer__Absolute":" Resizer")} onMouseDown={ this.onMouseDown } ></div>
                </>
                // onMouseUp={ this.onMouseUp }
                // onMouseOut={this.onMouseUp}
    }
}
export default Resizer;