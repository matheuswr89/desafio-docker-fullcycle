const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'root_db',
    user: 'db',
    port: '3306',
    password: 'password',
    database:'db'
};
const mysql = require('mysql2')
const connection = mysql.createConnection(config)
const sqlSelect = `SELECT * FROM peoples`

const form = `
<form action="http://localhost:8080/" method="get">
  <input type="text" name="input">
  <button type="submit">Enviar</button>
</form>
`

app.get('/', (req,res) => {
  const {input} = req.query;
  if (input){
    const sql = `INSERT INTO peoples(name) values('${input}')`
    connection.query(sql);
  }
  connection.query(sqlSelect, function (err, result, fields) {
    let names = []
    for (let n of result){
      names.push(`<li>${n["name"]}</li>`)
    }
    res.send(`<h1>Full Cycle Rocks!</h1>${form}<ul>${names.join("")}</ul>`)
  });
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})