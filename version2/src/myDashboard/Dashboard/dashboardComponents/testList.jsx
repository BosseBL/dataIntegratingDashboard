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

class TestList extends React.Component {

    state = {
        data: null,
        companyName: "",
    }

    constructor(props) {
        super(props);
        this.dm = props.dm;
        this.state.interval = props.attributes.interval;
        this.state.filter = props.attributes.filter;
        this.state.filter.cptyName = props.companyName;
        this.state.companyName = props.companyName;
        this.state.data = this.dm.getDataList(this.state.filter, this.state.interval);
    }

    componentWillReceiveProps(nextProp) {
        if(nextProp.companyName != this.state.companyName) {
            let newFilter = nextProp.attributes.filter;
            newFilter.cptyName = nextProp.companyName;
            let newData = this.dm.getDataList(newFilter, this.state.interval);
            this.setState({companyName: nextProp.companyName, filter: newFilter, data: newData});
        }
    }

    render() {
        const {classes} = this.props;

        return (

            <DataComponent xs={6} >
                <Table className={classes.table}>
                    <TableBody className={classes.tableBody}>
                        {this.state.data.map(n => {
                            return (
                                <TableRow key={n.name.toString()}>
                                    {Object.keys(n).map((key, index) => {
                                        return (
                                            <TableCell key={index}> {n[key]} </TableCell>
                                        );
                                    })}
                                </TableRow>

                                );
                            })}
                        </TableBody>        
                    </Table>
                </DataComponent>
                );
            

        
    }
}

export default withStyles(styles)(TestList);