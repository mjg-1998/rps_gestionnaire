const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const characterSchema = new Schema( {
    name: {type: String,
    required: true,
    empty: false,
    trim: false},
    firstName: {
        type: String,
        required: true,
        empty: false,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        empty: false,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        empty: false,
        trim: true
    },
    status: {
        type: String,
        required: true,
        empty: false,
        trim: true
        ,
    title: {type: String,
        required: false,
        empty: true,
        trim: false},
    maritalStatus: {
        type: String,
        required: true,
        empty: false,
        trim: true}
    },
    spouse: {
        type: String,
        required: true,
        empty: false,
        trim: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },

    lastUpdate: {
        type: Date,
        default: Date.now
    }
});

characterSchema.pre('save', function (next) {
    this.lastUpdate = new Date();
    next();
});

mongoose.model('Character', characterSchema);