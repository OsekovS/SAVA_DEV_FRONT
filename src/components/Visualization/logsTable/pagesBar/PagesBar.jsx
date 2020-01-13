import React from 'react';
const PagesBar = (props) => {
    let paginationList = []
    let index = props.pagination.fromPage
    if(index > 1){
        paginationList.push(<li onClick={props.callBack.bind(this,1)}  key={1}>1</li>)
        paginationList.push(<li  className="pages-bar__ellipsis" key={2}>...</li>)    
    }
    for (index; index < props.pagination.fromPage+props.pagination.showedPages && index <= props.pagination.lastPage; index++) {
        if(index===props.pagination.currentPage)
            paginationList.push(<li onClick={props.callBack.bind(this, index)} className="pages-bar__curr-page" key={index}>{index}</li>)
        else paginationList.push(<li onClick={props.callBack.bind(this, index)} key={index}>{index}</li>)
    }
    if(props.pagination.lastPage>index){
    paginationList.push(<li className="pages-bar__ellipsis" key={index+1}>...</li>)
    paginationList.push(<li onClick={props.callBack.bind(this,props.pagination.lastPage)} key={index+2}>{props.pagination.lastPage}</li>)
    }
// }

    return  <ul className="pages-bar">
                {paginationList}
            </ul>
}

export default PagesBar;