
import Dropdown from './dropdown/dropdown.jsx'
import React from 'react';
// import './FilterPanel.scss'

  
  class FilterPanel extends React.Component{
    constructor(props){
        super(props)
        if(props.single)
        this.state = {
            params: {...props.iniState},
            display: 'collapsed'
        }
        else{
            let params = {}
            Object.keys(props.configObj).forEach(key => {
                params[key]= props.iniState[key]!==undefined?{...props.iniState[key]}:{}
            });
            this.state = {
                params,
                display: 'collapsed'
            };
        }
        this.onCleanFilter = this.onCleanFilter.bind(this);
        this.onDone = this.onDone.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.generateFiltersList = this.generateFiltersList.bind(this);
        this.onChangeField = this.onChangeField.bind(this);
      }

  onChangeField = (keyState,key,groupName)=>{
        if(this.props.single){
            this.setState(state => {
                state.params[key] = keyState 
                return state
              })
        }else{
            this.setState(state => {
                state.params[groupName][key] = keyState 
                return state
              })
        }
     
  }

generateFiltersList(configObj,filterState,groupName){
    let filter = []
    let options
    let onChangeCallBack
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
                filter.push(
                    <div className="multi-select__cont"><span>{this.props.fields[key].translate}</span><Dropdown selected={filterState[key]===undefined?[]:filterState[key]} iniState={filterState[key]===undefined?[]:filterState[key]} name={key} options={options} 
                        preview={this.props.fields[key].translate} onChangeCallBack={onChangeCallBack}/>
                    </div>
                    // <Dropdown selected={filterState[key]===undefined?[]:filterState[key]} iniState={filterState[key]===undefined?[]:filterState[key]} name={key} options={options} 
                    // preview={this.props.fields[key].translate} onChangeCallBack={onChangeCallBack}/>
                )
            }
        }
    }
    return filter
}

onDone(){
    this.setState({ display: 'collapsed' });
    this.props.submitCallBack(this.state.params)
}
onCancel(){
    console.log('onCancel')
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
        let src = require('./filter_'+this.props.color+'.svg')
        let filter = []
        // console.log(this.state.display)
        if(this.state.display==='deployed'){
            
            if(this.props.single){
                filter = this.generateFiltersList(this.props.configObj,this.state.params)
            }else Object.keys(this.props.configObj).map((key,n) => {
                    filter.push(
                        <div className="wrapper"><h2>{this.props.configObj[key].title}</h2>
                            {this.generateFiltersList(this.props.configObj[key].body,this.state.params[key],key)}
                        </div>
                    )
                
                }
            )
            //onClick={this.onDone}
            return <div className="modal-form-keeper param-panel param-filter-panel" >
                    <div  >
                        {/* <button onClick={()=>{this.setState({ display: 'collapsed' });}}><img src={require('./close.svg')}></img></button> */}
                        <header>
                            <span><img src={require('./filter_white.svg')}></img>Настройки параметрического фильтра</span>
                            <div>
                                <img data-title="сброс настроек фильтра" className='comment' onClick={this.onCleanFilter} src={require('./clean.svg')}></img>
                                <img onClick={()=>{this.setState({ display: 'collapsed' });}} src={require('../close.svg')}></img>
                                {/* <button data-title="сброс настроек фильтра" className='comment' onClick={this.onCleanFilter}><img src={require('./clean.svg')}></img></button>
                                <button onClick={()=>{this.setState({ display: 'collapsed' });}}><img src={require('../close.svg')}></img></button> */}
                            </div>
                        </header>
                        <div  className='modal-form modal-form_light-grey' onSubmit={this.onSubmit} >

                            <div className={this.props.single?"wrapper":"wrapper wrapper__columned"}>
                                {filter}  
                            </div>
                            {/* <input type="submit" value="Применить"/> */}
                            <div className='buttons-wrapper'>
                                
                                <button onClick={this.onDone}>Применить</button>
                                    {/* <input type="submit" value="Применить"/> */}
                                <button onClick={this.onCancel}>Отменить</button>
                            </div>
                        </div>  
                    </div>            
                </div>
        }
        else return <span className={'param-filter-panel param-panel param-filter-panel__collapsed'} onClick={(event)=>{ event.preventDefault();this.setState({ display: 'deployed' });}}><img src={src}></img></span> 
}
}

