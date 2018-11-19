import React from "react";
import Dropzone from "react-dropzone";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import DataTable from './components/dashboardComponents/dataTable';
import DataGraph from './components/dashboardComponents/dataGraph';
import DataPie from './components/dashboardComponents/dataPie';
import {DashboardConsumer} from '../dashboardContext';

const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
});

class DashboardArea extends React.Component {
    state = {
        dataLoaded: false,
        data: null,
        template: null,
    }

    render() {
        const {classes} = this.props;

        return (
        <DashboardConsumer>
        {(context) => {
            let dm = null;
            let tm = context.state.templateManager;
            let template = tm.getActiveTemplate();

            if(this.props.source === 'REMOTE') dm = context.state.remoteDataManager;
            else if(this.props.source === 'LOCAL') {
                dm = context.state.localDataManager;
                if(!this.state.dataLoaded) {
                    return (
                        <div>
                            <div className={classes.appBarSpacer}/>
                            <Dropzone 
                                onDrop = { (files) => {
                                    dm.loadData(
                                        files, 
                                        () => {this.setState({dataLoaded: true,}) } 
                                    )
                                }}
                            >
                                drop some files 
                            </Dropzone>
                        </div>
                    )
                }
            }
            else console.log("Source not specified");
            
            return (
                <div>
                    <div className={classes.appBarSpacer}/>
                        <Grid container spacing={16}>
                        {template.components.map((e) => {
                            return(
                                <e.component dm={dm} attributes={e.attributes}/>
                            );
                        })}
                        </Grid>
                </div>
            );
        }}
        </DashboardConsumer>
        );
    }
}


export default withStyles(styles)(DashboardArea);