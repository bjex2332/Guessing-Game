const question = document.querySelector('#question');
const answers = Array.from(document.querySelectorAll('.answer-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const points = 100
const end = 8
let currentQ = {}
let answer = true
let score = 0
let questionCounter = 0
let questionNum = []

let questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answer1: 'Booleans',
        answer2: 'Alerts',
        answer3: 'Numbers',
        answer4: 'Strings',
        answer: 2,
    },
    {
        question: 'Arrays in JavaScript can be used to store ______',
        answer1: 'Other Arrays',
        answer2: 'Booleans',
        answer3: 'Numbers and Strings',
        answer4: 'All of the Above',
        answer: 4,
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:?',
        answer1: 'console.log',
        answer2: 'JavaScript',
        answer3: 'Terminal/Bash',
        answer4: 'For Loops',
        answer: 1,
    },
    {
        question: 'What are people who write computer code called?',
        answer1: 'Programmers',
        answer2: 'Cryptographers',
        answer3: 'Manufacturers',
        answer4: 'Professors',
        answer: 1,
    },
    {
        question: 'Which of the following is NOT a programming language?',
        answer1: 'C#',
        answer2: 'Banana',
        answer3: 'Python',
        answer4: 'React',
        answer: 2,
    },
    {
        question: 'Where is the correct place to insert a JavaScript in HTML page?',
        answer1: '<body>',
        answer2: '<title>',
        answer3: '<head> or <body>',
        answer4: '<head>',
        answer: 3,
    },
    {
        question: 'How can you add a comment in Javascript code?',
        answer1: '// example',
        answer2: "'example",
        answer3: '<!--example-->',
        answer4: '#example',
        answer: 1,
    },
    {
        question: 'What language defines the behavior of a web page?',
        answer1: 'CSS',
        answer2: 'JavaScript',
        answer3: 'HTML',
        answer4: 'React',
        answer: 2,
    },
    {
        question: 'How does a WHILE loop start in Javascript?',
        answer1: 'while (i <= 10, i++)',
        answer2: 'while i = 1 to 10',
        answer3: 'while = i++',
        answer4: 'while (i <= 10)',
        answer: 4,
    },
    {
        question: 'The condition in an if/else statement is enclosed within ______',
        answer1: 'Curly Brackets',
        answer2: 'Square Brackets',
        answer3: 'Parentheses',
        answer: 'Quotes',
        answer: 3,
    }
]



startGame = () => {
    questionCounter = 0
    score = 0
    questionNum = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(questionNum.length === 0 || questionCounter >= end) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${end}`
    progressBarFull.style.width = `${(questionCounter/end) * 100}%`

    const questionsIndex = Math.floor(Math.random() * questionNum.length)
    currentQ = questionNum[questionsIndex]
    question.innerText = currentQ.question

    answers.forEach(answer => {
        let number = answer.dataset['number']
        answer.innerText = currentQ['answer' + number]
    })
    questionNum.splice(questionsIndex, 1)

    answer = true
}

answers.forEach(answer => {
    answer.addEventListener('click', e=> {
        
        answer = false
        let choice = e.target
        let userAnswer = choice.dataset ['number']

        let correct = userAnswer == currentQ.answer ? 'correct' : 'incorrect'

        if (correct === 'correct') {
            upScore(points)
        }

        choice.parentElement.classList.add(correct)

        setTimeout(() => {
            choice.parentElement.classList.remove(correct)
            getNewQuestion()

        }, 1000)
    })
})

upScore = num => {
    score +=num
    scoreText.innerText = score
}
startGame()
