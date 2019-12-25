import React from 'react';
import './__acs.scss';
import LogElem from '../../Common/ListElem/LogElem'
import __header from '../../Common/__header/__header'
import Chart from '../../Graphs/Chart'
import Layer from '../../Graphs/Layer'
import Ticks from '../../Graphs/Ticks'
import Bars from '../../Graphs/Bars'
import Calendar from '../../Common/calendar/calendar'
import FilterPanel from '../../Common/FilterPanel/FilterPanel'
import moment from "moment"
import UploadTimeSetter from '../../Common/uploadTimeSetter/UploadTimeSetter.jsx'
class __acs extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.timeFilter.from)
    console.log(this.props.timeFilter.from.format('YYYY/MM/DD hh:mm:ss'))
    console.log(this.props.timeFilter.to)
    console.log(this.props.timeFilter.to.format('YYYY/MM/DD hh:mm:ss'))
    this.state={
      filterMode: false,
      from: this.props.timeFilter.from,
      to: this.props.timeFilter.to,
      uploads: {
        uploads: false,
        timeKind: 'seconds',
        timeNum: 10
      }
    }

    this.func = this.func.bind(this)
    this.changeUploads = this.changeUploads.bind(this)
    this.onChangeFilterMode = this.onChangeFilterMode.bind(this);
  }
  func(){
    // console.log(':)')
    let now = new Date()
    // let fromDate =
    this.setState(state => ({
      to:  moment((new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(),now.getMinutes(),now.getSeconds(),0)))
    }));
    this.props.getAcs({"need": "logs",
    "timeFilter": {from: this.state.from.format('YYYY/MM/DD HH:mm:ss'),
    to:  this.state.to.format('YYYY/MM/DD HH:mm:ss')
    }
  });
  }
  componentDidMount() {
    // console.log(this.state.uploads)
    // this.intervalId = setInterval(this.func.bind(this), 5000);
  }
  componentWillUnmount(){
    // clearInterval(this.intervalId);
  }


  onChangeFilterMode = (user) => {
    this.setState(state => ({
      filterMode: !this.state.filterMode
    }));
  }

  onPageChanged = (pageNumber) => {
      this.props.getUsers(pageNumber, this.props.pageSize);
  }

  TimeFilterCb = (startDate, endDate) => {
    this.setState(state => ({
      to: endDate,
      from: startDate
    }));
    // this.props.SetTimeFilter(startDate, endDate)
  }

  changeUploads(formData){
    console.log(formData)
    let coef
    if(formData.time_type===undefined||formData.time_type==='seconds') coef = 1000
    else coef = 60000
    // console.log()
    if(!formData.uploads&&this.intervalId!==undefined) clearInterval(this.intervalId);
    else if(this.intervalId===undefined&&formData.uploads) this.intervalId = setInterval(this.func.bind(this), coef*formData.number);
    // this.setState(state => ({
    //   uploads: formData
    // }));
  }

  render() {
    // console.log(this.props.logs.length)
    let series = {bar2: {series: [{
      data: [13, 17, 19]           
      }],
      xLabels : ['xz','e','x']
    }}
    
        let xLabels1
        let xLabels2
        let Elements = this.props.logs.map(e => <LogElem name='' items={e} />)
        let clientWidth = document.body.clientWidth
        if(clientWidth<1400){
          xLabels1 = this.props.bar1.xLabels.filter((e,n) => n%2==0)
          xLabels2 = this.props.bar2.xLabels.filter((e,n) => n%2==0)
        }else{
          xLabels1 = this.props.bar1.xLabels;
          xLabels2 = this.props.bar2.xLabels;
        }
        // console.log(xLabels1)
        // console.log(xLabels2)
        return <div className="Visualization__cameras">
            <header className="Common__header Common__header_red Common__header_with-filter">
            Логи СКУД
            <Calendar applyParentCallback={this.TimeFilterCb} timeFilter={{from:this.state.from,to:this.state.to}}/>
            <UploadTimeSetter onSubmit={this.changeUploads}/>
            <button onClick={this.onChangeFilterMode}>Настроить фильтр</button>
              </header>
              <FilterPanel display={this.state.filterMode}/>
            <div className='table-wrapper'>
              <table className="Modules_table Modules_table__cam-dev">
                  <tbody>
                      {Elements}  
                  </tbody>
              </table>
            </div>
            {/* props.bar1.series */}
            <Chart width={ clientWidth/2} height={300} series={this.props.bar1.series} minY={0}>
              <Layer width='90%' height='90%' position='top center'>
                <Ticks
                  axis='y'
                  lineLength='100%'
                  // maxTicks = {clientWidth<1400? 12:24}
                  //ticks={{minDistance:1.6}}
                  lineVisible={true}
                  lineStyle={{stroke:'lightgray'}}
                  labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray',fontSize:'0.7em'}}
                  labelAttributes={{x: -5}}
                  labelFormat={label => label}
                />
                {/* xLabels2 */}
                <Ticks
                  axis='x'
                  ticks={{maxTicks:clientWidth<1400? 12:24}}
                  // maxTicks = {clientWidth<1400? 12:24}
                  labels = {xLabels1}
                      label={({index, props}) => props.labels[index]}
                  labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge',fill:'black',fontSize:'0.7em'}}
                  labelAttributes={{y: 3}}
                />
                <Bars
                  groupPadding='0%'
                  innerPadding='0.3%'
                />
              </Layer>
            </Chart>
            <Chart width={clientWidth/2} height={300} series={this.props.bar2.series} minY={0}>
              <Layer width='90%' height='90%' position='top center'>
                <Ticks
                  axis='y'
                  lineLength='100%'
                  // ticks={{maxTicks:24}}
                  // maxTicks = {clientWidith<1400? 12:24}
                  lineVisible={true}
                  lineStyle={{stroke:'lightgray'}}
                  labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray',fontSize:'0.7em'}}
                  labelAttributes={{x: -5}}
                  labelFormat={label => label}
                />
                {/* series.xLabels */}
                <Ticks
                  axis='x'
                  ticks={{maxTicks:clientWidth<1400? 12:24}}
                  // maxTicks = {clientWidth<1400? 12:24}
                  labels = {xLabels2}
                    label={({index, props}) => props.labels[index]}
                  labelStyle={{textAnchor:'middle',dominantBaseline:'text-before-edge',fill:'black',fontSize:'0.7em'}}
                  labelAttributes={{y: 3}}
                />
                <Bars
                  groupPadding='0%'
                  innerPadding='0.3%'
                />
              </Layer>
            </Chart>
            </div>
  }
}





export default __acs;