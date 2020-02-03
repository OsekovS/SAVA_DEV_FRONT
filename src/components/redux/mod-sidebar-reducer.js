const SIDEBAR_CHANGE = 'SIDEBAR_CHANGE';

// let initialState = {
//     state: [
//         {active: false,text: "SAVA камеры",to: '/setting module cameras' },
//         {active: true,text: "SAVA СКУД",to: '/setting module acs' },
//         {active: false,text: "SAVA СЗИ",to: '/setting module iss' }
//     ],
// };

let initialState = {
    settings: [
        {active: false,text: "SAVA камеры",to: '/setting module cameras' },
        {active: true,text: "SAVA СКУД",to: '/setting module acs' },
        {active: false,text: "SAVA СЗИ",to: '/setting module iss' }
    ],
    dashboards: {
        acs: [
            {active: true,text: "События устройств",to: '/visualization acs devicesLogs' },
            {active: false,text: "События пользователей",to: '/visualization acs usersLogs' }
        ],
        iss: [
            {active: true,text: "События SNS",to: '/visualization iss' },
        ]
    }
}

// state = initialState, action
const navBarReducer = (state = initialState, action) => {
    let stateCopy
   switch (action.type) {
       case SIDEBAR_CHANGE:
        stateCopy={...state}
           if(action.type==='settings'){
            // stateCopy.settings={...stateCopy.settings}
            stateCopy.settings = state.settings.map((e,n) => {
                if(n===action.numb) return {active: true, text: e.text, to: e.to}
                else return {active: false, text: e.text, to: e.to}
            })
        }else{
            stateCopy.dashboards = {...state.dashboards}
            stateCopy.dashboards.acs = initialState.dashboards.acs.map((e,n) => {
                if(n===action.numb) return {active: true, text: e.text, to: e.to}
                else return {active: false, text: e.text, to: e.to}
            })
        }
console.log(stateCopy)
            return stateCopy;
       default:
           return state;
   }
}

export const changeSideBarCreator = (numb) => {
    return {type: SIDEBAR_CHANGE, numb: numb}
}

export default navBarReducer;