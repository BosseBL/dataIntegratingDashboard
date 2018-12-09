import React from 'react';
import DataComponent from './dataComponent';
import { withStyles } from '@material-ui/core';
import './nodeStyle.css';

import * as d3 from "d3";
const styles = theme => ({
    /*
    .link : {
        stroke: #aaa;
      }
      
      .node text {
      stroke:#333;
      cursos:pointer;
      }
      
      .node circle {
      stroke:#fff;
      stroke-width:3px;
      fill:#555;
      }
      */
}); 



class TestGraph extends React.Component {

    state = {
        parentWidth: 0,
        filter: {},
    }

    constructor(props) {
        super(props);
        this.dm = props.dm;
        this.state.companyName = props.companyName;
        this.state.filter = props.attributes.filter;
        this.state.interval = props.attributes.interval;
        this.state.filter.cptyName = props.companyName;
        this.state.data = this.dm.getDataGraph(this.state.interval, this.state.filter);
    }

    componentWillReceiveProps(nextProp) {
        if(nextProp.companyName != this.state.companyName) {
            let newFilter = nextProp.attributes.filter;
            newFilter.cptyName = nextProp.companyName;
            let newData = this.dm.getDataGraph(this.state.interval, newFilter);
            this.setState({companyName: nextProp.companyName, filter: newFilter, data: newData});
            
        }
        //this.renderNodeGraph();
    }

    componentDidUpdate(prevProp) {
        if(this.props.companyName != prevProp.companyName) {
            this.renderNodeGraph();
        }

    }


