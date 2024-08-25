const express = require('express');
const { storeNewExpense, getExpenses, updateTransaction, deleteTransaction } = require('./../controllers/storeNewExpense');
const authToken = require('../middlewares/authToken');
const { registerationController, loginController, testingback, } = require('../controllers/registerAndLogin');
const routes = express.Router();

routes.post('/login', loginController)

routes.post('/login/testing', testingback)

routes.post('/signup', registerationController)

routes.post('/storeNewExpense', authToken, storeNewExpense);

routes.post('/getExpenses', authToken, getExpenses);

routes.post('/updateTransaction', authToken, updateTransaction);

routes.post('/deleteTransaction', authToken, deleteTransaction);

module.exports = routes;