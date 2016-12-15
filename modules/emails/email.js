var nodemailer = require('nodemailer');
var sendinBlue = require('nodemailer-sendinblue-transport');
var transporter = nodemailer.createTransport(sendinBlue({ apiKey: 'G2KAWpcsxYUrakyB' }));

var EmailTemplate = require('email-templates').EmailTemplate;
var path = require('path');
var templateDir = path.join(__dirname, 'templates', 'welcome-email');
var welcome = new EmailTemplate(templateDir);

module.exports = {

    registration: function (toEmail, token, password) {

        var locals = { token: token, loginId: toEmail, password: password };

        welcome.render(locals, function (err, result) {

            if (err) {
                return console.error('Email Render Error:', err)
            }

            transporter.sendMail({
                from: '"Influence Ally"<info@influenceally.com>',
                subject: 'Confirm Email Address',
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