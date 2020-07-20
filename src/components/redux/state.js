let state = {
    navBar: {
        state: [{link:'main',text:'Главная'}]
    },
    headerInfo: {
        briefUserInfo: {
            name: 'administrator',
            admin: 'администратор'
        },
        all: {
            exceptions: 469,
            errors: 12
        }
    },
    allEvents: {
        cameras: {
            events: 1000,
            exceptions: 9,
            errors: 0
        },
        acs: {
            events: 1100,
            exceptions: 406,
            errors: 0
        },
        iss: {
            events: 620,
            exceptions: 54,
            errors: 12
        },
    },
    
    cameras: {
       settings: {objects: [{numb: '1', name: 'Санаторий Звенигород'},
        {numb: '2', name: 'Больница №46'},
        {numb: '3', name: 'Детский сад "Яблочко"'},
        {numb: '4', name: 'Офис'}],
        cameras:  [{
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
    },
    acs: {
        settings: {
            objects: ['Санаторий Звенигород',
        'Больница №46',
        'Детский сад "Яблочко"',
        'Офис'],
        endpoints:  [{
            object: 'Санаторий Звенигород',
            port: '3000',
            ip: '111.111.11.11',
        },
        {
            object: 'Больница №46',
            port: '3000',
            ip: '222.222.22.22',
        },
        {
            object: 'Детский сад "Яблочко"',
            port: '3000',
            ip: '444.444.444.444',
        }]
        },
        logs:  [{
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
        }
        ]
    },
    iss: {
       settings: { objects: ['Санаторий Звенигород',
        'Больница №46',
        'Детский сад "Яблочко"',
        'Офис'],
        endpoints:  [{
            object: 'Санаторий Звенигород',
            port: '6000',
            ip: '999.999.99.99',
        },
        {
            object: 'Больница №46',
            port: '6000',
            ip: '222.222.22.22',
        },
        {
            object: 'Детский сад "Яблочко"',
            port: '6000',
            ip: '777.77.77.777',
        }]},
        logs: 
        [{
            "time":"2019\/11\/06 12:53:11",
            "ip_cam":"192.168.3.109",
            "type":"Event",
            "comment":"Motion detect",
            "param":"2019-11-06 12:50:40"
        }]
    },
    
    users: [{name: 'admin', admin: true},
        {name: 'user1', admin: false},
        {name: 'admin1', admin: true},
        {name: 'admin2', admin: true},
        {name: 'user2', admin: false}],
    net: {
        common: {
            ip: '192.168.3.xxx',
            mask: '255.255.255.xxx',
            gw: '192.168.3.xxx'
        },
        notific: {
            from: "b@mail.ru",
            to: "a@mail.ru"
        },
        timezone: {
            ntp_server1: '1',
            ntp_server2: '2',
            ntp_server3: '3',
            ntp_server4: '4'
        }
    },
    lic: {
        lic_start: '2019-11-13 16:05:50',
        lic_end: '2020-11-12 16:05:50',
        amount: '365',
        remained: '352'
    },
 
   
    
}
export default state;

let modules ={ "acs_castle_ep2":{
    "admin":"yes",
    "loaded":false,
    "settings":{ 
        "sidebar":{
            "active":true,
            "text":"SAVA СКУД «Castle»",
            "to":"/setting module acs"
        }, 
        "Tabels":[ 
            { "title":"Конечные точки", 
            "tableName":"endpoints",
            "formFields":[ { 
                "text":"Объект", 
                "field":"obj", 
                "name":"obj", 
                "component":"select", 
                "options":"objects", 
                "numb":1 
                }, 
                { "text":"Название",
                "field":"name", "name":"name", "component":"input", "type":"text" }, 
                { "text":"Использовать внутреннее имя", "field":"usename", "name":"usename", "component":"input", "type":"checkbox" }, 
                { "text":"Ip адрес", "field":"ip", "name":"ip", "component":"input", "type":"text" }, 
                { "text":"Порт", "field":"port", "name":"port", "component":"input", "type":"text" }, 
                { "text":"Логин", "field":"login", "name":"login", "component":"input", "type":"text" }, 
                { "text":"Пароль", "field":"pass", "name":"pass", "component":"input", "type":"password" } 
            ] }, 
            { "title":"Объекты инфраструктуры", 
            "tableName":"objects", 
            "formFields":[ 
                { "text":"Название объекта", "field":"name", "name":"name", "component":"input", "type":"text" }
             ] } 
        ] }, 
        "indexes":{ 
            "acs_castle_ep2_event":{ 
                "sidebar":{ "active":true, "text":"События устройств", "to":"/visualization acs devicesLogs" }, 
                "style":"devices-events", "title":"События устройств",
                "events":["top","mid","low"], 
                "fields":{
                    "significance":{"hidden":false,"translate":"Приоритет"},
                    "object":{"hidden":false,"translate":"Объекты"}, 
                    "device":{"hidden":false,"translate":"Конечные точки"},
                    "ip_device":{"hidden":true,"translate":"ip конечных точек"},
                    "event":{"hidden":false,"translate":"События"}, 
                    "route":{"hidden":false,"translate":"Направление"}, 
                    "person":{"hidden":false,"translate":"Владелец"}, 
                    "pass_number":{"hidden":true,"translate":"Номер владельца"} 
                } }, "acs_castle_ep2_userlog":{ "sidebar":{ "active":false, "text":"События пользователей", "to":"/visualization acs usersLogs" }, "style":"user-events", "title":"События пользователей", "events":["top","mid","low"], "fields":{ "significance":{"hidden":false,"translate":"Приоритет"}, "object":{"hidden":false,"translate":"Объекты"}, "personal":{"hidden":false,"translate":"Персонал"}, "event":{"hidden":false,"translate":"События"} } }
        }, 
        "title":"SAVA СКУД «Castle»" }, "iss":{ "admin":"yes", "loaded":false, "settings":{ "sidebar":{"active":false,"text":"SAVA СЗИ «SNS»","to":"/setting module iss"}, "Tabels":[ { "title":"Конечные точки", "tableName":"endpoints", "formFields":[ { "text":"Объект", "field":"obj", "name":"obj", "component":"select", "options":"objects", "numb":1 }, { "text":"Название", "field":"name", "name":"name", "component":"input", "type":"text" }, { "text":"Использовать внутреннее имя", "field":"usename", "name":"usename", "component":"input", "type":"checkbox" }, { "text":"Ip адрес", "field":"ip", "name":"ip", "component":"input", "type":"text" }, { "text":"Порт", "field":"port", "name":"port", "component":"input", "type":"text" }, { "text":"Логин", "field":"login", "name":"login", "component":"input", "type":"text" }, { "text":"Домен", "field":"domen", "name":"domen", "component":"input", "type":"text" }, { "text":"Пароль", "field":"pass", "name":"pass", "component":"input", "type":"password" } ] }, { "title":"Объекты инфраструктуры", "tableName":"objects", "formFields":[ { "text":"Название объекта", "field":"name", "name":"name", "component":"input", "type":"text" } ] } ] }, "indexes":{ "sns_event":{ "sidebar":{"active":true,"text":"Журналы станций","to":"/visualization iss"}, "style":"sns_event", "title":"Журналы станций", "events":["0","1"], "fields":{ "event":{"hidden":false,"translate":"Событие"}, "event_type":{"hidden":false,"translate":"Тип события"}, "source_log":{"hidden":true,"translate":"Источник"}, "point":{"hidden":false,"translate":"Конечная точка"}, "significance":{"hidden":false,"translate":"Приоритет"}, "detailed_information":{"hidden":true,"translate":"Детальная информация"} } } }, "title":"SAVA СЗИ «SNS»" 
    },
    "ksc": {
        "admin":"yes",
        "loaded":false,
        "settings":{ 
            "sidebar":{
                "active":true,
                "text":"SAVA СЗИ KSC",
                "to":"/setting module ksc"
            }, 
            "Tabels":[ 
                { "title":"XXX", 
                "tableName":"endpoints",
                "formFields":[ { 
                    "text":"Объект", 
                    "field":"obj", 
                    "name":"obj", 
                    "component":"select", 
                    "options":"objects", 
                    "numb":1 
                    }, 
                    { "text":"Название",
                    "field":"name", "name":"name", "component":"input", "type":"text" }, 
                    { "text":"Использовать внутреннее имя", "field":"usename", "name":"usename", "component":"input", "type":"checkbox" }, 
                    { "text":"Ip адрес", "field":"ip", "name":"ip", "component":"input", "type":"text" }, 
                    { "text":"Порт", "field":"port", "name":"port", "component":"input", "type":"text" }, 
                    { "text":"Логин", "field":"login", "name":"login", "component":"input", "type":"text" }, 
                    { "text":"Пароль", "field":"pass", "name":"pass", "component":"input", "type":"password" } 
                ] }, 
                { "title":"Объекты инфраструктуры", 
                "tableName":"objects", 
                "formFields":[ 
                    { "text":"Название объекта", "field":"name", "name":"name", "component":"input", "type":"text" }
                 ] } 
            ] },
        "indexes":{ 
            "ksc":{ 
                "sidebar":{ "active":true, "text":"Cервер администрирования", "to":"/visualization ksc" }, 
                "style":"devices-events", "title":"Cервер администрирования",
                "events":["top","mid","low"], 
                "fields":{
                    "timestamp":{"hidden":false,"translate":"Время"},
                    "severity":{"hidden":false,"translate":"Приоритет"}, 
                    "hostname":{"hidden":false,"translate":"Имя хоста"},
                    "etdn":{"hidden":false,"translate":"Тип события"},
                    "et":{"hidden":true,"translate":"Сервис"}, 
                    "hdn":{"hidden":true,"translate":"Объект"}, 
                    "hip":{"hidden":true,"translate":"IP адресс"}, 
                    "tdn":{"hidden":false,"translate":"Компонент"},
                    "p1":{"hidden":true,"translate":"Опциональное поле 1"},
                    "p2":{"hidden":true,"translate":"Опциональное поле 2"},
                    "p3":{"hidden":true,"translate":"Опциональное поле 3"},
                    "p4":{"hidden":true,"translate":"Опциональное поле 4"},
                    "p5":{"hidden":true,"translate":"Опциональное поле 5"},
                    "p6":{"hidden":true,"translate":"Опциональное поле 6"},
                    "p7":{"hidden":true,"translate":"Опциональное поле 7"},
                    "p8":{"hidden":true,"translate":"Опциональное поле 8"},

                } 
            }
        } 
    }
    }


// modules: {
//     cameras: {
//         objects: [{numb: '1', name: 'Санаторий Звенигород'},
//         {numb: '2', name: 'Больница №46'},
//         {numb: '3', name: 'Детский сад "Яблочко"'},
//         {numb: '4', name: 'Офис'}],
//         cameras:  [{
//             object: 'Санаторий Звенигород',
//             name: 'Холл',
//             ip: '121.41.41.22',
//             login: 'admin'
//         },
//         {
//             object: 'Больница №46',
//             name: 'Процедурная',
//             ip: '192.168.1.177',
//             login: 'admin'
//         },
//         {
//             object: 'Детский сад "Яблочко"',
//             name: 'Корридор 2 этаж',
//             ip: '111.231.211.112',
//             login: 'admin'
//         },
//         {
//             object: 'Санаторий Звенигород',
//             name: 'Рецепшен',
//             ip: '666.231.211.112',
//             login: 'admin'
//         }],
//         registrators: [
//             {
//                 object: 'Санаторий Звенигород',
//                 name: 'ZZZ',
//                 ip: '661.6661.41.22',
//                 login: 'admin'
//             },
//         ]
//     },
//     acs: {
//         objects: ['Санаторий Звенигород',
//         'Больница №46',
//         'Детский сад "Яблочко"',
//         'Офис'],
//         endpoints:  [{
//             object: 'Санаторий Звенигород',
//             port: '3000',
//             ip: '111.111.11.11',
//         },
//         {
//             object: 'Больница №46',
//             port: '3000',
//             ip: '222.222.22.22',
//         },
//         {
//             object: 'Детский сад "Яблочко"',
//             port: '3000',
//             ip: '444.444.444.444',
//         }],
//     },
//     iss: {
//         objects: ['Санаторий Звенигород',
//         'Больница №46',
//         'Детский сад "Яблочко"',
//         'Офис'],
//         endpoints:  [{
//             object: 'Санаторий Звенигород',
//             port: '6000',
//             ip: '999.999.99.99',
//         },
//         {
//             object: 'Больница №46',
//             port: '6000',
//             ip: '222.222.22.22',
//         },
//         {
//             object: 'Детский сад "Яблочко"',
//             port: '6000',
//             ip: '777.77.77.777',
//         }],
//     }
// },