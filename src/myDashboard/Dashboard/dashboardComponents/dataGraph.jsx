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
import BarChart from 'recharts/lib/chart/BarChart';
import Bar from 'recharts/lib/cartesian/Bar';

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

    state = {
        indexKey: "",
        data: [],
        yKeys: [],
    }

    constructor(props) {
        super(props);
        this.dm = props.dm;
        this.state.indexKey = props.attributes.indexKey;
        this.state.data = this.dm.getData().filter( (d) => {return d.name == 'Scania'})
                                .map((n) => {return {date: n.date, volume: n.volume}});
        this.state.yKeys = Object.keys(this.state.data[0]).filter((key) => {return key != this.state.indexKey});

    }

    render() {
        const {classes} = this.props;
        return (
            <DataComponent xs={6}>
                <ResponsiveContainer width="98%" height="98%">
                    <BarChart data={this.state.data}>
                        <XAxis dataKey={this.state.indexKey} />
                        <YAxis />
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                            <Bar dataKey="volume" className={classes.graphLine}/>
                    </BarChart>
                </ResponsiveContainer>
            </DataComponent>
        );
    }
}

export default withStyles(styles)(DataGraph);