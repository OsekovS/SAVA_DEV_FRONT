import React from 'react';
import './Cameras.scss'
import __header from '../../../Common/__header/__header'
import ListElem from '../../../Common/ListElem/ListElem'
import {Field, reduxForm} from "redux-form";


class Cameras extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mode: '', edited: ''}
            // Эта привязка обязательна для работы `this` в колбэке. .bind(this,'addUser')
        //this.onChangeMode = this.onChangeMode.bind(this, 'addUser');
        // this.onLogOut = this.onLogOut.bind(this);
      }


     onAddField = (formData) => {
        console.log(this.state.mode)
        if(this.state.mode==='addReg'||this.state.mode==='addCam')
        {
             if(formData.obj===undefined)
                formData.obj = Object.values(this.props.objects)[0].name
            else{
                Object.values(this.props.objects).map((e) => {
                    if(e.id==formData.obj) formData.obj = e.name
                })
            }
        }
        // console.log('changeField')
        // console.log(formData)
        let a = {form: formData}
        a.mode = this.state.mode;
        this.props.addFieldThunk(a)
        this.onChangeMode({mode: '',id: ''}) 
    }


     onDelCamera = (id) => {
        
        this.props.delFieldThunk({id:id, delete:'cameras'})
    }

     onDelRegistrator = (id) => {
        this.props.delFieldThunk({id:id, delete:'registrators'})
    }

     onDelObject = (id) => {
        let obj = {id:id, delete:'object'}
        this.props.objects.forEach(element => {
            if(element.id==id) obj.objName = element.name
        });
        this.props.delFieldThunk(obj)

        // props.delFieldThunk({id:id, delete:'object_list', 
        // object: Object.values(props.objects).map((e) => {
        //     if(e.id==id) return e.name
        //     })
        // })
    }

    //  onChangeCamera = (formData) => {
    //     console.log('change')
    //     // props.delCam(formData)
    // }

    //  onChangeRegistrator = (formData) => {
    //     this.props.changeReg(formData)
    // }

    //  onChangeObject = (formData) => {
    //     this.props.changeObj(formData)
    // }
     onChangeMode = ({mode,id}) =>{
        // console.log(mode)
        // console.log(this.state)
        // console.log(mode)
        this.setState(state => ({
            mode: mode,
            edited: id
        }));
        // if(id!==undefined) {
        //     this.setState(state => ({
            
        //     }));
        // }
        // console.log(this.state)
    }

    onChange = (formData) =>{
        // console.log(this.state)
        // console.log(this.props.objects[this.state.edited])
        this.props.changeElemThunk(formData,this.state)
        this.onChangeMode({mode: '',id: ''}) 
    }

    render() {
        console.log(this.props)
    let objectsElements = this.props.objects.map((e,n) =>{ 
        return <ListElem name='list-elem' items={e} key={n.toString()}
        elemChangeCallBack={this.onChangeMode} elemDellCallBack={this.onDelObject}  changeType={'changObj'}/>})

    let camerasElements = this.props.cameras.map((e,n) => <ListElem name='list-elem' items={e} key={n.toString()}
        elemChangeCallBack={this.onChangeMode} elemDellCallBack={this.onDelCamera} changeType={'changCam'}/>)


    let registratorsElements = this.props.registrators.map((e,n) => <ListElem name='list-elem' items={e} key={n.toString()}
        elemChangeCallBack={this.onChangeMode} elemDellCallBack={this.onDelRegistrator}  changeType={'changReg'}/>)

    return <div className="Settings__cameras">
        <header className="Common__header Common__header_red">Объекты инфраструктуры</header>
        <table className="Modules_table Modules_table__cam-obj">
            <tbody>
                {objectsElements}
            </tbody>
        </table>
        <button onClick={this.onChangeMode.bind(this,{mode: 'addObj',id:''})}>Добавить</button>
        <ObjectsReduxForm  onSubmit={this.onAddField.bind(this)}  mode={this.state.mode} callback={this.onChangeMode}/>
        <ChangObjsForm  onSubmit={this.onChange.bind(this)} mode={this.state.mode} callback={this.onChangeMode}/>
        <header className="Common__header Common__header_red">Список камер</header>
        <table className="Modules_table Modules_table__cam-dev">
            <tbody>
                <ListElem  name='list-elem list-elem__cameras list-elem__title' items={['','объект', 'имя' , 'ip адрес', 'логин']  }/>
                {camerasElements}   
            </tbody>
        </table>
        <button onClick={this.onChangeMode.bind(this,{mode: 'addCam'})}>Добавить</button>
        <CamerasReduxForm objects={this.props.objects}  onSubmit={this.onAddField.bind(this)}  mode={this.state.mode} callback={this.onChangeMode} />
        <ChangCamsForm  onSubmit={this.onChange.bind(this)} mode={this.state.mode} callback={this.onChangeMode}/>
        <header className="Common__header Common__header_red">Список регистраторов</header>
        <table className="Modules_table Modules_table__cam-dev">
            <tbody>
            <ListElem  name='list-elem list-elem__cameras list-elem__title' items={['','объект', 'имя' , 'ip адрес', 'логин']  }/>
                {registratorsElements}
            </tbody>
        </table>
        <button onClick={this.onChangeMode.bind(this,{mode: 'addReg'})}>Добавить</button>
        <RegsReduxForm objects={this.props.objects}  onSubmit={this.onAddField.bind(this)}  mode={this.state.mode} callback={this.onChangeMode} />
        <ChangRegsForm  onSubmit={this.onChange.bind(this)} mode={this.state.mode} callback={this.onChangeMode}/>
        </div>
    }
}
export default Cameras;


