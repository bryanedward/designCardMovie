const quizData = [
    {
        question: '¿Qué estoy haciendo?',
        a: 'Durmiendo',
        b: 'Trabajando',
        c: 'Programando',
        correct: 'c'

    }, {
        question: 'what did u think about that?',
        a: 'java',
        b: 'phyton',
        c: 'javascript',
        correct: 'c'
    }, {
        question: 'who is the president us?',
        a: 'trump',
        b: 'ivan salvado',
        c: 'nothin',
        correct: 'a'
    }, {
        question: 'what year was javascript',
        a: '1996',
        b: '2020',
        c: 'none of the above',
        correct: 'c'
    }
];

const quiz = document.getElementById('quiz')
const question = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const submitBtn = document.getElementById('submit')
const answerEls = document.querySelectorAll('.answer')

let currentlyQuiz = 0;
let score = 0;

loadQuiz()

function loadQuiz() {
    deletedAnswers()
    const currentQuizData = quizData[currentlyQuiz]
    question.innerHTML = currentQuizData.question
    a_text.innerHTML = currentQuizData.a
    b_text.innerHTML = currentQuizData.b
    c_text.innerHTML = currentQuizData.c
}


function getSelected() {
    // comprobar y obtener la respuesta de la persona
    let answer = undefined;
    answerEls.forEach((item) => {
        // botener el id del formualario
        if (item.checked) {
            answer = item.id
        }
    })
    return answer
}


function deletedAnswers() {
    answerEls.forEach((item) => {
        item.checked = false
    })
}

submitBtn.addEventListener('click', () => {

    const answer = getSelected()

    if (answer === quizData[currentlyQuiz].correct) {
        // recorrer la posicion del json
        score++
    }
    currentlyQuiz++

    if (currentlyQuiz < quizData.length) {
        //comprobar si aun hay preguntas por mostrar
        loadQuiz()
    } else {
        quiz.innerHTML = `<h2>Tu respuests  ${score}/${quizData.length}</h2>
    <button onclick="location.reload()">Recargar pagina</button>
    `
    }


})