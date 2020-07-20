import React from 'react';
import './__users.scss';
import ListElem from './ListElem/ListElem'
import {Field, reduxForm} from "redux-form";
import {required, maxLengthCreator} from '../../utils/fieldValidators/fieldValidators'
import {Input} from '../../Common/Input/Input'
import Dropdown from '../../Visualization/Dashboards/Components/FilterPanel/dropdown/dropdown'
const length10 = maxLengthCreator(10)
function onAdminChange(e){
    
    if(e.nativeEvent.detail==0) e.preventDefault()
}
const form = (props) => { 
    // console.log(props)
    
    if(props.mode==='addUser') {
       let modules = {...props.modules}
    //    let indexes = {...props.dropdowns.indexes}
    //    console.log(modules)
    //    console.log(indexes)
    
        return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Добавить пользователя</header>
            <form  className="modal-form" onSubmit={props.handleSubmit}>
                {/* <span className="settings_text">Добавить пользователя</span>	 */}
                {/* <div> */}
                    <p><label>Логин: <Field name="login" placeholder={"Логин"} component={Input} /></label></p>
                    {/* validate={[required, length10]} */}
                    <p><label>Пароль: <Field name="password" placeholder={"Пароль"} type="password" component={"input"}/></label></p>
                    <p><label>Повторный пароль: <Field name="password_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label></p>
                    <p className="with-checkbox" ><label>Права администратора: <Field onChange={(e)=>{onAdminChange(e)}} name="admin"  component={"input"} type="checkbox"/></label></p>
                    <p> <Dropdown selected={modules.selected===undefined?[]:modules.selected} iniState={[]} name='modules' options={modules.all} 
                        preview={'Разрешенные к просмотру модули'} onChangeCallBack={(keyState,key)=>{props.onChangeDropdowns(keyState,key)}}/></p>
                    {/* <Dropdown selected={indexes.selected===undefined?[]:indexes.selected} iniState={[]} name='indexes' options={indexes.all} 
                        preview={'Разрешенные к просмотру таблицы'} onChangeCallBack={(keyState,key)=>{props.onChangeDropdowns(keyState,key)}}/> */}
                    <div>
                        <button >Добавить</button> <button onClick={props.callback}>Отмена</button>
                    </div>
                {/* </div> */}
            </form>
        </div>
    )}
    else return null
}

const AddForm =  reduxForm({form: 'addUser'})(form)

const form2 = (props) => {
    let {mode, username, handleSubmit, callback} = props
    if(mode==='changPass') {return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">{'Редактирование пароля для пользователя '+username}</header>
        <form  className="modal-form" onSubmit={handleSubmit}>
            <p><label>Старый пароль: <Field name="old_password" placeholder={"Старый пароль"} type="password" component={Input} validate={[required, length10]}/></label></p>
            <p><label>Пароль: <Field name="password" placeholder={"Новый пароль"} type="password" component={"input"}/></label></p>
            <p><label>Повторный пароль: <Field name="password_rep" placeholder={"Новый пароль повторно"} type="password" component={"input"}/></label></p>
            <div>
                <button >Добавить</button> <button onClick={callback}>Отмена</button>
            </div>
        </form>
        </div>
    )}
    else return null
}

const ChangeForm =  reduxForm({form: 'changPass'})(form2)

class __users extends React.Component {
    constructor(props) {
        super(props);
        let modules = [],
        modulesTranslate = {}
        for (const moduleKey in props.modules) {
            if (props.modules.hasOwnProperty(moduleKey)) {
                let Module = props.modules[moduleKey]
                modules.push({
                    value: moduleKey,
                    label: Module.title,
                    editedUserName: ''
                })
                modulesTranslate[moduleKey] = Module.title 
            }
        }
        this.state = {
            mode: '',
            edited: '',
            modules:{
                selected:[],
                all:modules
            },
            modulesTranslate
        }

        console.log(this.state)
      }
    updateIndexesList = (modulesList) =>{
        let indexes = []
        // console.log(modulesList)
        modulesList.forEach((moduleKey) => {  
            let Module = this.props.modules[moduleKey]
            // console.log(Module)    
                for (const indexKey in Module.indexes) {
                    if (Module.indexes.hasOwnProperty(indexKey)) {
                        indexes.push({
                            value: indexKey,
                            label: Module.indexes[indexKey].title
                    })
                    }
            } 
        })
        return indexes
    }
    onChangeDropdowns = (keyState,key) => {
        this.setState(state => {
            state.modules.selected = keyState 
            return state
        })
    }
    onDellUser = (id) => {
        this.props.delUserThunk(id)
    }
    onAddUser = (user) => {//user
        let {modules} = this.state
        this.props.addUserThunk(user,modules.selected)
        this.setState(state => ({
            mode: 'view'
        }));
    }
    onChangePass = (formData) => {
        this.props.changePassThunk(formData,this.state.edited.id)
        this.onChangeMode('')
    }
    onChangeMode = (mode) =>{
        this.setState(state => ({
            mode: mode
        }));
    }
    onSetEditedPass = (arg) =>{
        let name
        this.props.users.forEach((e)=>{
            if(e.id==arg.id) name = e.name
        })
        this.setState(state => ({
            edited: arg,
            editedUserName: name
        }));
        this.onChangeMode('changPass')

    }

    tabHeader = [
        {
           
            id: "0",
            name: "Логин",
            modules: "Доступ к модулям",
            admin: "Адм. права"
        }
    ]
    render() {
        console.log(this.props.users)
        console.log(this.props.modulesTranslate)

        let {mode, modules, editedUserName} = this.state
        console.log(this.tabHeader.concat(this.props.users))
        //this.tabHeader.concat
        let usersElements = this.tabHeader.concat(this.props.users).map((e,n) => {  
            // нулевой элемент это хедер таблицы
            if(n===0) return <ListElem name='list-elem' items={e} 
                key={e.id}  modules={modules}/>
                // console.log(e.modules)
                let copy = {...e}
                // let modules = Array.isArray(e.modules)?e.modules:e.modules.split(',');
                copy.modules = e.modules.map((e)=>{
                    // console.log(e)
                    return this.state.modulesTranslate!==undefined?this.state.modulesTranslate[e]:''
            }
            )
            // console.log(e.modules)
            return <ListElem name='list-elem' items={copy} 
            key={copy.id}
            elemChangeCallBack={this.onSetEditedPass} elemDellCallBack={this.onDellUser} modules={modules}/>
            })
        return  <div className="Settings__users">
                {/* <__header text={"Список пользователей"} clazz="Common__header Common__header_red"/> */}
                    <table className="Table__white-black Modules_table__cam-dev">
                        <tbody>
                            {usersElements}  
                        </tbody>
                    </table>
                    <button onClick={this.onChangeMode.bind(this, 'addUser')}>Добавить</button>
                <AddForm modules={modules} mode={mode} onSubmit={this.onAddUser} callback={this.onChangeMode.bind(this, 'view')} onChangeDropdowns={this.onChangeDropdowns.bind(this)} />
                <ChangeForm  username={editedUserName} mode={mode} onSubmit={this.onChangePass} callback={this.onChangeMode.bind(this, 'view')} />
                </div>
        }

}


export default __users;