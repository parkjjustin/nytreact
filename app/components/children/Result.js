import React, {Component} from 'react';
import OneArticle from './Article.js';

class Result extends Component {

    constructor(props){
        super(props);
    }

    render(){
        var articleTitles = this.props.results.map((item, index) => { 
            return <OneArticle _handleSave={this.props._handleSave} key={index} title={item.title} link={item.link} /> 
        });

        return(
        <div className="panel panel-primary">
            <div className="panel-heading">
                <h3 className="panel-title">Results</h3>
            </div>
            <div className="panel-body">
                {articleTitles}
            </div>
        </div>
        );
    }
}

export default Result;

