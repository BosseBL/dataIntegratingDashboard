import React from "react";
import Dropzone from "react-dropzone";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DataTable from './components/dashboardComponents/dataTable';
import DataGraph from './components/dashboardComponents/dataGraph';
import DataPie from './components/dashboardComponents/dataPie';
import FileManager from './utilities/fileManager';
import csv from 'csv';
import {DashboardConsumer} from '../dashboardContext';
import {localDataManager} from './utilities/dataManager';
import {remoteDataManager} from './utilities/dataManager';
//var fm = new FileManager();

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
});

class DashboardArea extends React.Component {
    state = {
        dataLoaded: false,
        data: null,
    }

    getPieData(data, entity, field) {
        var filteredData = localDataManager.getData().filter((e) => {return e.name == entity});
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

    onDrop(files) {
        localDataManager.loadData(files, () => {this.setState({dataLoaded: true,}) } );
    }


    render() {
        const {classes} = this.props;

        return (
        <DashboardConsumer>
            {(context) => 
            {
                let dm = localDataManager;
                let tm = context.state.templateManager;
                if(this.state.dataLoaded) {
                    return (
                        <div>
                            <div className={classes.appBarSpacer}/>
                                <Grid container spacing={16}>
                                <DataTable className={classes.table} />
                                <DataGraph 
                                    data={ dm.getData().filter( (d) => {return d.name == 'Scania'}
                                            ).map((n) => {return {date: n.date, volume: n.volume}})
                                    }
                                    indexKey="date"         
                                />
                                <DataPie/>
                                </Grid>
                        </div>
                    );
                }
                else {
                    return (
                        <div>
                            <div className={classes.appBarSpacer}/>
                            <Dropzone onDrop={(files) => {this.onDrop(files)}}>
                                drop some files 
                            </Dropzone>
                        </div>
                    )
                }
            }
        }
        </DashboardConsumer>
        );

    }
        
}


export default withStyles(styles)(DashboardArea);