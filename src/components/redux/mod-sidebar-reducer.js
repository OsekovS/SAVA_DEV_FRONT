const SIDEBAR_CHANGE = 'SIDEBAR_CHANGE';
const SIDEBAR_UPLOAD = 'SIDEBAR_UPLOAD'

let initialState = {
    settings: [
        {active: false,text: "SAVA камеры",to: '/setting module cameras' },
        {active: true,text: "SAVA СКУД",to: '/setting module acs' },
        {active: false,text: "SAVA СЗИ",to: '/setting module iss' }
    ],
    dashboards: {
        // acs: [
        //     {active: true,text: "События устройств",to: '/visualization acs devicesLogs' },
        //     {active: false,text: "События пользователей",to: '/visualization acs usersLogs' }
        // ],
        // iss: [
        //     {active: true,text: "Журналы станций",to: '/visualization iss' },
        // ]
    }
}

// state = initialState, action
const navBarReducer = (state = initialState, action) => {
    let stateCopy
    // console.log(action)
    // console.log(action.type)
   switch (action.type) {
       case SIDEBAR_CHANGE:
        console.log(state)
        let {curKey,kind,moduleType}=action
        stateCopy={...state}
           if(action.kind==='settings'){
            // stateCopy.settings={...stateCopy.settings}
            stateCopy.settings = state.settings.map((e,n) => {
                if(n===action.numb) return {active: true, text: e.text, to: e.to}
                else return {active: false, text: e.text, to: e.to}
            })
        }else{
            stateCopy[kind] = {...state[kind] }
            let curSidebar = state[kind][moduleType]
            // stateCopy[kind][moduleType] = {...state[kind][moduleType] }
            stateCopy[kind][moduleType] = {}
            Object.keys(curSidebar).forEach((key) => {
                // console.log(curKey)
                // console.log(key)
                if(key===curKey) stateCopy[kind][moduleType][key] = {active: true, text: curSidebar[key].text, to: curSidebar[key].to}
                else stateCopy[kind][moduleType][key] =  {active: false, text: curSidebar[key].text, to: curSidebar[key].to}
            })
        }
            return stateCopy;
        case SIDEBAR_UPLOAD:
            let {dbName,sidebar} = action
            stateCopy={...state}
            stateCopy[action.kind]={...state[action.kind]}
            stateCopy[action.kind][dbName] = {...sidebar}
            // stateCopy[kind] = {...kind}//action.state
            // stateCopy[kind] = action.state
            return stateCopy;
       default:
           return state;
   }
}
export const uploadSidebar = (kind,sidebar,dbName) => {
    return {type: SIDEBAR_UPLOAD, kind,sidebar,dbName}
}
export const changeSideBarCreator = (kind,moduleType,curKey) => {
    return {type: SIDEBAR_CHANGE, kind,moduleType,curKey}
}

export default navBarReducer;