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
        
    }

    mergeData(dataOC, dataOD) {
        var dates = Array.from(new Set(dataOC.map(e => {return e.date}).concat(dataOD.map(e => {return e.date})) ));
        dates.sort((a, b) => {return moment(a) - moment(b)});
        var newData = [];
        for(let d in dates) {
            newData.push({
                date: dates[d], 
                ocAmount: dataOC.find(e => {return e.date == dates[d]}).riskAmount,
                odAmount: dataOD.find(e => {return e.date == dates[d]}).riskAmount,
            });
        }
        return newData;
    }

    componentWillReceiveProps(nextProp) {
        if(nextProp.companyName != this.state.companyName) {
            let newDataOC = this.dm.getDataAggregateTime("riskAmount", {status: "OC", cptyName: nextProp.companyName}, this.state.timeStep, this.state.interval, );
            let newDataOD = this.dm.getDataAggregateTime("riskAmount", {status: "OD", cptyName: nextProp.companyName}, this.state.timeStep, this.state.interval, );
            let newData = this.mergeData(newDataOC, newDataOD);
            console.log(newData);
            this.setState({companyName: nextProp.companyName, data: newData, dataOD: newDataOD, dataOC: newDataOC});
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
                            unit="M SEK"
                            tickFormatter={e => {return e/1000000;}}
                            padding={{left : 100}}/>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="ocAmount" className={classes.graphLine} fill="#fa7f00" stackId="a"/>
                        <Bar dataKey="odAmount" className={classes.graphLine} fill="#fa7f99" stackId="b"/>
                        <Brush height={15}/>
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