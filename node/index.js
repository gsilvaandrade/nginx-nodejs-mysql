const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

console.log('conexão criada')
const sqlDrop = `DROP TABLE IF EXISTS mensagem`
connection.query(sqlDrop)
const sqlCreate = `CREATE TABLE mensagem(id int not null auto_increment, texto varchar(50), primary key(id))`
connection.query(sqlCreate)
console.log('tabela criada')
const sqlInsert = `INSERT INTO mensagem(texto) values('Code.education Rocks!')`

connection.query(sqlInsert)
const sqlInsert2 = `INSERT INTO mensagem(texto) values('Gustavo da Silva Andrade!')`
connection.query(sqlInsert2)
const sqlInsert3 = `INSERT INTO mensagem(texto) values('Wesley!')`
connection.query(sqlInsert3)
console.log('insert realizado')

let html = ''


const retorno = null;
let resultado;
connection.query("SELECT * FROM mensagem", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    resultado = JSON.parse(JSON.stringify(result))
    for(let list in resultado){
        console.log('list ', list)
        html += '<h1>'+resultado[list].texto+'</h1>'
    }
});

connection.end()


app.get('/', (req, res) => {
    res.send(html)
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})