var numeroSorteado, quantidadeTentativas, limiteMaior, limiteMenor, tentativa;

//FUNÇÃO: VALIDAR A CAIXA DE NÚMERO, IMPEDINDO QUE RECEBA MANUALMENTE VALORES INVÁLIDOS
function validarCaixa()
{
    var caixaNumero = document.querySelector("#numero");
    
    //RECEBIMENTO DE VALOR VAZIO
    if(caixaNumero.value == "")
    {
        caixaNumero.value = 0;
    }

    //RECEBIMENTO DE VALOR MAIOR QUE 1000
    if(caixaNumero.value > 1000)
    {
        caixaNumero.value = 1000;
    }

    //RECEBIMENTO DE VALOR MENOR QUE 0
    if(caixaNumero.value < 0)
    {
        caixaNumero.value = 0;
    }
}


//FUNÇÃO: AUMENTAR NÚMERO NA SETA +
function aumentarNumero(velocidade)
{
    var numero = document.querySelector("#numero");
    var valor = parseInt(numero.value);

    valor += velocidade;

    if(valor<=1000)
    {
        numero.value = valor;
    }
}


//FUNÇÃO: DIMINUIR NÚMERO NA SETA -
function diminuirNumero(velocidade)
{
    var numero = document.querySelector("#numero");
    var valor = parseInt(numero.value);

    valor -= velocidade;

    if(valor>=0)
    {
        numero.value = valor;
    }
}


//FUNÇÃO: INICIAR O JOGO
function iniciarJogo()
{
    //MOSTRANDO A DIV PRINCIPAL COM A CAIXA NÚMERICA
    var caixaSelecionarNumero;
    caixaSelecionarNumero = document.querySelector("#main");
    caixaSelecionarNumero.style.display = "block";
    
    //RESET DE VARIÁVEIS DE CONTROLE
    limiteMenor            =  0; 
    limiteMaior            =  1000;
    tentativa              =  0;
    quantidadeTentativas   =  8;
    numeroSorteado         =  gerarNovoNumero(0, 1000);
    
    //ZERANDO O VALOR DA CAIXA DE TEXTO NÚMERO
    document.getElementById("numero").value = tentativa;
    
    //AJUSTANDO OS VALORES NAS CAIXAS DE TEXTO DE LIMITE MENOR E MAIOR
    document.getElementById("limiteMenor").value = limiteMenor;
    document.getElementById("limiteMaior").value = limiteMaior;

    //AJUSTANDO AS CORES DAS CAIXAS DE TEXTO DE LIMITE MENOR E MAIOR
    document.getElementById("limiteMenor").style.border = "2px solid rgb(32 90 88)";
    document.getElementById("limiteMaior").style.border = "2px solid rgb(32 90 88)";
    
    //MOSTRANDO A CONTAGEM DE TENTATIVAS RESTANTES
    var tentativas = document.querySelector("#tentativas");
    tentativas.innerHTML = "Tentativas Restantes: "+quantidadeTentativas;
    
    alert("Bem Vindo ao Advinhe o Número!!!\n\nRegras do Jogo: você deve advinhar um número aleatório de 0 a 1000 que foi gerado pelo site! Você tem 8 tentativas e ao longo delas você irá receber dicas sobre a distância entre o número tentado e o número sorteado.\n\nDicas de Cores: As caixas indicadoras do limite máximo e mínimo encontrados irão mudar de cor conforme a distância que estes limites estiverem do número sorteado.\n\nAzul -> Mais de 100 números de distância\nVerde -> Entre 99 e 50 números de distância\nLaranja -> Entre 49 e 10 números de distância\nVermelho -> Menos de 10 números de distância\n\nLet's Play ?");
    
    //DESABILITANDO O BOTÃO DE PLAY
    document.getElementById("play").disabled     =  true;
    document.getElementById("play").style.cursor =  "default";
    
    //DANDO O FOCO PARA A CAIXA NUMÉRICA
    document.getElementById("numero").focus();
}


