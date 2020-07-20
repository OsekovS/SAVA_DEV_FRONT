import React from 'react';
import './ComSidebar.scss'
import Elem from './Elem'


class rawSidebar extends React.Component {
    constructor(props){
      super(props)
      this.state = {
          leftOffset: 0,
        //   pagePoint: 0,
          onChangeMode: false
      }
      this.navRef = React.createRef();

    //   this.onWheel = this.onWheel.bind(this)
      this.onMouseOver = this.onMouseOver.bind(this)
    //   this.onMouseUp = this.onMouseUp.bind(this)
    //   this.onClick = this.onClick.bind(this)
    }
    // onChangeSb = (type,dbName,key,to) => {
    //     this.props.changeSideBarCreator(type,dbName,key)
    //     this.props.changeLinkCreator(to)
    // }
    onWheel = (e) =>{
        let newLeftOffset = this.state.leftOffset - (e.deltaY || e.detail || e.wheelDelta)
        console.log(newLeftOffset)
        this.setState({leftOffset: newLeftOffset > 0 ? this.state.leftOffset : newLeftOffset})
        e.preventDefault();
    }
    onMouseLeave = (event) =>{
        this.setState(state => {
            state.onChangeMode = false 
            return state
          })
          if(this.state.onChangeMode){
            if ('onwheel' in document) {
                // IE9+, FF17+, Ch31+
                document.removeEventListener("wheel", this.onWheel,{ passive: false });
            } else if ('onmousewheel' in document) {
                // устаревший вариант события
                document.removeEventListener("mousewheel", this.onWheel,{ passive: false });
            } else {
                // Firefox < 17
                document.removeEventListener("MozMousePixelScroll", this.onWheel,{ passive: false });
            }
        }
        
        // document.removeEventListener("click", this.onMouseLeave,{ passive: false });
    }
    onMouseOver = (event) =>{
        this.setState(state => {
            state.onChangeMode = true 
            return state
          })
    }
    // onMouseUp = () => {
    //     this.setState({onChangeMode:false})
    //     if ('onwheel' in document) {
    //         // IE9+, FF17+, Ch31+
    //         document.removeEventListener("wheel", this.onWheel);
    //     } else if ('onmousewheel' in document) {
    //         // устаревший вариант события
    //         document.removeEventListener("mousewheel", this.onWheel);
    //     } else {
    //         // Firefox < 17
    //         document.removeEventListener("MozMousePixelScroll", this.onWheel);
    //     }
    //     // document.removeEventListener('mousemove',this.onMouseMove)
    //     // document.removeEventListener('mouseup',this.onMouseUp)
    // }
    // onClick = (moduleKey,number) => {
    //     if(!this.state.onChangeMode) this.props.changeSideBarCreator('dashboards',moduleKey,number)
    // }
    render() {
        let elems = [],
       
        {state,modulesName,changeSideBarCreator,changeLinkCreator,current} = this.props
        // a = {}
        // console.log(this.props)
        // for (let index = 0; index < 10; index++) {
           
            for (const moduleKey in state) {
                if (state.hasOwnProperty(moduleKey)) {
                    let indexes = state[moduleKey],
                    n=0,
                    isCurrentModule = current === moduleKey
                    // a[moduleKey] = {}
                    for (const indexKey in indexes) {
                        if (indexes.hasOwnProperty(indexKey)) {
                            // changeSideBarCreator('dashboards',moduleKey,n);  this.onClick.bind(this,moduleKey,number)
                            let number = n
                            elems.push(
                                <Elem key={n} 
                                    clickFunc={(e)=>{changeSideBarCreator('dashboards',moduleKey,number);changeLinkCreator(indexes[indexKey].to);this.onMouseLeave()}}
                                    active={indexes[indexKey].active}
                                    isCurrentModule={isCurrentModule}
                                    to={indexes[indexKey].to}
                                    module={modulesName[moduleKey]}
                                    index={indexes[indexKey].text}/>
                            )
                            n++
                        }
                    }
                }
            }
        // }
        if(this.state.onChangeMode){
            if ('onwheel' in document) {
                // IE9+, FF17+, Ch31+
                document.addEventListener("wheel", this.onWheel,{ passive: false });
            } else if ('onmousewheel' in document) {
                // устаревший вариант события
                document.addEventListener("mousewheel", this.onWheel,{ passive: false });
            } else {
                // Firefox < 17
                document.addEventListener("MozMousePixelScroll", this.onWheel,{ passive: false });
            }
            // document.addEventListener("click", this.onMouseLeave,{ passive: false });
        }

        return <nav className="ComSidebar"  ref={this.navRef}  onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}>
                    <ul style={{left: this.state.leftOffset, position: "relative"}}>
                        {elems.length > 0 ? elems: null}
                    </ul>
                </nav>
    }
}

export default rawSidebar;