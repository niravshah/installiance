var nodemailer = require('nodemailer');
var sendinBlue = require('nodemailer-sendinblue-transport');
var transporter = nodemailer.createTransport(sendinBlue({ apiKey: 'G2KAWpcsxYUrakyB' }));

var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');
var templateDir = path.join(__dirname, 'templates', 'welcome-email');
var welcome = new EmailTemplate(templateDir);


module.exports = {

    registration: function (toEmail, token) {

        var locals = { token: token };

        welcome.render(locals, function (err, result) {

            if (err) {
                return console.error('Email Render Error:', err)
            }

            transporter.sendMail({
                from: '"Influence Ally"<info@influenceally.com>',
                subject: 'Activate Your Account',
                to: toEmail,
                html: result.html,
                text: result.text
            }, function (err, responseStatus) {
                if (err) {
                    return console.error(err)
                }
                console.log(responseStatus.message)
            })
        })

    }

};