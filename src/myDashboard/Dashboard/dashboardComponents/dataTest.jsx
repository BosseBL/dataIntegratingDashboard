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
        indexKey: "",
        data: [],
        yKeys: [],
        companyName: "",
    }

    constructor(props) {
        super(props);
        this.dm = props.dm;
        this.state.indexKey = props.attributes.indexKey;
        this.state.valueKey = props.attributes.valueKey;
        this.state.interval = props.attributes.interval;
        this.state.companyName = props.companyName;
        this.state.filter = props.attributes.filter;
        this.state.filter.cptyName = props.companyName;
        this.state.data = this.dm.getDataFilter(            
                [this.state.indexKey, this.state.valueKey].concat(Object.keys(this.state.filter)),
                this.state.filter,
                [this.state.valueKey],
                this.state.interval,
            );
        console.log(this.data);
    }

    componentWillReceiveProps(nextProp) {
        console.log("new prop");
        if(nextProp.companyName != this.state.companyName) {
            let newFilter = nextProp.attributes.filter;
            newFilter.cptyName = nextProp.companyName;
            let newData = this.dm.getDataFilter(            
                [this.state.indexKey, this.state.valueKey].concat(Object.keys(newFilter)),
                newFilter,
                [this.state.valueKey],
                this.state.interval,
            );
            this.setState({companyName: nextProp.companyName, filter: newFilter, data: newData });
            console.log("changed prop");
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
                            dataKey={this.state.indexKey}
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
                        <Bar dataKey={this.state.valueKey} className={classes.graphLine}/>
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