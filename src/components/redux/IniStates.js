import moment from "moment"

export const acsIni = function(){
    let now = new Date()
    let toDate = moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0)))
    let fromDate = moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0))).subtract(60, "days")
        

  
    
    
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
      footerElements: [
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
   
    filterConf: {
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
                'pass_number': 'Номер владельца' 
            }
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
    let inDb2=    {

    headerElements :[{text:'Дата', type:'date', field:'time'},
    {text:'Тип события', type:'text', field:'significance'},
    {text:'Объект', type:'text', field:'object'},
    {text:'Событие', type:'text', field:'event'},
    {text:'Направление', type:'text', field:'personal'}
  ],
  footerElements: [],

      
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
   
    filterConf: {
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
            'Изменены параметры точки доступа.',
            'Изменены свойства точки доступа.',
            'Создана группа точек доступа.',
            'Группа точек доступа _Бездна угнетения_ удалена.',
            'Изменены общие параметры пропусков.',
            'Изменены параметры объекта доступа.',
            'Пропуск 354.71222 добавлен. Срок действия: ',
            'Пропуск 487.21211 добавлен. Срок действия: не ограничен.',
            'Пропуск 354.74453 удален.',
            'Пропуск 187.54578: Срок действия изменен на: _с такого то по такой то_',
            'Создан пропуск посетителя 123.45487.',
            'Создан отдел _аваян-груп_',
            'Отдел _никому не нужный_ удален.',
            'В отделе _консалтинга_ создан сотрудник _Вася Пупочкин_.',
            'Объект доступа Коаллы-вперед удален.',
            'В отделе _охраны_ создан автомобиль 123.12354.',
            'Запрошена генерация отчета _событий_ за период _с такого то по такой то_.',
            'Запрошена выборка из архива событий за период _с такого то по такой то_.',
            'Пользователь присоединился к серверу',
            'Пользователь отсоединился от сервера'
            ],
        'route': [
            "Вход",
            "Выход"
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
                'pass_number': 'Номер владельца' 
            }
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
    return {
        settings: {
        mode: 'view',//'view',
        objects: [
            {id: '0', name: 'Санаторий Звенигород'},
        ],
        endpoints:  [{
            id: '0',
            object: 'Санаторий Звенигород',
            ip: '111.111.11.11',
            name: 'Заезд для машин',
            port: '3000',
            login: '3ojA'
        }]
        },
        dashboards: null,
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