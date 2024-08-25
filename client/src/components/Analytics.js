import React from 'react'
import { Progress, Space } from 'antd';
import Graph from './Bar';


function Analytics({ data }) {

    if (!data || data.length === 0) {
        return <div className='container'><p>No Previous Record of selected Frequency is Available</p></div>;
    }

    // console.log("Data to analytics", data);


    const totalIncomeTransactions = data.reduce((acc, transaction,) => {
        if (transaction.type === 'Income') {
            acc++;
        }
        return acc;
    }, 0)
    const totalExpenseTransactions = data.reduce((acc, transaction,) => {
        if (transaction.type === 'Expense') {
            acc++;
        }
        return acc;
    }, 0)

    const totalIncome = data.reduce((acc, transaction) => {
        if (transaction.type === 'Income') {
            acc = acc + transaction.amount;
        }
        return acc;
    }, 0)

    const totalExpense = data.reduce((acc, transaction) => {
        if (transaction.type === 'Expense') {
            acc = acc + transaction.amount;
        }
        return acc;
    }, 0)
    // console.log(totalIncome);
    let remainingIncome = totalIncome - totalExpense;
    if (remainingIncome < 0) {
        remainingIncome = 0;
    }
    let incomePercentage;
    if (totalIncome === 0) {
        incomePercentage = 0;
    }
    else {
        incomePercentage = Math.round(((remainingIncome) / totalIncome) * 100);
    }
    let expensePercentage = Math.round((totalExpense / totalIncome) * 100);

    if (expensePercentage > 100) {
        expensePercentage = 100;
    }


    const receivedColor = { '0%': '#64ea91', '100%': '#64ea91' }; // Green for money received
    const spentColor = { '0%': '#f50', '100%': '#f50' };
    const totalTransaction = totalExpenseTransactions + totalIncomeTransactions;
    const percentageIncomeTransaction = Math.round((totalIncomeTransactions / totalTransaction) * 100);
    const percentageExpenseTransaction = Math.round((totalExpenseTransactions / totalTransaction) * 100);

    return (
        <>
            <div className='container charts'>
                <div className="card border-dark mb-3">
                    <div className="card-header">
                        <strong>Transactions Ratio</strong>
                    </div>
                    <div className="card-body text-dark graphCard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            Income Transactions: {totalIncomeTransactions}<br />
                            Expense Transactions: {totalExpenseTransactions}
                        </div>
                        <Space >
                            <Progress
                                type="dashboard"
                                percent={percentageIncomeTransaction}
                                strokeColor={receivedColor}
                                format={() => percentageIncomeTransaction + '%'}
                            />
                            <Progress
                                type="dashboard"
                                percent={percentageExpenseTransaction}
                                strokeColor={spentColor}
                                success={{ percent: 0, strokeColor: spentColor }}
                                format={() => percentageExpenseTransaction + '%'}
                            />
                        </Space>
                    </div>
                </div>
                <div className="card border-dark mb-3" >
                    <div className="card-header">
                        <strong>Total Turnover: {totalIncome}</strong>
                    </div>
                    <div className="card-body text-dark graphCard" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            Income: {remainingIncome}<br />
                            Expense: {totalExpense}
                        </div>
                        <Space >
                            <Progress
                                type="dashboard"
                                percent={incomePercentage}
                                strokeColor={receivedColor}
                                format={() => incomePercentage + '%'}
                            />
                            <Progress
                                type="dashboard"
                                percent={expensePercentage}
                                strokeColor={spentColor}
                                success={{ percent: 0, strokeColor: spentColor }}
                                format={() => expensePercentage + '%'}
                            />
                        </Space>
                    </div>
                </div>
            </div>
            <div className='container'>
                <Graph data={data} />
            </div>
        </>

    );

}

export default Analytics