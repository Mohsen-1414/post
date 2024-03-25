const nodemailer = require('nodemailer');

let mailTransporter =
    nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'sm.shafaei@gmail.com',
                pass: 'infe emve egyb jzcz'
            }
        }
    );
 
    let mailDetails = {
        from: 'sm.shafaei@gmail.com',
        to: 'mohsen.shafaei@yahoo.com',
        subject: 'Test mail',
        text: 'Testing to see if it works, yo hahaha '
    };


    module.exports = {mailTransporter, mailDetails};