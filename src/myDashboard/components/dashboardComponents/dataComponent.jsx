import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '300px',
        overflow: 'auto',
      },
});

class DataComponent extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <Grid item xs={this.props.xs}>
            <Paper className={classes.root} >
                {this.props.children}
            </Paper>
            </Grid>
        );
    }
}


export default withStyles(styles)(DataComponent);