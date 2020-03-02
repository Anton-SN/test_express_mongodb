const { Schema, model } = require('mongoose')

const schema = new Schema({
  Id: {
        type: String,
    },
	serviceName: {
        type: String,
        required: true,
    },
	targetUrl: {
        type: String,
        required: true,
    },
  price: {
        type: Number,
        required: true,
    },
  serviceActions: [
    {
      actionName: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      }
    }
  ]
})

module.exports = model('Order', schema)
