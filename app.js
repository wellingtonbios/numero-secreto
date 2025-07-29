let listaDeNumerosSorteados = [];
let numeroMaximo = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//Para buscar uma linha do html é necessário utilizar uma variável e a palavra document.querySelector
//dentro da aspas simples, informe o nome da tag que você quer buscar no html
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do Numero Secreto';

//função para selecionar a tag do tipo texto e retornar o valor de texto que eu quero lá na tag do HTML
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}

function gerarNumeroAleatorio(){
    //com a função return essa função consegue dar o retorno do dado gerado dentro dela
    //neste caso, o retorno será o número aleatório gerado pela função Math.random
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1); // limita o máximo de numero sorteado
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroMaximo){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){ //o includes verifica dentro da lista, neste caso numeroEscolhido se o numero existe
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(numeroEscolhido); // o método push adiciona o valor no final da lista e caso queira, o método pop remove o ultimo valor
        console.log (numeroEscolhido);
        return numeroEscolhido;
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do Numero Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 50');
}

function foco(){
    const campo = document.getElementById('numero');
    campo.focus();
}

//Exemplo de uma função no javascript
function verificarChute(){
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa'
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas);

        //aqui neste linha remove o atributo que desabilita o botão "novo jogo"
        document.getElementById('reiniciar').removeAttribute('disabled');
        
    }else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p','O numero é menor do que o chute');
        }else{
            exibirTextoNaTela('p','O numero é maior do que o chute');
        }
        tentativas ++;
        limparCampo();
        foco();
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value='';
}

function novoJogo(){
    limparCampo();
    numeroSecreto = gerarNumeroAleatorio();
    tentativas=1;
    foco();
    exibirMensagemInicial();
    //aqui desabilita o botão "novo jogo"
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

exibirMensagemInicial();
foco();