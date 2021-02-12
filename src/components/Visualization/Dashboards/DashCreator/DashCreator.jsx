import React from 'react';
import './DashCreator.scss'
{/* <img onClick={onCreatePdfThunk.bind(this,props.id)} className='pdf__wait' src={require('./icon.svg')}></img> */}

//<a href="upload-file.php?filename=file.pdf"><img onClick={onCreatePdfThunk.bind(this,props.id)} className='pdf__wait' src={require('./icon.svg')}></img></a>
class PdfMaker extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
        let index = null, moduleName,
        {indexName, indexes } = props
        if(props.isCommon) {
            moduleName = ''
            indexName = ''
            indexes = '' 
        } 
        else{
            index = props.indexes[props.indexName]
        }
        this.state = {
            display: 'collapsed',
            mainField: index?Object.keys(index.filter)[2]:null,
            indexName, indexes, moduleName, name:""
        };
        this.onSubmit = this.onSubmit.bind(this);

    }

    // onChangeFilterField = (keyState,key)=>{
    //     this.setState(state => {
    //         state.params[key] = keyState 
    //         return state
    //       })  
    //   }
    onSubmit = () => {
        let {dbName} = this.props, {indexName, mainField, name} = this.state
        if(indexName !== ""){
            this.props.addDashBoardThunk(indexName, dbName, mainField, name)
            this.setState({ display: 'collapsed' })
        }else alert('Необходимо заполнить все поля')

    }

    render() {
        if(this.state.display==='collapsed')
            return <>
                        <button className={this.props.className}  onClick={()=>{this.setState({ display: 'deployed' });}}>{this.props.innerText}</button>
                    </>
        else {
            console.log(this.state)
            console.log(this.props)
            let {indexName, indexes, mainField, moduleName, name} = this.state, fields, 
                index, {isCommon, modules} = this.props,
                modulesOptions = moduleName === "" ? [<option selected value={undefined}>{' '}</option>] : [],
                indexesOptions = indexName === "" ? [<option selected value={undefined}>{' '}</option>] : []
            if(isCommon) {
                //заполнение модулей 
                Object.keys(modules).forEach((e,n) => {
                    modulesOptions.push(<option selected={e === moduleName} value={e}>{modules[e].title}</option>)
                })
                //заполнение индексов 
                if(moduleName!=="") Object.keys(indexes).forEach((e,n) => {
                    
                    if(e === mainField) indexesOptions.push(<option selected value={e}>{indexes[e].title}</option>)
                    else indexesOptions.push(<option value={e}>{indexes[e].title}</option>)
                })
            }
            if(indexName !== ""){
                index = indexes[indexName]
                //выбираем по умолчанию самый первый элемент из возможных полей
                if(mainField === null) this.setState({ mainField: Object.keys(index.filter)[0] })
                    fields = Object.keys(index.filter).map((e,n) => {
                    //начальное значение - отдельная запара
                    if(e === mainField) return <option selected value={e}>{index.fields[e].translate}</option>
                    else if(e!=='translate') return <option value={e}>{index.fields[e].translate}</option>
                })
            }

            return  <div className="modal-form-keeper"  >
                <div className='modal-form__dashCreator'>
                    <header><h3>Добавление нового графика</h3><button onClick={()=>{this.setState({ display: 'collapsed' });}}><img src={require('../Components/close.svg')}></img></button></header>
                        <form >
                            <div>
                                <h3>Название графика:</h3>
                                <input onChange={(event)=>{this.setState({name: event.target.value})}} type="text" value={name} className='dashCreator__name'/>    
                                {isCommon?
                                <>
                                    <h3>Выберите модуль:</h3>
                                    <select onChange={(event)=>{this.setState({moduleName: event.target.value, indexes: modules[event.target.value].indexes, indexName:""})}}>
                                        {modulesOptions}
                                    </select>
                                    <h3>Выберите таблицу в модуле:</h3>
                                    <select onChange={(event)=>{this.setState({indexName: event.target.value})}}>
                                        {indexesOptions}
                                    </select>
                                </>
                                :null}
                                {/* <h3>Тип дашборда:</h3>
                                <select onChange={(event)=>{this.changeMainField(event.target.value)}}>
                                    <option selected value='Circle'>Круговая диаграмма</option>
                                </select> */}
                        
                                {/* <h3>Название отчета:</h3>
                                    <input onChange={this.handleTitleChange} type="text" value={this.state.title} className='param-pdf-panel_title-input'/>
                                    */}
                                {/* <h3>Настройка фильтра</h3>
                                    <div className='param-pdf-panel_filters'>
                                        <div>{this.makeFilter()}</div>
                                    </div> */}
                                <h3>Построение круговой диаграммы по параметру:</h3>
                                    <select onChange={(event)=>{this.setState({ mainField: event.target.value })}}>
                                        {fields}
                                    </select>
                            </div>
                        <div>
                            {/* <input type="submit" value="Добавить дашборд"/> */}
                            <button onClick={(e)=>{e.preventDefault(); this.onSubmit()}}>Добавить дашборд</button>
                            <button onClick={(e)=>{e.preventDefault(); this.setState({ display: 'collapsed' });}}>Отменить</button>
                        </div>
                    </form>  
                </div>         
            </div>
        }
            
    }
}


// 0:
// id: "0"
// name: "Журналы станций"
// type: "Table"
// body:
// headerElements: (5) [{…}, {…}, {…}, {…}, {…}]
// footerElements: []
// indexName: "sns_event"
// logs: []

// timeFilter: {from: g, to: g}
// uploads: {uploads: true, timeKind: 1, timeNum: 11000, to: "now/d"}
// paramFilter: {}
// pagination: {total: 0, currentPage: 1, fromPage: 1, showedPages: 5, lastPage: 0, …}
// sortParam: {type: "date", field: "time", direction: "asc"}
// curLog: null
// markAsRead: "wait"
// saver: "wait"
// pdf: "wait"


// let mapStateToProps = (state) => {
//     return {
//    }
// }

// let mapDispatchToProps = {
// onCreatePdfThunk
// }
  
//   const Pdf = connect(mapStateToProps, mapDispatchToProps)(rawPdf);

export default PdfMaker;