import React from "react";
import { Chart } from "react-google-charts";

function calculation(data) {

    // console.log("From Bar", data);
    const rec = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    /*
    0 for income
    1 for tip -15
    2 for Project-16
    3 - found-17
    4-food-18
    5-medical-19
    6-tax-20
    7-fee-21
    8-party-22
    9-game-zone-23
    10-rent-24
    11-gift-25
    12-lost-26
    13-other-27
    */
    if (!data || data.length === 0) {
        return rec;
    }
    data.forEach(element => {
        if (element.category === 'Income' && element.type === 'Income') {
            rec[0] = rec[0] + element.amount;
        }
        else if (element.category === 'Tip' && element.type === 'Income') {
            rec[1] = rec[1] + element.amount;
        }
        else if (element.category === 'Project' && element.type === 'Income') {
            rec[2] = rec[2] + element.amount;
        }
        else if (element.category === 'Found' && element.type === 'Income') {
            rec[3] = rec[3] + element.amount;
        }
        else if (element.category === 'Food' && element.type === 'Income') {
            rec[4] = rec[4] + element.amount;
        }
        else if (element.category === 'Medical' && element.type === 'Income') {
            rec[5] = rec[5] + element.amount;
        }
        else if (element.category === 'Tax' && element.type === 'Income') {
            rec[6] = rec[6] + element.amount;
        }
        else if (element.category === 'Fee' && element.type === 'Income') {
            rec[7] = rec[7] + element.amount;
        }
        else if (element.category === 'Party' && element.type === 'Income') {
            rec[8] = rec[8] + element.amount;
        }
        else if (element.category === 'Game' && element.type === 'Income') {
            rec[9] = rec[9] + element.amount;
        }
        else if (element.category === 'Rent' && element.type === 'Income') {
            rec[10] = rec[10] + element.amount;
        }
        else if (element.category === 'Gift' && element.type === 'Income') {
            rec[11] = rec[11] + element.amount;
        }
        else if (element.category === 'Lost' && element.type === 'Income') {
            rec[12] = rec[12] + element.amount;
        }
        else if (element.category === 'Other' && element.type === 'Income') {
            rec[13] = rec[13] + element.amount;
        }
        else if (element.category === 'Tip' && element.type === 'Expense') {
            rec[15] = rec[15] + element.amount;
        }
        else if (element.category === 'Project' && element.type === 'Expense') {
            rec[16] = rec[16] + element.amount;
        }
        else if (element.category === 'Found' && element.type === 'Expense') {
            rec[17] = rec[17] + element.amount;
        }
        else if (element.category === 'Food' && element.type === 'Expense') {
            rec[18] = rec[18] + element.amount;
        }
        else if (element.category === 'Medical' && element.type === 'Expense') {
            rec[19] = rec[19] + element.amount;
        }
        else if (element.category === 'Tax' && element.type === 'Expense') {
            rec[20] = rec[20] + element.amount;
        }
        else if (element.category === 'Fee' && element.type === 'Expense') {
            rec[21] = rec[21] + element.amount;
        }
        else if (element.category === 'Party' && element.type === 'Expense') {
            rec[22] = rec[22] + element.amount;
        }
        else if (element.category === 'Game' && element.type === 'Expense') {
            rec[23] = rec[23] + element.amount;
        }
        else if (element.category === 'Rent' && element.type === 'Expense') {
            rec[24] = rec[24] + element.amount;
        }
        else if (element.category === 'Gift' && element.type === 'Expense') {
            rec[25] = rec[25] + element.amount;
        }
        else if (element.category === 'Lost' && element.type === 'Expense') {
            rec[26] = rec[26] + element.amount;
        }
        else if (element.category === 'Other' && element.type === 'Expense') {
            rec[27] = rec[27] + element.amount;
        }
    });

    return rec;

}

const Graph = ({ data }) => {
    const updatedRecord = calculation(data);

    // console.log(updatedRecord);

    const record = [
        ['Source', 'Income', 'Expense'],
        ['Income', updatedRecord[0], updatedRecord[14]],
        ['Tip', updatedRecord[1], updatedRecord[15]],
        ['Project', updatedRecord[2], updatedRecord[16]],
        ['Food', updatedRecord[4], updatedRecord[18]],
        ['Medical', updatedRecord[5], updatedRecord[19]],
        ['Tax', updatedRecord[6], updatedRecord[20]],
        ['Fee', updatedRecord[7], updatedRecord[21]],
        ['Party', updatedRecord[8], updatedRecord[22]],
        ['Game', updatedRecord[9], updatedRecord[23]],
        ['Rent', updatedRecord[10], updatedRecord[24]],
        ['Gift', updatedRecord[11], updatedRecord[25]],
        ['Lost', updatedRecord[12], updatedRecord[26]],
        ['Found', updatedRecord[3], updatedRecord[17]],
        ['Other', updatedRecord[13], updatedRecord[27]]
    ]
    const option = {
        title: "Income Breakdown and Expense Distribution",
        hAxis: {
            title: "Money",
            minValue: 0,
        },
        vAxis: {
            title: "Source",
        },
    };


    function updateChartAreaWidth() {
        if (window.innerWidth >= 700) {
            option.chartArea = { width: "75%" };
        } else {
            option.chartArea = { width: "50%" };
        }
    }

    updateChartAreaWidth();
    window.addEventListener("resize", updateChartAreaWidth);
    return (
        <div style={{ display: 'flex' }}>
            <Chart
                chartType="BarChart"
                data={record}
                options={option}
                width='100%'
                height='500px'
            />
        </div>
    )
}

export default Graph;