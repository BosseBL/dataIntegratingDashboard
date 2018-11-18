import React from "react";
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DataComponent from './dataComponent';
import {DashboardConsumer} from '../../../dashboardContext';
import {localDataManager} from '../../utilities/dataManager';
import {remoteDataManager} from '../../utilities/dataManager';


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

class DataTable extends React.Component {

    state = {
        data: null,
    }


    componentWillMount() {
        this.setState({data: localDataManager.getData()});
    }


    render() {
        const {classes} = this.props;
        return (

            <DataComponent xs={12} >
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
                </DataComponent>
                );
            

        
    }
}

export default withStyles(styles)(DataTable);