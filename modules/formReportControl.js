import {firebaseControl} from './firebaseControl.module.js';

const divMapa = document.querySelector('.mapa');
const divSelecao = document.querySelector('.selecao');
const inputs = document.querySelectorAll('.selecao input');
const divOpcional = document.querySelector('.opcional');
const divOpcionais = document.querySelector('.questoes_opcionais');
const buttonEnvia = document.querySelector('button#enviarFormulario');
const divPergunta = document.querySelector('.pergunta');
const mansagemFinal = document.querySelector('.mensagem');

let divForm = null;

export const functions = {
    object: {},
    flagForm: 0,
    firstForm: function() {
        // e.preventDefault();
        divMapa.className = 'd-none';
        divSelecao.style.display = 'flex';
        this.flagForm++;
        firebaseControl.sendMap(this.object);
        // firebaseControl.sendMap(obj);
    },
    secondForm: function() {
        // e.preventDefault();
        for (const input of inputs) {
            if (input.checked) {
                const value = input.value;
                divForm = document.querySelector(`div.${value}.opcoes`);
                divSelecao.style.display = 'none';
                divForm.style.display = 'flex';
                this.object.first = value;
                this.flagForm++;
                break;
            }
        }
    },
    thirdForm: function() {
        const inputs = document.querySelectorAll(`div.${this.object.primary}.opcoes input`);
        for (const input of inputs) {
            if (input.checked) {
                input.parentElement.parentElement.parentElement.style.display = 'none';
                divPergunta.className = 'pergunta d-flex flex-column align-items-center';
                divOpcional.className += ' d-flex';
                buttonEnvia.className = 'd-none';
                this.object.second = input.value;
                this.flagForm++;
                break;
            }
        }
    },
    lastForm: function() {
        divPergunta.className = 'd-none';
        buttonEnvia.className = 'btn btn-secondary';
        divOpcionais.className = 'd-flex';
        divOpcionais.className =
            'questoes_opcionais w-100 list-group d-flex flex-columun';
        this.flagForm++;    
        console.log(this.object);
    },
    sendToFirebase: function() {
        mansagemFinal.className = 'mensagem d-flex';
        firebaseControl.sendForm(this.object);
    },
    returnForm: function() {
        // e.preventDefault();
        if (this.flagForm === 1) {
            divMapa.className = 'd-flex flex-column align-items-center';
            divSelecao.style.display = 'none';
            this.flagForm--;
        } else if (this.flagForm === 2) {
            divForm = document.querySelectorAll(`div.opcoes`);
            for (const div of divForm) {
                div.style.display = 'none';
            }
            divSelecao.style.display = 'flex';
            this.flagForm--;
        } else if (this.flagForm === 3) {
            console.log(this.object);
            const div = document.querySelector(`input#${this.object.secondary}`);
            div.parentElement.parentElement.parentElement.style.display = 'flex';
            divPergunta.className = 'd-none';
            buttonEnvia.className = 'btn btn-secondary';
            this.flagForm--;
         }
    }
};

// export const questaoOpcional = function(e) {
//     e.preventDefault();
// }
