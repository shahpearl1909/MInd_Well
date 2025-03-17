const quizzes = {
    stress: {
        title: "What's Your Stress Management Style?",
        questions: [
            { question: "When faced with a stressful situation, I typically:", options: ["Take immediate action", "Step back and analyze", "Seek support from others", "Try to avoid thinking about it"] },
            { question: "My preferred way to unwind after a stressful day is:", options: ["Exercise", "Meditation", "Talking with friends", "Entertainment"] },
            { question: "When dealing with work pressure, I usually:", options: ["Create a plan", "Take breaks", "Collaborate with others", "Work until done"] },
            { question: "How do you recharge after a stressful day?", options: ["Spending time with friends or family", "Engaging in hobbies or creative activities", "Sleeping or resting", "Watching TV or browsing social media"] },
            { question: "How well do you manage your time when feeling stressed?", options: ["I stick to a schedule and prioritize tasks", "I get easily distracted and struggle to focus", "I try to work faster, even if it’s not efficient", "I procrastinate until the pressure becomes unbearable"] },
            { question: "What’s your typical response when you feel emotionally overwhelmed?", options: ["I talk to someone I trust about my feelings", "I keep my emotions to myself", "I channel my emotions into creative outlets", "I engage in physical activities to release tension"] },
            { question: "How do you typically respond to criticism?", options: ["I take it as constructive feedback", "I feel defensive and upset", "I try to ignore it", "I reflect on it to improve myself"] },
            { question: "How well do you balance work, personal life, and self-care?", options: ["I maintain a healthy balance", "I struggle to find balance", "I focus more on work than personal life", "I focus more on personal life than work"] }
        ]
    },
    emotional: {
        title: "Understanding Your Emotional Intelligence",
        questions: [
            { question: "When someone is upset, I typically:", options: ["Try to understand their perspective", "Offer solutions", "Give them space", "Feel uncomfortable"] },
            { question: "When I'm feeling strong emotions, I:", options: ["Can name the emotions", "Feel overwhelmed", "Try to suppress", "Express immediately"] },
            { question: "In group situations, I:", options: ["Read the mood", "Focus on tasks", "Adapt behavior", "Stick to my way"] },
            { question: "When facing conflict, I usually:", options: ["Find a win-win solution", "Stand firm", "Seek compromise", "Avoid it"] },
            { question: "My response to feedback is:", options: ["Welcome it", "Analyze it", "Take it personally", "Avoid it"] },
            { question: "How well do you empathize with others?", options: ["Very well", "Moderately", "Rarely", "Not at all"] },
            { question: "How do you manage your own emotions?", options: ["I recognize and control them", "I try to ignore them", "I react impulsively", "I find it hard to manage them"] },
            { question: "How do you respond when others praise you?", options: ["I accept it graciously", "I feel shy but appreciate it", "I feel uncomfortable", "I deflect the praise"] }
        ]
    },
    selfcare: {
        title: "Self-Care Assessment",
        questions: [
            { question: "How often do you engage in activities for enjoyment?", options: ["Daily", "A few times a week", "Occasionally", "Rarely"] },
            { question: "When was the last time you took a full day to rest?", options: ["Last week", "Last month", "A few months ago", "Can't remember"] },
            { question: "How would you rate your sleep habits?", options: ["Consistent and refreshing", "Generally good", "Irregular", "Poor"] },
            { question: "How do you prioritize personal needs?", options: ["Top priority", "Balance", "Occasionally", "Neglect"] },
            { question: "How do you maintain work-life balance?", options: ["Strict boundaries", "Flexible balance", "Struggle", "Work priority"] },
            { question: "How often do you take time off from work?", options: ["Regularly", "When needed", "Rarely", "Never"] },
            { question: "How would you rate your ability to say no when overwhelmed?", options: ["Very good", "Sometimes", "Rarely", "Not at all"] },
            { question: "Do you make time for regular physical activity?", options: ["Yes, regularly", "Occasionally", "Not often", "Never"] }
        ]
    },
    mindfulness: {
        title: "Mindfulness Assessment",
        questions: [
            { question: "How often do you practice mindfulness or meditation?", options: ["Daily", "A few times a week", "Occasionally", "Rarely"] },
            { question: "When feeling stressed, I usually:", options: ["Take a few deep breaths", "Try to distract myself", "Avoid thinking about it", "Get busy with tasks"] },
            { question: "I find it easy to focus on the present moment:", options: ["Yes, always", "Most of the time", "Sometimes", "Rarely"] },
            { question: "When I'm experiencing a difficult emotion, I:", options: ["Sit with the feeling and observe it", "Try to push it away", "Distract myself", "Ignore it and continue"] },
            { question: "How often do you take time to reflect on your thoughts?", options: ["Daily", "A few times a week", "Occasionally", "Rarely"] },
            { question: "When something unexpected happens, I:", options: ["Pause and take a deep breath", "React immediately", "Get frustrated", "Try to ignore it"] },
            { question: "I practice gratitude:", options: ["Daily", "Occasionally", "Sometimes", "Never"] },
            { question: "How comfortable are you with silence or stillness?", options: ["Very comfortable", "Somewhat comfortable", "Uncomfortable", "Very uncomfortable"] }
        ]
    }
};

const modal = document.getElementById('quizModal');
const quizContent = document.getElementById('quizContent');
const timerDisplay = document.getElementById('timer');
const progressBar = document.getElementById('progress');
const currentQuestionDisplay = document.getElementById('current');
const totalQuestionsDisplay = document.getElementById('total');
const percentDisplay = document.getElementById('percent');
const notification = document.getElementById('notification');
let currentQuiz = null;
let currentQuestionIndex = 0;
let answers = [];
let timer = null;
let timeRemaining = 300; // 5 minutes