//FUNÇÃO: FINALIZAR O JOGO
function finalizarJogo()
{
    //RETIRANDO A DIV PRINCIPAL COM A CAIXA NUMÉRICA
    var caixaSelecionarNumero;
    caixaSelecionarNumero = document.querySelector("#main");
    caixaSelecionarNumero.style.display = "none";

    //REABILITANDO O BOTÃO DE PLAY
    document.getElementById("play").disabled     =  false;
    document.getElementById("play").style.cursor =  "pointer";

    //RETIRANDO A CONTAGEM DE TENTATIVAS RESTANTES
    var tentativas = document.querySelector("#tentativas");
    tentativas.innerHTML = "";
}


//FUNÇÃO: GERAR UM NOVO NÚMERO ALEATÓRIO
function gerarNovoNumero(min, max)
{
    var numeroEncontrado = false;
    
    while(numeroEncontrado == false)
    {
        var numero = Math.round(Math.random() * 2 * max);
        
        //CONTROLAR SE O NÚMERO GERADO ESTÁ ENTRE O NÚMERO MÍNIMO E MÁXIMO PASSADOS
        if((numero >= min) && (numero <= max))
        {
            numeroEncontrado = true;
        }
    }

    return numero;
}


//FUNÇÃO: JOGADOR ACERTOU O NÚMERO SORTEADO
function acertou(numeroSorteado)
{
    //APÓS 0.5 SEG, MOSTRAR A MENSAGEM DE VITÓRIA E FINALIZAR O JOGO
    setTimeout(function() {
        alert("Você Acertou!! Parabéns!! ^^ \n\nO número sorteado é " + numeroSorteado + ".");
        finalizarJogo();
    }, 500)
}


