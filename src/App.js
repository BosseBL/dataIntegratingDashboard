import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from "./materialDashboard/Dashboard.js";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import {DashboardProvider} from './dashboardContext';
import DataManager from './myDashboard/utilities/dataManager';
//import TemplateManager from './myDashboard/utilities/templateManager';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});


class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <MuiThemeProvider theme={theme}>
          <DashboardProvider value = {this.state}>
            <Dashboard/>
          </DashboardProvider>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
