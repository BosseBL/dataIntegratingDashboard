import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DataComponent from './dataComponent';

const styles = theme => ({
    table : {
        width: '100%',
    },
    tableHeader: {
        position: 'sticky',
        top: '0',
        backgroundColor: 'lightblue',
        width: 'auto',
    },
    tableBody: {
    }
});

class TestTable extends React.Component {

    state = {
        data: null,
    }

    constructor(props) {
        super(props);
        this.dm = props.dm;
        this.state.filter = props.attributes.filter;
        this.state.interval = props.attributes.interval;
        this.state.filter.cptyName = props.companyName;
        this.state.data = this.dm.getDataTable(this.state.interval, this.state.filter);
    }

    componentWillReceiveProps(nextProp) {
        if(nextProp.companyName != this.state.companyName) {
            let newFilter = nextProp.attributes.filter;
            newFilter.cptyName = nextProp.companyName;
            let newData = this.dm.getDataTable(this.state.interval, this.state.filter);
            this.setState({companyName: nextProp.companyName, filter: newFilter, data: newData });
        }
    }

    roundDown(v) {
        if(v > 0) {
            var units = ["", "k", "M", "B"];
            var order = Math.floor(Math.log10(v));
            var n = order%3;
            var k = Math.floor(order/3);
            var newValue = Math.floor(v/(10**(order-2)));
            return String(newValue) + units[k];  
        }
        return String(v);
    }

    render() {
        const {classes} = this.props;

        if(this.props.companyName) {
            return (
                <DataComponent xs={6} >
                    <Table className={classes.table}>
                        <TableHead >
                            <TableRow >
                                {Object.keys(this.state.data[0]).map(n => {
                                    return (
                                        <TableCell key={n} className={classes.tableHeader}> {n} </TableCell>
                                    );
                            })}
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tableBody}>
                            {this.state.data.map(n => {
                                return (
                                    <TableRow key={n.Pair.toString()}>
                                        {Object.keys(n).map((key, index) => {
                                            if(index == 0) {
                                            return (
                                                <TableCell key={n.Pair.toString() + key}> {n[key]} </TableCell>
                                            );
                                            }
                                            else {
                                                return (
                                                    <TableCell key={n.Pair.toString() + key}> {this.roundDown(n[key])} </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>

                                    );
                                })}
                            </TableBody>        
                        </Table>
                    </DataComponent>
                );
            }
            else {
                return (
                    <DataComponent xs={6} ></DataComponent>
                );
            }
    }
}

export default withStyles(styles)(TestTable);