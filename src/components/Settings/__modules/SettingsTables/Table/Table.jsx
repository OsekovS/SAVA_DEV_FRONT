import React from 'react';
import ListElem from './ListElem/ListElem'
import {Field, reduxForm} from "redux-form";
import './Table.scss'


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mode: '', edited: ''}
        let { dbName, tableName} = props
        this.onDell = this.onDell.bind(this)
        this.onAddField = this.onAddField.bind(this)
        this.onChangeMode = this.onChangeMode.bind(this)
        this.props.getTableList(dbName, tableName)
        this.AddForm =  reduxForm({form: 'addForm'})(this.objects_form('addMode','Добавить'))
        this.ChangeForm =  reduxForm({form: 'changeForm'})(this.objects_form('changeMode','Изменить'))
    }

    objects_form = (mode, submitText) => {
        let titleDop
        
       
        // let submitMyForm = (data) =>{
        //     const {createRecord, resetForm} = this.props;
        //     return createRecord(data).then(() => {
        //       resetForm();
        //       // do other success stuff
        //     });
        //   }

        // let controlPassword, titleDop
        if(mode==='changeMode'){
            // controlPassword = <>
            //     <label>Старый пароль <Field name="old_pass" placeholder={"Старый пароль"} type="password" component={"input"}/></label>
            // </>
            titleDop = ' (редактирование: заполните те поля, которые необходимо изменить)'
        }else titleDop = ' (добавление)'
        return (props) =>{
            // console.log(props.objects)
            if(props.mode===mode){
                let fields = props.formFields.map(element => {
                    let {name, text, type, component} = element;
                    if(component==='select'){
                        let objectsElements = [<option  selected style={{width:100}} value={''} key={0}>{''}</option>]
                        props.objects.forEach((element,n) => {
                            objectsElements.push(<option style={{width:100}} value={element.name} key={n.toString()}>{element.name}</option>)
                        });
                        // props.objects.map((element,n) => {
                        //     if(n===0) return<option  selected style={{width:100}} value={element[1]} key={n.toString()}>{element[1]}</option>
                        //     else return <option style={{width:100}} value={element[1]} key={n.toString()}>{element[1]}</option>
                        // });
                        // console.log(objectsElements)
                        return  <label>{text} 
                                    <Field name="obj" component={"select"}  >
                                        {objectsElements}
                                    </Field>
                                </label>
                    }else return <label>{text} <Field name={name} placeholder={text} component={component} type={type} /></label> 
                });
                // if(mode==='changeMode') fields.push(controlPassword)
                return (
                    <div className={"modal-form-keeper"+' modal-form-keeper__'+props.dbName} >
                        <header className="Common__header Common__header_red">{props.title+titleDop}</header>
                        <form className="modal-form modal-form_light-grey" onSubmit={props.handleSubmit}>
                            {fields}
                            <div>
                            <button>{submitText}</button> <button onClick={()=>{this.setState(state => ({mode: 'view'}))}}>Отменить</button> 
                                
                            </div>
                        </form>
                    </div>
                )
            }  
            else return null
        }
    }

    onAddField = (formData) => {
        // console.log(this.props)
        // console.log(tableName)
        let {dbName, tableName,content} = this.props
        let length = content!==undefined?0:content[0].length
        this.props.addFieldThunk(formData, length, dbName, tableName, this.props.formFields)
        this.setState(state => ({mode: 'view'}))
    }

    onChangeMode = (form) =>{
        let {dbName, tableName} = this.props
        this.props.changeFieldThunk(this.state.edited, form, dbName, tableName)
        this.setState(state => ({mode: 'view'}))

        // //сбрасываем поля формы
        // const {createRecord, resetForm} = this.props;
        // console.log(createRecord)
        // console.log(resetForm)
        // return createRecord(form).then(() => {
        //   resetForm();
        //   // do other success stuff
        // });
    }

    onDell = (obj) => {
        // console.log(obj)
        let {dbName, tableName} = this.props
        this.props.delFieldThunk(obj.id, obj.name, dbName, tableName)
    }

    elemsToArray = (list) => {
        // console.log(list)
        return list.map((e,n) => {
            return Object.values(e)
        })
    }

    render() {
        // console.log(this.props)
        // console.log(Object.values(this.props.content))
        // console.log(this.props.content)

        if(this.props.content!==undefined) 
        {
            // console.log(this.elemsToArray(this.props.content))
            let {title, content, formFields, dbName, objects} = this.props
            let elemsArray = this.elemsToArray(this.props.content)

            let header = formFields.map(e=>e.text)
            let Elements = elemsArray===undefined?null:elemsArray.map((e,n) => {
                return  <ListElem name='list-elem' items={e} key={n.toString()}
            elemChangeCallBack={(obj)=>{this.setState(state => ({ mode: 'changeMode',edited: obj.id }))}} elemDellCallBack={this.onDell} withChange={true} withDel={true} from={1}/>
            })
    
            if(elemsArray!==undefined) Elements.unshift( <ListElem name='list-elem' items={header} key={elemsArray.length+1}  from={0}/>)
    
            let AddForm = this.AddForm
            let ChangeForm = this.ChangeForm
    
            // return null
            return  <div className='Settings-content-table'>
                        <header className="Common__header Common__header_red">{title}</header>
                        <table className="Table Table__white-black">
                            <tbody>
                                {Elements}
                            </tbody>
                        </table>
                        <button onClick={()=>{this.setState(state => ({ mode: 'addMode' }))}}>Добавить</button> 
                        <AddForm mode={this.state.mode} onSubmit={this.onAddField} callback={this.onChangeMode} formFields={formFields} dbName={dbName} objects={objects} title={title}/>
                        <ChangeForm initialValues={{}} mode={this.state.mode}  onSubmit={this.onChangeMode} callback={this.onChangeMode} formFields={formFields} dbName={dbName} objects={objects} title={title}/>
                    </div>
        }else return null
    }    
}

export default Table;


// class ChangeForm1 extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//     submitMyForm(data) {
//         const {createRecord, resetForm} = this.props;
//         return createRecord(data).then(() => {
//           resetForm();
//           // do other success stuff
//         });
//       }
      
//       render() {
//         let props = this.props
//             if(props.mode==='changeMode'){
//                 let fields = props.formFields.map(element => {
//                     let {name, text, type, component} = element;
//                     if(component==='select'){
//                         let objectsElements = props.objects.map((element,n) => {
//                             if(n===0) return <option selected style={{width:100}} value={element[1]} key={n.toString()}>{element[1]}</option>
//                             else return <option style={{width:100}} value={element[1]} key={n.toString()}>{element[1]}</option>
//                         });
                       
//                         return  <label>{text} 
//                                     <Field name="obj" component={"select"}  >
//                                         {objectsElements}
//                                     </Field>
//                                 </label>
//                     }else return <label>{text} <Field name={name} placeholder={text} component={component} type={type} /></label> 
//                 });
//                 // if(mode==='changeMode') fields.push(controlPassword)
//                 return (
//                     <div className={"modal-form-keeper"+' modal-form-keeper__'+props.dbName} >
//                         <header className="Common__header Common__header_red">{props.title+'titleDop'}</header>
//                         <form className="modal-form modal-form_light-grey" onSubmit={props.handleSubmit(this.submitMyForm.bind(this))}>
//                             {fields}
//                             <div>
//                             <button>{'submitText'}</button> <button onClick={()=>{this.setState(state => ({mode: 'view'}))}}>Отменить</button> 
                                
//                             </div>
//                         </form>
//                     </div>
//                 )
//             }  
//             else return null
        
//       }
// }