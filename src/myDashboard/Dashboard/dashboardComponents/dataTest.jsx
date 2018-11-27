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
    }

    constructor(props) {
        super(props);
        this.dm = props.dm;
        this.state.indexKey = props.attributes.indexKey;
        this.state.valueKey = props.attributes.valueKey;
        this.state.interval = props.attributes.interval;
        this.state.companyName = props.companyName;
        this.state.filter = props.attributes.filter;
        this.state.filter.cptyName = this.props.companyName;
        this.state.data = this.dm.getDataFilter(
            [this.state.indexKey, this.state.valueKey].concat(Object.keys(this.state.filter)),
            this.state.filter,
            [this.state.valueKey],
            this.state.interval,
        );


        /*
        this.state.data = this.dm.getData().filter( (d) => {return d.cptyName == 'Scania'})
                                .map((n) => {return {date: n.date, riskAmount: n.riskAmount}});
        this.state.yKeys = Object.keys(this.state.data[0]).filter((key) => {return key != this.state.indexKey});
        */
    }

    render() {
        const {classes} = this.props;
        return (
            <DataComponent xs={6}>
                <ResponsiveContainer width="98%" height="98%">
                    <BarChart data={this.state.data}>
                        <XAxis dataKey={this.state.indexKey}/>
                        <YAxis />
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="riskAmount" className={classes.graphLine}/>
                        <Brush height={15}/>
                    </BarChart>
                </ResponsiveContainer>
            </DataComponent>
        );
    }
}

export default withStyles(styles)(DataTest);