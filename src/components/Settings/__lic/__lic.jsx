import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {onFileUploadThunk} from '../../redux/lic-reducer'
import {connect} from "react-redux";
import './__lic.scss'
// import { Field, reduxForm } from 'redux-form';

class FileInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {fileTitle:null}
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onFileLoad = this.onFileLoad.bind(this);
      this.fileInput = React.createRef();
    }
    handleSubmit(event) {
      event.preventDefault();
    //   alert(
    //     `Selected file - ${
    //       this.fileInput.current.files[0].name
    //     }`
    //   );
    this.props.onFileUploadThunk(this.fileInput.current.files[0])
    // console.log(this.fileInput.current.files[0])
    // console.log(this.fileInput.current.files)
    }

    onFileLoad(event){
        // console.log(this.fileInput.current.files[0].name)
        this.setState(state => ({fileTitle: this.fileInput.current.files[0].name}))
    }
  
    render() {
        let props = {...this.props}
        console.log(props)
        let licInfoBlock = this.props.lic!==undefined?
            <>
                <p>Дата начала лицензии: {props.lic.lic_start}</p>
                <p>Дата окончания лицензии: {props.lic.lic_end}</p>
                <p>Срок лицензии: {props.lic.amount}</p>
                <p className="license__remain-time" >Осталось дней: {props.lic.remained}</p>
            </>
            :null
        return this.props.isAdmin==='администратор'?<div className="Settings__lic">
            <form encType="multipart/form-data" action="settings_admin.php" method="POST" onSubmit={this.handleSubmit}>       
                <h2 className='h2__center'>Лицензия</h2>	
                
                {licInfoBlock}
                
                
                {/* <!-- Поле MAX_FILE_SIZE должно быть указано до поля загрузки файла --> */}
                <p><input type="hidden" name="MAX_FILE_SIZE" value="30000" /></p>
                {/* <!-- Название элемента input определяет имя в массиве $_FILES --> */}
                {/* <!-- <p>Загрузить файл лицензии: <input name="userfile" type="file" /></p> --> */}
                <p className={'loadInput'}>Загрузить файл лицензии:
                    <label htmlFor="myfile">Выберите файл</label>
                    <input type="file" ref={this.fileInput} className="custom-file-input" id="myfile" name="userfile" multiple onChange={this.onFileLoad}/>
                    {this.state.fileTitle!==null?<span>Выбран файл {this.state.fileTitle}</span>:null}
                    {/* <input type="file" className="custom-file-input" id="myfile" name="userfile" multiple></input> */}
                </p>
                <p><input className="button__red" type="submit" name="lic" value="Загрузить" /></p>
            </form>
        </div>:<></>
    //   return (
    //     <form onSubmit={this.handleSubmit}>
    //       <label>
    //         Upload file:
    //         <input type="file" ref={this.fileInput} />
    //       </label>
    //       <br />
    //       <button type="submit">Submit</button>
    //     </form>
    //   );
    }
  }
  
  ReactDOM.render(
    <FileInput />,
    document.getElementById('root')
  );

let mapStateToProps = (state) => {
    return {
        lic: state.lic,
        isAdmin: state.auth.briefUserInfo.admin
    }
}
let mapDispatchToProps ={
    onFileUploadThunk
}

const __lic = connect(mapStateToProps, mapDispatchToProps)(FileInput);

export default __lic;

// import React from 'react';
// import './__lic.scss';
// import {connect} from "react-redux";
// import {uploadLicThunk} from '../../redux/lic-reducer'
// const rawlic = (props) => {
//     return <div className="Settings__lic">
//         <form encType="multipart/form-data" action="settings_admin.php" method="POST" onSubmit={props.handleSubmit}>       
//             <h2 className='h2__center'>Лицензия</h2>	
//             <p>Дата начала лицензии: {props.lic.lic_start}</p>
//             <p>Дата окночания лицензии: {props.lic.lic_end}</p>
//             <p>Срок лицензии: {props.lic.amount}</p>
//             <p className="license__remain-time" >Осталось дней: {props.remained}</p>
            
            
//             {/* <!-- Поле MAX_FILE_SIZE должно быть указано до поля загрузки файла --> */}
//             <p><input type="hidden" name="MAX_FILE_SIZE" value="30000" /></p>
//             {/* <!-- Название элемента input определяет имя в массиве $_FILES --> */}
//             {/* <!-- <p>Загрузить файл лицензии: <input name="userfile" type="file" /></p> --> */}
//             <p>Загрузить файл лицензии:
//                 <label htmlFor="myfile">Выберите файл</label>
//                 <input type="file" className="custom-file-input" id="myfile" name="userfile" multiple></input>
//             </p>
//             <p><input className="button__red" type="submit" name="lic" value="Загрузить" /></p>
//         </form>
//     </div>
// }

// let mapStateToProps = (state) => {
//     return {
//         lic: state.lic
//     }
// }
// let mapDispatchToProps ={
//     uploadLicThunk
// }

// const __lic = connect(mapStateToProps, mapDispatchToProps)(rawlic);

// export default __lic;