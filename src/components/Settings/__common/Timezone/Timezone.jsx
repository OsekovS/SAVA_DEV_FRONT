import React from 'react';
import {Field, reduxForm} from "redux-form";
import './Timezone.scss'

class Timezone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {ntp_servers:  props.ntp_servers}
        this.ReduxForm = reduxForm({form: 'timezone'})(this.form)
        // this.onAdd = this.onAdd.bind(this)
        this.onChangeDel = this.onChangeDel.bind(this)
        // this.onDel = this.onDel.bind(this)
        this.getInitialValues = this.getInitialValues.bind(this)
        
    }
    

    form = (props) => {
        let {ntp_servers, onDel, onChangeDel} = props, name, Servers = []
        for (const key in ntp_servers) {
            if (ntp_servers.hasOwnProperty(key)) {
                name = key;
                if(props.deleted===key) Servers.push( <label className='withDelMode'  onMouseOver={()=>{onChangeDel(key,true)}}  onMouseOut={()=>{onChangeDel(key,false)}} >{name}
                    <Field name={name} placeholder={ntp_servers[key]} component={"input"} type="text"/>
                    <span onClick={()=>{onDel(key)}}>-</span>
                </label>)
                else Servers.push( <label  onMouseOver={()=>{onChangeDel(key,true)}}  onMouseOut={()=>{onChangeDel(key,false)}} >{name}
                    <Field name={name} placeholder={ntp_servers[key]} component={"input"} type="text"/> 
                    <span onClick={()=>{onDel(key)}}>-</span>
                </label>)
            }
        }
        // let Servers = props.ntp_servers.map((e,n) => {
        //     let name = 'NTP server'+(n+1)+':';
        //     if(props.deleted===n) return <label className='withDelMode'  onMouseOver={()=>{props.onChangeDel(n,true)}}  onMouseOut={()=>{props.onChangeDel(n,false)}} >{name}
        //             <Field name={name} placeholder={e} component={"input"} type="text"/>
        //             <span onClick={()=>{console.log('del');props.onDel(name)}}>-</span>
        //         </label>
        //     else return <label  onMouseOver={()=>{props.onChangeDel(n,true)}}  onMouseOut={()=>{props.onChangeDel(n,false)}} >{name}
        //             <Field name={name} placeholder={e} component={"input"} type="text"/> 
        //             <span onClick={()=>{console.log('del');props.onDel(name)}}>-</span>
        //         </label>
        // });
        return (
            <form onSubmit={props.handleSubmit}>
                {Servers}
                <div>
                    <button onClick={(e)=>{e.preventDefault();props.onAdd()}}>Добавить</button>
                    <button> Настроить</button>
                </div>
            </form>
        )
    }
    // onAdd = () => {
    //     this.setState(state => {
    //         let newState = {...state}
    //         newState.ntp_servers = [...state.ntp_servers]
    //         newState.ntp_servers.push('Введите новое значение')
    //         return newState
    //       })
    // }
    // onDel = (numb) => {
    //     this.props.delTimezoneActionCreator(numb)
    //     // this.setState(state => {
    //     //     let newState = {...state}
    //     //     newState.ntp_servers = state.ntp_servers.filter((e,n) => n!==numb);
    //     //     return newState
    //     //   })
    // }
    onChangeDel = (key,set) => {
        console.log(key)
        this.setState(state => {
            state.deleted = set?key:null
            return state
          })
    }
    
    getInitialValues = () => {
        let Servers = {...this.props.ntp_servers}

        // for (const key in this.props.ntp_servers) {
        //     if (object.hasOwnProperty(key)) {
        //         const element = object[key];
                
        //     }
        // }
        // this.props.ntp_servers.forEach((e,n) => {
        //     Servers['NTP server'+(n+1)+':'] = e
        // });
        return Servers
    }
    render() {  
        console.log(this.props.ntp_servers)
        // initialValues={this.getInitialValues()}
        let ReduxForm = this.ReduxForm
        return <div className="Settings__Timezone">
        <h2 className="h2__center">Настройки часового пояса</h2>	
        <ReduxForm  ntp_servers={this.props.ntp_servers} onSubmit={this.props.updateTimezoneActionThunk} onAdd={this.props.addTimezoneActionCreator} deleted={this.state.deleted} onChangeDel={this.onChangeDel} onDel={this.props.delTimezoneActionCreator}/>
        </div>
    }
}

export default Timezone;