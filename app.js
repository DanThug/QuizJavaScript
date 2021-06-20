/*
Este exercício será um pouquinho diferente dos anteriores.

Seu desafio é desenvolver uma versão do quiz que:

- Aborda um tema diferente (não pode ser de filmes);
- Tem um tema de cores diferente do que foi apresentado na aula;
- Exibe na tela a pontuação que o usuário fez. Não há certo ou errado, apenas faça. Essa exibição de pontos é uma das implementações que faremos na próxima aula =D

Independente se você já fez o quiz dos filmes enquanto acompanhava a aula, tente fazer esse exercício sem rever partes da aula.

É importante que a sua versão do quiz seja feita apenas com o conteúdo que vimos até aqui.

Depois de fazer o que foi pedido acima, crie um repositório no GitHub para a sua aplicação e abra uma issue no repositório do curso com:

- O link da sua versão do quiz;
- Quais foram as suas maiores dúvidas ou dificuldades durante a execução desse exercício;
- Quais foram as suas menores dificuldades durante a execução desse exercício.

Link do repositório do curso: https://github.com/roger-melo-treinamentos/curso-de-js-roger-melo/issues

Ps: se você não conseguiu fazer tudo o que foi pedido acima, abra a issue mesmo assim =)
*/

const formQuiz = document.querySelector('form');
const correctAnswers = ['B', 'D', 'A', 'C'];
const quizResultMessage = document.querySelector('.quizResultMessage');
const buttonReset = document.querySelector('button[type="reset"]');
let counter = 0;

const getUserAnswers = () => correctAnswers.map((_, index) => formQuiz[`userAnswer${index + 1}`].value)

const calculateScore = () => {
    let score = 0;
    const userAnswers = getUserAnswers();

    correctAnswers.forEach((answer, index) => {
        const isAnswerMatch = answer === userAnswers[index];

        if (isAnswerMatch) {
            score += 25;
        }
    });
    return score;
}

const getClassAlert = () => {
    const finalScore = calculateScore();
    let classAlert = '';

    switch (finalScore) {
        case 100:
            classAlert = 'alert-success';
            break;
        case 75:
            classAlert = 'alert-primary';
            break;
        case 50:
            classAlert = 'alert-warning';
            break;
        default:
            classAlert = 'alert-danger';
            break;
    }
    return classAlert;
}

const animateScore = () => {
    const percentage = document.querySelector('span');
    const finalScore = calculateScore();
    let interval = null;

    counter = 0;
    
    interval = setInterval(() => {
        if (counter === finalScore) {
            clearInterval(interval);
        }

    percentage.textContent = counter++;
    }, 10);
}

const showResult = () => {
    const classAlert = getClassAlert();

    quizResultMessage.classList.remove(...quizResultMessage.classList);
    quizResultMessage.classList.add('quizResultMessage', 'alert', 'text-center', classAlert);
    quizResultMessage.innerHTML = `Você acertou <span class="display-4"></span>% do Quiz!`;
    animateScore();
}

// LISTENERS
formQuiz.addEventListener('submit', event => {
    event.preventDefault();

    showResult();
});

formQuiz.addEventListener('click', ({target}) => {
    const isALabel = target.classList.contains('form-check-label');

    if (isALabel) {
        target.previousElementSibling.checked = true;
    }
});

buttonReset.addEventListener('click', () => {
    quizResultMessage.classList.remove(...quizResultMessage.classList);
    quizResultMessage.classList.add('quizResultMessage', 'alert', 'text-center');
    quizResultMessage.textContent = '';
});