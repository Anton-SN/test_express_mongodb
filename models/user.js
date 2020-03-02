const { Schema, model } = require('mongoose')

const schema = new Schema({
    Id: {
        type: String,
    },
	firstName: {
        type: String,
        required: true,
    },
	lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    orders: {
        type: Array,
    }

})

module.exports = model('User', schema)
