
const NAV_BAR_CHANGE = 'NAV_BAR_CHANGE';
const NAV_BAR_DIR_CHANGE = 'NAV_BAR_DIR_CHANGE';

let initialState = {
    state: [{link:'main',text:'Главная'}],
    translate: {
        visualization: 'Визуализация данных',
        acs: 'СКУД',
        iss: 'СЗИ',
        cameras: 'камер',
        modules: 'модуля',
        setting: 'Настройка',
        users: 'пользователей',
        common: 'общая',
        lic: 'лицензии',
        main: 'Главная'
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
            console.log((window.location.pathname+action.to).split("/").slice(1))
           console.log((window.location.pathname+action.to).split("/").slice(1).map(e => {
                return e.split(' ').reduce((acc,cur) => acc+' '+state.translate[cur],'')
              }))
              let arr = (window.location.pathname+action.to).split("/").slice(1).map(e => {
                return e.split(' ').reduce((acc,cur) => acc+' '+state.translate[cur],'')
              })
            //   console.log(stateCopy.state)
              let links = (window.location.pathname+action.to).split("/").slice(1)
              stateCopy.state = arr.map((e,numb) => {
                  return {link: links[numb], text: e}
              })
              console.log(stateCopy.state)
            //   {link: (window.location.pathname+action.to)}
        //    return (window.location.pathname+action.to).split("/").slice(0,1).map(e => {
        //             return e.split(' ').reduce((acc,cur) => acc+' '+state.translate[cur],'')
        //         }).join(' /');
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