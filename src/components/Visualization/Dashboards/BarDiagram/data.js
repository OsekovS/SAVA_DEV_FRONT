//Время в микросекундах - дата начала 
//отсчета бара - 3ч будет московское 
//время
const mul = 1000*60*24*60
const ini = 1579132800000

export const othData =   [{
          "key" : {
            "date" : 1579132800000
          },
          "doc_count" : 398
        },
        {
          "key" : {
            "date" : 1579132800000+mul*1
          },
          "doc_count" : 1565
        },
        {
          "key" : {
            "date" : 1580256000000
          },
          "doc_count" : 1659
        },
        {
          "key" : {
            "date" : 1580342400000
          },
          "doc_count" : 483
        },
        {
          "key" : {
            "date" : 1580688000000
          },
          "doc_count" : 7981
        },
        {
          "key" : {
            "date" : 1580774400000
          },
          "doc_count" : 23224
        },
        {
          "key" : {
            "date" : 1580860800000
          },
          "doc_count" : 24780
        },
        {
          "key" : {
            "date" : 1580947200000
          },
          "doc_count" : 30722
        },
        {
          "key" : {
            "date" : 1581033600000
          },
          "doc_count" : 28743
        },
        {
          "key" : {
            "date" : 1581120000000
          },
          "doc_count" : 27217
        }]
const getEl = (cur) => othData[cur]
	.key.date
let curIn = 0
let serv = []
for(let i=0;i<10;i++) {
	serv.push({
  	date: new Date(othData[i].key.date)
  })
}
console.log(serv)
export const inData = []
	for(let i=0;i<24;i++) {//16
    let curDate = 1579132800000 + mul*i,
        doc_count
    if(curDate===getEl(curIn)){
      doc_count = othData[curIn]?
        othData[curIn].doc_count:2500
      curIn++
    
    } else {
    	doc_count = 0
    }
    inData.push({
      "key" : {
          "date" : new Date(curDate)
        },
        "doc_count" : doc_count
          
    })
  }
	for(let i=24;i<38;i++) {//16
    let curDate = 1579132800000 + mul*i,
        doc_count = 3000*Math.ceil(Math.random()*10)
    inData.push({
      "key" : {
          "date" : new Date(curDate)
        },
        "doc_count" : doc_count
          
    })
  }
      