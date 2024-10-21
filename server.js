const express = require('express');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set your SendGrid API key
const API_KEY = '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';
sgMail.setApiKey(API_KEY);

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Endpoint to send email
app.post('/send-email', (req, res) => {
  const { name, email, answers } = req.body;

  const message = {
    to: 'sekhonkhushleen@gmail.com',
    from: 'khushleen2040.be23@chitkara.edu.in',
    subject: 'Your Quiz Results',
    html: `
      <h1>Quiz Results</h1>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <h2>Answers:</h2>
      <ul>
        ${answers.map((answer, index) => `<li>Question ${index + 1}: ${answer}</li>`).join('')}
      </ul>
    `
  };

  sgMail.send(message)
    .then(() => {
      console.log('Email sent');
      res.json({ success: true, message: 'Email sent successfully' });
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Error sending email' });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
