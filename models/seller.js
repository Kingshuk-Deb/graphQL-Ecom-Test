const mongoose = require('mongoose');
const shortId = require('shortid');

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    sellerId : {
        type: String,
        required: true,
        default: shortId.generate
    },
    sellerName: {
        type: String,
        required: true
    },
    products: {
        type: [{
            productId : {
                type: String,
                required: true
            },
            name : {
                type: String,
                required: true
            },
            price: Number
        }],
    }
});

const Sellers = mongoose.model("seller", sellerSchema);

module.exports = Sellers;