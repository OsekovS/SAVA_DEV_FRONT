const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    settings: {
    objects: [
        {numb: '1', name: 'Санаторий Звенигород'},
        {numb: '2', name: 'Больница №46'},
        {numb: '3', name: 'Детский сад "Яблочко"'},
        {numb: '4', name: 'Офис'}],
    cameras: [
        {
        object: 'Санаторий Звенигород',
        name: 'Холл',
        ip: '121.41.41.22',
        login: 'admin'
        },
    {
        object: 'Больница №46',
        name: 'Процедурная',
        ip: '192.168.1.177',
        login: 'admin'
    },
    {
        object: 'Детский сад "Яблочко"',
        name: 'Корридор 2 этаж',
        ip: '111.231.211.112',
        login: 'admin'
    },
    {
        object: 'Санаторий Звенигород',
        name: 'Рецепшен',
        ip: '666.231.211.112',
        login: 'admin'
    }],
    registrators: [
        {
            object: 'Санаторий Звенигород',
            name: 'ZZZ',
            ip: '661.6661.41.22',
            login: 'admin'
        },
    ]},
    logs: 
    [{
        "time":"2019\/11\/06 12:53:11",
        "ip_cam":"192.168.3.109",
        "type":"Event",
        "comment":"Motion detect",
        "param":"2019-11-06 12:50:40"
    },
    {
        "time":"2019\/11\/06 12:53:11",
        "ip_cam":"192.168.3.109",
        "type":"Event",
        "comment":"Motion detect",
        "param":"2019-11-06 12:50:52"
    },
    {
        "time":"2019\/11\/06 12:53:11",
        "ip_cam":"192.168.3.109",
        "type":"Event",
        "comment":"Motion detect",
        "param":"2019-11-06 12:51:37"
    }]
};

const camerasReducer = (state = initialState, action) => {
   switch (action.type) {
       case UPDATE_NEW_MESSAGE_BODY:
           return state;
       case SEND_MESSAGE:
           return state;
       default:
           return state;
   }
}

export const sendMessageCreator = () => ({type: SEND_MESSAGE})
export const updateNewMessageBodyCreator = (body) =>
    ({ type: UPDATE_NEW_MESSAGE_BODY, body: body })

export default camerasReducer;