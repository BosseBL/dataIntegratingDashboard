import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Collapse from '@material-ui/core/Collapse';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {DashboardConsumer} from '../../dashboardContext';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});


class MainListItems extends React.Component {
  state = {
    open: false,
    selectedIndex: 0,
  }

  handleExpand() {
    this.setState({open: !this.state.open});
  }

  handleSelect(event, index) {
    this.setState({selectedIndex: index});
  }

  render() {
    const {classes} = this.props;
    return(
      <DashboardConsumer>
      {(context) => {
        let templates = context.state.templateManager.getTemplateNames();
        return(
      <div>
        <List>
        <ListItem button onClick={this.handleExpand.bind(this)}>
          <ListItemIcon>
            <DashboardIcon/>
          </ListItemIcon>
          <ListItemText primary="Templates" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {templates.map((e, i) => {
                  return (
                  <ListItem 
                    button 
                    key={i} 
                    className={classes.nested}
                    selected={context.state.activeTemplate === i}
                    onClick={(event) => {context.changeActiveTemplate(i);}}
                  > 
                    <ListItemText insert primary={e}/>
                  </ListItem>
                  );
                })}
                </List>
              </Collapse>
        
        </List>
      </div>
                  );
                }}
                </DashboardConsumer>
    );
  }
}

MainListItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainListItems);