// ==============================
// MODO ESCURO
// ==============================

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const darkMode = document.body.classList.contains("dark");

    themeButton.textContent = darkMode ? "☀️" : "🌙";

    localStorage.setItem("darkMode", darkMode);
});

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀️";
}


// ==============================
// FILTRO DOS DILEMAS
// ==============================

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const selectedCategory = filter.dataset.filter;

        cards.forEach(card => {

            const cardCategory = card.dataset.category;

            if (
                selectedCategory === "todos" ||
                selectedCategory === cardCategory
            ) {
                card.classList.remove("hidden-card");
            } else {
                card.classList.add("hidden-card");
            }

        });

    });

});


// ==============================
// MODAL DE SOLUÇÕES
// ==============================

const modal = document.getElementById("solutionModal");
const modalTitle = document.getElementById("modalTitle");
const modalSolution = document.getElementById("modalSolution");

const closeModal = document.getElementById("closeModal");
const modalCloseButton = document.getElementById("modalCloseButton");

const solutionButtons = document.querySelectorAll(".solution-button");

solutionButtons.forEach(button => {

    button.addEventListener("click", () => {

        modalTitle.textContent = button.dataset.title;
        modalSolution.textContent = button.dataset.solution;

        modal.classList.remove("hidden");

    });

});

function closeSolutionModal() {
    modal.classList.add("hidden");
}

closeModal.addEventListener("click", closeSolutionModal);
modalCloseButton.addEventListener("click", closeSolutionModal);

modal.addEventListener("click", event => {

    if (event.target === modal) {
        closeSolutionModal();
    }

});


// ==============================
// QUIZ
// ==============================

const questions = [

    {
        question: "Qual é uma boa prática para proteger suas contas?",
        answers: [
            "Usar a mesma senha em todos os sites",
            "Compartilhar a senha com amigos",
            "Usar senhas fortes e autenticação em dois fatores",
            "Anotar a senha em comentários públicos"
        ],
        correct: 2
    },

    {
        question: "O que fazer antes de compartilhar uma notícia?",
        answers: [
            "Compartilhar imediatamente",
            "Verificar a fonte e outras informações",
            "Compartilhar somente porque recebeu de um amigo",
            "Ler apenas o título"
        ],
        correct: 1
    },

    {
        question: "O que caracteriza o cyberbullying?",
        answers: [
            "Uma conversa normal",
            "Um jogo online",
            "Ataques e humilhações realizados por meios digitais",
            "Uma atualização de aplicativo"
        ],
        correct: 2
    },

    {
        question: "Qual atitude ajuda a controlar o uso excessivo do celular?",
        answers: [
            "Usar o celular durante toda a madrugada",
            "Desativar todas as atividades offline",
            "Estabelecer limites de tempo",
            "Nunca fazer pausas"
        ],
        correct: 2
    },

    {
        question: "Como devemos utilizar a Inteligência Artificial?",
        answers: [
            "Sem verificar suas respostas",
            "Como apoio, mantendo pensamento crítico",
            "Para compartilhar dados pessoais",
            "Como substituta completa do pensamento"
        ],
        correct: 1
    },

    {
        question: "O que você deve fazer ao receber uma mensagem suspeita?",
        answers: [
            "Clicar em todos os links",
            "Enviar seus dados pessoais",
            "Verificar a origem e evitar links suspeitos",
            "Compartilhar com todos"
        ],
        correct: 2
    },

    {
        question: "Qual informação deve ser evitada em publicações públicas?",
        answers: [
            "Uma opinião sobre um filme",
            "Dados pessoais e informações sensíveis",
            "Uma foto de uma paisagem",
            "Uma recomendação de livro"
        ],
        correct: 1
    },

    {
        question: "Se alguém estiver sofrendo cyberbullying, uma atitude adequada é:",
        answers: [
            "Responder com mais agressões",
            "Ignorar completamente a situação",
            "Guardar evidências e procurar ajuda",
            "Publicar os dados do agressor"
        ],
        correct: 2
    },

    {
        question: "Por que devemos verificar informações produzidas por IA?",
        answers: [
            "Porque sistemas de IA podem cometer erros",
            "Porque IA nunca funciona",
            "Porque toda informação digital é falsa",
            "Porque não devemos usar tecnologia"
        ],
        correct: 0
    },

    {
        question: "Qual é o principal objetivo da cidadania digital?",
        answers: [
            "Passar mais tempo conectado",
            "Usar a tecnologia de forma segura, ética e responsável",
            "Compartilhar tudo nas redes sociais",
            "Evitar qualquer tecnologia"
        ],
        correct: 1
    }

];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionNumber = document.getElementById("questionNumber");
const nextButton = document.getElementById("nextButton");
const progressBar = document.getElementById("progressBar");

const quizContainer = document.getElementById("quizContainer");
const result = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restartButton");


// Mostrar pergunta

function showQuestion() {

    answered = false;

    const question = questions[currentQuestion];

    questionNumber.textContent =
        `PERGUNTA ${currentQuestion + 1} DE ${questions.length}`;

    questionElement.textContent = question.question;

    answersElement.innerHTML = "";

    progressBar.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("answer");
        button.textContent = answer;

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answersElement.appendChild(button);

    });

}


// Selecionar resposta

function selectAnswer(index, selectedButton) {

    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].correct;

    const allAnswers =
        document.querySelectorAll(".answer");

    allAnswers.forEach((button, buttonIndex) => {

        button.classList.add("disabled");

        if (buttonIndex === correctAnswer) {
            button.classList.add("correct");
        }

    });

    if (index === correctAnswer) {

        score++;

    } else {

        selectedButton.classList.add("wrong");

    }

}


// Próxima pergunta

nextButton.addEventListener("click", () => {

    if (!answered) {
        alert("Escolha uma resposta primeiro!");
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


// Resultado

function showResult() {

    quizContainer.classList.add("hidden");
    result.classList.remove("hidden");

    scoreElement.textContent =
        `Você acertou ${score} de ${questions.length} perguntas.`;

}


// Reiniciar

restartButton.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    result.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    showQuestion();

});


// Iniciar quiz

showQuestion();