const cameras_form = (props) => {
    let objectsElements = props.objects.map((e,n) => <option value={e.id} key={n.toString()}>{e.name}</option>)
    if(props.mode==='addCam') return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Добавить камеру</header>
        <form className="modal-form" onSubmit={props.handleSubmit}>	
            <label>Объект: 
                <Field name="obj" component={"select"} >
                    {objectsElements}
                </Field>
            </label>
            <label>Ip адрес: <Field name="ip" placeholder={"Ip"} component={"input"} type="text"/></label>
            <label>Имя: <Field name="name" placeholder={"Имя"} component={"input"} type="text"/></label>
            <label>Логин: <Field name="login" placeholder={"Логин"} component={"input"} type="text"/></label>
            <label>Пароль: <Field name="pass" placeholder={"Пароль"} type="password" component={"input"}/></label>
            <label>Повторный пароль: <Field name="pass_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label>           
            <div>
                <button>Добавить</button> <button onClick={props.callback.bind(this,'view')}>Отмена</button>
            </div>
        </form>
        </div>  
    )
    else return null
}

const CamerasReduxForm =  reduxForm({form: 'addCamCam'})(cameras_form)

const objects_form = (props) => {
    if(props.mode==='addObj') return (
        <div className="modal-form-keeper modal-form-keeper__small" >
            <header className="Common__header Common__header_red">Добавить объект</header>
        <form className="modal-form" onSubmit={props.handleSubmit}>	
            <label>Название: <Field name="name" placeholder={"Название объекта"} component={"input"} type="text"/></label>         
            <div>
                <button>Добавить</button> <button onClick={props.callback.bind(this,'view')}>Отмена</button>
            </div>
        </form>
        </div>
    )
    else return null
}

const ObjectsReduxForm =  reduxForm({form: 'addCamObj'})(objects_form)

const regs_form = (props) => {
    let objectsElements = props.objects.map((e,n) => <option value={e.id} key={n.toString()}>{e.name}</option>)
    if(props.mode==='addReg') return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Добавить регистратор</header>
        <form className="modal-form" onSubmit={props.handleSubmit}>
            <label>Объект: 
                <Field name="obj" component={"select"} >
                    {objectsElements}
                </Field>
            </label>
            <label>Ip адрес: <Field name="ip" placeholder={"Ip"} component={"input"} type="text"/></label>
            <label>Имя: <Field name="name" placeholder={"Имя"} component={"input"} type="text"/></label>
            <label>Логин: <Field name="login" placeholder={"Логин"} component={"input"} type="text"/></label>
            <label>Пароль: <Field name="pass" placeholder={"Пароль"} type="password" component={"input"}/></label>
            <label>Повторный пароль: <Field name="pass_rep" placeholder={"Повторный пароль"} type="password" component={"input"}/></label>           
            <div>
                <button>Добавить</button> <button onClick={props.callback.bind(this,'view')}>Отмена</button>
            </div>
        </form>
        </div>
    )
    else return null
}

const RegsReduxForm =  reduxForm({form: 'addCamReg'})(regs_form)

const change_regs_form = (props) => {
    if(props.mode==='changReg') return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Изменение параметров регистратора</header>
        <form className="modal-form" onSubmit={props.handleSubmit}>
            <label>Новый логин: <Field name="login" placeholder={"Логин"} component={"input"} type="text"/></label>
            <label>Пароль: <Field name="old_pass" placeholder={"Пароль"} type="password" component={"input"}/></label>
            <label>Новый пароль: <Field name="pass" placeholder={"Новый пароль"} type="password" component={"input"}/></label>
            <label>Повторный новый пароль: <Field name="pass_rep" placeholder={"Повторный новый пароль"} type="password" component={"input"}/></label>             
            <div>
                <button>Изменить</button> <button onClick={props.callback.bind(this,'view')}>Отмена</button>
            </div>
        </form>
        </div>
    )
    else return null
}

const ChangRegsForm =  reduxForm({form: 'changCamReg'})(change_regs_form)


const change_cams_form = (props) => {
    if(props.mode==='changCam') return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Изменение параметров камеры</header>
        <form className="modal-form" onSubmit={props.handleSubmit}>
            <label>Новый логин: <Field name="login" placeholder={"Логин"} component={"input"} type="text"/></label>
            <label>Пароль: <Field name="old_pass" placeholder={"Пароль"} type="password" component={"input"}/></label>
            <label>Новый пароль: <Field name="pass" placeholder={"Новый пароль"} type="password" component={"input"}/></label>
            <label>Повторный новый пароль: <Field name="pass_rep" placeholder={"Повторный новый пароль"} type="password" component={"input"}/></label>           
            <div>
                <button>Изменить</button> <button onClick={props.callback.bind(this,'view')}>Отмена</button>
            </div>
        </form>
        </div>
    )
    else return null
}

const ChangCamsForm =  reduxForm({form: 'changCamCam'})(change_cams_form)

const change_objs_form = (props) => {
    // console.log(props)
    if(props.mode==='changObj') return (
        <div className="modal-form-keeper" >
            <header className="Common__header Common__header_red">Изменение названия объекта</header>
        <form className="modal-form" onSubmit={props.handleSubmit}>
            <label>Новое название: <Field name="name" placeholder={"Имя"} component={"input"} type="text"/></label>          
            <div>
                <button>Изменить</button> <button onClick={props.callback.bind(this,'view')}>Отмена</button>
            </div>
        </form>
        </div>
    )
    else return null
}

const ChangObjsForm =  reduxForm({form: 'changCamObj'})(change_objs_form)