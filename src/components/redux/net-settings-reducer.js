import * as axios from 'axios'

const UPDATE_NET_SETTINGS = 'UPDATE_NET_SETTINGS';

let initialState = {
    ip: '192.168.3.36',
    mask: '255.255.255.0',
    gw: '192.168.3.1'
};

const netSettingsReducer = (state = initialState, action) => {
   switch (action.type) {
       case UPDATE_NET_SETTINGS:
            state.ip = action.ip;
            state.mask = action.mask;
            state.gw = action.gw;
           return state;
       default:
           return state;
   }
}

export const updateNetActionCreator = ({ip,mask,gw}) =>{
    return ({ type: UPDATE_NET_SETTINGS, ip: ip,mask: mask,gw: gw })
}

export const changeNetActionThunk = (reqObj) => {
        return (dispatch,getState) => {
            // console.log(reqObj)
            // return dispatch({type: ''})
            axios.post("php/settings_admin.php",{network: reqObj}).then(response => {
                
                console.log(response.request)
                let json = JSON.parse(response.request.response);
                console.log(json)
                // reqObj
                // dispatch(updatePage())
            
            }).catch(function (error) {
                // handle error
                console.log(error);
              })
              .finally(function () {
                // always executed
              });
    }
}

export default netSettingsReducer;