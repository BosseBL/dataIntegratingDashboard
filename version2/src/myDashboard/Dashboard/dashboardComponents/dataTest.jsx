import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import DataComponent from './dataComponent';
import { withStyles } from '@material-ui/core';
import BarChart from 'recharts/lib/chart/BarChart';
import Bar from 'recharts/lib/cartesian/Bar';
import Brush from 'recharts/lib/cartesian/Brush';
import moment from 'moment';
import LabelList from 'recharts/lib/component/LabelList';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];
// const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const styles = theme => ({
    graphLine : {
        type: "monotone", 
        dataKey: "Visits", 
        stroke: "#82ca9d",
        activeDot: {
            r: 8 
        },
    },
}); 

class DataTest extends React.Component {

    state = {
        filter: [],
        data: [],
        interval: [],
        companyName: "",
        timeStep: [],
        domainMax: 0,
        oom: 10,
    }

    constructor(props) {
        super(props);
        this.dm = props.dm;
        this.state.interval = props.attributes.interval;
        this.state.companyName = props.companyName;
        this.state.timeStep = props.attributes.granularity;
        this.state.dataOC = this.dm.getDataAggregateTime("riskAmount", {status: "OC", cptyName: this.state.companyName}, this.state.timeStep, this.state.interval, );
        this.state.dataOD = this.dm.getDataAggregateTime("riskAmount", {status: "OD", cptyName: this.state.companyName}, this.state.timeStep, this.state.interval, );
        this.state.dataEarn = this.dm.getDataAggregateTime("earnings", {status: "OD", cptyName: this.state.companyName}, this.state.timeStep, this.state.interval, );
        this.state.data = this.mergeData(this.state.dataOC, this.state.dataOD, this.state.dataEarn);
        this.state.domainMax = this.getMax([0, this.state.data.length-1], this.state.data);
        this.state.oom = Math.floor(Math.log10(this.state.domainMax));
        
    }

    
    mergeData(dataOC, dataOD, dataEarn) {
        var dates = Array.from(new Set(dataOC.map(e => {return e.date}).concat(dataOD.map(e => {return e.date})) ));
        dates.sort((a, b) => {return moment(a) - moment(b)});
        var newData = [];
        for(let d in dates) {
            var a = dataOC.find(e => {return e.date === dates[d]});
            var b = dataOD.find(e => {return e.date === dates[d]});
            var c = dataEarn.find(e => {return e.date === dates[d]});
            if(a) a = a.riskAmount;
            else a = 0;
            if(b) b = b.riskAmount;
            else b = 0;
            if(c) c = c.earnings;
            else c = 0;
            newData.push({
                date: dates[d], 
                ocAmount: a,
                odAmount: b,
                earnings: c,
            });
        }
        return newData;
    }

    addEarnings(data, earnings) {
        var c = 0;
        for(let i = 0; i < data.length; i++) {
            if(data[i].odAmount > 0) {
                data[i].earnings = earnings[c].earnings;
                c++;
            }
            else data[i].earnings = 0;
        }
        return data;
    }

    componentWillReceiveProps(nextProp) {
        if(nextProp.companyName !== this.state.companyName) {
            let newDataOC = this.dm.getDataAggregateTime("riskAmount", {status: "OC", cptyName: nextProp.companyName}, this.state.timeStep, this.state.interval, );
            let newDataOD = this.dm.getDataAggregateTime("riskAmount", {status: "OD", cptyName: nextProp.companyName}, this.state.timeStep, this.state.interval, );
            let newDataEarn = this.dm.getDataAggregateTime("earnings", {status: "OD", cptyName: nextProp.companyName}, this.state.timeStep, this.state.interval, );
            let newData = this.mergeData(newDataOC, newDataOD, newDataEarn);
            var domMax = this.getMax([0, newData.length-1], newData);
            var order = Math.floor(Math.log10(domMax));
            this.setState({oom: order, domainMax: domMax, companyName: nextProp.companyName, data: newData, dataOD: newDataOD, dataOC: newDataOC, dataEarn: newDataEarn});
        }
    }

    getMax(index, d) {
        var max = 0;
        for(var i = index[0]; i < index[1]; i++) {
            var value = d[i].ocAmount + d[i].odAmount;
            if(value > max) max = value;
        }
        var zeroes = Math.floor(Math.log10(max)) - 1;
        var order = 10**zeroes;
        var prefix = Math.ceil((max*1.2)/order);
        return prefix*order;
    }

    rescale(e) {
        var newMax = this.getMax([e.startIndex, e.endIndex], this.state.data);
        if(newMax < this.state.domainMax/2 || newMax > this.state.domainMax) {
            var order = Math.floor(Math.log10(newMax));
            this.setState({domainMax: newMax, oom: order});
        }
    }

    renderCustomizedLabel(props) {
        const { x, y, width, height, value, index } = props;
        const radius = 10;

        const oc = this.state.data[index].ocAmount;
        const od = this.state.data[index].odAmount;
        const hr = Math.floor((od/(oc+od))*100);

        return (
          <g>
            <text stroke={"#888"} fontSize={12} x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
              {String(hr) + "%"}
            </text>
          </g>
        );
      };

    render() {
        const {classes} = this.props;

        if(this.state.companyName !== "") {
        return (
            <DataComponent xs={6}>
                <ResponsiveContainer width="98%" height="98%">
                    <BarChart data={this.state.data} barCategoryGap="15%">
                        <XAxis 
                            dataKey="date"
                            tickFormatter={e => {
                                var val = months[moment(e).month()];
                                if(val === undefined) return "";
                                else return val}}
                            
                            />
                        <YAxis 
                        
                            tickFormatter={e => {return e/1000000000;}}
                            padding={{left : 100}}
                            orientation="left"
                            yAxisId="left"
                            label={{ value: "risk volume" , angle: -90, position: 'insideLeft' }}
                            domain={[0, this.state.domainMax]}
                            />
                            
                        <YAxis
                            
                            tickFormatter={e => {return e/1000000000;}}
                            orientation="right"
                            yAxisId="right"
                            label={{ value: "Earnings", angle: -90, position: 'insideRight' }}
                            domain={[0, this.state.domainMax/10]}
                            interval="preserveEnd"
                        />
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <Tooltip isAnimationActive={false} />
                        <Legend verticalAlign="top"/>
                        <Bar name="Order canceled" yAxisId="left" dataKey="ocAmount" className={classes.graphLine} fill={this.props.colors[0]} stackId="a"/>
                        <Bar name="Order done" yAxisId="left" dataKey="odAmount" className={classes.graphLine} fill={this.props.colors[2]} stackId="a">
                            <LabelList dataKey="name" content={this.renderCustomizedLabel.bind(this)} />
                        </Bar>
                        <Bar name="Earnings" yAxisId="right" dataKey="earnings" className={classes.graphLine} fill={this.props.colors[4]}/>
                        <Brush height={15} onChange={this.rescale.bind(this)}/>
                    </BarChart>
                </ResponsiveContainer>
            </DataComponent>
        );
        }
        else {
            return (
                <DataComponent xs={6}></DataComponent>
            );
        }
    }
}

export default withStyles(styles)(DataTest);