const mongoose = require('mongoose')

const numerySchema = new mongoose.Schema({
    numery: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Schema', numerySchema)