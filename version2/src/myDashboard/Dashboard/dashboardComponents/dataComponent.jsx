import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '350px',
        overflow: 'auto',
      },
});

class DataComponent extends React.Component {
    render() {
        const {classes} = this.props;
        // replaced Paper with div
        return (
            <Grid item xs={this.props.xs}>
            <div className={classes.root} >
                {this.props.children}
            </div>
            </Grid>
        );
    }
}


export default withStyles(styles)(DataComponent);