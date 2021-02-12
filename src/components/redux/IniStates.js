import moment from "moment"

let EventExample = {
    name: 'snsAlert',
    
}
let a = {
        "acs_castle_ep2":{
            admin:"yes",
            loaded:false,

            settings: {
                sidebar:{active: true,text: "SAVA СКУД «Castle»",to: '/setting module acs' },
                Tabels:[
                     {
                        title: 'Конечные точки',
                        tableName: 'endpoints',
                        formFields: [
                            {text:'Объект', field:'obj', name:"obj", component:"select", options: 'objects', numb:1},
                            {text:'Название', field:'name', name:"name" , component:"input", type:"text"},
                            {text:'Ip адрес', field:'ip', name:"ip", component:"input", type:"text"},
                            {text:'Порт', field:'port', name:"port", component:"input", type:"text"},
                            {text:'Логин', field:'login', name:"login", component:"input", type:"text"},
                            {text:'Пароль', field:'pass', name:"pass", component:"input", type:"password"},
                            {text:'Использовать внутреннее имя', field:'usename', name:"usename", component:"input", type:"checkbox"}
                        ]
                    },
                    {
                        title: 'Объекты инфраструктуры',
                        tableName: 'objects',
                        formFields: [
                            {text:'Название объекта', field:'name', name:"name", component:"input", type:"text"}
                        ]
                    }
                ]
                },
                
           
            indexes:{
                "acs_castle_ep2_event":{
                    sidebar: {active: true,text: "События устройств",to: '/visualization acs devicesLogs' },
                    style:"devices-events",
                    title:"События устройств",
                    events:["top","mid","low"],
                    fields:{
                        significance:{
                            hidden:false,
                            translate:"Приоритет"
                        },
                        object:{
                            hidden:false,
                            translate:"Объекты"
                        },
                        device:{
                            hidden:false,
                            translate:"Конечные точки"
                        },
                        ip_device:{
                            hidden:true,
                            translate:"ip конечных точек"
                        },
                        event:{
                            hidden:false,
                            translate:"События"
                        },
                        route:{
                            hidden:false,
                            translate:"Направление"
                        },
                        person:{
                            hidden:false,
                            translate:"Владелец"
                        },
                        pass_number:{
                            hidden:true,
                            translate:"Номер владельца"
                        }
                    }
                },
                "acs_castle_ep2_userlog":{
                    sidebar:{active: false,text: "События пользователей",to: '/visualization acs usersLogs' },
                    style:"user-events",
                    title:"События пользователей",
                    events:["top","mid","low"],
                    fields:{
                        significance:{
                            hidden:false,
                            translate:"Приоритет"
                        },
                        object:{
                            hidden:false,
                            translate:"Объекты"
                        },
                        personal:{
                            hidden:false,
                            translate:"Персонал"
                        },
                        event:{
                            hidden:false,
                            translate:"События"
                        }
                    }
                }
            },
            title:"SAVA СКУД «Castle»"
        },
        iss:{
            admin:"yes",
            loaded:false,
            settings: {
                sidebar:{active: false,text: "SAVA СЗИ «SNS»",to: '/setting module iss' },
                Tabels:[
                     {
                        title: 'Конечные точки',
                        tableName: 'endpoints',
                        formFields: [
                            {text:'Объект', field:'obj', name:"obj", component:"select", options: 'objects', numb:1},
                            {text:'Название', field:'name', name:"name" , component:"input", type:"text"},
                            {text:'Ip адрес', field:'ip', name:"ip", component:"input", type:"text"},
                            {text:'Порт', field:'port', name:"port", component:"input", type:"text"},
                            {text:'Логин', field:'login', name:"login", component:"input", type:"text"},
                            {text:'Домен', field:'domen', name:"domen", component:"input", type:"text"},
                            {text:'Пароль', field:'pass', name:"pass", component:"input", type:"password"},
                            {text:'Использовать внутреннее имя', field:'usename', name:"usename", component:"input", type:"checkbox"}    
                        ]
                    },
                    {
                        title: 'Объекты инфраструктуры',
                        tableName: 'objects',
                        formFields: [
                            {text:'Название объекта', field:'name', name:"name", component:"input", type:"text"}
                        ]
                    }
                ]
                },
            indexes:{
                sns_event:{
                    sidebar:{active: true,text: "Журналы станций",to: '/visualization iss' },
                    style:"sns_event",
                    title:"Журналы станций",
                    events:["0","1"],
                    fields:{
                        event:{
                            hidden:false,
                            translate:"Событие"
                        },
                        event_type:{
                            hidden:false,
                            translate:"Тип события"
                        },
                        source_log:{
                            hidden:true,
                            translate:"Источник"
                        },
                        point:{
                            hidden:false,
                            translate:"Конечная точка"
                        },
                        significance:{
                            hidden:false,
                            translate:"Приоритет"
                        },
                        detailed_information:{
                            hidden:true,
                            translate:"Детальная информация"
                        }
                    }
                }
            }
            ,title:"SAVA СЗИ «SNS»"
        }
    }
    //hash123: "40bd001563085fc35165329ea1ff5c5ecbdbbeef"
    //hash1: "356a192b7913b04c54574d18c28d46e6395428ab"
    let iss={
        endpoints: [
            {text:'Объект', field:'obj'},
            {text:'Название конечной точки', field:'name'},
            {text:'Использовать внутреннее имя', field:'usename'},
            {text:'ip конечной точки', field:'ip'},
            {text:'Логин', field:'login'},
            {text:'Пароль', field:'pass'},
        ],
        objects: [
            {text:'Название объекта', field:'name'}
        ]
    }
    let acs_castle_ep2={
        endpoints: [
            {text:'Объект', field:'obj'},
            {text:'Название конечной точки', field:'name'},
            {text:'Использовать внутреннее имя', field:'usename'},
            {text:'ip конечной точки', field:'ip'},
            {text:'Логин', field:'login'},
            {text:'Пароль', field:'pass'},
        ],
        objects: [
            {text:'Название объекта', field:'name'}
        ]
    }
    let inDb1=    {
        headerElements : [
        {text:'Дата', type:'date', field:'time'},
        {text:'Тип события', type:'text', field:'significance'},
        {text:'Объект', type:'text', field:'object'},
        {text:'Конечная точка', type:'text', field:'device'},
        {text:'Событие', type:'text', field:'event'},
        {text:'Направление', type:'text', field:'route'},
        {text:'Владелец', type:'text', field:'person'}
      ],
        footerElements : [
            {text:'Номер карты: ', field:'pass_number'},
            {text:'ip конечной точки: ', field:'ip_device'},      
      ],

      
      indexName: 'acs_castle_ep2_event',
      logs:  [],
    timeFilter: {
        from: {number: 60, type:'days'},
        to: 'now'
    },
    uploads: {
      uploads: false,
      timeKind: 1,
      timeNum: 5000,
      from_number: '2',
      from_time_type: 'M',
      to: "now/d"
    },
   
    
 
    paramFilter: {},
    pagination: {
        total: '',
        currentPage: 1,
        fromPage: 1,
        showedPages: 5,
        lastPage: '',
        showedLogs: 100,
        showedLogsList: [50, 100, 250, 500]
    },
    sortParam: {
        type:'date',
        field:'time',
        direction: 'asc'
    },
    curLog: null
    }
    // 277 210
    let inDb4=    {
        headerElements:[
            {text:"Дата",type:"date",field:"time"},
            {text:"",type:"text",field:"significance"},
            {text:"Тип события",type:"text",field:"event_type"},
            {text:"Событие",type:"text",field:"event"},
            {text:"Конечная точка",type:"text",field:"point"}
        ],
        footerElements:[
            {text:"Источник: ",field:"source_log"},
            {text:"Событие: ",field:"event"},
            {text:"Детальная информация: ",field:"detailed_information"}
        ],
        slyle:{
            heigth: 277,
            minHeigth: 277
        },
        indexName:"sns_event",
        logs:[],
        timeFilter:{
            from:"2020/01/26 00:00:00",
            to:"2020/01/26 23:59:00"
        },
        uploads:{
            uploads:true,timeKind:1,timeNum:11000,to:"now/d"},
            paramFilter:{},
            pagination:{
                total:"",
                currentPage:1,
                fromPage:1,
                showedPages:5,
                lastPage:"",
                showedLogs:100,
                showedLogsList:[50,100,250,500]
            },
        sortParam:{
            type:"date",
            field:"time",
            direction:"asc"
        },
        curLog:null
    }

    let inDb3=    {
        headerElements : [
        {text:'Дата', type:'date', field:'time'},
        {text:'Тип события', type:'text', field:'significance'},
        {text:'Объект', type:'text', field:'object'},
        {text:'Конечная точка', type:'text', field:'device'},
        {text:'Событие', type:'text', field:'event'},
        {text:'Направление', type:'text', field:'route'},
        {text:'Владелец', type:'text', field:'person'}
      ],
        footerElements : [
            {text:"Источник: ", field:"source_log"},{text:"Событие: ", field:"event"},{text:"Детальная информация: ", field:"detailed_information"},     
      ],

      
      indexName: 'acs_castle_ep2_event',
      logs:  [],
    timeFilter: {
        from: {number: 60, type:'days'},
        to: 'now'
    },
    uploads: {
      uploads: false,
      timeKind: 1,
      timeNum: 5000,
      from_number: '2',
      from_time_type: 'M',
      to: "now/d"
    },
   
    
 
    paramFilter: {},
    pagination: {
        total: '',
        currentPage: 1,
        fromPage: 1,
        showedPages: 5,
        lastPage: '',
        showedLogs: 100,
        showedLogsList: [50, 100, 250, 500]
    },
    sortParam: {
        type:'date',
        field:'time',
        direction: 'asc'
    },
    curLog: null
    }
    let filter1old= {
        'object': {
            "Детский садик 'вишенка'":{
                devices: [
                    {
                        ip: "192.168.1.12",
                        names: ["Коридор", "Фойе"]
                    },
                    {
                        ip: "192.168.1.13",
                        names: ["Кухня", "Варня"]
                    },
                    {
                        ip: "192.168.1.15",
                        names: ["Игровая площадка"]
                    }
            ],
            color: '#ff0000'
            },
            "Крематорий 'барбекью'":{
                devices: [
                    {
                        ip: "192.168.1.20",
                        names: ["Печи"]
                    },
                    {
                        ip: "192.168.1.21",
                        names: ["Морозильник", "Холодильник"]
                    },
                    {
                        ip: "192.168.1.22",
                        names: ["Вещевая"]
                    }
            ],
            color: '#00ff00'
            },
        "Администрация":{
            devices: [
                {
                    ip: "192.168.1.29",
                    names: ["Парадный вход"]
                },
                {
                    ip: "192.168.1.30",
                    names: ["Бухгалтерия", "Считоводня"]
                },
                {
                    ip: "192.168.1.32",
                    names: ["Столовая"]
                }
            ],
            color: '#000055'
        }
    },
        'event': [
            "Зарегистрирован проход.",
            "Доступ запрещен. Отсутствует разрешение на проход.",
            "Зарегистрирован проход, санкционированный с кнопки.",
            "Доступ запрещен."
            ],
        'route': [
            "Вход",
            "Выход"
            ],
        "significance": [
            '0',
            '1',
            '2'
        ],
        'person': [
            "-",
            "Артем Артишев",
            "Николай Таратьев",
            "Ксения Воробьева",
            "Михаил Коленьев",
            "Ринат Благовещенский",
            "Виталий Трубной",
            "Виталий Мерзляков",
            "Юрий Удинский",
            "Эльдар Голубикин",
            "Олег Симонов",
            "Сергей Голенский",
            "Наталья Морозова",
            "Матвей Шестаковский",
            ],
            'pass_number': [
                "-",
                "121.15547",
                "242.31844",
                "301.31412",
                "024.72154",
                "047.20140",
                "123.25200",
                "120.44417",
                "401.40400",
                "024.12109",
                "021.31544",
                "004.10240",
                "210.21406",
                "109.31001",
            ],
            translate: {
                'object': 'Объекты',
                'event': 'События',
                'route': 'Направление',
                'person': 'Владелец',
                'pass_number': 'Номер владельца',
                'priority': 'Приоритет'
            }
    }
    let filter1= {
        object: ["Крематорий ''барбекью''", "Детский садик ''вишенка''", "Администрация"],
        device: ["Коридор", "Фойе", "Кухня", "Варня", "Игровая площадка", "Печи", "Морозильник", "Холодильник", "Вещевая", "Парадный вход", "Бухгалтерия", "Считоводня", "Столовая"],
        ip_device: ["192.168.1.12", "192.168.1.13", "192.168.1.15", "192.168.1.20",  "192.168.1.21", "192.168.1.22", "192.168.1.29", "192.168.1.30", "192.168.1.32"],
        'event': [
            "Зарегистрирован проход.",
            "Доступ запрещен. Отсутствует разрешение на проход.",
            "Зарегистрирован проход, санкционированный с кнопки.",
            "Доступ запрещен."
            ],
        'route': [
            "Вход",
            "Выход"
            ],
        "significance": [
            '0',
            '1',
            '2'
        ],
        'person': [
            "-",
            "Артем Артишев",
            "Николай Таратьев",
            "Ксения Воробьева",
            "Михаил Коленьев",
            "Ринат Благовещенский",
            "Виталий Трубной",
            "Виталий Мерзляков",
            "Юрий Удинский",
            "Эльдар Голубикин",
            "Олег Симонов",
            "Сергей Голенский",
            "Наталья Морозова",
            "Матвей Шестаковский",
            ],
            'pass_number': [
                "-",
                "121.15547",
                "242.31844",
                "301.31412",
                "024.72154",
                "047.20140",
                "123.25200",
                "120.44417",
                "401.40400",
                "024.12109",
                "021.31544",
                "004.10240",
                "210.21406",
                "109.31001",
            ],
            translate: {
                'object': 'Объекты',
                'event': 'События',
                'route': 'Направление',
                'person': 'Владелец',
                'pass_number': 'Номер владельца',
                'significance': 'Приоритет',
                'device': 'Конечные точки',
                'ip_device': 'ip конечных точек'
            }
    }
    let filter2 =  {
        object : [
            "Детский садик ''вишенка''",
            "Крематорий ''барбекью''",
            "Администрация"
            ],
        significance: [
            '0',
            '1',
            '2'
        ],
        personal : [
            "Админ",
            "Охранник"
            ],
        
        translate: {
            'object': 'Объекты',
            'personal': 'Персонал',
            'significance': 'Приоритет'
        }           
    }
    // delete from filters where indexName='acs_castle_ep2_userlog';
    // delete from filters where indexName='acs_castle_ep2_event';
    // insert into filters (indexName,json) values ('acs_castle_ep2_event','{  "object":["Крематорий ''барбекью''","Детский садик ''вишенка''","Администрация"],  "device":[    "Коридор",    "Фойе",    "Кухня",    "Варня",    "Игровая площадка",    "Печи",    "Морозильник",    "Холодильник",    "Вещевая",    "Парадный вход",    "Бухгалтерия",    "Считоводня",    "Столовая"  ],  "ip_device":[    "192.168.1.12",    "192.168.1.13",    "192.168.1.15",    "192.168.1.20",    "192.168.1.21",    "192.168.1.22",    "192.168.1.29",    "192.168.1.30",    "192.168.1.32"  ],  "event":[    "Зарегистрирован проход.",    "Доступ запрещен. Отсутствует разрешение на проход.",    "Зарегистрирован проход, санкционированный с кнопки.",    "Доступ запрещен."  ],  "route":["Вход","Выход"],  "significance":["0","1","2"],  "person":[    "-",    "Артем Артишев",    "Николай Таратьев",    "Ксения Воробьева",    "Михаил Коленьев",    "Ринат Благовещенский",    "Виталий Трубной",    "Виталий Мерзляков",    "Юрий Удинский",    "Эльдар Голубикин",    "Олег Симонов",    "Сергей Голенский",    "Наталья Морозова",    "Матвей Шестаковский"  ],  "pass_number":[    "-",    "121.15547",    "242.31844",    "301.31412",    "024.72154",    "047.20140",    "123.25200",    "120.44417",    "401.40400",    "024.12109",    "021.31544",    "004.10240",    "210.21406",    "109.31001"  ],  "translate":{    "object":"Объекты",    "event":"События",    "route":"Направление",    "person":"Владелец",    "pass_number":"Номер владельца",    "significance":"Приоритет",    "device":"Конечные точки",    "ip_device":"ip конечных точек"  } }');
    // insert into filters (indexName,json) values ('acs_castle_ep2_userlog','  {  "object":["Детский садик ''вишенка''","Крематорий ''барбекью''","Администрация"],  "significance":["0","1","2"],  "personal":["Админ","Охранник"],  "translate":{"object":"Объекты","personal":"Персонал","significance":"Приоритет"} }');
    let inDb2=    {

    headerElements :[{text:'Дата', type:'date', field:'time'},
    {text:'Тип события', type:'text', field:'significance'},
    {text:'Объект', type:'text', field:'object'},
    {text:'Событие', type:'text', field:'event'},
    {text:'Направление', type:'text', field:'personal'}
  ],

    footerElements : [
        {"text":"Событие", "type":"text", "field":"event"}      
    ],
      
      indexName: 'acs_castle_ep2_userlog',
      logs:  [],
    timeFilter: {
        from: {number: 60, type:'days'},
        to: 'now'
    },
    uploads: {
      uploads: false,
      timeKind: 1,
      timeNum: 5000,
      from_number: '2',
      from_time_type: 'M',
      to: "now/d"
    },
   
    
 
    paramFilter: {},
    pagination: {
        total: '',
        currentPage: 1,
        fromPage: 1,
        showedPages: 5,
        lastPage: '',
        showedLogs: 100,
        showedLogsList: [50, 100, 250, 500]
    },
    sortParam: {
        type:'date',
        field:'time',
        direction: 'asc'
    },
    curLog: null
    }
    let circleDg1 = {
        field: 'object',
        indexName: 'acs_castle_ep2_event',
        logs:  [],
        timeFilter: {
            from: {number: 90, type:'days'},
            to: 'now'
        },
        uploads: {
        uploads: true,
        timeKind: 1,
        timeNum: 10000,
        to: "now/d"
        },
        paramFilter: {},
    }
    let circleDg2 = {
        field: 'object',
        indexName: 'acs_castle_ep2_userlog',
        logs:  [],
        timeFilter: {
            from: {number: 1, type:'days'},
            to: 'now'
        },
        uploads: {
        uploads: true,
        timeKind: 1,
        timeNum: 11000,
        to: "now/d"
        },
        paramFilter: {}, 
    }
     //{    headerElements :[{text:'Дата', type:'date', field:'time'},    {text:'Приоритет', type:'text', field:'significance'},    {text:'Тип события', type:'text', field:'event_type'},    {text:'Событие', type:'text', field:'event'},    {text:'Конечная точка', type:'text', field:'point'}  ],      name:'События SNS',    footerElements: [],            indexName: 'sns_event',      logs:  [],    timeFilter: {        from: {number: 60, type:'days'},        to: 'now'    },    uploads: {      uploads: false,      timeKind: 1,      timeNum: 5000,      from_number: '2',      from_time_type: 'M',      to: "now/d"    },            paramFilter: {},    pagination: {        total: '',        currentPage: 1,        fromPage: 1,        showedPages: 5,        lastPage: '',        showedLogs: 100,        showedLogsList: [50, 100, 250, 500]    },    sortParam: {        type:'date',        field:'time',        direction: 'asc'    },    curLog: null    }
    let circleDg3 = {
        field: 'event_type',
        indexName: 'sns_event',
        logs:  [],
        timeFilter: {
            from: {number: 1, type:'days'},
            to: 'now'
        },
        uploads: {
        uploads: false,
        timeKind: 1,
        timeNum: 11000,
        from_number: '3',
        from_time_type: 'h',
        to: "now/d"
        },
        paramFilter: {}, 
    }


    // { 
    //     "ksc":{ "admin":"yes", "loaded":false,
    //     "settings":{ "sidebar":{"active":true,"text":"SAVA СЗИ KSC","to":"/setting module ksc"}, 
    //     "Tabels":[ { "title":"XXX", "tableName":"endpoints", 
    //         "formFields":[ { "text":"Объект", "field":"obj", "name":"obj", "component":"select", "options":"objects", "numb":1 }, 
    //         { "text":"Название", "field":"name", "name":"name", "component":"input", "type":"text" }, 
    //         { "text":"Использовать внутреннее имя", "field":"usename", "name":"usename", "component":"input", "type":"checkbox" }, 
    //         { "text":"Ip адрес", "field":"ip", "name":"ip", "component":"input", "type":"text" }, 
    //         { "text":"Порт", "field":"port", "name":"port", "component":"input", "type":"text" }, 
    //         { "text":"Логин", "field":"login", "name":"login", "component":"input", "type":"text" }, 
    //         { "text":"Пароль", "field":"pass", "name":"pass", "component":"input", "type":"password" } ] }, 
    //         { "title":"Объекты инфраструктуры", "tableName":"objects", "formFields":[ 
    //             { "text":"Название объекта", "field":"name", "name":"name", "component":"input", "type":"text" } ] } ] },
    //              "title":"SAVA СЗИ KSC", 
    //              "indexes":{ 
    //                  "ksc":{ "sidebar":{ "active":true, "text":"Cервер администрирования", "to":"/visualization ksc" },
    //                   "style":"devices-events", 
    //                   "title":"Cервер администрирования", 
    //                   "events":["top","mid","low"], 
    //                   "fields":{ 
    //                       "significance":{"hidden":false,"translate":"Приоритет"}, 
    //                       "hostname":{"hidden":false,"translate":"Имя хоста"}, 
    //                       "etdn":{"hidden":false,"translate":"Тип события"}, 
    //                       "et":{"hidden":true,"translate":"Сервис"}, 
    //                       "hdn":{"hidden":true,"translate":"Объект"}, 
    //                       "hip":{"hidden":true,"translate":"IP адресс"}, 
    //                       "tdn":{"hidden":false,"translate":"Компонент"}, 
    //                       "p1":{"hidden":true,"translate":"Опциональное поле 1"}, 
    //                       "p2":{"hidden":true,"translate":"Опциональное поле 2"}, 
    //                       "p3":{"hidden":true,"translate":"Опциональное поле 3"}, 
    //                       "p4":{"hidden":true,"translate":"Опциональное поле 4"}, 
    //                       "p5":{"hidden":true,"translate":"Опциональное поле 5"}, 
    //                       "p6":{"hidden":true,"translate":"Опциональное поле 6"}, 
    //                       "p7":{"hidden":true,"translate":"Опциональное поле 7"}, 
    //                       "p8":{"hidden":true,"translate":"Опциональное поле 8"} 
    //                     } } } 
    //     } }



