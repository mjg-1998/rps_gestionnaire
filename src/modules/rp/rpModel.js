const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rpSchema = new Schema( {
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character'
    },
    title: {type: String,
        required: true,
        empty: false,
        trim: false},
partner: {
    type: String,
    required: true,
    empty: false,
    trim: false
},
    number: {
        type: Number,
        default: 0
    },
    status: {
      type: String,
        required: true,
        empty: false,
        trim: false
    },
    summary: {
        type: String,
        required: true,
        empty: true,
        trim: false
    },
    lastPost: {
        type: Date,
        default: Date.now,
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

rpSchema.pre('save', function (next) {
    this.lastUpdate = new Date();
    next();
});

mongoose.model('RP', rpSchema);