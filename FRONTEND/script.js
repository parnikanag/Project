const quizData = [
  { question: "Which activity excites you the most?", options: ["Coding", "Designing", "Teaching", "Writing", "Problem-solving"] },
  { question: "What do you value the most in your career?", options: ["High Salary", "Creativity", "Helping others", "Leadership", "Flexibility"] },
  { question: "Your favorite school subject?", options: ["Mathematics", "Science", "History", "Arts", "Computer Science"] },
  { question: "What type of projects do you like?", options: ["Building apps/websites", "Art and Graphics", "Research", "Business Models", "Story writing"] },
  { question: "Which environment do you prefer?", options: ["Corporate Office", "Remote Work", "Classroom", "Field Work", "Research Lab"] },
  { question: "What motivates you the most?", options: ["Recognition", "Helping Society", "Solving Complex Problems", "Innovation", "Money"] },
  { question: "Which skill would you like to master?", options: ["Programming", "Marketing", "Graphic Designing", "Content Writing", "Data Analysis"] },
  { question: "Your dream job involves:", options: ["Technology", "Art & Creativity", "Healthcare", "Business Management", "Social Work"] },
  { question: "Which tool would you prefer?", options: ["Python/Java", "Adobe Photoshop", "Excel/Power BI", "Camera/Mic", "Whiteboard & Marker"] },
  { question: "What's your ultimate career goal?", options: ["Start a Tech Company", "Become a Designer", "Be a Doctor/Scientist", "Be a Writer/Journalist", "Teach & Guide Students"] }
];

let currentIndex = 0;
let answers = [];

const quizContainer = document.getElementById('quiz-container');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

loadQuestion();

function loadQuestion() {
  const currentData = quizData[currentIndex];
  let html = `<div class="question"><h3>Q${currentIndex + 1}: ${currentData.question}</h3></div><div class="options">`;
  currentData.options.forEach(option => {
    html += `<label><input type="radio" name="option" value="${option}"> ${option}</label>`;
  });
  html += `</div>`;
  quizContainer.innerHTML = html;
}

function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) {
    alert("Please select an option");
    return;
  }
  answers.push(selected.value);
  currentIndex++;
  if (currentIndex < quizData.length) {
    loadQuestion();
  } else {
    nextBtn.classList.add('hidden');
    submitBtn.classList.remove('hidden');
  }
}

function submitQuiz() {
  fetch('http://localhost:5000/analyze_quiz', {  // Change URL to your backend
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers: answers })
  })
  .then(response => response.json())
  .then(data => showCareerResult(data))
  .catch(err => console.error('Error:', err));
}

function showCareerResult(data) {
  document.querySelector('.container').classList.add('hidden');
  document.getElementById('careerResult').innerHTML = `
    <h3>${data.title}</h3>
    <p><strong>Importance:</strong> ${data.importance}</p>
    <p><strong>Job Offers:</strong> ${data.jobs}</p>
    <p><strong>Expected Salary:</strong> ${data.salary}</p>
    <p><strong>Benefits:</strong> ${data.benefits}</p>
    <p><strong>Why Choose This Career?:</strong> ${data.why}</p>
  `;
  document.getElementById('result').classList.remove('hidden');
}

  