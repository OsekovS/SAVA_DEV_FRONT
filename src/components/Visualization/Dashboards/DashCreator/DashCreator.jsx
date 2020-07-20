import React from 'react';
import './DashCreator.scss'
{/* <img onClick={onCreatePdfThunk.bind(this,props.id)} className='pdf__wait' src={require('./icon.svg')}></img> */}

//<a href="upload-file.php?filename=file.pdf"><img onClick={onCreatePdfThunk.bind(this,props.id)} className='pdf__wait' src={require('./icon.svg')}></img></a>
class PdfMaker extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
        let index = props.indexes[props.indexName]
        this.state = {
            display: 'collapsed',
            mainField: index?Object.keys(index.filter)[2]:null
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
        let {indexName,dbName} = this.props
        this.props.addDashBoardThunk(indexName,dbName,this.state.mainField)
        this.setState({ display: 'collapsed' })
    }

    render() {
        // console.log(this.state.mainField)
        let str = `Сгенерировать отчет
(выбрано 10 позиций)`
        if(this.state.display==='collapsed')
            return <>
                        <button className='DashCreator'  onClick={()=>{this.setState({ display: 'deployed' });}}>Добавить дашборд +</button>
                    </>
        else {
            console.log(this.props)
            let index = this.props.indexes[this.props.indexName]
            if(this.state.mainField===null) this.setState({ mainField: Object.keys(index.filter) })
            let fields = Object.keys(index.filter).map((e,n) => {
                //начальное значение - отдельная запара
                if(e===this.state.mainField) return <option selected value={e}>{index.fields[e].translate}</option>
                else if(e!=='translate') return <option value={e}>{index.fields[e].translate}</option>
            })
            return  <div className="modal-form-keeper"  >
                <div className='modal-form__dashCreator'>
                    <header><h3>Добавление нового графика</h3><button onClick={()=>{this.setState({ display: 'collapsed' });}}><img src={require('../Components/close.svg')}></img></button></header>
                        <form onSubmit={this.onSubmit} >
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
                        <div>
                            <button onClick={this.onSubmit}>Добавить дашборд</button>
                            <button onClick={()=>{this.setState({ display: 'collapsed' });}}>Отменить</button>
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