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

form.addEventListener('submit', e => {
    e.preventDefault();

    const quiz = {
        counter: 0,
        correctAnswers: ['B','D','A','C'],
        userAnswers: [
            e.target.userAnswer1.value,
            e.target.userAnswer2.value,
            e.target.userAnswer3.value,
            e.target.userAnswer4.value
        ],
        getScore() {
            let maxScore = 0;

            this.userAnswers.forEach((answer, i) => {
                const match = answer === this.correctAnswers[i];
                if (match) {
                    maxScore += 25;
                }
            });
            return maxScore;
        },
        showResult() {
            const score = this.getScore();

            switch (score) {
                case 100:
                    quizResultMessage.setAttribute('class', 'quizResultMessage text-center alert alert-success');
                    break;
                case 75:
                    quizResultMessage.setAttribute('class', 'quizResultMessage text-center alert alert-primary');
                    break;
                case 50:
                    quizResultMessage.setAttribute('class', 'quizResultMessage text-center alert alert-warning');
                    break;      
                default:
                    quizResultMessage.setAttribute('class', 'quizResultMessage text-center alert alert-danger');
                    break;
            }
            return quizResultMessage.innerHTML = `<div class="h5">Sua taxa de acerto foi de <strong class="display-4">${this.counter}%</strong></div>`;
        },
        interval: null,
        scoreCounter(){
            this.interval = setInterval( () => {
                
                if (this.counter >= this.getScore()) {
                    clearInterval(this.interval);
                }
                
                this.showResult();
                this.counter++;
            }, 10)
        },
    };    
    quiz.scoreCounter();
});