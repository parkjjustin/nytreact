import React, {Component} from 'react';
import SavedArticle from './SavedArticle.js'

class Saved extends Component {
    render(){
        let articleTitles = this.props.savedArticles
            .map((item, index) =>{
            return <SavedArticle _handleDelete={ this.props._handleDelete} key={index} title={item.title} link={item.link} /> });
        
        return (
            <div className='panel panel-info'>
                <div className='panel-heading'>
                    <h3 className='panel-title'>Saved Articles</h3>
                </div>
                <div className='panel-body'>
                    {articleTitles}
                </div>
            </div>
        );
    }
}

export default Saved;