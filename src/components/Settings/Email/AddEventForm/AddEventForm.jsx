import React from 'react';
import FilterPanel from '../FilterPanel/FilterPanel'
  
  class AddEventForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            filter: {}
        }
        this.onNewFilterChange = this.onNewFilterChange.bind(this)
      }
      onModuleChange = (newModule) => {
        // let {modules} = this.props
        // let {oldIndexname} = this.state
        // let newIndexname = modules[newModule].indexes[newIndexname]!==undefined?this.state.indexname
        console.log(newModule)
        this.setState(state => {
            state.modulename = newModule
            state.indexname = undefined
            return state
        })
    }

    onNewFilterChange = (filter) => {
        console.log(filter)
        this.setState(state => {
            state.filter = filter
            return state
        })
    }

    onIndexChange = (value) => {
       
        this.setState(state => {
            state.indexname = value
            return state
        })
    }
    onNameChange = (newname) => {
        if(newname.length <= 40)
        this.setState(state => {
            state.name = newname
            return state
        })
    }

    render() {

        let {modules} = this.props,
        {modulename, indexname, name, filter} = this.state,filterCompoent, modulesOptions, indexesOptions
        modulesOptions = modulename===undefined?[<option selected value={undefined}>{' '}</option>]:[]
        indexesOptions = indexname===undefined?[<option selected value={undefined}>{' '}</option>]:[]

       
        for (const key in modules) {
            if (modules.hasOwnProperty(key)) {
                modulesOptions.push(
                    <option value={key}>{modules[key].title}</option>
                )
                if(key === modulename){
                    let indexes =  modules[key].indexes
                    for (const indexKey in indexes) {
                        if (indexes.hasOwnProperty(indexKey)) {
                        indexesOptions.push(
                            <option value={indexKey}>{indexes[indexKey].title}</option>
                        )
                }
                }
            }
        }
    }
   
        if(indexname && modulename ){
            let {fields, filter} = modules[modulename].indexes[indexname]
            // <FilterPanel single={true} fields={fields} configObj={filterConfigObj} iniState={iniState} submitCallBack={onFilterChange} id={id} color='black'/>
            filterCompoent = <FilterPanel single={true} fields={fields} configObj={filter} iniState={{}} submitCallBack={this.onNewFilterChange} id={0} color='red'/>
        }else{
            filterCompoent = null
        }
        if(this.props.view){
            let isFilterEmptyString = Object.keys(filter).length>0?' (фильтр настроен)':' (фильтр пуст)'
       
            return (
                <div className="modal-form-keeper event-panel" >
                    <div>
                        <header className="Common__header Common__header_red">Добавить событие</header>
                        <div className='modal-form modal-form_light-grey' onSubmit={this.props.handleSubmit}>
                            <label>Ведите название события:
                                <input type="text" value={name} onChange={(e)=>{this.onNameChange(e.target.value)}}/>
                                {/* <Field name='name' placeholder={'Название события'} component={"input"} type="text"/>  */}
                            </label>
                            <label>Выберите модуль:
                                <select value={modulename}  onChange={(e)=>{this.onModuleChange(e.target.value)}}>
                                    {modulesOptions}
                                </select>
                            </label>
                            <label>Выберите таблицу:
                                <select value={indexname}   onChange={(e)=>{console.log('onChange');this.onIndexChange(e.target.value)}}>
                                    {indexesOptions}
                                </select>
                            </label>
                            <div>{'Настройте фильтр'+isFilterEmptyString+':'}{filterCompoent}</div>
                            <div>
                                <button onClick={()=>{this.props.onSubmit(this.state)}}> Добавить</button>
                                <button onClick={(e)=>{e.preventDefault();this.props.onClose()}}> Отменить</button>
                            </div>
                            </div>
                    </div>
                </div>
            ) 
        }else return null
}
}

export default AddEventForm;