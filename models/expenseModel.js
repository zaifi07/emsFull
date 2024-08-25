const mongoose = require('mongoose');

const emsExpenseSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        required: true,
    },

    reference: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    }

});


const expenseModel = mongoose.model('ems_expense', emsExpenseSchema);

module.exports = expenseModel;
