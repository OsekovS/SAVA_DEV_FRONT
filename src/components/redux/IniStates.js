import moment from "moment"

export const acsIni = function(){
    let now = new Date()
    let toDate = moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0)))
    let fromDate = moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0))).subtract(60, "days")
        
    // headerElements : [
    //     
      
    //   indexName: 'acs_castle_ep2_userlog',

    // let inDb=    {
    //     headerElements : [
    //     {text:'Дата', type:'date', field:'time'},
    //     {text:'Тип события', type:'text', field:'significance'},
    //     {text:'Объект', type:'text', field:'object'},
    //     {text:'Конечная точка', type:'text', field:'device'},
    //     {text:'Событие', type:'text', field:'event'},
    //     {text:'Направление', type:'text', field:'route'},
    //     {text:'Владелец', type:'text', field:'person'}
    //   ],
    //   footerElements: [
    //         {text:'Номер карты: ', field:'pass_number'},
    //         {text:'ip конечной точки: ', field:'ip_device'},      
    //   ],

    //   headerElements :[{text:'Дата', type:'date', field:'time'},
    //   {text:'Тип события', type:'text', field:'significance'},
    //   {text:'Объект', type:'text', field:'object'},
    //   {text:'Событие', type:'text', field:'event'},
    //   {text:'Направление', type:'text', field:'personal'}
    // ],
    // footerElements: [],
    //   indexName: 'acs_castle_ep2_event',
    //   logs:  [],
    // timeFilter: {
    //     from: {number: 60, type:'days'},
    //     to: 'now'
    // },
    // uploads: {
    //   uploads: true,
    //   timeKind: 1,
    //   timeNum: 5000,
    //   from_number: '2',
    //   from_time_type: 'M',
    //   to: "now/d"
    // },
    // paramFilter: {},
    // pagination: {
    //     total: '',
    //     currentPage: 1,
    //     fromPage: 1,
    //     showedPages: 5,
    //     lastPage: '',
    //     showedLogs: 100,
    //     showedLogsList: [50, 100, 250, 500]
    // },
    // sortParam: {
    //     type:'date',
    //     field:'time',
    //     direction: 'asc'
    // },
    // curLog: null
    // }
    
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