// Add event listener to all quiz start buttons
document.querySelectorAll('.start-quiz').forEach(button => {
    button.addEventListener('click', () => {
        const quizType = button.closest('.quiz-card').dataset.quiz;
        startQuiz(quizType);
    });
});


// Close modal
document.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
    clearInterval(timer);
    timeRemaining = 300;
    notification.style.display = 'none';
});

// Update progress bar
function updateProgressBar() {
    const progress = (currentQuestionIndex / quizzes[currentQuiz].questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    percentDisplay.textContent = Math.round(progress);
    currentQuestionDisplay.textContent = currentQuestionIndex + 1;
}

// Start Timer
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 60) {
            notification.style.display = 'block';
        }

        if (timeRemaining <= 0) {
            clearInterval(timer);
            showResults();
        }
    }, 1000);
}

// Update Timer Display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Extend Timer
document.querySelector('.extend-time').addEventListener('click', () => {
    timeRemaining += 300; // Add 5 minutes
    notification.style.display = 'none';
    updateTimerDisplay();
});

// Start quiz
function startQuiz(quizType) {
    currentQuiz = quizType;
    currentQuestionIndex = 0;
    answers = [];
    showQuestion();
    modal.style.display = 'block';
    startTimer();
    totalQuestionsDisplay.textContent = quizzes[quizType].questions.length;
    updateProgressBar();
}

// Show question
function showQuestion() {
    const quiz = quizzes[currentQuiz];
    const question = quiz.questions[currentQuestionIndex];

    quizContent.innerHTML = `
        <h2>${quiz.title}</h2>
        <div class="quiz-question">
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <label class="quiz-option">
                        <input type="radio" name="answer" value="${index}">
                        <span class="radio-custom"></span>
                        <span class="option-text">${option}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;

    // Update progress bar after showing the question
    updateProgressBar();
}

// Next question
document.querySelector('.next-question').addEventListener('click', () => {
    const selectedAnswer = quizContent.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        answers.push(parseInt(selectedAnswer.value)); // Capture the selected answer as an integer

        if (currentQuestionIndex < quizzes[currentQuiz].questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(); // Display the next question
        } else {
            // Last question reached, show results
            progressBar.style.width = '100%';
            percentDisplay.textContent = '100';
            showResults(); // Display results after the last question
        }
    } else {
        alert('Please select an answer before continuing.');
    }
});

// Previous question
document.querySelector('.prev-question').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});

// Resize handling: ensure modal adjusts to screen size
window.addEventListener('resize', () => {
    if (modal.style.display === 'block') {
        updateProgressBar(); // Ensure progress bar updates on screen size change
    }
});

// Show results
function showResults() {
    clearInterval(timer); // Stop the timer
    notification.style.display = 'none'; // Hide the notification
    // Define the result messages for each quiz
    const resultMessages = {
        stress: [
            "You are proactive in managing stress.",
            "You analyze stress carefully.",
            "You prefer social support.",
            "You might need active coping strategies."
        ],
        emotional: [
            "You have strong emotional intelligence.",
            "You are thoughtful with emotions.",
            "You are adaptable in social situations.",
            "You may benefit from more emotional awareness."
        ],
        selfcare: [
            "You prioritize self-care well.",
            "You balance self-care and responsibilities.",
            "You may need more regular self-care.",
            "Consider making self-care a priority."
        ],
        mindfulness: [
            "You are generally open to exploring new ways of managing stress and balancing your life.",
            "You find strategies that work for you but might sometimes feel the need to adjust or seek new approaches.",
            "You may occasionally neglect your well-being when life becomes hectic, but you try to manage your stress effectively.",
            "Consider setting aside more time for self-care and exploring new stress management techniques."
        ]
    };

    // Calculate the most common answer
    const answerCounts = {};
    answers.forEach((answer) => {
        answerCounts[answer] = (answerCounts[answer] || 0) + 1;
    });

    // Find the answer with the highest count
    const mostCommonAnswer = Object.keys(answerCounts).reduce((a, b) =>
        answerCounts[a] > answerCounts[b] ? a : b
    );

    // Convert mostCommonAnswer to integer for array access
    const resultMessagesForQuiz = resultMessages[currentQuiz];
    const index = parseInt(mostCommonAnswer); // Make sure we are working with a valid index

    // Check if mostCommonAnswer is within bounds
    if (index >= 0 && index < resultMessagesForQuiz.length) {
        const resultMessage = resultMessagesForQuiz[index];
        quizContent.innerHTML = `
            <h2>Your Results</h2>
            <div class="result-card">
                <p>${resultMessage}</p>
            </div>
            <button class="btn-primary" onclick="closeQuiz()">Done</button> <!-- Done button -->
        `;
        modal.style.display = 'block'; // Show the result modal

        // Hide the Next button and display the Done button
        document.querySelector('.next-question').style.display = 'none'; // Hide Next button on results page
        document.querySelector('.prev-question').style.display = 'none'; // Hide Previous button on results page
    } else {
        console.error(`Invalid result index: ${index}`);
        quizContent.innerHTML = `<h2>Error: Invalid result index.</h2>`;
    }
}

function closeQuiz() {
    modal.style.display = 'none'; // Hide the modal
    answers = []; // Clear answers for the next quiz
    currentQuiz = null; // Reset current quiz
    currentQuestionIndex = 0; // Reset question index
    timeRemaining = 300; // Reset timer to 5 minutes
    updateTimerDisplay(); // Reset timer display
    document.querySelector('.next-question').style.display = 'inline-block'; // Make Next button visible again for next quiz
    document.querySelector('.prev-question').style.display = 'inline-block'; // Make Previous button visible again for next quiz
}
