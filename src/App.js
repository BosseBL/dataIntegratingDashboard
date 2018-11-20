import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from "./myDashboard/Dashboard";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

import {DashboardProvider} from './dashboardContext';
import {localDataManager} from './myDashboard/utilities/dataManager';
import {remoteDataManager} from './myDashboard/utilities/dataManager';
import TemplateManager from './myDashboard/utilities/templateManager';

import orange from '@material-ui/core/colors/orange';
import blue from '@material-ui/core/colors/blue';
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: orange,
    secondary: blue,
  },
});


class App extends Component {

  state = {
    templateManager: null,
    localDataManager: null,
    remoteDataManager: null,
    localDataLoaded: false,
    source: 1,
    activeTemplate: 0,
  }

  constructor(props) {
    super(props);
    this.state.data = null;
    this.state.templateManager = new TemplateManager();
    this.state.localDataManager = localDataManager;
    this.state.remoteDataManager = remoteDataManager;
  }

  loadLocalData(files) {
    this.state.localDataManager.loadData(
      files, 
      () => {this.setState({localDataLoaded: true,}) }
    );
  }

  resetLocalData() {
    this.setState({localDataLoaded: false, })
  }

  handleSourceChange(event, value) {
    if(value == 0) this.setState({source: 0});
    if(value == 1) this.setState({source: 1});
  }

  changeActiveTemplate(index) {
    this.setState({activeTemplate: index});
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <MuiThemeProvider theme={theme}>
          <DashboardProvider value = {{
              state: this.state,
              loadLocalData: this.loadLocalData.bind(this),
              resetLocalData: this.resetLocalData.bind(this),
              handleSourceChange: this.handleSourceChange.bind(this),
              changeActiveTemplate: this.changeActiveTemplate.bind(this),
            }}
            >
            <Dashboard/>
          </DashboardProvider>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
