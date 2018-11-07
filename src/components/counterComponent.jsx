import React, {Component} from "react";

class Counter extends Component {
    state = {
        value: this.props.counter.value,
        imageUrl: "https://picsum.photos/200",
        tags: ["tag1", "tag2", "tag3"]
    };

    renderTags() {
        if(this.state.tags.length === 0) return <p> There are no tags!</p>;
        else return <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>;
    }

    render() {
        return (
            <div>
                <span className={this.getBadgeClasses()}> {this.formatCount()} </span>
                <button className="btn btn-secondary btn-sm" onClick={() => this.increment()}>Increment</button>
                <button className="btn btn-danger btn-sm m-2" onClick={() => this.props.onDelete(this.props.counter.id)}>Delete</button>
            </div>
        );
    }
    
    getBadgeClasses() {
        let classes = "badge m-2 ";
        classes += (this.state.value === 0) ? "badge-warning" : "badge-primary";
        return classes;    
    };

    formatCount() {
        const {value} = this.state;
        return value === 0 ? "Zero" : value;
    };

    increment = () => {
        this.setState({value: this.state.value + 1});
    };
}

export default Counter;