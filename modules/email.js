var nodemailer = require('nodemailer');
var sendinBlue = require('nodemailer-sendinblue-transport');
var transporter = nodemailer.createTransport(sendinBlue({ apiKey: 'G2KAWpcsxYUrakyB' }));

var regTemplate = transporter.templateSender({
    text: 'http://localhost:12000/user/email/verify/{{token}}',
    html: 'http://localhost:12000/user/email/verify/{{token}}'
}, {
    from: '"Influence Ally"<info@influenceally.com>',
    subject: 'Activate Your Account'
});

module.exports = {

    registration: function (toEmail, token) {

        regTemplate({
            to: toEmail
        }, {
            token: token
        }, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

    }

};