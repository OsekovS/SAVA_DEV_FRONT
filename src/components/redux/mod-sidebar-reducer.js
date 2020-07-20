const SIDEBAR_CHANGE = 'SIDEBAR_CHANGE';
const SIDEBAR_UPLOAD = 'SIDEBAR_UPLOAD'

let initialState = {
    // settings: [
    //     {active: false,text: "SAVA камеры",to: '/setting module cameras' },
    //     {active: true,text: "SAVA СКУД",to: '/setting module acs' },
    //     {active: false,text: "SAVA СЗИ",to: '/setting module iss' }
    // ],
    settings: {

    },
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
    // 
    // console.log(action.type)
   switch (action.type) {
        case SIDEBAR_CHANGE:
            // console.log(action)
            let {curKey,kind,moduleType}=action
            let curSidebar, stateCopyShort
            stateCopy={...state}
            stateCopy[kind] = {...state[kind] }
            if(kind==='dashboards'){
                // curSidebar = state[kind][moduleType]
                // stateCopy[kind][moduleType] = {}
                // stateCopyShort=stateCopy[kind][moduleType]
                for (const moduleKey in stateCopy[kind]) {
                    if(stateCopy[kind].hasOwnProperty(moduleKey)) {
                        stateCopy[kind][moduleKey] = {...state[kind][moduleKey]}
                        Object.keys(stateCopy[kind][moduleKey]).forEach((key,n) => {
                            stateCopy[kind][moduleKey][key] = {...state[kind][moduleKey][key]}
                            if(moduleType===moduleKey&&n===curKey) stateCopy[kind][moduleKey][key].active = true
                            else stateCopy[kind][moduleKey][key].active = false
                        })
                    }
                }
            }  
            else{
                // console.log(action)
                // console.log(state)
                curSidebar = state[kind]
                stateCopy[kind] = {}
                stateCopyShort =stateCopy[kind]
                 Object.keys(curSidebar).forEach((key) => {
                    if(key===curKey) stateCopyShort[key] = {active: true, text: curSidebar[key].text, to: curSidebar[key].to}
                    else stateCopyShort[key] =  {active: false, text: curSidebar[key].text, to: curSidebar[key].to}
                })
                // console.log(stateCopyShort)
            } 
            //
            // 
           

           
            return stateCopy;
        case SIDEBAR_UPLOAD:
            // console.log(action)
            let {dbName,sidebar} = action
            stateCopy={...state}
            stateCopy[action.kind]={...state[action.kind]}
            stateCopy[action.kind][dbName] = {...sidebar}
            if("dashboards"===action.kind){
            //     for (const moduleKey in stateCopy["dashboards"]) {
            //         if (stateCopy["dashboards"].hasOwnProperty(moduleKey)) {
                      
                        for (const indexKey in sidebar) {
                            if(sidebar.hasOwnProperty(indexKey)) {
                                // console.log(sidebar[indexKey])
                                sidebar[indexKey].active = false
                            }
                        }
            //         }
            //     }
                // console.log(sidebar)
            }
            
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