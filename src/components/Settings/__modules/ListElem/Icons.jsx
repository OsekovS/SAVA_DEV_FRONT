import React from 'react';

export const DelIcon = (props) => {
    return <td>
            <img  onClick={props.callBack} width={20} height={20} src={require('./del_icon.png')}/>
        </td>
}
export const ChangeIcon = (props) => {
    return <td>
        <img  onClick={props.callBack} width={20} height={20} src={require('./change_icon.png')}/>
    </td>
}
//onClick={props.callBack} onClick={props.callBack}
// export default ChangeIcon;
// export default {DelIcon,ChangeIcon};
