import Dropdown from './dropdown/dropdown.jsx'
import React from 'react';
import './FilterPanel.scss'

  
  class FilterPanel extends React.Component {
    constructor(props){
        super(props)
        if(props.single)
        this.state = {
            params: {...props.iniState},
            display: props.deployed?'deployed':'collapsed'
        }
        else{
            let params = {}
            // console.log(props)
            // console.log(props.configObj)
            // console.log(props.iniState.object)
            Object.keys(props.configObj).forEach(key => {
                // console.log(props.configObj[key])
                if(props.configObj.hasOwnProperty(key)){
                    params[key] = {}
                    Object.keys(props.configObj[key].body).forEach(element => {
                        if(props.iniState[element]!==undefined) {
                            // console.log(props.iniState[element])
                            params[key][element] = props.iniState[element]
                        }
                    });
                }
               
                // console.log(key)
                
                // params[key]= props.iniState[key]!==undefined?{...props.iniState[key]}:{}
            });
            this.state = {
                params,
                display: props.deployed?'deployed':'collapsed'
            };
            // console.log(params)
        }
        // console.log(this.state.params)
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.generateFiltersList = this.generateFiltersList.bind(this);
        this.onChangeField = this.onChangeField.bind(this);
        this.onCleanFilter = this.onCleanFilter.bind(this);
      }

  onChangeField = (keyState,key,groupName)=>{
        if(this.props.single){
            this.setState(state => {
                state.params[key] = keyState 
                return state
              })
        }else{
            // console.log(groupName)
            // console.log(keyState)
            // console.log(key)
            this.setState(state => {
                state.params[groupName][key] = keyState 
                return state
              })
        }
     
  }
    componentWillReceiveProps(props){
        // if(props.single) this.setState({ params: {...props.iniState}, });
        // else {
            //выполняется в случае, если изменилось главное поле
            if(!props.single && props.configObj.mainField&&this.state.params.mainField&&Object.keys(props.configObj.mainField.body)[0]
            !==Object.keys(this.state.params.mainField)[0]){
                this.setState(state => {
                    state.params.secondField = {...state.params.mainField ,...state.params.secondField}
                    state.params.mainField = props.configObj.mainField.body 
                    return state
                  })
            }
            // if(Object.keys(props.configObj.mainField.body)[0]!==Object.keys(this.state.mainField.body)[0])
        // }
    }
generateFiltersList(configObj,filterState,groupName){
    
    
    let filter = []
    let options
    let onChangeCallBack,
    {iniState, isInvert} = this.props //filterState[key]===undefined?[]:filterState[key]
    // console.log(configObj)
    // console.log(filterState)
    // console.log(groupName)
    // console.log(this.state)
    if(this.props.single||groupName==='secondField') onChangeCallBack = (keyState,key)=>{this.onChangeField(keyState,key,'secondField')}
    else {onChangeCallBack = (keyState,key)=>{this.onChangeField(keyState,key,'mainField')}}//onChangeCallBack = this.props.configObj[groupName].callback} //(keyState,key)=>{this.onChangeField(keyState,key,'mainField')}}
    for (const key in configObj) {
        if (configObj.hasOwnProperty(key)) {
            if(Array.isArray(configObj[key])){
                options = configObj[key].map((e,n) => {
                    return {
                        value: e,
                        label: e,
                    } 
                })
                let xxx = filterState[key]===undefined?[]:filterState[key]
                // console.log(xxx)
                // console.log(filterState[key])
                filter.push(
                    <div className="multi-select__cont"><span>{this.props.fields[key].translate}</span><Dropdown isInvert={isInvert} selected={xxx} iniState={iniState[key]===undefined?[]:iniState[key]} name={key} options={options} 
                        preview={this.props.fields[key].translate} onChangeCallBack={onChangeCallBack}/>
                    </div>
                )
            }
        }
    }
    return filter
}

onSubmit(event){
    event.preventDefault()
    if(!this.props.deployed) this.setState({ display: 'collapsed' });
    this.props.submitCallBack(this.state.params)
}
onCancel(){
    this.setState({ display: 'collapsed' });
}
onCleanFilter(){
    if(this.props.single){
        this.setState({params: {} });
    }
    else{
        this.setState({ 
            params: {
                mainField: {},
                secondField: {}
            }
        });
    }
}

    render() {
        // console.log(this.props)//.configObj)
        // console.log(this.state)//.params)
        let filter = [], {single, configObj} = this.props
    if(this.state.display==='deployed'){         
        if(single){
            filter = this.generateFiltersList(configObj,this.state.params)
        }else Object.keys(configObj).map((key,n) => {
                filter.push(
                    <div className="wrapper"><h2>{configObj[key].title}</h2>
                        {this.generateFiltersList(configObj[key].body,this.state.params[key],key)}
                    </div>
                )
               
            }
        )
        return <div className="modal-form-keeper param-panel param-filter-panel"  >
                <div>
                    <header>
                        <span><img src={require('./filter_white.svg')}></img>Настройки параметрического фильтра</span>
                        <div>
                            <img data-title="сброс настроек фильтра" className='comment' onClick={this.onCleanFilter} src={require('./clean.svg')}></img>
                            <img onClick={()=>{this.setState({ display: 'collapsed' });}} src={require('../close.svg')}></img>
                            {/* <button data-title="сброс настроек фильтра" className='comment' onClick={this.onCleanFilter}><img src={require('./clean.svg')}></img></button>
                            <button onClick={()=>{this.setState({ display: 'collapsed' });}}><img src={require('../close.svg')}></img></button> */}
                        </div>
                    </header>
                    <div  className='modal-form_light-grey' onSubmit={this.onSubmit} >
                        <div className={single?"wrapper":"wrapper wrapper__columned"}>
                            {filter}  
                        </div>
                        {/* <input type="submit" value="Применить"/> */}
                        {/* <div className="param-filter-panel_butWrapper"> */}
                            <button onClick={this.onSubmit}>Применить</button>
                            <button onClick={(e)=>{e.preventDefault();this.onCancel()}}>Отменить</button>
                        {/* </div> */}
                    </div>  
                </div>            
            </div>
    }
    else return <span data-title="фильтр"  className={'param-filter-panel param-panel param-filter-panel__collapsed comment'} onClick={()=>{this.setState({ display: 'deployed' });}}><img src={this.props.imgSrc}></img></span> 
}
}

export default FilterPanel;