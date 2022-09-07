const io = require('socket.io')(3000)

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var cors = require('cors')
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())



const users = {}
const {Client} = require('pg');
const { connectionString } = require('pg/lib/defaults');
const DATABASE_HOST='labagh.pl';
const DATABASE_USER='s408427';
const DATABASE_PASSWORD='vwe501nrgotg';
const DATABASE_NAME='s408427';

var id = 4

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
app.post('/CanRegister', async function (req, res) {
  //Where is JSON?
  const body = req.body;
  //^Found him!
  console.log(req.body.login)

  //No validation, I`m too lazy bruh, meybe will finish at 2nd level 



  //Pewnie do poprawki, na pewno da się zrobić lepiej
  const clientA = new Client({
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    }); 

    await clientA.connect();
    //Function declared and used as var. Doesn`t look very nice. ToDo 
    var result = (await clientA.query('SELECT login FROM usersdb WHERE login=' + connectionString.escape(body.logins), function(err, rows, fields) {

      if (rows.rowCount == 0) {
        console.log("Można stworzyć konto " + body.login + " " + body.email)
      }

      else{res.end(JSON.stringify(rows.rows));}

    }))
    await clientA.query('INSERT INTO table_name (id, login, email, password) VALUES (' + id + ', ' + body.login + ', ' + body.email + '. ' + body.password + ');')
    res.end("Stworzono konto")
    console.log("Stworzono konto " + body.login + " " + body.email)
    id += 1 
    console.log("/CanRegister?")
})

app.post('/CanLogin', jsonParser, async function (req, res) {
  const body = req.body;


  //Pewnie do poprawki, na pewno da się zrobić lepiej
  const clientA = new Client({
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    }); 

    await clientA.connect();
    //Function declared and used as var. Doesn`t look very nice. ToDo 
    var result = (await clientA.query('SELECT login FROM usersdb WHERE password=' + connectionString.escape(body.password), function(err, rows, fields) {

      if (rows.rowCount != 0) {
        res.end("id=" + rows.id)
        console.log("Zalogowano" + body.login)
        return
      }

      else{res.end("Zły login lub hasło");}

    }))
    console.log("/CanLogin?")
})

//Tu będzie dodawanie do bazy danych
//Jeszcze niegotowe
//Chyba niepotrzebne(?)
//Na razie nie wywoływać!
app.get('/AddToDB',  async function (req, res) {
  console.log(req)
  return 
  console.log("/AddToDB?")
})

//ToDO: Obsługa bazy z pokojami 
//ToDo: Tworzenie pokojów
//ToDo: Usuwanie urzytkowników (może)





};



main().catch(console.error);


//Chat. Simple as. 
io.on('connection', socket => {
  socket.on('new-user', name => {
    console.log("User connected: " + name)
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    console.log("Sent message: " + message)
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('send-chat-roll', roll => {
    console.log("Sent roll: " + roll)
    socket.broadcast.emit('chat-roll', { roll: roll, name: users[socket.id] }) 
  })
  socket.on('disconnect', () => {
    console.log("User disconnected")
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
  socket.on('priv-new-user', name => {
    console.log("Private user joined: " + name)
    users[socket.id] = name
    socket.broadcast.emit('priv-user-connected', name)
  })
  socket.on('priv-send-chat-message', message => {
    console.log("Sent private message: " + message)
    socket.broadcast.emit('priv-chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('priv-send-chat-roll', roll => {
    console.log("Sent private roll: " + roll)
    socket.broadcast.emit('priv-chat-roll', { roll: roll, name: users[socket.id] }) 
  })
  socket.on('priv-disconnect', () => {
    console.log("Private user disconnected")
    socket.broadcast.emit('priv-user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
