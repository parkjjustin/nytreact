import React, {Component} from 'react';
import Search from './children/Search.js';
import Result from './children/Result.js';
import Saved from './children/Saved.js';
import helpers from './utils/helpers.js';

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            query: '',
            begin: '',
            end: '',
            results: [],
            saved: []
        }
        this.setTerm = this.setTerm.bind(this);
        this.updateSaved = this.updateSaved.bind(this);
        this.addSaved = this.addSaved.bind(this);
        this._handleSave = this._handleSave.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
    }

    componentDidMount(){
        helpers.getArticles().then( (saved) => {
                let newArray = this.state.saved.slice();
                newArray = saved.data;
                this.setState({ saved: newArray });
            });
        
    }

    updateSaved(object){
        let array = this.state.saved;
        let index = array.findIndex(x => x.title == object.title);
        array.splice(index, 1);
        this.setState({saved: array});
    }

    addSaved(object){
        let array = this.state.saved;
        array.push(object);
        this.setState({saved: array});
    }

    setSearch(term, start, end){
        this.setState({
            topic: term,
            startYear: start,
            endYear: end
        });
    }

    _handleSave (event) {
        event.preventDefault();
        let object = {
            title: event.target.getAttribute('data-title'),
            link: event.target.getAttribute('data-link')
        }
        helpers.saveArticle(object);
        this.addSaved(object);
    }

    _handleDelete (event){
        event.preventDefault();;
        let object = {
            title: event.target.getAttribute('data-title'),
            link: event.target.getAttribute('data-link')
        }
        this.updateSaved(object);
        helpers.deleteArticle(object);
    }

    setTerm(queryTerm, beginTerm, endTerm){
        this.setState({
            query: queryTerm,
            begin: beginTerm,
            end: endTerm
        });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.query !== this.state.query || prevState.begin !== this.state.begin || prevState.end !== this.state.end) {
            helpers.runQuery(this.state.query, this.state.begin, this.state.end).then((data) => {
                if(data !== this.state.results){
                    console.log(data);
                    this.setState({
                        results: data
                    });
                }
            });
        }
        if(prevState.saved.length !== this.state.saved.length){
            helpers.getArticles().then( (saved) => {
                if(saved.data !== this.state.saved){
                    let newArray = this.state.saved.slice();
                    newArray = saved.data;
                    this.setState({ saved: newArray });
                }
            });
        }
    }
    
    render() {
        return (
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h1 className="text-center">New York Times Article Scrubber</h1>
                    <h3 className="text-center">Search for and annontate articles of interest!</h3>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Search setTerm={this.setTerm} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Result results={this.state.results} _handleSave={this._handleSave} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Saved savedArticles={this.state.saved} _handleDelete={this._handleDelete} />
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Main;