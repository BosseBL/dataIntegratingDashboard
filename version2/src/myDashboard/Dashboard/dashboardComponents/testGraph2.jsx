import React from 'react';
import DataComponent from './dataComponent';
import { withStyles } from '@material-ui/core';
import './nodeStyle.css';

import * as d3 from "d3";
const styles = theme => ({
    container : {
    }
}); 



class TestGraph2 extends React.Component {

    state = {
    }

    constructor(props) {
        super(props);

    }

    static propTypes = {
        
    }

    componentDidMount() {
        var links = [
            {source: "Microsoft", target: "Amazon", type: "licensing"},
            {source: "Microsoft", target: "HTC", type: "licensing"},
            {source: "Samsung", target: "Apple", type: "suit"},
            {source: "Motorola", target: "Apple", type: "suit"},
            {source: "Nokia", target: "Apple", type: "resolved"},
            {source: "HTC", target: "Apple", type: "suit"},
            {source: "Kodak", target: "Apple", type: "suit"},
            {source: "Microsoft", target: "Barnes & Noble", type: "suit"},
            {source: "Microsoft", target: "Foxconn", type: "suit"},
            {source: "Oracle", target: "Google", type: "suit"},
            {source: "Apple", target: "HTC", type: "suit"},
            {source: "Microsoft", target: "Inventec", type: "suit"},
            {source: "Samsung", target: "Kodak", type: "resolved"},
            {source: "LG", target: "Kodak", type: "resolved"},
            {source: "RIM", target: "Kodak", type: "suit"},
            {source: "Sony", target: "LG", type: "suit"},
            {source: "Kodak", target: "LG", type: "resolved"},
            {source: "Apple", target: "Nokia", type: "resolved"},
            {source: "Qualcomm", target: "Nokia", type: "resolved"},
            {source: "Apple", target: "Motorola", type: "suit"},
            {source: "Microsoft", target: "Motorola", type: "suit"},
            {source: "Motorola", target: "Microsoft", type: "suit"},
            {source: "Huawei", target: "ZTE", type: "suit"},
            {source: "Ericsson", target: "ZTE", type: "suit"},
            {source: "Kodak", target: "Samsung", type: "resolved"},
            {source: "Apple", target: "Samsung", type: "suit"},
            {source: "Kodak", target: "RIM", type: "suit"},
            {source: "Nokia", target: "Qualcomm", type: "suit"}
          ];
          
          var nodes = {};
          
          // Compute the distinct nodes from the links.
          links.forEach(function(link) {
            link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
            link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
          });
          
          var width = 300,
              height = 300;
          
        var simulation = d3.forceSimulation()
                            .nodes(nodes);
            
        var link_force =  d3.forceLink(links)
                            .id(function(d) { return d.name; })
                                  
             
        var charge_force = d3.forceManyBody()
                            .strength(100); 
        
        var center_force = d3.forceCenter(width / 2, height / 2);

        simulation
        .force("charge_force", charge_force)
        .force("center_force", center_force)
        .force("links",link_force);
                      
        simulation.on("tick", tick);

        var svg = d3.select(this._rootNode).append("svg")
        .attr("width", width)
        .attr("height", height);
    
        var path = svg.append("g").selectAll("path")
        .data(links)
        .enter().append("path")
        //.attr("class", function(d) { return "link " + d.type; })
        //.attr("marker-end", function(d) { return "url(#" + d.type + ")"; })
        .attr("stroke-width", 2)
        .attr("stroke", "black");

        var circle = svg.append("g").selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 6)
        .attr("fill", "black")
        //.call(center_force.drag);
    
        var text = svg.append("g").selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("x", 8)
        .attr("y", ".31em")
        .text(function(d) { return d.name; });
    
        // Use elliptical arc path segments to doubly-encode directionality.
        function tick() {
        path.attr("d", linkArc);
        //circle.attr("transform", transform);
        circle
            .attr("cx", function(d) {return d.x;})
            .attr("cy", function(d) {return d.y;})
        text.attr("transform", transform);
        }

        function linkArc(d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
          }
          
          function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
          }
              /*
        var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([width, height])
        .linkDistance(60)
        .charge(-300)
        .on("tick", tick)
        .start();

        
          var svg = d3.select(this._rootNode).append("svg")
              .attr("width", width)
              .attr("height", height);
          
          // Per-type markers, as they don't inherit styles.
          svg.append("defs").selectAll("marker")
              .data(["suit", "licensing", "resolved"])
            .enter().append("marker")
              .attr("id", function(d) { return d; })
              .attr("viewBox", "0 -5 10 10")
              .attr("refX", 15)
              .attr("refY", -1.5)
              .attr("markerWidth", 6)
              .attr("markerHeight", 6)
              .attr("orient", "auto")
            .append("path")
              .attr("d", "M0,-5L10,0L0,5");
          
          var path = svg.append("g").selectAll("path")
              .data(force.links())
            .enter().append("path")
              .attr("class", function(d) { return "link " + d.type; })
              .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });
          
          var circle = svg.append("g").selectAll("circle")
              .data(force.nodes())
            .enter().append("circle")
              .attr("r", 6)
              .call(force.drag);
          
          var text = svg.append("g").selectAll("text")
              .data(force.nodes())
            .enter().append("text")
              .attr("x", 8)
              .attr("y", ".31em")
              .text(function(d) { return d.name; });
          
          // Use elliptical arc path segments to doubly-encode directionality.
          function tick() {
            path.attr("d", linkArc);
            circle.attr("transform", transform);
            text.attr("transform", transform);
          }
          
          function linkArc(d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
          }
          
          function transform(d) {
            return "translate(" + d.x + "," + d.y + ")";
          }
          */

    }

    shouldComponentUpdate() {
        // Prevents component re-rendering
        return false;
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }



    render() {
        const {classes} = this.props;
        return (
            <DataComponent xs={6}>
                <div className={classes.container} ref={this._setRef.bind(this)} 
                    
                />
            </DataComponent>
        );
    }
}

export default withStyles(styles)(TestGraph2);