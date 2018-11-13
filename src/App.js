import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dashboard from "./materialDashboard/Dashboard.js";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';




const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },

});

const Context = React.createContext();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //templates: getTemplates(),
      //apiData = {},
      //localData = {},
      //currentTemplate: new Template(templates[0]),
      //dataMap: getDataMap(),
      // page: "REMOTE",
      //dataQuery = localQuery,



    }

  }


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
