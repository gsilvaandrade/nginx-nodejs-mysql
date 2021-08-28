const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

console.log('conexão criada')

const sqlCreate = `CREATE TABLE mensagem(id int not null auto_increment, texto varchar(50), primary key(id))`
connection.query(sqlCreate)

console.log('tabela criada')

const sqlInsert = `INSERT INTO mensagem(texto) values('Code.education Rocks!')`
connection.query(sqlInsert)

console.log('insert realizado')

const retorno = null;
let resultado;
connection.query("SELECT * FROM mensagem", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    resultado = JSON.parse(JSON.stringify(result))
  });
console.log('select realizado ')

connection.end()


app.get('/', (req,res) => {
    res.send('<h1>'+(resultado[0].texto)+'</h1>')
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})