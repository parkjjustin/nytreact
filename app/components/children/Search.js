import React, {Component} from 'react';

class Search extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            query: '',
            begin: '',
            end: ''
        };
    }

    handleChange(event){
        switch(event.target.id){
            case 'topic':
                this.setState({query: event.target.value});
                break;
            case 'start-year':
                this.setState({begin: event.target.value});
                break;
            case 'end-year':
                this.setState({end: event.target.value});
                break;
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.setTerm(this.state.query, this.state.begin, this.state.end);
        this.setState({
             query: '',
             begin: '',
             end: ''
        });
    }

    render(){
        return(
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h3 className="panel-title">Search</h3>
            </div>
            <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="topic">Topic</label>
                        <input value={this.state.query} onChange={this.handleChange} type="text" className="form-control" id="topic" placeholder="Topic..."></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="start-year">Start Year</label>
                        <input value={this.state.begin} onChange={this.handleChange} type="number" className="form-control" id="start-year" placeholder="YYYYMMDD..."></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="end-year">End Year</label>
                        <input value={this.state.end} onChange={this.handleChange} type="number" className="form-control" id="end-year" placeholder="YYYYMMDD..."></input>
                    </div>
                    <button type="submit" className="btn btn-muted">Submit</button>
                </form>
            </div>
        </div>
        );
    }
}

export default Search;