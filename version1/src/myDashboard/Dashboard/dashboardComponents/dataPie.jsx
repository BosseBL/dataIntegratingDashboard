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
        var filteredData = this.dm.getData().filter((e) => {return e.cptyName == entity});
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
            <DataComponent xs={6} >
                <ResponsiveContainer width="98%" height="98%" >
                    <PieChart >
                        <Pie
                            data={this.state.data} 
                            dataKey="value" 
                            nameKey="name"  
                            outerRadius="75%" 
                            fill="#fa7f00" 
                            label
                        />
                        <Pie
                            data={this.state.data} 
                            dataKey="value" 
                            nameKey="name"  
                            outerRadius="50%" 
                            fill="#fa7f25" 
                            label
                        />
                        <Pie
                            data={this.state.data} 
                            dataKey="value" 
                            nameKey="name"  
                            outerRadius="25%" 
                            fill="#fa7f50" 
                            label
                        />
                        <Legend/>
                        <Tooltip/>
                    </PieChart>
                </ResponsiveContainer>
            </DataComponent>
        );
    }
}

export default withStyles(styles)(DataPie);