var React = require("react");
var Search = require("./children/Search");
var Results = require("./children/Results");
var Saved = require("./children/Saved");
var helpers = require("./utils/helpers");

var Main = React.createClass({

  getInitialState: function () {
    return { searchTerm: "", results: [], saved: [] };
  },

  componentDidMount: function () {
    helpers.getSaved().then(function (response) {
      console.log(response);
      if (response !== this.state.saved) {
        console.log("Saved", response.data);
        this.setState({ saved: response.data });
      }
    }.bind(this));
  },

  componentDidUpdate: function () {
    helpers.runQuery(this.state.searchTerm).then(function (data) {
      if (data !== this.state.results) {
        console.log("Address", data);
        this.setState({ results: data });

        helpers.postsaved(this.state.searchTerm).then(function () {
          console.log("Updated!");

          helpers.getSaved().then(function (response) {
            console.log("Current saved", response.data);

            console.log("saved", response.data);

            this.setState({ saved: response.data });

          }.bind(this));
        }.bind(this));
      }
    }.bind(this));
  },
  setTerm: function (term) {
    this.setState({ searchTerm: term });
  },
  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
          </div>

          <div className="col-md-12">

            <Search setTerm={this.setTerm} />

          </div>

          <div className="col-md-12">

            <Results results={this.state.results} />

          </div>

          <div className="col-md-12">

            <Saved saved={this.state.saved} />

          </div>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
