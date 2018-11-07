import React from "react";
import Dropzone from "react-dropzone";
import classnames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import csv from 'csv';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
    appBarSpacer: theme.mixins.toolbar,
    root: {
        display: 'flex',
        width: '100%',
        height: '300px',
        overflow: 'auto',
      },
    tableHeader: {
        position: 'fixed',
    },
    tableBody: {
        paddingTop: '40px',
    }
});



class DashboardArea extends React.Component {
    state = {
        dataLoaded: false,
        data: null,
    }

    onDrop = (files) => {
        if(files.length > 1) console.log("too many files");
        else console.log(files);
        var file = files[0];
        var fr = new FileReader();
        fr.onload = e => {
            var content = e.target.result;
            csv.parse(e.target.result, (err, data) => {
                console.log(err, data);
                let newData = [];
                let names = data[0];
                for(var i = 1; i < data.length; i++) {
                    newData.push({});
                    for(var j = 0; j < names.length; j++) {
                        newData[i-1][names[j]] = data[i][j]; 
                    }
                }
                this.setState({dataLoaded: true, data: newData});
            });
        };
        fr.readAsText(file);
    }

    render() {
        const {classes} = this.props;

        if(this.state.dataLoaded) {
            console.log(this.state.data);
            return (
                <div>
                <div className={classes.appBarSpacer}/>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead className={classes.tableHeader}>
                                <TableRow>
                                    {Object.keys(this.state.data[0]).map(n => {
                                        return (
                                            <TableCell> {n} </TableCell>
                                        );
                                })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.map(n => {
                                    return (
                                        <TableRow key={n.id.toString()}>
                                            {Object.keys(n).map((key, index) => {
                                                return (
                                                    <TableCell key={n.id.toString() + key}> {n[key]} </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className={classes.appBarSpacer}/>
                    <Dropzone onDrop={this.onDrop}>
                        drop some files
                    </Dropzone>
                </div>
            )
        }


    }
}

export default withStyles(styles)(DashboardArea);