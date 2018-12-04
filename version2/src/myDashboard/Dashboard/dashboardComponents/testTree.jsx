import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import DataComponent from './dataComponent';
import { withStyles } from '@material-ui/core';

import Brush from 'recharts/lib/cartesian/Brush';
import moment from 'moment';

import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';
import Treemap from 'recharts/lib/chart/Treemap';

const RADIAN = Math.PI / 180;

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

class TestTree extends React.Component {

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
        this.state.companyName = props.companyName;
        this.state.filter = props.attributes.filter;
        this.state.filter.cptyName = props.companyName;
        this.state.type = props.attributes.type;
        this.state.data = this.dm.getDataAggregate(            
                this.state.indexKey.concat(Object.keys(this.state.filter)),
                this.state.valueKey,
                this.state.filter,
                this.state.type,
            );
        console.log(this.data);
    }
    //fields, valueIndex, filters={}, type

    componentWillReceiveProps(nextProp) {
        if(nextProp.companyName != this.state.companyName) {
            let newFilter = nextProp.attributes.filter;
            newFilter.cptyName = nextProp.companyName;
            let newData = this.dm.getDataAggregate(            
                this.state.indexKey.concat(Object.keys(newFilter)),
                this.state.valueKey,
                newFilter,
                this.state.type,
            );
            this.setState({companyName: nextProp.companyName, filter: newFilter, data: newData });
        }
    }

    
    renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name}) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        {`${name}`}
    </text>
    );
    
   };

    render() {
        const {classes} = this.props;

        if(this.state.companyName != "") {
        return (
            <DataComponent xs={6}>
                <ResponsiveContainer width="98%" height="98%">
                <Treemap
                    data={this.state.data}
                    dataKey="volume"
                    
                />
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

export default withStyles(styles)(TestPie);