import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
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

    state = {
        data: [],
        indexKey: "",
        range: [],
    }

    constructor(props) {
        super(props);
        this.dm = props.dm;
        this.state.data = this.getPieData("Scania", "type");
    }

    getPieData(entity, field) {
        var filteredData = this.dm.getData().filter((e) => {return e.name == entity});
        var fieldValues = Array.from(new Set(filteredData.map((n) => {return n[field]})));
        var returnData = [];
        for(var i = 0; i < fieldValues.length; i++) {
            var count = 0;
            for(var j = 0; j < filteredData.length; j++) {
                if(filteredData[j][field] == fieldValues[i]) count++;
            }
            returnData.push({name: fieldValues[i], value: count});
        }
        return returnData;
    }

    render() {
        const {classes} = this.props;
        return (
            <DataComponent xs={6} height={200}>
                <ResponsiveContainer width="99%" height={320}>
                    <PieChart width={200} height={200}>
                        <Pie 
                            data={this.state.data} 
                            dataKey="value" 
                            nameKey="name" 
                            cx={200} 
                            cy={200} 
                            outerRadius={60} 
                            fill="#8884d8" 
                            label
                        />
                    </PieChart>
                </ResponsiveContainer>
            </DataComponent>
        );
    }
}

export default withStyles(styles)(DataPie);