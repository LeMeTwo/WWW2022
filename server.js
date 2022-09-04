const io = require('socket.io')(3000)

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const users = {}
const {Client} = require('pg')
const DATABASE_HOST='labagh.pl';
const DATABASE_USER='s408427';
const DATABASE_PASSWORD='vwe501nrgotg';
const DATABASE_NAME='s408427';

//Lacznosc z db
const main = async () => {
  const clientA = new Client({
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      host: DATABASE_HOST,
  });
  await clientA.connect();
  try {
      //Test połączenia z bazą
      console.log('lol');
      console.log(await clientA.query('SELECT * FROM usersdb'));
  } finally {
      //Módl się, żeby ta linijka się nie załączyła
      //await clientA.end();
      console.log("Slychac dobrze")
  }


//RestfulAPI
//Get from DB
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

//Sprawdź, czy konto już instnieje, możn użyć też do logowania 
app.post('/CanRegister', jsonParser, async function (req, res) {
  const body = req.body;
  console.log(req.body)
  //No validation, I`m too lazy bruh



  //Pewnie do poprawki, na pewno da się zrobić lepiej
  const clientA = new Client({
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    }); 

    await clientA.connect();
    var result = (await clientA.query('SELECT login FROM usersdb WHERE id=0', function(err, rows, fields) {

      if (rows.rowCount == 0) {
        res.end(JSON.stringify("Można stworzyć konto"))
        return
      }

      else{res.end(JSON.stringify(rows.rows));}

    }))
    console.log("/CanRegister?")
})


//Tu będzie dodawanie do bazy danych
//Jeszcze niegotowe
app.get('/AddToDB',  async function (req, res) {
  console.log(req)
  //Pewnie do poprawki, na pewno da się zrobić lepiej
  const clientA = new Client({
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    }); 

    await clientA.connect();
    await clientA.query('INSERT INTO table_name (id, login, email, password) VALUES (value1, value2, value3, value4);')
    console.log("/AddToDB?")
})
};

main().catch(console.error);


//Sockety
io.on('connection', socket => {
  socket.on('new-user', name => {
    console.log("LOL2")
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    console.log("LOL")
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})