//.юзер с снс и скудом и ксц. вставляем в модули ющера
    // let user = {"acs_castle_ep2":{
    //     admin:"yes",
    //     loaded:false,
    //     settings:{
    //         sidebar:{
    //             active:false,
    //             text:"SAVA СКУД «Castle»",
    //             to:"/setting module acs"},Tabels:[
    //                 {
    //                     title:"Конечные точки",
    //                     tableName:"endpoints",
    //                     formFields:[{text:"Объект",field:"obj",name:"obj",component:"select",options:"objects",numb:1},{text:"Название",field:"name",name:"name",component:"input",type:"text"},{text:"Использовать внутреннее имя",field:"usename",name:"usename",component:"input",type:"checkbox"},{text:"Ip адрес",field:"ip",name:"ip",component:"input",type:"text"},{text:"Порт",field:"port",name:"port",component:"input",type:"text"},{text:"Логин",field:"login",name:"login",component:"input",type:"text"},{text:"Пароль",field:"pass",name:"pass",component:"input",type:"password"}]},
    //                     {title:"Объекты инфраструктуры",tableName:"objects",formFields:[{text:"Название объекта",field:"name",name:"name",component:"input",type:"text"}]}]},indexes:{"acs_castle_ep2_event":{sidebar:{active:true,text:"События устройств",to:"/visualization acs devicesLogs"},style:"devices-events",title:"События устройств",events:["top","mid","low"],fields:{significance:{hidden:false,translate:"Приоритет"},object:{hidden:false,translate:"Объекты"},device:{hidden:false,translate:"Конечные точки"},ip_device:{hidden:true,translate:"ip конечных точек"},event:{hidden:false,translate:"События"},route:{hidden:false,translate:"Направление"},person:{hidden:false,translate:"Владелец"},pass_number:{hidden:true,translate:"Номер владельца"}}},
    //                     "acs_castle_ep2_userlog":{sidebar:{active:false,text:"События пользователей",to:"/visualization acs usersLogs"},style:"user-events",title:"События пользователей",events:["top","mid","low"],fields:{significance:{hidden:false,translate:"Приоритет"},object:{hidden:false,translate:"Объекты"},personal:{hidden:false,translate:"Персонал"},event:{hidden:false,translate:"События"}}}},title:"SAVA СКУД «Castle»"},iss:{admin:"yes",loaded:false,settings:{sidebar:{active:false,text:"SAVA СЗИ «SNS»",to:"/setting module iss"},Tabels:[{title:"Конечные точки",tableName:"endpoints",formFields:[{text:"Объект",field:"obj",name:"obj",component:"select",options:"objects",numb:1},{text:"Название",field:"name",name:"name",component:"input",type:"text"},{text:"Использовать внутреннее имя",field:"usename",name:"usename",component:"input",type:"checkbox"},{text:"Ip адрес",field:"ip",name:"ip",component:"input",type:"text"},{text:"Порт",field:"port",name:"port",component:"input",type:"text"},{text:"Логин",field:"login",name:"login",component:"input",type:"text"},{text:"Домен",field:"domen",name:"domen",component:"input",type:"text"},{text:"Пароль",field:"pass",name:"pass",component:"input",type:"password"}]},{title:"Объекты инфраструктуры",tableName:"objects",formFields:[{text:"Название объекта",field:"name",name:"name",component:"input",type:"text"}]}]},indexes:{sns_event:{sidebar:{active:true,text:"Журналы станций",to:"/visualization iss"},style:"sns_event",title:"Журналы станций",events:["0","1"],fields:{event:{hidden:false,translate:"Событие"},event_type:{hidden:false,translate:"Тип события"},source_log:{hidden:true,translate:"Источник"},point:{hidden:false,translate:"Конечная точка"},significance:{hidden:false,translate:"Приоритет"},detailed_information:{hidden:true,translate:"Детальная информация"}}}},title:"SAVA СЗИ «SNS»"},ksc:{admin:"yes",loaded:false,settings:{sidebar:{active:true,text:"SAVA СЗИ KSC",to:"/setting module ksc"},Tabels:[{title:"XXX",tableName:"endpoints",formFields:[{text:"Объект",field:"obj",name:"obj",component:"select",options:"objects",numb:1},{text:"Название",field:"name",name:"name",component:"input",type:"text"},{text:"Использовать внутреннее имя",field:"usename",name:"usename",component:"input",type:"checkbox"},{text:"Ip адрес",field:"ip",name:"ip",component:"input",type:"text"},{text:"Порт",field:"port",name:"port",component:"input",type:"text"},{text:"Логин",field:"login",name:"login",component:"input",type:"text"},{text:"Пароль",field:"pass",name:"pass",component:"input",type:"password"}]},{title:"Объекты инфраструктуры",tableName:"objects",formFields:[{text:"Название объекта",field:"name",name:"name",component:"input",type:"text"}]}]},title:"SAVA СЗИ KSC",indexes:{ksc:{sidebar:{active:true,text:"Cервер администрирования",to:"/visualization ksc"},style:"devices-events",title:"Cервер администрирования",events:["top","mid","low"],fields:{significance:{hidden:false,translate:"Приоритет"},hostname:{hidden:false,translate:"Имя хоста"},etdn:{hidden:false,translate:"Тип события"},et:{hidden:true,translate:"Сервис"},hdn:{hidden:true,translate:"Объект"},hip:{hidden:true,translate:"IP адресс"},tdn:{hidden:false,translate:"Компонент"},"p1":{hidden:true,translate:"Опциональное поле 1"},"p2":{hidden:true,translate:"Опциональное поле 2"},"p3":{hidden:true,translate:"Опциональное поле 3"},"p4":{hidden:true,translate:"Опциональное поле 4"},"p5":{hidden:true,translate:"Опциональное поле 5"},"p6":{hidden:true,translate:"Опциональное поле 6"},"p7":{hidden:true,translate:"Опциональное поле 7"},"p8":{hidden:true,translate:"Опциональное поле 8"}}}}}}
    // ksc:{
    //     admin:"yes",
    //     loaded:false,
    //     settings:{
    //         sidebar:{
    //             active:true,
    //             text:"SAVA СЗИ KSC",
    //             to:"/setting module ksc"},
    //             Tabels:[{title:"XXX",tableName:"endpoints",formFields:[{text:"Объект",field:"obj",name:"obj",component:"select",options:"objects",numb:1},{text:"Название",field:"name",name:"name",component:"input",type:"text"},{text:"Использовать внутреннее имя",field:"usename",name:"usename",component:"input",type:"checkbox"},{text:"Ip адрес",field:"ip",name:"ip",component:"input",type:"text"},{text:"Порт",field:"port",name:"port",component:"input",type:"text"},{text:"Логин",field:"login",name:"login",component:"input",type:"text"},{text:"Пароль",field:"pass",name:"pass",component:"input",type:"password"}]},{title:"Объекты инфраструктуры",tableName:"objects",formFields:[{text:"Название объекта",field:"name",name:"name",component:"input",type:"text"}]}]},title:"SAVA СЗИ KSC",indexes:{ksc:{sidebar:{active:true,text:"Cервер администрирования",to:"/visualization ksc"},style:"devices-events",title:"Cервер администрирования",events:["top","mid","low"],fields:{significance:{hidden:false,translate:"Приоритет"},hostname:{hidden:false,translate:"Имя хоста"},etdn:{hidden:false,translate:"Тип события"},et:{hidden:true,translate:"Сервис"},hdn:{hidden:true,translate:"Объект"},hip:{hidden:true,translate:"IP адресс"},tdn:{hidden:false,translate:"Компонент"},"p1":{hidden:true,translate:"Опциональное поле 1"},"p2":{hidden:true,translate:"Опциональное поле 2"},"p3":{hidden:true,translate:"Опциональное поле 3"},"p4":{hidden:true,translate:"Опциональное поле 4"},"p5":{hidden:true,translate:"Опциональное поле 5"},"p6":{hidden:true,translate:"Опциональное поле 6"},"p7":{hidden:true,translate:"Опциональное поле 7"},"p8":{hidden:true,translate:"Опциональное поле 8"}}}}}}
    // "acs_castle_ep2":{admin:"yes",loaded:false,settings:{sidebar:{active:false,text:"SAVA СКУД «Castle»",to:"/setting module acs"},Tabels:[{title:"Конечные точки",tableName:"endpoints",formFields:[{text:"Объект",field:"obj",name:"obj",component:"select",options:"objects",numb:1},{text:"Название",field:"name",name:"name",component:"input",type:"text"},{text:"Использовать внутреннее имя",field:"usename",name:"usename",component:"input",type:"checkbox"},{text:"Ip адрес",field:"ip",name:"ip",component:"input",type:"text"},{text:"Порт",field:"port",name:"port",component:"input",type:"text"},{text:"Логин",field:"login",name:"login",component:"input",type:"text"},{text:"Пароль",field:"pass",name:"pass",component:"input",type:"password"}]},{title:"Объекты инфраструктуры",tableName:"objects",formFields:[{text:"Название объекта",field:"name",name:"name",component:"input",type:"text"}]}]},indexes:{"acs_castle_ep2_event":{sidebar:{active:true,text:"События устройств",to:"/visualization acs devicesLogs"},style:"devices-events",title:"События устройств",events:["top","mid","low"],fields:{significance:{hidden:false,translate:"Приоритет"},object:{hidden:false,translate:"Объекты"},device:{hidden:false,translate:"Конечные точки"},ip_device:{hidden:true,translate:"ip конечных точек"},event:{hidden:false,translate:"События"},route:{hidden:false,translate:"Направление"},person:{hidden:false,translate:"Владелец"},pass_number:{hidden:true,translate:"Номер владельца"}}},"acs_castle_ep2_userlog":{sidebar:{active:false,text:"События пользователей",to:"/visualization acs usersLogs"},style:"user-events",title:"События пользователей",events:["top","mid","low"],fields:{significance:{hidden:false,translate:"Приоритет"},object:{hidden:false,translate:"Объекты"},personal:{hidden:false,translate:"Персонал"},event:{hidden:false,translate:"События"}}}},title:"SAVA СКУД «Castle»"} 
    // {iss:{admin:"yes",loaded:false,settings:{sidebar:{active:false,text:"SAVA СЗИ «SNS»",to:"/setting module iss"},Tabels:[{title:"Конечные точки",tableName:"endpoints",formFields:[{text:"Объект",field:"obj",name:"obj",component:"select",options:"objects",numb:1},{text:"Название",field:"name",name:"name",component:"input",type:"text"},{text:"Использовать внутреннее имя",field:"usename",name:"usename",component:"input",type:"checkbox"},{text:"Ip адрес",field:"ip",name:"ip",component:"input",type:"text"},{text:"Порт",field:"port",name:"port",component:"input",type:"text"},{text:"Логин",field:"login",name:"login",component:"input",type:"text"},{text:"Домен",field:"domen",name:"domen",component:"input",type:"text"},{text:"Пароль",field:"pass",name:"pass",component:"input",type:"password"}]},{title:"Объекты инфраструктуры",tableName:"objects",formFields:[{text:"Название объекта",field:"name",name:"name",component:"input",type:"text"}]}]},indexes:{sns_event:{sidebar:{active:true,text:"Журналы станций",to:"/visualization iss"},style:"sns_event",title:"Журналы станций",events:["0","1"],fields:{event:{hidden:false,translate:"Событие"},event_type:{hidden:false,translate:"Тип события"},source_log:{hidden:true,translate:"Источник"},point:{hidden:false,translate:"Конечная точка"},significance:{hidden:false,translate:"Приоритет"},detailed_information:{hidden:true,translate:"Детальная информация"}}}},title:"SAVA СЗИ «SNS»"},
