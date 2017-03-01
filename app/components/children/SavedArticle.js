import React, { Component } from 'react';

class SavedArticle extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <a href={this.props.link} id={this.props.key} target='_blank'> <h4>{this.props.title}</h4> </a>
                    <button className="btn btn-muted pull-right" onClick={this.props._handleDelete} data-link={this.props.link} data-title={this.props.title} type='submit'>Delete</button>
                </div>
            </div>
        );
    }

};

export default SavedArticle;