    renderNodeGraph() {
    //var width = 300;
    //var height = 300

    d3.select(this._rootNode).select("svg").remove();

    var svg = d3.select(this._rootNode).append("svg")

    var width = svg.node().getBoundingClientRect().width*2;
    var height = svg.node().getBoundingClientRect().height*2;

    svg
    .attr("width", width)
    .attr("height", height);
    //create somewhere to put the force directed graph
        
var radius = 15; 

/*

var nodes_data =  [
    {"name": "SEK", "sex": "F"},
    {"name": "USD", "sex": "M"},
    {"name": "EUR", "sex": "M"},
    {"name": "DDK", "sex": "F"},
    {"name": "JPY", "sex": "F"},
    {"name": "AUD", "sex": "M"},
    {"name": "GBP", "sex": "F"},
    {"name": "BRL", "sex": "M"},
    {"name": "LRD", "sex": "M"},


    ]

//Sample links data 
//type: A for Ally, E for Enemy
var links_data = [
	{"source": "EUR", "target": "USD", "type":"A", "volume": 300},
    {"source": "EUR", "target": "SEK", "type":"A", "volume": 200},
    {"source": "EUR", "target": "DDK", "type":"A", "volume": 300},
    {"source": "EUR", "target": "AUD", "type":"A", "volume": 900},
    {"source": "EUR", "target": "GBP", "type":"A", "volume": 200},
    {"source": "EUR", "target": "JPY", "type":"A", "volume": 200},
    {"source": "JPY", "target": "USD", "type":"A", "volume": 300},
    {"source": "DDK", "target": "SEK", "type":"A", "volume": 400},
    {"source": "BRL", "target": "DDK", "type":"A", "volume": 600},
    {"source": "LRD", "target": "AUD", "type":"A", "volume": 300},
    {"source": "AUD", "target": "LRD", "type":"A", "volume": 300},
    {"source": "USD", "target": "GBP", "type":"A", "volume": 100},
]
*/

var nodes_data = this.state.data.nodes;

var links_data = this.state.data.links;



//set up the simulation and add forces  
var simulation = d3.forceSimulation()
					.nodes(nodes_data);
                              
var link_force =  d3.forceLink(links_data)
                        .id(function(d) { return d.name; }) 
                        .distance(70);           
         
var charge_force = d3.forceManyBody()
    .strength(-400); 
    
var center_force = d3.forceCenter(width / 2, height / 2);  
                      
simulation
    .force("charge_force", charge_force)
    .force("center_force", center_force)
    .force("links",link_force)
 ;

//add tick instructions: 
simulation.on("tick", tickActions );

//add encompassing group for the zoom 
var g = svg.append("g")
    .attr("class", "everything");

var linScale = d3.scaleLinear()
    .domain([
        d3.min(links_data, function(d) {return d.volume;}),
        d3.max(links_data, function(d) {return d.volume;})
    ])
    .range([1, 5]);

var tranScale = d3.scaleLinear()
    .domain([
        d3.min(links_data, function(d) {return d.volume;}),
        d3.max(links_data, function(d) {return d.volume;})
    ])
    .range([0.5, 1]);

//draw lines for the links 
var link = g.append("g")
    .attr("class", "links")
    .selectAll("path")
    .data(links_data)
    .enter().append("path")
    .attr("marker-end", "url(#triangle)")
    .attr("stroke-width", function(d) {return linScale(d.volume);})
    .style("stroke", "rgba(0,0,0)")
    .style("stroke-opacity", function(d) {return String(tranScale(d.volume))})
    .attr("fill", "none");    

g.append("svg:defs").append("svg:marker")
    .attr("id", "triangle")
    .attr("viewBox", '0, 0, 50, 50')
    .attr("refX", 8)
    .attr("refY", 6)
    .attr("markerWidth", 20)
    .attr("markerHeight", 20)
    .attr("markerUnits", "strokeWidth") //"userSpaceOnUse")
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M 0 0 12 6 0 12 3 6")
    .style("fill", "black");


    var text = g.append("g").selectAll("text")
    .data(nodes_data)
    .enter().append("text")
    .attr("x", 0)
    .attr("y", 0)
    .style("font-size", 13)
    .text(function(d) {return d.name;});

//draw circles for the nodes 
var node = g.append("g")
        .attr("class", "nodes") 
        .selectAll("circle")
        .data(nodes_data)
        .enter()
        .append("circle")
        .attr("r", radius)
        .attr("stroke", "black").style("stroke-width", 2)
        .attr("fill", "rgb(250,250,0,0.2)");

//add drag capabilities  
var drag_handler = d3.drag()
	.on("start", drag_start)
	.on("drag", drag_drag)
	.on("end", drag_end);	
	
drag_handler(node);


//add zoom capabilities 
var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

zoom_handler(svg);     

/** Functions **/

//Function to choose what color circle we have
//Let's return blue for males and red for females
function circleColour(d){
	if(d.sex =="M"){
		return "blue";
	} else {
		return "pink";
	}
}

//Function to choose the line colour and thickness 
//If the link type is "A" return green 
//If the link type is "E" return red 
function linkColour(d){
	if(d.type == "A"){
		return "green";
	} else {
		return "red";
	}
}

//Drag functions 
//d is the node 
function drag_start(d) {
 if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

//make sure you can't drag the circle outside the box
function drag_drag(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function drag_end(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

//Zoom functions 
function zoom_actions(){
    g.attr("transform", d3.event.transform)
}

function linkArc(d) {
    var yTarget = lineY2(d);
    var xTarget = lineX2(d);
    var ySource = lineSourceY2(d);
    var xSource = lineSourceX2(d);
    var dx = xTarget - xSource,
        dy = yTarget - ySource,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + xSource + "," + ySource + "A" + dr + "," + dr + " 0 0,1 " + xTarget + "," + yTarget;
  }

  var lineX2 = function (d) {
    var length = Math.sqrt(Math.pow(d.target.y - d.source.y, 2) + Math.pow(d.target.x - d.source.x, 2));
    var scale = (length - radius-8) / length;
    var offset = (d.target.x - d.source.x) - (d.target.x - d.source.x) * scale;
    return d.target.x - offset;
};

var lineSourceX2 = function (d) {
    var length = Math.sqrt(Math.pow(d.target.y - d.source.y, 2) + Math.pow(d.target.x - d.source.x, 2));
    var scale = (length - radius) / length;
    var offset = (d.target.x - d.source.x) - (d.target.x - d.source.x) * scale;
    return d.source.x + offset;
};

var lineY2 = function (d) {
    var length = Math.sqrt(Math.pow(d.target.y - d.source.y, 2) + Math.pow(d.target.x - d.source.x, 2));
    var scale = (length - radius) / length;
    var offset = (d.target.y - d.source.y) - (d.target.y - d.source.y) * scale;
    return d.target.y - offset;
};

var lineSourceY2 = function (d) {
    var length = Math.sqrt(Math.pow(d.target.y - d.source.y, 2) + Math.pow(d.target.x - d.source.x, 2));
    var scale = (length - radius) / length;
    var offset = (d.target.y - d.source.y) - (d.target.y - d.source.y) * scale;
    return d.source.y + offset;
};

function tickActions() {
    //update circle positions each tick of the simulation 
       node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
        
    //update link positions 
    link.attr("d", linkArc);
    /*
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", lineX2)
        .attr("y2", lineY2);
    */
    text
        .attr("x", function(d) {return d.x-13;})
        .attr("y", function(d) {return d.y+5;})
}

    }


    componentDidMount() {
        // D3 Code to create the chart
        // using this._rootNode as container
        this.renderNodeGraph();

    }


    shouldComponentUpdate() {
        // Prevents component re-rendering
        return true;
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }



    render() {
        const {classes} = this.props;
        return (
            <DataComponent xs={6}>
                <div className="line-container" ref={this._setRef.bind(this)} 
                    
                />
            </DataComponent>
        );
    }
}

export default withStyles(styles)(TestGraph);