export const acsIni = function(){
    let now = new Date()
    let toDate = moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0)))
    let fromDate = moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0))).subtract(60, "days")
        

  

    return {
        settings: {},
        dashboards: {
            iss: null,
            acs_castle_ep2: null,
            ksc: null
        },
        logs: {
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
                "param":"2019-11-06 12:51:37"
            }],
            bar1: {series: [{
                data: [13, 17, 19]           
                }],
                xLabels : ['-','e','x']
            },
            bar2: {series: [{
                data: [13, 17, 19]           
                }],
                xLabels : ['xz','e','x']
            },
            timeFilter: {
                from: fromDate,
                to: toDate
            },
            uploads: {
              uploads: true,
              timeKind: 1,
              timeNum: 5000,
              from_number: '2',
              from_time_type: 'M',
              to: "now/d"///M
            },
            paramFilter: {},
            pagination: {
                total: '',
                currentPage: 1,
                fromPage: 1,
                showedPages: 5,
                lastPage: '',
                showedLogs: 100,
                showedLogsList: [50, 100, 250, 500]
            },
            sortParam: {
                type:'date',
                field:'time',
                direction: 'asc'
            },
            curLog: null
        }
       
    }
}
// let sss = {"indexElements":[{"text":"Дата","type":"date","field":"time","colWidth":128},
//                         {"text":"","type":"text","field":"significance","colWidth":25}, 
//                         {"text":"Имя хоста","type":"text","field":"hostname","colWidth":92},
//                         {"text":"Тип события","type":"text","field":"etdn","colWidth":92},
//                         {"text":"Сервис","type":"text","field":"et","colWidth":92},
//                         {"text":"Объект","type":"text","field":"hdn","colWidth":92},
//                         {"text":"IP адресс","type":"text","field":"hip","colWidth":92},
//                         {"text":"Компонент","type":"text","field":"tdn","colWidth":92},
//                         {"text":"Сообщение","type":"text","field":"messege","colWidth":92},
//                         {"Опциональное поле 1":"Имя хоста","type":"text","field":"p1","colWidth":92},
//                         {"Опциональное поле 2":"Имя хоста","type":"text","field":"p2","colWidth":92},
//                         {"Опциональное поле 3":"Имя хоста","type":"text","field":"p3","colWidth":92},
//                         {"Опциональное поле 4":"Имя хоста","type":"text","field":"p4","colWidth":92},
//                         {"Опциональное поле 5":"Имя хоста","type":"text","field":"p5","colWidth":92},
//                         {"Опциональное поле 6":"Имя хоста","type":"text","field":"p6","colWidth":92},
//                         {"Опциональное поле 7":"Имя хоста","type":"text","field":"p7","colWidth":92},
//                         {"Опциональное поле 8":"Имя хоста","type":"text","field":"p8","colWidth":92}],
//             "footerElements":[{"text":"Объект","type":"text","field":"hdn","colWidth":92},
//                         {"text":"IP адресс","type":"text","field":"hip","colWidth":92},
//                         {"text":"Компонент","type":"text","field":"tdn","colWidth":92},
//                         {"text":"Сообщение","type":"text","field":"messege","colWidth":92},
//                         {"Опциональное поле 1":"Имя хоста","type":"text","field":"p1","colWidth":92},
//                         {"Опциональное поле 2":"Имя хоста","type":"text","field":"p2","colWidth":92},
//                         {"Опциональное поле 3":"Имя хоста","type":"text","field":"p3","colWidth":92},
//                         {"Опциональное поле 4":"Имя хоста","type":"text","field":"p4","colWidth":92},
//                         {"Опциональное поле 5":"Имя хоста","type":"text","field":"p5","colWidth":92},
//                         {"Опциональное поле 6":"Имя хоста","type":"text","field":"p6","colWidth":92},
//                         {"Опциональное поле 7":"Имя хоста","type":"text","field":"p7","colWidth":92},
//                         {"Опциональное поле 8":"Имя хоста","type":"text","field":"p8","colWidth":92}],
//             "headerElements":[{"text":"Дата","type":"date","field":"time","colWidth":128},
//                         {"text":"","type":"text","field":"significance","colWidth":25}, 
//                         {"text":"Имя хоста","type":"text","field":"hostname","colWidth":92},
//                         {"text":"Тип события","type":"text","field":"etdn","colWidth":92},
//                         {"text":"Сервис","type":"text","field":"et","colWidth":92},
//                         {"text":"Объект","type":"text","field":"hdn","colWidth":92}]}

let circleDg4 = {
     "field":"significance", 
     "style":{"width":435,"minWidth":435},
     "indexName":"acs_castle_ep2_userlog", 
     "logs":[], 
     "timeFilter":{"from": "2019/01/26 00:00:00", "to": "2020/01/26 23:59:00"}, 
     "uploads":{"uploads":false,"timeKind":1,"timeNum":11000,"to":"now/d"}, 
     "paramFilter":{} 
}

let barDg4 = {
    "style":{"width":435,"minWidth":435,"height":900,"minHeight":300},
    "indexName":"sns_event", 
    "logs":[], 
    "timeFilter":{"from": "2019/01/26 00:00:00", "to": "2020/01/26 23:59:00"}, 
    "uploads":{"uploads":false,"timeKind":1,"timeNum":11000,"to":"now/d"}, 
    "paramFilter":{} 
}