//FUNÇÃO: JOGADOR ERROU O NÚMERO SORTEADO
function errou(tentativasRestantes, numeroInformado, numeroSorteado)
{
    if(tentativasRestantes == 0) //NÚMERO DE TENTATIVAS ESGOTARAM
    {
        //APÓS 0.5 SEG, MOSTRAR A MENSAGEM DE FIM DE JOGO E FINALIZAR O JOGO
        setTimeout(function() {
            confirm("Você errou, que pena! Infelizmente acabaram suas tentativas, na próxima você consegue! ;) \n\nO número sorteado era: " + numeroSorteado);
            finalizarJogo();
        }, 500)
    }
    else //REAJUSTE DO LIMITE DE MAIOR/MENOR NÚMERO E MOSTRAR MENSAGEM DE DICA
    {
        if(numeroInformado > numeroSorteado) //NÚMERO DA TENTATIVA MAIOR DO QUE O NÚMERO SORTEADO
        {
            //VERIFICANDO SE O NÚMERO TENTADO É MENOR QUE O LIMITE MAIOR ATUAL
            if(limiteMaior > numeroInformado)
            {
                //SUBSTITUINDO O LIMITE MAIOR PELO NOVO LIMITE MAIOR ENCONTRADO
                limiteMaior = numeroInformado;
                document.getElementById("limiteMaior").value = limiteMaior;
                 
                if(limiteMaior - numeroSorteado >= 100) //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 100+ -> BORDA AZUL
                {
                    document.getElementById("limiteMaior").style.border = "2px solid rgb(49,0,255)";                       
                }
                else
                {
                    if(limiteMaior - numeroSorteado >= 50) //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 99 ~ 50 -> BORDA VERDE
                    {
                        document.getElementById("limiteMaior").style.border = "2px solid rgb(20,183,31)";                       
                    }
                    else
                    {
                        if(limiteMaior - numeroSorteado >= 10) //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 49 ~ 10 -> BORDA LARANJA
                        {
                            document.getElementById("limiteMaior").style.border = "2px solid rgb(171,113,12)";
                        }
                        else //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 10 ~ 1 -> BORDA VERMELHA
                        {
                            document.getElementById("limiteMaior").style.border = "2px solid rgb(199,34,34)";
                        }
                    }
                }
            }

            if(numeroInformado - numeroSorteado >= 100) //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 100+
            {
                alert(`Você errou, que pena! Seu número é extremamente grande, diminua ele!`);
            }
            else
            {
                if(numeroInformado - numeroSorteado >= 50) //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 99 ~ 50
                {
                    alert(`Você errou, que pena! Seu número é muito grande, diminua ele um pouco!`);
                }
                else
                {
                    if(numeroInformado - numeroSorteado >= 10) //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 49 ~ 10
                    {
                        alert(`Você errou, que pena! Seu número é grande, diminua ele um pouco!`);
                    }
                    else //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 10 ~ 1
                    {
                        alert(`Você errou, que pena! Está quase lá, diminua ele apenas mais um pouco!`);
                    }
                }
            }
        }
        else //NÚMERO DA TENTATIVA MENOR DO QUE O NÚMERO SORTEADO
        {
            //VERIFICANDO SE O NÚMERO TENTADO É MAIOR QUE O LIMITE MENOR ATUAL
            if(limiteMenor < numeroInformado)
            {
                //SUBSTITUINDO O LIMITE MENOR PELO NOVO LIMITE MENOR ENCONTRADO
                limiteMenor = numeroInformado;
                document.getElementById("limiteMenor").value = limiteMenor;

                if(numeroSorteado - limiteMenor >= 100) //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 100+ -> BORDA AZUL
                {
                    document.getElementById("limiteMenor").style.border = "2px solid rgb(49,0,255)";                       
                }
                else
                {
                    if(numeroSorteado - limiteMenor >= 50) //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 99 ~ 50 -> BORDA VERDE
                    {
                        document.getElementById("limiteMenor").style.border = "2px solid rgb(20,183,31)";                       
                    }
                    else
                    {
                        if(numeroSorteado - limiteMenor >= 10) //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 49 ~ 10 -> BORDA LARANJA
                        {
                            document.getElementById("limiteMenor").style.border = "2px solid rgb(171,113,12)";
                        }
                        else //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 10 ~ 1 -> BORDA VERMELHA
                        {
                            document.getElementById("limiteMenor").style.border = "2px solid rgb(199,34,34)";
                        }
                    }
                }
            }

            if(numeroSorteado - numeroInformado >= 100) //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 100+
            {
                alert(`Você errou, que pena! Seu número é extremamente pequeno, aumente ele!`);
            }
            else
            {
                if(numeroSorteado - numeroInformado >= 50) //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 99 ~ 50
                {
                    alert(`Você errou, que pena! Seu número é muito pequeno, aumente ele um pouco!`);
                }
                else
                {
                    if(numeroSorteado - numeroInformado >= 10) //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 49 ~ 10
                    {
                        alert(`Você errou, que pena! Seu número é pequeno, aumente ele um pouco!`);
                    }
                    else //DISTÂNCIA ATÉ O NÚMERO SORTEADO: 10 ~ 1
                    {
                        alert(`Você errou, que pena! Está quase lá, aumente ele apenas mais um pouco!`);
                    }
                }
            }
        }
    }
    
    //DANDO O FOCO PARA A CAIXA NUMÉRICA
    document.getElementById("numero").focus();
}


//FUNÇÃO: REALIZAR UMA TENTATIVA
function realizarTentativa()
{   
    quantidadeTentativas--;
    document.getElementById("tentativas").innerHTML = "Tentativas Restantes: "+quantidadeTentativas;
    
    tentativa = document.getElementById("numero").value;
    
    if(tentativa == numeroSorteado) //NÚMERO DA TENTATIVA É IGUAL AO NÚMERO SORTEADO -> FUNÇÃO: ACERTOU
    {        
        acertou(numeroSorteado);
    }
    else //NÚMERO DA TENTATIVA É DIFERENTE DO NÚMERO SORTEADO -> FUNÇÃO: ERROU
    {
        errou(quantidadeTentativas, tentativa, numeroSorteado);
    }
}