const UPDATE_NET_SETTINGS = 'UPDATE_NET_SETTINGS';

let initialState = {
    ip: '192.168.3.xxx',
    mask: '255.255.255.xxx',
    gw: '192.168.3.xxx'
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
    return ({ type: UPDATE_NET_SETTINGS, ip: ip,mask: mask,gw: gw })}

export default netSettingsReducer;