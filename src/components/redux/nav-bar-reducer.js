
const NAV_BAR_CHANGE = 'NAV_BAR_CHANGE';
const NAV_BAR_DIR_CHANGE = 'NAV_BAR_DIR_CHANGE';

let initialState = {
    state: [{link:'',text:'Главная'}],
    translate: {
        visualization: 'Визуализация данных',
        acs: 'СКУД',
        iss: 'СЗИ',
        cameras: 'камер',
        module: 'модуля',
        setting: 'Настройка',
        users: 'пользователей',
        common: 'общая',
        lic: 'лицензии',
        'usersLogs': 'логи пользователей',
        'devicesLogs': 'логи устройств',
        '': 'Главная'
    }
};
// state = initialState, action
const navBarReducer = (state = initialState, action) => {
// console.log(action)
// return state;
    let stateCopy
   switch (action.type) {
       case NAV_BAR_CHANGE:
            stateCopy = {...state};
            stateCopy.state = {...state.state}
            //window.location.pathname
              let arr = ('/'+action.to).split("/").slice(1).map(e => {
                return e.split(' ').reduce((acc,cur) => acc+' '+state.translate[cur],'')
              })
              
              let links = ('/'+action.to).split("/").slice(1)
              stateCopy.state = arr.map((e,numb) => {
                  return {link: links[numb], text: e}
              })
              console.log((window.location.pathname+action.to))
              console.log(arr)
              console.log(links)
            return stateCopy;
        case NAV_BAR_DIR_CHANGE:
                stateCopy = {...state};
                stateCopy.state = [{link: action.to, text: state.translate[action.to]}]

            return stateCopy
       default:
           return state;
   }
}

export const changeLinkCreator = (to) => {
    return {type: NAV_BAR_CHANGE, to: to}
}
export const changeLinkDirectCreator = (to) => {
    return {type: NAV_BAR_DIR_CHANGE, to: to}
}
export default navBarReducer;