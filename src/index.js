import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import "bootstrap/dist/css/bootstrap.css";
import Counters from "./components/countersComponent.jsx"
import Dashboard from "./materialDashboard/Dashboard.js";


ReactDOM.render(<App/>, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
 serviceWorker.unregister();


 //const element = <h1> Hello World</h1>;
 //ReactDOM.render(element, document.getElementById('mydiv'));

