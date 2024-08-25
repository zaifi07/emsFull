const nodemailer = require('nodemailer');


function generateRandom6DigitNumber() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



const emailVerification = (userEmail) => {
    const otp = generateRandom6DigitNumber();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zaifijunaid@gmail.com',
            pass: 'izbi iqjh rkpe dfgh'
        }
    });

    const mailOptions = {
        from: 'zaifijunaid@gmail.com',
        to: userEmail,
        subject: "Account Verification",
        html: `<p>Your otp is <b>${otp}</b>. Enter this otp to Verify</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // console.error('Error sending email:', error);
        } else {
            // console.log('Email sent:', info.response);
        }
    });


    return otp;
}
module.exports = { emailVerification };