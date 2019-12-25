import {Field, reduxForm} from "redux-form";
import {Component} from 'react'
import React from 'react';
import './UploadTimeSetter.scss'
let time_upload_letters = [
    {rus:'в секундах',eng:'seconds'},
    {rus:'в минутах',eng:'minutes'},
    ,
]
class time_form extends Component {
    // componentWillMount () {
    //   this.props.initialize({ number: 10,  uploads:true});
    // }
  
    // //if your data can be updated
    // componentWillReceiveProps (nextProps) {
    //     console.log('componentWillReceiveProps:')
    //     console.log(nextProps)
    // //   if (/* nextProps changed in a way to reset default values */) {
    // //     this.props.destroy();
    // //     this.props.initialize({ number: 10,  uploads:true});
    // //   }
    // }
    componentDidMount (){
        this.props.initialize({number : 10, uploads:true})
        }
    render () {
        let timeTypes = time_upload_letters.map((e,n) => <option  value={n} key={n.toString()}>{e.rus}</option>)
      return (
        <form  className="upload-time-form" onSubmit={this.props.handleSubmit}>
        <label>Интервал обновления: 
            <Field name="number" component="input"
            type="number" defaultValue={''} >
            </Field>
            <Field name="time_type" component={"select"}  >
                    {timeTypes}
            </Field>
        </label>
        <label>Обновления включены: <Field name="uploads"  component={"input"} type="checkbox" /></label>
        <button>Применить</button>
</form>
      );
    }
  }



// const time_form = (props) => {
      
//     let timeTypes = time_upload_letters.map((e,n) => <option  value={n} key={n.toString()}>{e.rus}</option>)
//     return <form  className="upload-time-form" onSubmit={props.handleSubmit}>
//         <label>Интервал обновления: 
//             <Field name="obj" component="input"
//             type="number" defaultValue={10} >
//             </Field>
//             <Field name="time_type" component={"select"}  >
//                     {timeTypes}
//             </Field>
//         </label>
//         <label>Обновления включены: <Field name="uploads"  component={"input"} type="checkbox" defaultValue={true}/></label>
//         <button>Применить</button>
// </form>
// }

// const UploadTimeSetter =  reduxForm({form: 'addAcsEndp'})(time_form)
const UploadTimeSetter = reduxForm({
    form: 'uploadTime',
    number: 10,
  values:{number: 10}
})(time_form)
// class UploadTimeSetter extends React.Component {

   
//     time_upload_letters = [
//         {rus:'в минутах',eng:'minutes'},
//         {rus:'в секундах',eng:'seconds'},
//     ]
   
//     render() {   
//       return <TimeForm  letters={this.time_upload_letters} handleSubmit={this.changeNumb} handleChangeNum={this.changeNumb}/>
//     }
//   }
export default UploadTimeSetter
// const AddForm =  reduxForm({form: 'addUser'})(form)




// const aside_panel_toggler = function(){
//     if(getCookie('admin')==="yes"){
//         try{
//             $('.'+'aside-panel_'+settings__displayedItem).toggleClass('aside-panel__item_active',false)
//             $('.'+settings__displayedItem).css('display','none')
//             settings__displayedItem = this.className.split("_")[1]
//             $('.'+settings__displayedItem).css('display','block')
//             $(this).toggleClass('aside-panel__item_active')
//         }
//         catch(err){console.log(err)}
//     }
// }
// var time_upload_letters = [
//     ["секунда", "секунды", "секунд"],
//     ["минута", "минуты", "минут"],
//     ["час", "часа", "часов"]                 
// ]
// var time_letters = [
//     ["минута", "минуты", "минут"],
//     ["час", "часа", "часов"],
//     ["день", "дня", "дней"],
//     ["неделя", "недели", "недель"],
//     ["месяц", "месяца", "месяцев"],
//     ["год", "года", "лет"]
// ]
// const core_dash_numfield2_upload = function(){
//     let context_form = $(this).closest('.dashboards__form')
//         let max_count = time_upload_letters.length
//         let count = 0;
//         let our_select = context_form.find('select')[1];

//         if(this.value[this.value.length-1] === '1' && this.value !== '11')
//         {
//             for(count; count<max_count; count++){
//                 $(our_select).find('option')[count].innerText = time_upload_letters[count][0]
//             }
//         }
//         else if((this.value[this.value.length-1] === '2' ||
//         this.value[this.value.length-1] === '3' ||
//         this.value[this.value.length-1] === '4') && this.value[0] !== '1' )
//         {
//             for(count; count<max_count; count++){
//                 $(our_select).find('option')[count].innerText = time_upload_letters[count][1]
//             }
//         }
//         else
//         {
//             for(count; count<max_count; count++){
//                 $(our_select).find('option')[count].innerText = time_upload_letters[count][2]
//             }
//         }
// }