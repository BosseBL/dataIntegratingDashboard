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

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

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
        this.state.data = this.mergeData(this.state.dataOC, this.state.dataOD);
        this.state.domainMax = this.getMax([0, this.state.data.length-1], this.state.data);
        this.state.oom = Math.floor(Math.log10(this.state.domainMax));
        
    }

    mergeData(dataOC, dataOD) {
        var dates = Array.from(new Set(dataOC.map(e => {return e.date}).concat(dataOD.map(e => {return e.date})) ));
        dates.sort((a, b) => {return moment(a) - moment(b)});
        var newData = [];
        for(let d in dates) {
            var a = dataOC.find(e => {return e.date == dates[d]});
            var b = dataOD.find(e => {return e.date == dates[d]});
            if(a) a = a.riskAmount;
            else a = 0;
            if(b) b = b.riskAmount;
            else b = 0;
            newData.push({
                date: dates[d], 
                ocAmount: a,
                odAmount: b,
            });
        }
        return newData;
    }

    componentWillReceiveProps(nextProp) {
        if(nextProp.companyName != this.state.companyName) {
            let newDataOC = this.dm.getDataAggregateTime("riskAmount", {status: "OC", cptyName: nextProp.companyName}, this.state.timeStep, this.state.interval, );
            let newDataOD = this.dm.getDataAggregateTime("riskAmount", {status: "OD", cptyName: nextProp.companyName}, this.state.timeStep, this.state.interval, );
            let newData = this.mergeData(newDataOC, newDataOD);
            var domMax = this.getMax([0, newData.length-1], newData);
            var order = Math.floor(Math.log10(domMax));
            this.setState({oom: order, domainMax: domMax, companyName: nextProp.companyName, data: newData, dataOD: newDataOD, dataOC: newDataOC});
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
        var prefix = Math.ceil((max*1.1)/order);
        return prefix*order;
    }

    rescale(e) {
        var newMax = this.getMax([e.startIndex, e.endIndex], this.state.data);
        if(newMax < this.state.domainMax/2 || newMax > this.state.domainMax) {
            var order = Math.floor(Math.log10(newMax));
            this.setState({domainMax: newMax, oom: order});
        }
    }

    render() {
        const {classes} = this.props;

        if(this.state.companyName != "") {
        return (
            <DataComponent xs={6}>
                <ResponsiveContainer width="98%" height="98%">
                    <BarChart data={this.state.data}>
                        <XAxis 
                            dataKey="date"
                            tickFormatter={e => {
                                var val = months[moment(e).month()];
                                if(val == undefined) return "";
                                else return val}}
                            
                            />
                        <YAxis 
                        
                            tickFormatter={e => {return e/1000000000;}}
                            padding={{left : 100}}
                            orientation="left"
                            yAxisId="left"
                            label={{ value: "risk volume" , angle: -90, position: 'topLeft' }}
                            domain={[0, this.state.domainMax]}
                            />
                            
                        <YAxis
                            
                            tickFormatter={e => {return e/1000000000;}}
                            orientation="right"
                            yAxisId="right"
                            label={{ value: "Earnings", angle: -90, position: 'topRight' }}
                            domain={[0, this.state.domainMax]}
                            interval="preserveEnd"
                        />
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <Tooltip isAnimationActive={false} />
                        <Legend verticalAlign="top"/>
                        <Bar name="Order canceled" yAxisId="left" dataKey="ocAmount" className={classes.graphLine} fill="#fa7f00" stackId="a"/>
                        <Bar name="Order done" yAxisId="left" dataKey="odAmount" className={classes.graphLine} fill="#fa7f99" stackId="a"/>
                        <Bar name="Earnings" yAxisId="right" dataKey="odAmount" className={classes.graphLine} fill="#fa3399"/>
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