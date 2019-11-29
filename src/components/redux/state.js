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