export default FilterPanel;


// import Dropdown from './dropdown/dropdown.jsx'
// import React from 'react';
// import './FilterPanel.scss'

  
//   class FilterPanel extends React.Component{
//     constructor(props){
//         super(props)
//         if(props.single)
//         this.state = {
//             params: {...props.iniState},
//             display: 'collapsed'
//         }
//         else{
//             let params = {}
//             Object.keys(props.configObj).forEach(key => {
//                 params[key]= props.iniState[key]!==undefined?{...props.iniState[key]}:{}
//             });
//             this.state = {
//                 params,
//                 display: 'collapsed'
//             };
//         }
//         console.log(this.state.params)
//         this.onSubmit = this.onSubmit.bind(this);
//         this.onCancel = this.onCancel.bind(this);
//         this.generateFiltersList = this.generateFiltersList.bind(this);
//         this.onChangeField = this.onChangeField.bind(this);
//       }

//   onChangeField = (keyState,key,groupName)=>{
//         if(this.props.single){
//             this.setState(state => {
//                 state.params[key] = keyState 
//                 return state
//               })
//         }else{
//             this.setState(state => {
//                 state.params[groupName][key] = keyState 
//                 return state
//               })
//         }
     
//   }

// generateFiltersList(configObj,filterState,groupName){
//     // console.log(this.props)
//     let filter = []
//     let options
//     let onChangeCallBack
//     if(this.props.single||groupName==='secondField') onChangeCallBack = (keyState,key)=>{this.onChangeField(keyState,key,'secondField')}
//     else {onChangeCallBack = (keyState,key)=>{this.onChangeField(keyState,key,'mainField')}}//onChangeCallBack = this.props.configObj[groupName].callback} //(keyState,key)=>{this.onChangeField(keyState,key,'mainField')}}
//     for (const key in configObj) {
//         if (configObj.hasOwnProperty(key)) {
//             if(Array.isArray(configObj[key])){
//                 options = configObj[key].map((e,n) => {
//                     return {
//                         value: e,
//                         label: e,
//                     } 
//                 })
//                 filter.push(
//                     <Dropdown selected={filterState[key]===undefined?[]:filterState[key]} iniState={filterState[key]===undefined?[]:filterState[key]} name={key} options={options} 
//                     preview={this.props.fields[key].translate} onChangeCallBack={onChangeCallBack}/>
//                 )
//             }
//         }
//     }
//     return filter
// }

// onSubmit(event){
//     event.preventDefault()
//     this.setState({ display: 'collapsed' });
//     this.props.submitCallBack(this.state.params)
// }
// onCancel(){
//     this.setState({ display: 'collapsed' });
// }

//     render() {
//         console.log(this.state)
//         let src = require('./filter_'+this.props.color+'.svg')
//         let filter = []
//     if(this.state.display==='deployed'){
         
//         if(this.props.single){
//             filter = this.generateFiltersList(this.props.configObj,this.state.params)
//         }else Object.keys(this.props.configObj).map((key,n) => {
//                 filter.push(
//                     <div className="wrapper"><h2>{this.props.configObj[key].title}</h2>
//                         {this.generateFiltersList(this.props.configObj[key].body,this.state.params[key],key)}
//                     </div>
//                 )
               
//             }
//         )
//         return <div className="modal-form-keeper param-panel param-filter-panel"  >
//                 <div>
//                     <header><span><img src={require('./filter_white.svg')}></img>Настройки параметрического фильтра</span><button onClick={()=>{this.setState({ display: 'collapsed' });}}><img src={require('./close.svg')}></img></button></header>
//                         <form  className='modal-form_light-grey' onSubmit={this.onSubmit} >
//                         <div className={this.props.single?"wrapper":"wrapper wrapper__columned"}>
//                             {filter}  
//                         </div>
//                         <input type="submit" value="Применить"/><button onClick={this.onCancel}>Отменить</button>
//                     </form>  
//                 </div>            
//             </div>
//     }
//     else return <span className={'param-filter-panel param-panel param-filter-panel__collapsed'} onClick={()=>{this.setState({ display: 'deployed' });}}><img src={src}></img></span> 
// }
// }

// export default FilterPanel;