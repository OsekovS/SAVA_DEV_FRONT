import React from 'react';
import './__acs.scss';
import __header from '../../Common/__header/__header'
// import Chart from '../../Graphs/Chart'
// import Layer from '../../Graphs/Layer'
// import Ticks from '../../Graphs/Ticks'
// import Bars from '../../Graphs/Bars'
// import LogsTableDeviceCont from '../logsTable/LogsTableDeviceCont'
import LogsTableDeviceCont from '../Dashboards/LogsTable/LogsTableDeviceCont'
class __acs extends React.Component {
  // constructor(props){
  //   super(props)
  //   this.props.getDashboardsThunk()
  // }
  componentDidMount() {
    this.props.getDashboardsThunk()
  }
  componentWillReceiveProps(nextProps){
    // console.log(this.props)
    // console.log(nextProps)
}
  render() {
    // console.log(this.props.logs.length)
    let dashboards = []
    let propsDashboards = this.props.dashboards
    // console.log(this.props.dashboards)
    if(this.props.dashboards){
      
      //footerElements={propsDashboards[1].body.footerElements} headerElements={propsDashboards[1].body.headerElements } index={propsDashboards[1].body.indexName}
      dashboards.push(<LogsTableDeviceCont {...propsDashboards[0].body}  title="События СКУД" key={propsDashboards[0].id} id={propsDashboards[0].id}/>)
      dashboards.push(<LogsTableDeviceCont {...propsDashboards[1].body} title="События Пользователей"  key={propsDashboards[1].id}  id={propsDashboards[1].id}/>)
    }else{
      dashboards = null
    }
    // let xLabels1
    // let xLabels2
    // let clientWidth = document.body.clientWidth    
    // if(clientWidth<1400){
    //   xLabels1 = this.props.bar1.xLabels.filter((e,n) => n%2==0)
    //   xLabels2 = this.props.bar2.xLabels.filter((e,n) => n%2==0)
    // }else{
    //   xLabels1 = this.props.bar1.xLabels;
    //   xLabels2 = this.props.bar2.xLabels;
    // }
    
    // console.log(this.props.pagination)


    // indexName = 'acs_castle_ep2_event'
    // title="События СКУД"

    return <div className="Visualization__cameras">
      {dashboards}
      {/* <LogsTableDeviceCont title="События СКУД" footerElements={this.footerElements} headerElements={this.headerElements }/> */}

      {/* <Chart width={ clientWidth/2} height={300} series={this.props.bar1.series} minY={0}>
        <Layer width='90%' height='90%' position='top center'>
          <Ticks
            axis='y'
            lineLength='100%'
            lineVisible={true}
            lineStyle={{stroke:'lightgray'}}
            labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray',fontSize:'0.7em'}}
            labelAttributes={{x: -5}}
            labelFormat={label => label}
          />
          <Ticks
            axis='x'
            ticks={{maxTicks:clientWidth<1400? 12:24}}
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
              lineVisible={true}
              lineStyle={{stroke:'lightgray'}}
              labelStyle={{textAnchor:'end',dominantBaseline:'middle',fill:'lightgray',fontSize:'0.7em'}}
              labelAttributes={{x: -5}}
              labelFormat={label => label}
            />
            <Ticks
              axis='x'
              ticks={{maxTicks:clientWidth<1400? 12:24}}
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
        </Chart> */}
    </div>
  }
}

export default __acs;