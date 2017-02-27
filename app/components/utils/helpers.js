// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
let nytAPI = "75f1703cbd654d6f9a247ecc79daa926",
  page = 1;

let helpers = {
  runQuery: (search, begin, end) => {
    let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${nytAPI}&q=${search}&begin_date=${begin}&end_date=${end}&page=${page}`;
    return axios.get(queryURL).then((response) => {
      let results = [];

      for (var i = 0, x = response.data.response.docs.length; i < x; i++) {
        let object = {
          title: response.data.response.docs[i].headline.main,
          link: response.data.response.docs[i].web_url
        };
        results.push(object);
      }
      return results;
    });
  },


  getSaved: function () {
    return axios.get("/api/saved");
  },


  postHistory: function (query) {
    return axios.post("/api/saved", { title: query });
  }
};

// We export the API helper
module.exports = helpers;
