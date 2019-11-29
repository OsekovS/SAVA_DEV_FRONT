const UPDATE_SETTINGS = 'UPDATE_TIMEZONE_SETTINGS';

let initialState = {
    ntp_server1: '1',
    ntp_server2: '2',
    ntp_server3: '3',
    ntp_server4: '4'
};

const timezoneSettingsReducer = (state = initialState, action) => {
   switch (action.type) {
       case UPDATE_SETTINGS:
            state.ntp_server1 = action.ntp_server1
            state.ntp_server2 = action.ntp_server2
            state.ntp_server3 = action.ntp_server3
            state.ntp_server4 = action.ntp_server4
           return state;
       default:
           return state;
   }
}

export const updateTimezoneActionCreator = ( {ntp_server1,ntp_server2,ntp_server3,ntp_server4}) => ({
    type: UPDATE_SETTINGS, 
    ntp_server1: ntp_server1,
    ntp_server2: ntp_server2,
    ntp_server3: ntp_server3, 
    ntp_server4: ntp_server4
})


export default timezoneSettingsReducer;