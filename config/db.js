const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGO_URL);
        console.log("HOSTED BY" + response.connection.host);
    }
    catch (error) {
        // console.log(error);
    }
}

module.exports = dbConnect;