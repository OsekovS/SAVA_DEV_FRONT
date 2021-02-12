import React from 'react';
import './Table.scss';


const Table = (props) =>{
    // let usersElements = this.tabHeader.concat(this.props.users).map((e,n) => {  
    //     // нулевой элемент это хедер таблицы
    //     if(n===0) return <ListElem name='list-elem' items={e} 
    //         key={e.id}  modules={modules}/>
    //         // console.log(e.modules)
    //         let copy = {...e}
    //         // let modules = Array.isArray(e.modules)?e.modules:e.modules.split(',');
    //         copy.modules = e.modules.map((e)=>{
    //             // console.log(e)
    //             return this.state.modulesTranslate!==undefined?this.state.modulesTranslate[e]:''
    //     }
    //     )
    //     // console.log(e.modules)
    //     return <ListElem name='list-elem' items={copy} 
    //     key={copy.id}
    //     elemChangeCallBack={this.onSetEditedPass} elemDellCallBack={this.onDellUser} modules={modules}/>
    // })
    console.log(props)
    let tableHeaderElements = Object.keys(props.elements[0]).map((elem)=>{
        return <td>{elem}</td>
    })
    props.icons.forEach((elem)=>{
        tableHeaderElements.push(<td></td>)
    })
    let tableHeader = <tr>{tableHeaderElements}</tr>;
    let tableElements = props.elements.map((raw, numb)=>{
        let elements = Object.values(raw).map((elem)=> <td>{elem}</td>)
        props.icons.forEach((elem)=>{
            elements.push(<td><img width={elem.widht} height={elem.height} onClick={()=>{elem.callBack(numb)}} src={elem.path}></img></td>)
        })
        return <tr>{elements}</tr>
    })
    return (
        <table className="Table__white-black Modules_table__cam-dev">
            <tbody>
                {tableHeader}
                {tableElements}
                {/* {usersElements}   */}
            </tbody>
        </table>
    ) 
}

export default Table;