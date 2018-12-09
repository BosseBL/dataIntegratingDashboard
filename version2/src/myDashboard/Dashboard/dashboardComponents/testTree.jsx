import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';

import DataComponent from './dataComponent';
import { withStyles } from '@material-ui/core';

import Treemap from 'recharts/lib/chart/Treemap';


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

class CustomizedContent extends React.Component {
    render() {
      const { root, depth, x, y, width, height, index, payload, colors, rank, name } = this.props;
     
      var text;
      
    if(depth === 1) {
        text = <text x={x + 8} y={y + 18} fill="#fff" fontSize={16}> {name} </text>
    }
    if(depth === 2) {
        text = <text x={x + width-15} y={y + height-5} textAnchor="middle" fill="#888" stroke="#eee" fontSize={14}> {name} </text>
    }
    if(depth === 3) {
        text = <text x={x + width/2} y={y + height/2} textAnchor="middle" fill="#888" stroke="#eee" fontSize={10}> {name} </text>
    }
    else {
        //text = <text x={x + width/2} y={y + height/2} textAnchor="middle" fill="#888" stroke="#eee" fontSize={12}> {name} </text>
    }



      return (
        <g>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            style={{
              fill: depth < 2 ? colors[Math.floor(index / root.children.length * 6)] : 'none',
              //fillOpacity: depth/2,
              stroke: '#fff',
              strokeWidth: 5 / (depth + 1e-10),
              strokeOpacity: 1 / (depth + 1e-10),
            }}
          />
          {text}
        </g>
      );
    }
}

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
        this.state.valueKey = props.attributes.valueKey;
        this.state.companyName = props.companyName;
        this.state.filter = props.attributes.filter;
        this.state.filter.cptyName = props.companyName;
        this.state.interval = props.attributes.interval;
        this.state.hierarchy = props.attributes.hierarchy;
        this.state.data = this.dm.getDataTree(
                this.state.valueKey,
                this.state.hierarchy, 
                this.state.filter,
                this.state.interval,
            );
    }
    //fields, valueIndex, filters={}, type

    componentWillReceiveProps(nextProp) {
        if(nextProp.companyName !== this.state.companyName) {
            let newFilter = nextProp.attributes.filter;
            newFilter.cptyName = nextProp.companyName;
            let newData = this.dm.getDataTree(            
                this.state.valueKey,
                this.state.hierarchy,
                newFilter,
                this.state.interval,
            );
            this.setState({companyName: nextProp.companyName, filter: newFilter, data: newData });
        }
    }

    


    render() {
        const {classes} = this.props;

        if(this.state.companyName !== "") {
        return (
            <DataComponent xs={6}>
                <ResponsiveContainer width="98%" height="98%">
                <Treemap
                    data={this.state.data}
                    dataKey="value"
                    ratio={4/3}
                    stroke="#fff"
                    fill="#8884d8"
                    content={<CustomizedContent colors={this.props.colors}/>}  
                >
                <Tooltip/>
                </Treemap>
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

export default withStyles(styles)(TestTree);