
const SIDEBAR_CHANGE = 'SIDEBAR_CHANGE';

// let initialState = {
//     state: [
//         {active: false,text: "SAVA камеры",to: '/setting module cameras' },
//         {active: true,text: "SAVA СКУД",to: '/setting module acs' },
//         {active: false,text: "SAVA СЗИ",to: '/setting module iss' }
//     ],
// };

let initialState = [
        {active: false,text: "SAVA камеры",to: '/setting module cameras' },
        {active: true,text: "SAVA СКУД",to: '/setting module acs' },
        {active: false,text: "SAVA СЗИ",to: '/setting module iss' }
    ]

// state = initialState, action
const navBarReducer = (state = initialState, action) => {
    let stateCopy
   switch (action.type) {
       case SIDEBAR_CHANGE:
            stateCopy = state.map((e,n) => {
                if(n===action.numb) return {active: true, text: e.text, to: e.to}
                else return {active: false, text: e.text, to: e.to}
            })

            return stateCopy;
       default:
           return state;
   }
}

export const changeSideBarCreator = (numb) => {
    return {type: SIDEBAR_CHANGE, numb: numb}
}

export default navBarReducer;