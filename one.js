const express = require('express');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

// Set your SendGrid API Key
const API_KEY = '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';
sgMail.setApiKey(API_KEY);

const app = express();
app.use(bodyParser.json());

// Handle POST request to send email
app.post('/send-email', (req, res) => {
    const { name, email, answers } = req.body;

    // Customize email content based on quiz answers
    const emailContent = `
        Hi ${name},

        Thank you for completing the quiz!
        Here are your answers:
        1. ${answers[0]}
        2. ${answers[1]}
        3. ${answers[2]}
        4. ${answers[3]}

        Regards,
        GharDukaan Team
    `;

    const message = {
        to: email,
        from: 'khushleen2040.be23@chitkara.edu.in',  // Replace with your verified sender email
        subject: 'Hi GharDukaan users!',
        text: emailContent,
        html: `<p>${emailContent.replace(/\n/g, '<br>')}</p>`
    };

    // Send the email
    sgMail.send(message)
        .then(() => {
            res.status(200).json({ message: 'Email sent successfully!' });
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email', error: error.message });
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
