const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    saved: {
        type: Boolean,
        default: false,
    }
    // Comment: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Comment"
    // }]
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;