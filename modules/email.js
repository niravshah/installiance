var nodemailer = require('nodemailer');
var sendinBlue = require('nodemailer-sendinblue-transport');
var transporter = nodemailer.createTransport(sendinBlue({ apiKey: 'G2KAWpcsxYUrakyB' }));

module.exports = {

    registration: function (toEmail) {
        var mailOptions = {
            from: 'info@influenceally.com',
            to: toEmail,
            subject: 'Hello ✔',
            text: 'Hello world 🐴',
            html: '<b>Hello world 🐴</b>'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }

};