import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems from './listItems';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {DashboardConsumer} from '../../dashboardContext';

import BottomNavigator from './bottomNav';

const drawerWidth = 240;

const styles = theme => ({
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
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
    tabs: {
      maxWidth: drawerWidth,
    },
  });


class SideBar extends React.Component {

  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

    render() {
        const { classes } = this.props;

        return (
          <DashboardConsumer>
          {(context) => {

            return(
            <Drawer
            variant="persistent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
            }}
            open={this.props.open}
          >
            <div className={classes.toolbarIcon}>
            <BottomNavigator/>
              <IconButton onClick={this.props.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <MainListItems/>
            </Drawer>
            );
          }}
          </DashboardConsumer>
        );
        
    }
    

}

export default withStyles(styles)(SideBar);


/*
<Paper className={classes.tabs}>
              <Tabs
          value={context.state.source}
          onChange={context.handleSourceChange}
          fullWidth
          indicatorColor="secondary"
          textColor="secondary"
          width="auto"
        >
          <Tab icon={<CloutOutlined/>} />
          <Tab icon={<FolderOutlined/>}  />
        </Tabs>
        </Paper>
        */