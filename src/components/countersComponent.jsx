import React, {Component} from "react";
import Counter from "./counterComponent.jsx";
import CssBaseline from '@material-ui/core/CssBaseline';

class Counters extends Component {
    state = {
        counters: [
            {id: 1, value: 4},
            {id: 2, value: 0},
            {id: 3, value: 0},
            {id: 4, value: 0},
            {id: 5, value: 0}
        ]
    };

    handleDelete = counterId => {
        const counters = this.state.counters.filter(c => c.id !== counterId);
        this.setState({counters});
    };

    render() {
        return (
            <React.Fragment>
            <CssBaseline/>
                {this.state.counters.map(counter => 
                    <Counter key={counter.id} counter={counter} onDelete={this.handleDelete} />)}
            </React.Fragment>
        )
    }

}

export default Counters;