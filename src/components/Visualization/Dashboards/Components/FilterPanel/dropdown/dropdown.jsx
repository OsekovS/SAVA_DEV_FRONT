import React from 'react';
import './dropdown.scss'
import MultiSelect from "@khanacademy/react-multi-select";
const dropdown = (props) => {
      return <MultiSelect
        options={props.options}
        selected={props.selected}
        onSelectedChanged={(selected)=>{props.onChangeCallBack(selected,props.name)}}
       
        overrideStrings={{
          selectSomeItems: (props.isInvert?"Не выбрано ни одного поля " :"Выбраны все поля ") + props.preview,//+"'"+props.preview+"'"),
          allItemsAreSelected: "Выбраны все поля " + props.preview ,//"Выбраны все поля "+"'"+this.props.preview+"'",
          selectAll: "Выбрать все",
          search: "Введите ключевое слово",
      }}
      />
  }

  export default dropdown
