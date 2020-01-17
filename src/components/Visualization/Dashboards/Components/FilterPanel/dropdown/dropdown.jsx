import React from 'react';
import './dropdown.scss'
import MultiSelect from "@khanacademy/react-multi-select";
class Consumer extends React.Component {
    constructor(props){
      super(props)
      
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
