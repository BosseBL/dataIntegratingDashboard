import React from "react";
import Dropzone from "react-dropzone";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DataTable from './components/dashboardComponents/dataTable';
import DataGraph from './components/dashboardComponents/dataGraph';
import DataPie from './components/dashboardComponents/dataPie';
import FileManager from './utilities/fileManager';

import csv from 'csv';


//var fm = new FileManager();

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
});

class DashboardArea extends React.Component {
    state = {
        dataLoaded: false,
        data: null,
    }

    onDrop = (files) => {
        if(files.length > 1) console.log("too many files");
        var file = files[0];
        var fr = new FileReader();
        var newData = [];
        fr.onload = e => {
            var content = e.target.result;
            csv.parse(e.target.result, (err, data) => {
                let names = data[0];
                for(var i = 1; i < data.length; i++) {
                    newData.push({});
                    for(var j = 0; j < names.length; j++) {
                        newData[i-1][names[j]] = data[i][j]; 
                    }
                }
                this.setState({dataLoaded: true, data: newData});
            });
        };
        fr.readAsText(file);
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
        return returnData;
    }

    render() {
        const {classes} = this.props;

        if(this.state.dataLoaded && this.state.data) {
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