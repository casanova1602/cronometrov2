const clock = document.querySelector('.clock');
const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');
const gravar = document.querySelector('.gravar');
const limpar = document.querySelector('.limpar');
const resultado = document.querySelector('.resultados')
let time;
let qntResul = 1;
let startTime;
let elapsedTime = 0;
gravar.setAttribute('disabled', '');
pausar.setAttribute('disabled', '');
limpar.setAttribute('disabled', '');

function mostrarRelogio(ms) {
    const data = new Date(ms);
    const dataFormatada = data.toLocaleTimeString('pt-BR', {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 2,
        timeZone: "UTC"
    })

    return dataFormatada.replace(',', ':');
}

document.addEventListener('click', (e) => {
    let botao = e.target;
    if (botao.classList.contains('iniciar')) {
        startTime = Date.now() - elapsedTime;
        clearInterval(time);
        time = setInterval(function () {
            elapsedTime = Date.now() - startTime;
            clock.innerHTML = mostrarRelogio(elapsedTime)
        }, 10)
        iniciar.setAttribute('disabled', '');
        pausar.removeAttribute('disabled', '');
        zerar.removeAttribute('disabled', '');
        zerar.classList.add('desaparecer')
        pausar.classList.remove('desaparecer');
        gravar.removeAttribute('disabled', '')
    }

    if (botao.classList.contains('pausar')) {
        clearInterval(time);
        iniciar.removeAttribute('disabled', '');
        pausar.classList.add('desaparecer')
        zerar.classList.remove('desaparecer');
    }

    if (botao.classList.contains('zerar')) {
        clock.innerHTML = mostrarRelogio(0);
        ms = 0;
        iniciar.removeAttribute('disabled', '');
        pausar.setAttribute('disabled', '');
        zerar.classList.add('desaparecer')
        pausar.classList.remove('desaparecer');
        gravar.setAttribute('disabled', '');
    }

    if (botao.classList.contains('gravar')) {
        if (qntResul === 1) {
            resultado.innerHTML = '';
        }
        const p = criarP();
        p.innerHTML = `${qntResul}) ${mostrarRelogio(elapsedTime)}`;
        resultado.appendChild(p);
        qntResul++;
        limpar.removeAttribute('disabled', '');
    }

    if (botao.classList.contains('limpar')) {
        qntResul = 1;
        resultado.innerHTML = '';
        const p = criarP();
        p.innerHTML = 'Não há resultados gravados';
        resultado.appendChild(p)
        limpar.setAttribute('disabled', '');
    }
})

function criarP() {
    return document.createElement('p');
}

