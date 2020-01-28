import React from 'react';
import {connect} from "react-redux";
import {onCreatePdfThunk}  from "../../../../redux/acs-dashboards-reducer";

const rawPdf = (props) => {
    if(props.display==='wait') return <img onClick={props.onCreatePdfThunk.bind(this,props.id)} className='pdf__wait' src={require('./icon.svg')}></img>
        else return <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
}

let mapStateToProps = (state) => {
    return {
   }
}

let mapDispatchToProps = {
onCreatePdfThunk
}
  
  const Pdf = connect(mapStateToProps, mapDispatchToProps)(rawPdf);

export default Pdf;