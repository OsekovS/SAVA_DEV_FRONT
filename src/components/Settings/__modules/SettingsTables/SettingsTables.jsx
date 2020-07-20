import React from 'react';
import './Cameras.scss'
import __header from '../../../Common/__header/__header'
// import ListElem from '../ListElem/ListElem'
import Table from './Table/TableCont'
import {Field, reduxForm} from "redux-form";


class Cameras extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mode: '', edited: ''}
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
    }


    onChange = (formData) =>{
        this.props.changeElemThunk(formData,this.state)
        this.onChangeMode({mode: '',id: ''}) 
    }

    createForm = () =>{
        return 
        
    }

    render() {
        let JsxTabels = [], tableContent
        let {tables, dbName, content} = this.props
        tables.forEach((table)=>{
            JsxTabels.push(
                <Table {...table} dbName={dbName} content={content[table.tableName]} objects={table.tableName!=='objects'?content.objects:null}/>
            )
        })
        return <div>
            {JsxTabels}
        </div>
    }
}
export default Cameras;

