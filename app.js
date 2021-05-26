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

const form = document.querySelector('form');
const quizResultMessage = document.querySelector('.quizResultMessage');
const resetButton = form.resetButton;

resetButton.addEventListener('click', () => {
    quizResultMessage.setAttribute('class', 'quizResultMessage');
    quizResultMessage.textContent = '';
});

const quiz = {
    counter: 0,
    correctAnswers: ['B','D','A','C'],
    userAnswers() {
        const choices = [];
        
        this.correctAnswers.forEach( (_, index) => {
            let answer = form[`userAnswer${index + 1}`].value;

            choices.push(answer);
        } );
        
        return choices;
    },
    getScore() {
        let score = 0;
        const answers = this.userAnswers();

        answers.forEach((answer, i) => {
            const match = answer === this.correctAnswers[i];

            if (match) {
                score += 25;
            }
        });
        
        return score;
    },
    interval: null,
    animateScore(){
        this.counter = 0;
        this.interval = setInterval( () => {
            
            if (this.counter >= this.getScore()) {
                clearInterval(this.interval);
            }

            quizResultMessage.innerHTML = `<div class="h5">Você acertou <strong class="display-4">${this.counter}%</strong> do Quiz!</div>`;
            this.counter++;
        }, 10);
    },
    showResult() {
        const score = this.getScore();
        let alertClass = '';

        switch (score) {
            case 100:
                alertClass = 'alert-success';
                break;
            case 75:
                alertClass = 'alert-primary';
                break;
            case 50:
                alertClass = 'alert-warning';
                break;      
            default:
                alertClass = 'alert-danger';
                break;
        }

        quizResultMessage.classList.remove(...quizResultMessage.classList);
        quizResultMessage.classList.add('quizResultMessage', 'text-center', 'alert', alertClass);
        this.animateScore();
    }
};

form.addEventListener('submit', e => {
    e.preventDefault();

    quiz.showResult();
});