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
import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';


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


class DataPie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            //this.state.range = props.range;
            indexKey: props.indexKey,
            visibleData: props.data, //getData();

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
                    <PieChart width={200} height={200}>
                        <Pie data={this.state.visibleData} dataKey="value" nameKey="name" cx={200} cy={200} outerRadius={60} fill="#8884d8" label/>

                    </PieChart>
                </ResponsiveContainer>
            </DataComponent>
        );
    }
}

export default withStyles(styles)(DataPie);