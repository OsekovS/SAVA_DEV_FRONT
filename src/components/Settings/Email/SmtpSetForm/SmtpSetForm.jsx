import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import './SmtpSetForm.scss'
{/* <img onClick={onCreatePdfThunk.bind(this,props.id)} className='pdf__wait' src={require('./icon.svg')}></img> */}
const SmtpTestFormRaw  = (props) => {
    return (
        <div className="modal-form-keeper" >
        <div>
        <header className="Common__header Common__header_red">Введите адрес получателя для отправки тестового сообщения:</header>
        <form className='modal-form_light-grey modal-form_smtp smtpTestForm' onSubmit={props.handleSubmit}>
            <label>
                <Field name='testAdress' placeholder={''} component={"input"} type="text"/> 
            </label>
           
            <div>
                <input type="submit" value="Отправить"/>
                <button onClick={(e)=>{e.preventDefault();props.onClose()}}> Отменить</button>
            </div>
        </form>
        </div>
        </div>)
}
const smtpSetFormRaw= (props) => {
    // let {events, filterState, onChangeFilterCallBack} = props
    // let eventsForDropdown = events?events.map(({id,name}) => {
    //     return {
    //         value: id,
    //         label: name,
    //     } 
    // }):null
    // console.log(eventsForDropdown)
    // <p style={{margin:'0px'}}>(последний редактор: {props.initialValues.username})</p>
    
        // const AuthBlock = props.withAuth?<><h2>Параметры аутентификации</h2>
        // <label>Имя пользователя:
        //     <Field name='login' placeholder={''} component={"input"} type="text"/> 
        // </label>
        // <label>Пароль:
        //     <Field name='pass' placeholder={''} component={"input"} type="password"/> 
        // </label>
        // <label>Подтверждение пароля:
        //     <Field name='passRep' placeholder={''} component={"input"} type="password"/> 
        // </label></>:<></>
        return (
            <div className="modal-form-keeper" >
            <div>
            <header className="Common__header Common__header_red">Настройки почтового сервера </header>
            <form className='modal-form_light-grey modal-form_smtp smtpSetForm' onSubmit={props.handleSubmit}>
                <h2>Параметры уведомлений по почте</h2>
                <label>Адрес SMTP-сервера:
                    <Field name='name' placeholder={''} component={"input"} type="text"/> 
                </label>
                <label>Порт SMTP-сервера:
                    <Field name='port' placeholder={''} component={"input"} type="number"/> 
                </label>
                <label>Адрес отправителя:
                    <Field name='adress' placeholder={'example@mail.ru'} component={"input"} type="text"/> 
                </label>
                {/* onChangeAuthMode */}
                <label className="checkbox-cont">Использовать SMTP-аутентификацию:
                    <span><Field onChange={(e)=>{props.onChangeAuthMode(e.target.value)}} name='useAuth' placeholder={''} component={"input"} type="checkbox"/> </span>
                </label>
                {
                    props.withAuth?<><h2>Параметры аутентификации</h2>
                    <label>Имя пользователя:
                        <Field name='login' placeholder={''} component={"input"} type="text"/> 
                    </label>
                    <label>Пароль:
                        <Field name='pass' placeholder={''} component={"input"} type="password"/> 
                    </label>
                    <label>Подтверждение пароля:
                        <Field name='passRep' placeholder={''} component={"input"} type="password"/> 
                    </label></>:<></>
                }
                <div>
                    <input type="submit" value="Сохранить"/>
                    <button onClick={(e)=>{e.preventDefault();props.onTestclick()}}> Тест</button>
                    <button onClick={(e)=>{e.preventDefault();props.onClose()}}> Отменить</button>
                </div>
            </form>
            </div>
            </div>)
}

// InitializeFromStateForm = reduxForm({
//     form: 'initializeFromState' // a unique identifier for this form
//   })(InitializeFromStateForm)

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const SmtpSetForm = reduxForm({
    form: 'sftpSetForm' // a unique identifier for this form
  })(smtpSetFormRaw)
const SmtpTestForm = reduxForm({
form: 'sftpTestForm' // a unique identifier for this form
})(SmtpTestFormRaw)
//   // You have to connect() to any reducers that you wish to connect to yourself
//   InitializeFromStateForm = connect(
//     state => ({
//       initialValues: state.account.data // pull initial values from account reducer
//     }),
//     { load: loadAccount } // bind account loading action creator
//   )(InitializeFromStateForm)

//<a href="upload-file.php?filename=file.pdf"><img onClick={onCreatePdfThunk.bind(this,props.id)} className='pdf__wait' src={require('./icon.svg')}></img></a>
class PdfMaker extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            display: 'collapsed',
            withAuth: props.smtp?props.smtp.useauth==='t':null
        };
        this.onSubmit = this.onSubmit.bind(this)
        // this.onTestSubmit = this.onTestSubmit.bind(this)
        // this.props.loadSmtpSettigs()
    }
    // onTestSubmit = (content) => {
        // console.log(content)
        // if(Object.keys(content).length<6) alert('Необходимо заполнить все поля')
        // else if(content.pass!==content.passRep) alert('Пароли должны совпадать')
        // else {
        //     this.props.smtpSettigsThunkThunk(content)
        //     this.setState({ display: 'collapsed' })   
        // }
    // }
  
    onSubmit = (content) => {
        if(Object.keys(content).length<6) alert('Необходимо заполнить все поля')
        else if(content.pass!==content.passRep) alert('Пароли должны совпадать')
        else {
            this.props.smtpSettigsThunkThunk(content)
            this.setState({ display: 'collapsed' })   
        }
    }

    render() {
        console.log(this.state)
        
        if(this.state.display==='collapsed')
            return <>
                        <button className='DashCreator__red-button'  onClick={()=>{this.setState({ display: 'deployed' });}}>Настройки SMTP сервера</button>
                    </>
        else if(this.state.display==='testMode') 
            return <>
                <SmtpTestForm onSubmit={(data)=>{this.props.smtpTestThunk(data.testAdress)}}   onClose={()=>{this.setState({ display: 'collapsed' });}}/>
            </>
        else {
            if(this.props.smtp){
                let ini = {...this.props.smtp}
                ini.useAuth = ini.useauth==='t'
                ini.passRep = ini.pass
                console.log(ini)
                //должно вызваться 1 раз как только загрузим данные
                if(this.state.withAuth === null) this.setState({ withAuth: ini.useAuth })
                return <SmtpSetForm initialValues={ini}  
                 onSubmit={this.onSubmit}   onClose={()=>{this.setState({ display: 'collapsed' });}}
                 onTestclick={()=>{this.setState({ display: 'testMode' });}} withAuth={this.state.withAuth} onChangeAuthMode={(value)=>{console.log(value);this.setState({ withAuth: value !== 'true' });}}/>
            }
            else return <></>
                // return <SmtpSetForm    onSubmit={this.onSubmit}   onClose={()=>{this.setState({ display: 'collapsed' });}}
                // onTestclick={()=>{this.setState({ display: 'testMode' });}} withAuth={this.state.withAuth} onChangeAuthMode={(value)=>{this.setState({ withAuth: value });}}/>
        }
            
    }
}


export default PdfMaker;