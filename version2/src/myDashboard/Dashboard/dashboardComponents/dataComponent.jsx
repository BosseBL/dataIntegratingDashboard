import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '350px',
        overflow: 'auto',
      },
      ShowSettings: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: '100%',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      HideSettings: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing.unit * 9,
        },
      },
  
});

class DataComponent extends React.Component {

    state = {
        hover: false,
        settings: false,
    }

    handleEnter() {
        this.setState({hover: true})
    }

    handleLeave() {
        this.setState({hover: false})
    }

    openSettings() {
        this.setState({settings: true})
    }
    closeSettings() {
        this.setState({settings: false})
    }


    render() {
        const {classes} = this.props;
        console.log(this.props);
        // replaced Paper with div
        return (
            <Grid item xs={this.props.xs} onClick={this.handleEnter.bind(this)} onMouseLeave={this.handleLeave.bind(this)}>
            <Dialog
                open={this.state.settings}
            >
            <form>
                <FormControl>
                    <InputLabel>Bla</InputLabel>
                    <Select
                    
                    >

                    </Select>
                </FormControl>

            <Button onClick={this.closeSettings.bind(this)}>Accept</Button>
            </form>
            </Dialog>
            <Paper>
            <ExpansionPanel
                expanded={this.state.hover}
            >
            <Button onClick={this.openSettings.bind(this)}> Edit </Button> 
            <Button> Move </Button>
            <Button onClick={() => {this.props.handleDeleteComponent(this.props.key)}}> X </Button>
            
            </ExpansionPanel>
            <div className={classes.root} >
                {this.props.children}
                
            </div>
            </Paper>
            </Grid>
            
        );
    }
}


export default withStyles(styles)(DataComponent);