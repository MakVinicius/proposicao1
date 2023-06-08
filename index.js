//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.render("Home");
});

app.post("/", function (req, res) {
    const limiteInferior = req.body.limiteInf;
    const limiteSuperior = req.body.limiteSup;

    // Declaração de variáveis
    let numero = [];
    let formula = [];
    let raizQuadrada = [];
    let decimal = [];
    let avaliacao = [];
    let contador = 0;
    let posicaoVetor = 0;
    let message = "";

    for (let n = limiteInferior; n <= limiteSuperior; n++) {
        numero.push(n);
        formula.push(3 * (n * n + 2 * n + 3) - 2 * n * n);
        raizQuadrada.push(Math.sqrt(formula[posicaoVetor]));
        decimal.push(raizQuadrada[posicaoVetor] - Math.floor(raizQuadrada[posicaoVetor]));
        // decimal = 15.34 - 15.00 = 0.34;
    
        // Verifica se o resto da subtração é zero
        if (decimal[posicaoVetor] == 0) {
            avaliacao.push(true);
        } else {
            avaliacao.push(false);
        }
    
        // Verifica se algum valor "n" não confirma a proposição
        if (avaliacao[posicaoVetor] == false) {
            contador++;
        }

        posicaoVetor++;
    }

    if (contador == 0) {
        message = "Todos os valores testados confirmam a proposição.";
    } else {
        message = "Ao menos um valor testado não confirma a proposição.";
    }

    res.render("Resultado", {numeroJS: numero, formulaJS: formula, raizQuadradaJS: raizQuadrada, decimalJS: decimal, avaliacaoJS: avaliacao, comprimentoJS: posicaoVetor, messageJS: message});
});


app.listen(process.env.PORT || 3000, function() {
    console.log("Server started succesfully.");
});