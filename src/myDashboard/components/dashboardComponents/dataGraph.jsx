import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import DataComponent from './dataComponent';
import { withStyles } from '@material-ui/core';

const data = [
  { name: 'Mon', Visits: 2200, Orders: 3400 },
  { name: 'Tue', Visits: 1280, Orders: 2398 },
  { name: 'Wed', Visits: 5000, Orders: 4300 },
  { name: 'Thu', Visits: 4780, Orders: 2908 },
  { name: 'Fri', Visits: 5890, Orders: 4800 },
  { name: 'Sat', Visits: 4390, Orders: 3800 },
  { name: 'Sun', Visits: 4490, Orders: 4300 },
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


class DataGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            //this.state.range = props.range;
            indexKey: props.indexKey,
            visibleData: props.data, //getData();
            yKeys: Object.keys(this.props.data[0]).filter((key) => {return key != this.props.indexKey}),

        }
    }
/*
    componentDidMount() {
        this.setState({data: this.props.data });
    }
*/
    getData() {
        var newData = this.state.data.filter((entry) => {
            return (entry[this.state.indexKey] >= this.state.range[0] && 
                entry[this.state.indexKey] <= this.state.range[1]);
        });
        return newData;
    }

    render() {
        const {classes} = this.props;
        return (
            <DataComponent xs={6} height={200}>
                <ResponsiveContainer width="99%" height={320}>
                    <LineChart data={this.state.visibleData}>
                        <XAxis dataKey={this.state.indexKey} />
                        <YAxis />
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                            {this.state.yKeys.map(n => {
                                return (
                                    <Line key={n} dataKey={n} className={classes.graphLine}/>
                                );
                            })}
                    </LineChart>
                </ResponsiveContainer>
            </DataComponent>
        );
    }
}

export default withStyles(styles)(DataGraph);