var altura = 0;
var largura = 0;
var classe = 0;
var tempo = 20;
var vidas = 1;
let audio = new Audio('som.mp3');
var nivel = window.location.search;
var criamosquitotempo = 1500;
nivel = nivel.replace('?', '');
if (nivel === 'normal') {
    criamosquitotempo = 2000;
} else if (nivel === 'dificil') {
    criamosquitotempo = 1200;
} else {
    criamosquitotempo = 950;
}
function ajustarTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(largura, altura);
}
ajustarTamanhoPalcoJogo();
tamanho();

function iniciarjogo() {
    var nivel = document.getElementById('nivel').value;
    if (nivel == '') {
        alert('Selecione o nivel para iniciar o jogo')
        return false;
    }
    window.location.href = "app.html?" + nivel;
}
function tamanho() {
    classe = Math.floor(Math.random() * 3);
    switch (classe) {
        case 0:
            return 'mosquito1';
            break;
        case 1:
            return 'mosquito2';
            break;
        case 2:
            return 'mosquito3';
            break;
    }
}
var cronometro = setInterval(() => {
    tempo -= 1;
    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(tempomosca);
        window.location.href = 'vitoria.html'
    }
    document.getElementById('cronometro').innerHTML = tempo;

}, 1000);
function lado() {
    classe = Math.floor(Math.random() * 2);
    switch (classe) {
        case 0:
            return 'ladoa';
            break;
        case 1:
            return 'ladob';
            break;
    }
}

var tempomosca = setInterval(() => {
    //remover anterior caso exista
    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();
        if (vidas > 3) { window.location.href = 'fim_de_Jogo.html' } else {
            document.getElementById('v' + vidas).src = 'coracao_vazio.png';
            vidas++;
        }
    }
    var posicaoX = Math.floor(Math.random() * largura) - 90;
    var posicaoY = Math.floor(Math.random() * altura) - 90;
    // se x for menor que 0, x e igual a 0, se nao x e igual a ele mesmo
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY
    var mosquito = document.createElement('img')
    mosquito.src = 'imagem/mosquito.png';
    mosquito.className = tamanho() + ' ' + lado();
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute';
    mosquito.id = 'mosquito';
    mosquito.onclick = function () {
        audio.currentTime = 0;
        audio.play();
        audio.currentTime = 0;
        this.remove()
    }
    document.body.appendChild(mosquito);
}, criamosquitotempo);
