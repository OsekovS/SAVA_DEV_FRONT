import React from 'react';
import {Field, reduxForm} from "redux-form";
import './Email.scss'
import ListElem from './ListElem/ListElem'

import SmtpSetForm  from  './SmtpSetForm/SmtpSetFormCont'
import Dropdown from './FilterPanel/dropdown/dropdown.jsx'
import AddEventForm  from  './AddEventForm/AddEventForm'
import { number } from 'prop-types';

class Email extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter :{},
            eventsFormViewed: false,
            adressFormViewed: false,
            adressEventsViewed: false,
            adressFormFilter: null,
            changedEventsList: null
        }
        props.getEvensAndAdressesThunk()
        // this.addEventForm =  reduxForm({form: 'addEventForm'})(this.eventForm)
        this.addAdressForm =  reduxForm({form: 'addAdressForm'})(this.adressForm)
        this.changeAdressEventsForm =  reduxForm({form: 'adressEventsForm'})(this.adressEventsForm)

        this.onModuleChange = this.onModuleChange.bind(this)
        this.onNewFilterChange = this.onNewFilterChange.bind(this)
        this.onAddEvent = this.onAddEvent.bind(this)
        this.onAddAdress = this.onAddAdress.bind(this)
        this.onAdressRedact = this.onAdressRedact.bind(this)
        this.onEditAdressEvents = this.onEditAdressEvents.bind(this)
        
    }
    componentDidMount(){
        let {modules} = this.props, indexes
        this.translateObj = {}
        for (const moduleKey in modules) {
            if (modules.hasOwnProperty(moduleKey)) {
                this.translateObj[moduleKey]={}
                this.translateObj[moduleKey].title = modules[moduleKey].title
                this.translateObj[moduleKey].indexes = {}
                indexes = modules[moduleKey].indexes
                for (const indexKey in indexes) {
                    if (indexes.hasOwnProperty(indexKey)) {
                        this.translateObj[moduleKey].indexes[indexKey] = modules[moduleKey].indexes[indexKey].title
                    }
                }
            }
        }
        
    }
    // form,add
    onAddEvent = (form) => {
        let pack = {...form}
        let {events, onAddEventThunk} = this.props
        pack.filter = JSON.stringify(form.filter)
        if(events)events.some((element, numb) => {
            if(element.id+'' !== (numb+'')){
                pack.id = numb
                return true
            }
                
        });else pack.id = '1'
        pack.id=String(pack.id===undefined?events.length:pack.id)
        //проверка того что все поля, в т.ч. имя заполнены
        if(Object.keys(pack).length<5 || pack.name.length===0 ) alert(Object.keys(form.filter).length===0?'Необходимо настроить фильтр':'Необходимо заполнить все поля')
        else{
            onAddEventThunk(pack)
            this.setState({eventsFormViewed:false})
        }
    }

    onAddAdress = (form) => {
        let pack = {...form}, {adressFormFilter} = this.state
        if(adressFormFilter && adressFormFilter.length>0) pack.events = this.state.adressFormFilter
        let {addresses, onAddAdressThunk} = this.props
        console.log(addresses)
        if(addresses)addresses.some((element, numb) => {
            if(element.id+'' !== (numb+'')){
                pack.id = numb
                return true
            }
        });else pack.id = '0'
        pack.id=pack.id===undefined?addresses.length:pack.id
        console.log(pack)
        //проверка того что все поля, в т.ч. имя заполнены
        if(Object.keys(pack).length<4) alert('Необходимо заполнить все поля')
        else{
            onAddAdressThunk(pack)
            this.setState({adressFormViewed:false})
        }
    }

    onEventsListChange = (events) => {
        console.log(events)
        this.setState(state => {
            state.changedEventsList = events
            return state
        })
    }
    
    onAdressRedact = (numb) => {
        console.log(numb)
        let {addresses, events} = this.props, iniEvents,iniState=[],adressName,adressTheme
        console.log(addresses)
        // console.log(events)
        for (let index = 0; index < addresses.length; index++) {
            console.log(addresses[index])
            if(addresses[index].id==numb){
                adressName = addresses[index].name
                adressTheme = addresses[index].theme
                iniEvents = JSON.parse(addresses[index].events)
                break;
            }
        }
        console.log(iniEvents)
        this.setState({
            adressEventsViewed:{numb,adressName,adressTheme}
        })
        console.log(iniEvents)
        iniEvents.forEach(element => {
            iniState.push({
                value: events[element].id,
                label: events[element].name
            })
        });
        console.log(iniState)
        this.setState(state => {
            state.changedEventsList = iniEvents

            return state
        })
    }

    onModuleChange = (value) => {
        this.setState(state => {
            state.curModule = value
            return state
        })
    }

    onNewFilterChange = (filter) => {
        this.setState(state => {
            state.filter = filter
            return state
        })
    }

    onIndexChange = (value) => {
        this.setState(state => {
            state.curIndex = value
            return state
        })
    }

    // eventForm = (props) => {
        
    // }

    adressForm = (props) => {
        let {events, filterState, onChangeFilterCallBack} = props
        let eventsForDropdown = events?events.map(({id,name}) => {
            return {
                value: id,
                label: name,
            } 
        }):null
        // console.log(eventsForDropdown)
        if(props.view){
            return (
                <div className="modal-form-keeper" >
                    <div>
                        <header className="Common__header Common__header_red">Добавление получателя события</header>
                    <form className='modal-form_light-grey' onSubmit={props.handleSubmit}>
                        <label>Почтовый адрес:
                            <Field name='name' placeholder={'Название события'} component={"input"} type="text"/> 
                        </label>
                        <label>Название темы сообщения:
                            <Field name='theme' placeholder={'Название темы'} component={"input"} type="text"/> 
                        </label>
                        <label>События:
                            <Dropdown selected={filterState===null?[]:filterState} iniState={[]} name='events' options={eventsForDropdown} 
                                preview='События' onChangeCallBack={onChangeFilterCallBack}/>
                        </label>
                        <div>
                            <input type="submit" value="Добавить"/>
                            <button onClick={(e)=>{e.preventDefault();props.onClose()}}> Отменить</button>
                        </div>
                    </form>
                    </div>

                </div>
            ) 
        }else return null
    }

    onEditAdressEvents = (form) => {
    
        let {changedEventsList, adressEventsViewed} = this.state
        this.props.onEditAdressEventsThunk(adressEventsViewed.numb,JSON.stringify(changedEventsList), form.newTheme)
        this.setState(state => {
            state.adressEventsViewed = false
            return state
        })
    }

    adressEventsForm = (props) => {
        
        let {view, allEvents, addresses, filterCurList, onEventsListChange} = props, iniEvents, iniState = [], adressName,eventsForDropdown

        if(view.numb){
            eventsForDropdown = allEvents?allEvents.map(({id,name}) => {
                return {
                    value: id,
                    label: name,
                } 
            }):null
            return (
                <div className="modal-form-keeper" >
                    <div>
                    <header className="Common__header Common__header_red">{'Изменение событий на которые подписан адрес '+view.adressName}</header>
                <form className='modal-form_light-grey  modal-form__adresses' onSubmit={props.handleSubmit}>
                    <label>Выберите события:
                        <Dropdown selected={filterCurList===null?[]:filterCurList} iniState={filterCurList} name='events' options={eventsForDropdown} 
                            preview='События' onChangeCallBack={onEventsListChange}/>
                    </label>
                    <label>Тема:
                        <Field name='newTheme' placeholder={view.adressTheme} component={"input"} type="text"/> 
                    </label>
                    <div>
                        {/* <input type="submit" value="Добавить"/> */}
                        <button onClick={(e)=>{props.handleSubmit()}}> Применить</button>
                        <button onClick={(e)=>{e.preventDefault();props.onClose()}}> Отменить</button>
                    </div>
                </form>
                    </div>
                </div>
            ) 
        }return null
    }
    generateTableHeader = (header) => {
        // console.log(header)
        let pack = {}
        for (const key in header) {
            if (header.hasOwnProperty(key)&&header[key]!=='nope'&&key!=='id') {
                pack[key] = header[key]
            }
        }
        return pack
    }
    render(){
        console.log(this.props)
        let AddAdressForm = this.addAdressForm, AdressEventsForm=this.changeAdressEventsForm
        let {modules, events, addresses, onChangeEventFilterThunk, onDellEventThunk, onDellAdressThunk, modulesTranslate} = this.props
        let {eventsFormViewed, adressFormViewed, adressFormFilter, adressEventsViewed, changedEventsList} = this.state
        let curIndex, curModule, filterCompoent
        // 
        // console.log(adressEventsViewed) && events.length>0
  
        let eventsComponents,addressesComponents 
        if(modules!==undefined && this.translateObj!==undefined ){
            let header,pack
            header = this.generateTableHeader({
                events: "nope",
                login: "Добавлено пользователем",
                name: "email адрес",
                theme: "Тема сообщения",
                id: "0",
                
                login: "Добавлено пользователем",
                
                
            })
            addressesComponents = [<ListElem name='list-elem' items={header} key={0}  delete={false} id={0} />]
            if(addresses)addresses.forEach((element, numb) => {
                // if(numb===0){
                //     header = this.generateTableHeader(element)
                //     return <ListElem name='list-elem' items={header} key={numb}  delete={false} id={numb} />
                // }
                pack = { }
                Object.keys(header).forEach((key)=>{
                    pack[key]= element[key]
                })
                // console.log(addresse/sComponents)
                addressesComponents.push( <ListElem name='list-elem' items={pack} key={numb} elemDellCallBack={()=>{onDellAdressThunk(element.id)}} id={element.id} delete={true} change={true} onChangeClick={(numb)=>{this.onAdressRedact(numb)}}/>)
            });
             header = this.generateTableHeader({
                name: "Название",
                modulename: "Модуль",
                indexname: "Таблица",
                filter: "nope",
                id: "0",                
                login: "Добавлено пользователем",                                
            })
            eventsComponents = [<ListElem name='list-elem' items={header} key={0}  delete={false} id={0} />]//[]
           
            if(events)events.forEach((element, numb) => {

                // if(numb===0){
                //     header = this.generateTableHeader(element)
                //     return <ListElem name='list-elem' items={header} key={numb}  delete={false} id={numb} />
                // }
                let {modulename, indexname,login,filter,id} = element
                pack = { }
                // console.log(modulesTranslate)
                if(modulesTranslate){
                    Object.keys(header).forEach((key)=>{
                        if(key==='indexname') pack[key] = modulesTranslate.indexes[element[key]]
                        else if(key==='modulename') pack[key] = modulesTranslate[element[key]]
                        else pack[key] = element[key]
                    })
                }

                // console.log(pack)
                let configObj = modules[modulename].indexes[indexname].filter
                let fields = modules[modulename].indexes[indexname].fields
               
                eventsComponents.push( <ListElem name='list-elem' items={pack} key={numb} elemDellCallBack={()=>{onDellEventThunk(id)}} filter={true} iniState={JSON.parse(filter)} delete={true} id={numb} filterConfigObj={configObj} fields={fields} onFilterChange={(filter)=>{onChangeEventFilterThunk(element.id, login, filter)}}/>)
            });
            
        }
        return <div className="Settings__email">
            <SmtpSetForm/>
                <div>
                    Cписок адресов
                    <div className='scroll'>
                        <table className='Table__white-black'>
                            <tbody>
                                {addressesComponents}
                            </tbody>
                        </table>
                    
                    </div>
                    <button onClick={()=>{this.setState({adressFormViewed:true})}}>добавить</button>
                   
                </div>
                <div>
                    Cобытия
                    <div className='scroll'>
                    <table className='Table__white-black'>
                            <tbody>
                                {eventsComponents}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={()=>{this.setState({eventsFormViewed:true})}}>добавить</button>
                </div>
                {/* onSubmit={this.onAddEvent} onClose={()=>{this.setState({eventsFormViewed:false})}}  onModuleChange={this.onModuleChange} onIndexChange={this.onIndexChange} */}
                <AddEventForm view={eventsFormViewed} selectedState={this.state} modules={modules} filter={filterCompoent} onClose={()=>{this.setState({eventsFormViewed:false})}} onSubmit={this.onAddEvent}/>
                <AddAdressForm onChangeFilterCallBack={(e)=>{this.setState({adressFormFilter:e})}} filterState={adressFormFilter} events={events} onSubmit={this.onAddAdress} view={adressFormViewed}  onClose={()=>{this.setState({adressFormViewed:false})}}/>
                <AdressEventsForm onSubmit={this.onEditAdressEvents}  view={adressEventsViewed} allEvents={events} addresses={addresses} onEventsListChange={(e)=>{this.onEventsListChange(e)}} filterCurList={changedEventsList} onClose = {()=>{this.setState({adressEventsViewed: false})}}/>
                
                </div>
    }
}
export default Email;