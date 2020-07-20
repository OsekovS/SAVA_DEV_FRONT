import React from 'react';

// import  {getFromDate} from "../../../../components/redux/acs-reducer";
class ChangedInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTitleModified: false,
            value: props.title
        }
        this.inputRef = React.createRef();
        this.onCheck = this.onCheck.bind(this)
        this.clickOnChange = this.clickOnChange.bind(this)
        this.keyDownListener = this.keyDownListener.bind(this)
    }

    onChange = (e) =>{
        if(e.target.value.length<40) this.setState({value: e.target.value})
    }

    onCheck = () =>{
        let {id, dbName, onChangeDashNameThunk} = this.props
        if(this.state.value.length>0)onChangeDashNameThunk(this.state.value,id,dbName)
        this.setState({isTitleModified: false})
    }
    keyDownListener = (event) =>{
        if(event.code === 'Enter') {
            this.onCheck()
           
        }
    }

    clickOnChange = (e) => {
        if(e.target.id!=='ChangedInput') {
            this.onCheck()
            document.removeEventListener("click", this.clickOnChange)
        }
    }

    componentDidUpdate = () => {
        if(this.inputRef.current!==null) {
            this.inputRef.current.focus()
            document.addEventListener("click", this.clickOnChange)
        }
    }
    
    render() {  
        let {title, clazz } = this.props,
        {isTitleModified, value} = this.state       

        if(isTitleModified) {
            document.addEventListener('keydown', this.keyDownListener);
            // document.getElementById("focused").focus();
            return <div className={clazz+' ChangedInput'} >
                <input type="text" value={value} id="ChangedInput" onChange={this.onChange} ref={this.inputRef}></input>
            </div>
        }
        else return <div className={clazz+' ChangedInput'} onDoubleClick={()=>{this.setState({isTitleModified: true})}}>
            {title}
        </div>
    }
  }




export default ChangedInput;