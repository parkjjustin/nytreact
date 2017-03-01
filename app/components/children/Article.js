import React, { Component } from 'react';

class Article extends Component{
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <a href={this.props.link} id={this.props.key} target="_blank"><h4>{this.props.title}</h4></a>
                    <button className="btn btn-muted pull-right" onClick={this.props._handleSave} data-link={this.props.link} data-title={this.props.title} type='submit'>Save</button>
                </div>
            </div>
        );
    }
};

export default Article;