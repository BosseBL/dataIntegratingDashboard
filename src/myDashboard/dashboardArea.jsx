import React from "react";
import Dropzone from "react-dropzone";
import classnames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import csv from 'csv';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { callbackify } from "util";
import { Typography } from "@material-ui/core";

import Grid from '@material-ui/core/Grid';

import DataTable from './components/dashboardComponents/dataTable';
import DataGraph from './components/dashboardComponents/dataGraph';
import DataPie from './components/dashboardComponents/dataPie';
import FileManager from './utilities/fileManager';

var fm = FileManager();

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
});

class DashboardArea extends React.Component {
    state = {
        dataLoaded: false,
        data: null,
    }

    onDrop = (files) => {
        var newData = fm.readFiles(files);
        this.setState({dataLoaded: true, data: newData});
    }

    getPieData(data, entity, field) {
        var filteredData = data.filter((e) => {return e.name == entity});
        var fieldValues = Array.from(new Set(filteredData.map((n) => {return n[field]})));
        var returnData = [];
        for(var i = 0; i < fieldValues.length; i++) {
            var count = 0;
            for(var j = 0; j < filteredData.length; j++) {
                if(filteredData[j][field] == fieldValues[i]) count++;
            }
            returnData.push({name: fieldValues[i], value: count});
        }
        console.log(filteredData);
        console.log(fieldValues);
        console.log(returnData);
        return returnData;
    }

    render() {
        const {classes} = this.props;

        if(this.state.dataLoaded) {
            return (
                <div>
                    <div className={classes.appBarSpacer}/>
                        <Grid container spacing={16}>
                        <DataTable className={classes.table} data={this.state.data}/>
                        <DataGraph 
                            data={ this.state.data.filter( (d) => {return d.name == 'Scania'}
                                    ).map((n) => {return {date: n.date, volume: n.volume}})
                            }
                            indexKey="date"         
                        />
                        <DataPie
                            data={this.getPieData(this.state.data, "Scania", "type")}
                        />
                        
                        </Grid>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className={classes.appBarSpacer}/>
                    <Dropzone onDrop={this.onDrop}>
                        drop some files
                    </Dropzone>
                </div>
            )
        }
    }
}

export default withStyles(styles)(DashboardArea);