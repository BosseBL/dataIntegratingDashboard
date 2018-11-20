import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import CloutOutlined from '@material-ui/icons/CloudOutlined';
import FolderOutlined from '@material-ui/icons/FolderOutlined';

import {DashboardConsumer} from '../dashboardContext';
const styles = {
  root: {
    width: 'auto',
  },
};

class BottomNavigator extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <DashboardConsumer>
          {(context) => {
            return (
      <BottomNavigation
        value={context.state.source}
        onChange={context.handleSourceChange}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Remote" icon={<CloutOutlined />} />
        <BottomNavigationAction label="Local" icon={<FolderOutlined />} />
      </BottomNavigation>
            );
       }}
       </DashboardConsumer>
    );
    
  }
}

BottomNavigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNavigator);