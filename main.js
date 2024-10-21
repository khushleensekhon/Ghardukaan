let people = document.getElementById('people');
let people_less = document.getElementById('people_less');
let people_more = document.getElementById('people_more');

let people_index = 4;

people_less.addEventListener('click', (event) => {
    event.preventDefault(); // Prevents the form submission
    people_index -= 1;

    if (people_index <= 0) {
        people_index = 1;
    }
    people.value = people_index + ' People';
});

people_more.addEventListener('click', (event) => {
    event.preventDefault(); // Prevents the form submission
    people_index += 1;

    if (people_index < 4) {
        people_index = 4;
    }
    people.value = people_index + ' People';
});

var currentQuestion = 1;
  var totalQuestions = 4;
  var userAnswers = [];
  var userName = '';
  var userEmail = '';

  // Function to start the quiz after entering name and email
  function startQuiz() {
    userName = document.getElementById('name').value;
    userEmail = document.getElementById('email').value;

    if (userName && userEmail) {
      // Hide the name and email form
      document.getElementById('nameEmailForm').style.display = 'none';

      // Show the first question
      document.getElementById('question1').style.display = 'block';

      // Update progress bar and percentage
      updateProgressBar();
    } else {
      alert("Please enter both your name and email.");
    }
  }

  // Function to handle moving to the next question
  function nextQuestion(questionNumber, answer) {
    userAnswers[questionNumber - 1] = answer;

    // Hide the current question
    document.getElementById('question' + questionNumber).style.display = 'none';

    // Show the next question or result
    if (questionNumber < totalQuestions) {
      document.getElementById('question' + (questionNumber + 1)).style.display = 'block';
    } else {
      showResult();
    }

    // Update progress bar and percentage
    currentQuestion++;
    updateProgressBar();
  }

  // Function to update the progress bar and percentage
  function updateProgressBar() {
    var progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').innerHTML = Math.round(progress) + '%';
  }

  // Function to show the result with personalized message
  function showResult() {
    document.getElementById('result').style.display = 'block';
    document.getElementById('progressBar').style.width = '100%';
    document.getElementById('progressText').innerHTML = '100%';

    // Display personalized message
    var message = `Hi ${userName}!, You have received an email on ${userEmail}.`;
    document.getElementById('personalizedMessage').innerHTML = message;

    // Prepare quiz data
    const quizData = {
      name: userName,
      email: userEmail,
      answers: userAnswers
    };

    // Send email using server-side API
    fetch('/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quizData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Email sent successfully:', data);
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });
  }

  // Function to restart the quiz
  function restartQuiz() {
    // Reset variables
    currentQuestion = 1;
    userAnswers = [];
    userName = '';
    userEmail = '';

    // Hide result and show name and email form
    document.getElementById('result').style.display = 'none';
    document.getElementById('nameEmailForm').style.display = 'block';

    // Reset progress bar and percentage
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('progressText').innerHTML = '0%';
  }

// let userName = '';
// let userEmail = '';
// let userAnswers = [];

// function showResult() {
//     document.getElementById('result').style.display = 'block';
//     document.getElementById('progressBar').style.width = '100%';
//     document.getElementById('progressText').innerHTML = '100%';

//     const message = `Hi ${userName}!, You have received an email on ${userEmail}.`;
//     document.getElementById('personalizedMessage').innerHTML = message;

//     const quizData = {
//         name: userName,
//         email: userEmail,
//         answers: userAnswers
//     };

//     fetch('/send-email', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(quizData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Email sent successfully:', data);
//     })
//     .catch(error => {
//         console.error('Error sending email:', error);
//     });
// }



// const image= [
//     "url(https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg)no-repeat center/cover",
//     "url(hthttps://i.pinimg.com/550x/fc/07/40/fc0740d7c26d93974e117cb88a81bc36.jpg)no-repeat center/cover",
//     "url(https://static8.depositphotos.com/1029202/1008/i/450/depositphotos_10085041-stock-photo-new-houses.jpg)no-repeat center/cover"
// ]
// let index = 1;
// let h6 = document.getElementById('h6');

// h6.innertext = "+" +images.length;

// let btn_left= document.getElementById('btn_left');
// let btn_right= document.getElementById('btn_right');
// let style = document.getElementsByClassName('content')[0].style;

// btn_left.addEventListener('click', ()=> {
//     index -= 1;
//     if (index < 0){
//         index = (images.length) -1;
//     }
//     style.setProperty('--background', images[index])

// })

// btn_right.addEventListener('click', ()=> {
//     index ++
//     if (index > (images.length)-1){
//         index = 0;
//     }
//     style.setProperty('--background', images[index])

// })

// Array of background image URLs
const images = [
    "url(https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyaminmellish-186077.jpg&fm=jpg) no-repeat center/cover",
    "url(https://i.pinimg.com/550x/fc/07/40/fc0740d7c26d93974e117cb88a81bc36.jpg) no-repeat center/cover",
    "url(https://static8.depositphotos.com/1029202/1008/i/450/depositphotos_10085041-stock-photo-new-houses.jpg) no-repeat center/cover"
];

// Start at index 1
let index = 1;

// Get elements
let h6 = document.getElementById('h6');
let btn_left = document.getElementById('btn_left');
let btn_right = document.getElementById('btn_right');
let contentDiv = document.getElementsByClassName('content')[0];

// Display the number of images
h6.innerText = "+" + images.length;

// Function to update the background image
function updateBackground() {
    contentDiv.style.background = images[index];
}

// Event listener for the left button
btn_left.addEventListener('click', () => {
    index -= 1;
    if (index < 0) {
        index = images.length - 1;
    }
    updateBackground();
});

// Event listener for the right button
btn_right.addEventListener('click', () => {
    index += 1;
    if (index > images.length - 1) {
        index = 0;
    }
    updateBackground();
});

// Set the initial background image
updateBackground();

// Add this at the top of your file
const sgMail = require('@sendgrid/mail');
const API_KEY = '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';
sgMail.setApiKey(API_KEY);


