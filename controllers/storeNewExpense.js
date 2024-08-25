const expenseModel = require("../models/expenseModel");
const userModel = require("../models/userModel");
const moment = require('moment')

const storeNewExpense = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ userID: req.userID });
        if (existingUser) {
            const { category, description, date, type, reference, userID, amount } = req.body;
            const newUser = new expenseModel({
                userID,
                amount,
                type,
                category,
                date,
                reference,
                description
            });
            await newUser.save();
            res.status(200).send({
                success: true,
                message: "Data is stored"
            })
        }
        else {
            res.status(403).send({
                success: false,
                message: "NOT REGISTERED"
            })
        }
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Server Side. Contact devolper",
            error
        })
    }

}


const getExpenses = async (req, res) => {
    try {
        const { frequency, selectedDate, selectedType } = req.body;
        var existingData;
        if (frequency === 'all') {
            if (selectedType != 'All')
                existingData = await expenseModel.find({
                    userID: req.body.userID,
                    type: selectedType
                });
            else {
                existingData = await expenseModel.find({
                    userID: req.body.userID,
                });
            }
        }
        else if (frequency === 'custom') {
            if (selectedDate != null) {
                if (selectedType != 'All') {
                    existingData = await expenseModel.find({
                        date: {
                            $gte: selectedDate[0],
                            $lte: selectedDate[1],
                        },
                        userID: req.body.userID,
                        type: selectedType
                    });
                }
                else {
                    existingData = await expenseModel.find({
                        date: {
                            $gte: selectedDate[0],
                            $lte: selectedDate[1],
                        },
                        userID: req.body.userID,
                    });
                }
            }
            else {
                existingData = []
            }
        }
        else {
            if (selectedType != 'All') {
                existingData = await expenseModel.find({
                    date: {
                        $gt: moment().subtract(Number(frequency), 'd').toDate(),
                    },
                    userID: req.body.userID,
                    type: selectedType
                });
            }
            else {
                existingData = await expenseModel.find({
                    date: {
                        $gt: moment().subtract(Number(frequency), 'd').toDate(),
                    },
                    userID: req.body.userID,
                });
            }
        }

        res.status(200).send({
            success: true,
            existingData
        })

    } catch (error) {
        // console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in getExpense Function",
            error,
        })
    }
}

const updateTransaction = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ userID: req.userID });
        if (existingUser) {
            const { category, description, date, type, reference, amount, transactionId } = req.body;
            const updatedData = {
                amount,
                type,
                category,
                date,
                reference,
                description
            };
            await expenseModel.findOneAndUpdate(
                { _id: transactionId },
                updatedData
            )
            res.status(200).send({
                success: true,
                message: "Data is updated"
            })
        }
        else {
            res.status(400).send({
                success: false,
                message: "Not Updated"
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Backend.",
            error
        })
    }
}

const deleteTransaction = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ userID: req.userID });
        if (existingUser) {
            await expenseModel.deleteOne(
                { _id: req.body.transactionId }
            )
            res.status(200).send({
                success: true,
                message: "Data is Deleted"
            })
        }
        else {
            res.send({
                success: false,
                message: "Not Deleted"
            })
        }
    } catch (error) {
        // console.log(error);
        res.send({
            success: false,
            message: "Error in Backend. Contact devolper"
        })
    }
}

module.exports = { storeNewExpense, getExpenses, updateTransaction, deleteTransaction }