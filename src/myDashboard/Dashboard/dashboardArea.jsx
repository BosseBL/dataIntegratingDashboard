import React from "react";
import Dropzone from "react-dropzone";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {DashboardConsumer} from '../../dashboardContext';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    addButton: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        left: theme.spacing.unit * 2,
      },
});

class DashboardArea extends React.Component {

    render() {
        const {classes} = this.props;

        return (
        <DashboardConsumer>
        {(context) => {
            let dm = null;
            let tm = context.state.templateManager;
            let template = tm.getTemplate(context.state.activeTemplate);

            if(context.state.source === 0) dm = context.state.remoteDataManager;
            else if(context.state.source === 1) {
                dm = context.state.localDataManager;
                if(!context.state.localDataLoaded) {
                    return (
                        <div>
                            <div className={classes.appBarSpacer}/>
                            <Dropzone onDrop={(files) => {context.loadLocalData(files)} }>
                                drop some files 
                            </Dropzone>
                        </div>
                    )
                }
            }
            else console.log("Source not specified");
            
            if(context.state.source === 1) {
                return (
                    <div>
                        <div className={classes.appBarSpacer}/>
                            <Grid container spacing={16}>
                            {template.components.map((e, i) => {
                                return(
                                    <e.component key={i} dm={dm} attributes={e.attributes}/>
                                );
                            })}
                            </Grid>
                            <Button variant="fab" className={classes.addButton} color="primary">
                                <AddIcon />
                            </Button>
                    </div>
                );
            }
            else if(context.state.source === 0) {
                return (
                    <div>
                        <div className={classes.appBarSpacer}/>
                    <Paper>
                        <Typography> Not connected to server </Typography>
                    </Paper>
                    </div>
                );
            }
        }}
        </DashboardConsumer>
        );
    }
}


export default withStyles(styles)(DashboardArea);