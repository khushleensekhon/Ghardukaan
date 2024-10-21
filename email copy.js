const sgMail = require('@sendgrid/mail')

const API_KEY =
'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'; 
sgMail.setApiKey(API_KEY)
const message = {
    to: 'sekhonkhushleen@gmail.com',
    from: 'khushleen2040.be23@chitkara.edu.in',
    subject: 'Hi ghardukaan users',
    text: 'hey',
    html: '<h1> hello <h1>'
};
sgMail.send(message)
.then((respose)=> console.log('Email sent'))
.catch((error) => console.log(error.message));