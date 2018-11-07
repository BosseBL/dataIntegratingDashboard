import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from "./materialDashboard/Dashboard.js";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';


const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },

});

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <MuiThemeProvider theme={theme}>
          <Dashboard/>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
