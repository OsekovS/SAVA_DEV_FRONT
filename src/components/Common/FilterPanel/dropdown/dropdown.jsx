import React from 'react';
import './dropdown.scss'
import MultiSelect from "@khanacademy/react-multi-select";
class Consumer extends React.Component {
    constructor(props){
      super(props)
      console.log(this.props.iniState)
      this.state = {
        // selected: this.props.state,
        selected: this.props.iniState,
      }
    }
    onSelectedChanged = (selected)=>{
      this.props.onChangeCallBack(selected,this.props.name)
      this.setState({selected})
    }
    render() {
      const {selected} = this.state;
  
      return <MultiSelect
        options={this.props.options}
        selected={selected}
        onSelectedChanged={this.onSelectedChanged.bind(this)}
       
        overrideStrings={{
          selectSomeItems: this.props.preview,
          allItemsAreSelected: "Выбраны все поля "+"'"+this.props.preview+"'",
          selectAll: "Выбрать все",
          search: "Введите ключевое слово",
         
      }}
      />
    }
  }

  export default Consumer
// const form = (props) => {
//     // props.objects.map((e,n) => <option style={{width:100}} value={e.id} key={n.toString()}>{e.name}</option>)
//     let checkboxGroup =[]
//     for (const key in configObj) {
//         if (configObj.hasOwnProperty(key)) {
//             if(Array.isArray(configObj[key])){
//                 checkboxGroup.push(
//                     <div datatype={key}  >
//                     {configObj[key].map((e,n) => <label>{e} <Field key={n.toString()} name={e}  component={"input"} type="checkbox"/></label>)}
//                     </div>
//                 )
//             }
//             checkboxGroup.push(
//                 <div datatype={key}  >
//                     {configObj[key].map((e,n) => <label>{e} <Field key={n.toString()} name={e}  component={"input"} type="checkbox"/></label>)}
//                 </div>
//             )
//         }
//     }
//     console.log(checkboxGroup)
//     // if(props.mode==='addUser') {
       
//         return (
//         <div className="modal-form-keeper" >
//         <form  className="modal-form filter" onSubmit={props.handleSubmit}>
//                 {checkboxGroup}
//             <div>
//                 <button >Добавить</button> <button onClick={props.callback}>Отмена</button>
//             </div>
//         </form>
//         </div>
//     )
// // }
// //     else return null
// }

// const FilterForm =  reduxForm({form: 'filterSet'})(form)


// class Wrapper extends React.Component {
 
//     constructor(props){
//         super(props);
//         // this.state = {
//         //     start : start,
//         //     end : end
//         // }
 
//         // this.applyCallback = this.applyCallback.bind(this);
//         // this.props.applyParentCallback = this.props.applyParentCallback.bind(this);
//     }
 
//     applyCallback(startDate, endDate){
//         // console.log(new Date(startDate._d))
//         // console.log(new Date(endDate._d))
//         this.setState({
//             edited: false
//         })
//         this.props.applyParentCallback(startDate, endDate);
//     }
 
//     render(){

//             return(
//                 <FilterForm/>
//             );
//         }
// }
// export default Wrapper
