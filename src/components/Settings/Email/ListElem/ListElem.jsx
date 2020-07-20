import React from 'react';
import './Elem.scss';
import FilterPanel from '../FilterPanel/FilterPanel'

const ListElem = (props) => {
    let Elements = Object.values(props.items).map((e,n) => {
        return <td name='list-elem' key={n} >{e}</td>
    })

    if(props.filter){
        let {fields, filterConfigObj, onFilterChange, id, iniState} = props
        Elements.push(<td className="icon" >
            <FilterPanel single={true} fields={fields} configObj={filterConfigObj} iniState={iniState} submitCallBack={onFilterChange} id={id} color='black'/>
        </td>)
    }
    if(props.change)
        Elements.push(<td className="icon" >
        <img onClick={props.onChangeClick.bind(this,props.id)} width={15} height={15} src={require('./notification.svg')}/>
    </td>)
    if(props.delete)
        Elements.push(<td className="icon" >
        <img onClick={props.elemDellCallBack.bind(this,{id:props.items[0]})} width={15} height={15} src={require('./del_icon.png')}/>
    </td>)

    return <tr className={props.name}  >
        {Elements}
    </tr>
}

export default ListElem;