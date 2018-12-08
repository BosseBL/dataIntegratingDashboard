import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import DataComponent from './dataComponent';
import { withStyles } from '@material-ui/core';

import Brush from 'recharts/lib/cartesian/Brush';
import moment from 'moment';

import Cell from 'recharts/lib/component/Cell';
import PieChart from 'recharts/lib/chart/PieChart';
import Pie from 'recharts/lib/polar/Pie';


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

class TestPie extends React.Component {

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
        this.state.interval = props.attributes.interval;
        this.state.filter.cptyName = props.companyName;
        this.state.type = props.attributes.type;
        this.state.dataOD = this.dm.getDataPie("type", "riskAmount", {cptyName: props.companyName, status: "OD"}, this.state.interval,);
        this.state.dataTot = this.dm.getDataPie("type", "riskAmount", {cptyName: props.companyName}, this.state.interval,);
        this.state.dataEarn = this.dm.getDataPie("type", "earnings", {cptyName: props.companyName}, this.state.interval,);

        console.log(this.state.data);
    }
    //fields, valueIndex, filters={}, type

    componentWillReceiveProps(nextProp) {
        if(nextProp.companyName != this.state.companyName) {
            let newFilter = nextProp.attributes.filter;
            newFilter.cptyName = nextProp.companyName;
            let newDataOD = this.dm.getDataPie("type", "riskAmount", {cptyName: nextProp.companyName, status: "OD"}, this.state.interval,);
            let newDataTot = this.dm.getDataPie("type", "riskAmount", {cptyName: nextProp.companyName}, this.state.interval,);
            let newDataEarn = this.dm.getDataPie("type", "earnings", {cptyName: nextProp.companyName}, this.state.interval,);
            this.setState({companyName: nextProp.companyName, filter: newFilter, dataOD: newDataOD, dataTot: newDataTot, dataEarn: newDataEarn });
        }
    }

    
    renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name}) {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);

    return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        {`${name}`}
    </text>
    );
    
   };

   renderLegend(props) {
    const { payload } = props;
    console.log(props);
    return (
      <ul>
        {
          payload.map((entry, index) => (
            <li key={`item-${index}`}>{entry.value}</li>
          ))
        }
      </ul>
    );
  }
  

    render() {
        const {classes} = this.props;

        if(this.state.companyName != "") {
        return (
            <DataComponent xs={6}>
                <ResponsiveContainer width="98%" height="98%">
                <PieChart >
                        <Pie
                            data={this.state.dataOD} 
                            dataKey="riskAmount" 
                            nameKey="type"  
                            outerRadius="33%"
                            fill={this.props.colors[1]}
                            labelLine={false}
                            label={this.renderCustomizedLabel}
                        >
                        {
          	            this.state.data.map((entry, index) => <Cell key={index} fill={this.props.colors[index % this.props.colors.length]}/>)
                        }
                        </Pie>
                        <Pie
                            data={this.state.dataTot} 
                            dataKey="riskAmount" 
                            nameKey="type" 
                            innerRadius="35%" 
                            outerRadius="68%"
                            fill={this.props.colors[3]}
                            labelLine={false}
                            label={this.renderCustomizedLabel}
                        >
                        {
          	            this.state.data.map((entry, index) => <Cell key={index} fill={this.props.colors[index % this.props.colors.length]}/>)
                        }
                        </Pie>
                        <Pie
                            data={this.state.dataEarn} 
                            dataKey="earnings" 
                            nameKey="type"  
                            innerRadius="70%"
                            outerRadius="100%"
                            fill={this.props.colors[5]}
                            labelLine={false}
                            label={this.renderCustomizedLabel}
                        >
                        {
          	            this.state.data.map((entry, index) => <Cell key={index} fill={this.props.colors[index % this.props.colors.length]}/>)
                        }
                        </Pie>
                        <Legend payload={[
                            {type:"rect", value:"Omsatt", color:this.props.colors[1]},
                            {type:"rect", value:"Förfrågad", color:this.props.colors[3]},
                            {type:"rect", value:"Intjäning", color:this.props.colors[5]},
                            ]}/>
                        <Tooltip/>
                    </PieChart>


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