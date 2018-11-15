import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DashboardArea from '../myDashboard/dashboardArea';
import TopBar from '../myDashboard/topBar';
import SideBar from '../myDashboard/sideBar';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

class Dashboard extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
    console.log("open was called");
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
    console.log("close was called");
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <TopBar open={this.state.open} handleDrawerOpen={this.handleDrawerOpen}/>
          <SideBar open={this.state.open} handleDrawerClose={this.handleDrawerClose}/>
          <main className={classes.content}>
            <DashboardArea/>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
