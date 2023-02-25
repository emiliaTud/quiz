const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question:'What is 11 x 11?',
        choice1:'120',
        choice2:'121',
        choice3:'22',
        choice4:'122',
        answer:2,
    },
    {
        question:'What is the value of  Pi?',
        choice1:'4.15',
        choice2:'4',
        choice3:'3.15',
        choice4:'2.5',
        answer:3,
    },
    {
        question:'What is √64?',
        choice1:'8',
        choice2:'3',
        choice3:'7',
        choice4:'6',
        answer:1,
    },
    {
        question:'What is 45+45?',
        choice1:'100',
        choice2:'80',
        choice3:'99',
        choice4:'90',
        answer:4,
    }
]
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
return window.location.assign('end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
const questionIndex = Math.floor(Math.random() * availableQuestions.length)
currentQuestion = availableQuestions[questionIndex];
question.innerText= currentQuestion.question;

choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice'+ number]
})
availableQuestions.splice(questionIndex, 1)
acceptingAnswers = true;
}
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()
        }, 1000)
    })
})
 incrementScore = num => {
    score +=num
    scoreText.innerText = score;
 }
 startGame()