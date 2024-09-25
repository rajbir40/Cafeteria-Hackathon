const mongoose = require('mongoose');
const { type } = require('os');

const itemSchema = new mongoose.Schema({
    item_title: {
        type: String,
        required: true,
    },
    item_type: {
        type: String,
        enum: ['veg', 'nonveg'],
        required: true,
    },
    item_price: {
        type: String,
        required: true,
    },
    item_offer: {
        type: String,
        default:"Currently No Offer Applicable!"
    },
    item_src: {
        type: String,
        required: true,
    },
    review: {
        type: Array,
        default: [],
        required: false,
    }
});

const Item = mongoose.model('item', itemSchema);

module.exports = Item;
