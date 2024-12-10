//Importações
const express = require('express');
const db = require('./conexao');

//Criar o app NodeJS
const app = express();
app.use(express.json());


//Rodar o Servidor
const porta = 3000;
app.listen(porta, () => {
    console.log("Servidor executando na porta de nº"+porta);
});


//Criar uma rota para consultar a tabela de produto
app.get('/produtos', (req, res)=>{
    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave inválida"});
    }
    const sql = "SELECT * FROM tb_produtos";
    db.query(sql, (erro, resultados) => {
        if(erro){
            return res.json({mensagem:"Falha ao consultar: "+erro.message});
        }
        return res.json(resultados);
    });
});// Fim da rota para consultar a tabela de produto

//Criar uma rota cadastrar produtos
app.post('/produtos', (req, res)=>{
    const {nome, preco} = req.body;
    const sql = `INSERT INTO tb_produtos
                 (nome_produto, preco) VALUES (?, ?)`;
    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave inválida"});
    }
    db.query(sql, [nome, preco], (erro, resultados)=>{
        if(erro){
            return res.json({mensagem: "Falha ao cadastrar: "+erro.message});
        }
        return res.json({mensagem: "Cadastrado com sucesso!"});
    });
});//Fim da rota cadastrar produtos

//Rota para deletar
app.delete('/produtos/:id', (req, res) => {
    const id_informado = req.params.id;
    const  sql = `DELETE FROM tb_produtos WHERE id_produto = ?`;
    const api_key = req.headers['api_key'];
    if(api_key !== '123456'){
        return res.json({mensagem: "Chave inválida"});
    }
    db.query(sql, [id_informado], (erro, resultados) => {
        if(erro){
            return res.json({mensagem: "Falha ao deletar: "+erro.message});
        }
        if(resultados.length == 0){
            return res.json({mensagem: "Nada alterado"})
        }
        return res.json({mensagem: "Deletado com sucesso!"});
    });
});//Fim da rota deletar







