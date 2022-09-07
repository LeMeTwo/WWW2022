const io = require('socket.io')(3000)

let word = " "

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

global.regcheck = 0

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
      id = (await clientA.query('select * from usersdb ORDER BY id DESC;')).rows[0].id + 1
      console.log("Current id is: " + id)
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


  regcheck = 0
  //Pewnie do poprawki, na pewno da się zrobić lepiej
  const clientA = new Client({
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    }); 
    console.log("Test")
    await clientA.connect();
    //Function declared and used as var. Doesn`t look very nice. ToDo 
    var result = (await clientA.query("SELECT login FROM usersdb WHERE login='" + (body.login) + "'"))

    if(result.rowCount === 0){
    await clientA.query("INSERT INTO usersdb (id, login, email, password) VALUES (" + id + ", '" + body.login + "', '" + body.email + "', '" + body.password + "');")
    res.end(JSON.stringify('"Response":"Stworzono konto"'));
    console.log("Stworzono konto " + body.login + " " + body.email)
    id += 1 }
    else{
      console.log("Konto istnieje " + body.login) 
      res.end(JSON.stringify('"Response":"Konto Istnieje"'));
    }

    console.log("/CanRegister?")
})

app.post('/CanLogin', jsonParser, async function (req, res) {
  const body = req.body;

  console.log(req.body)
  console.log(req.body.email)

  //Pewnie do poprawki, na pewno da się zrobić lepiej
  const clientA = new Client({
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    }); 

    await clientA.connect();
    //Function declared and used as var. Doesn`t look very nice. ToDo 
    console.log("SELECT login FROM usersdb WHERE email='" + (body.email) + "' OR login='" + (body.email) + "' AND password='" + body.password + "';" )

    var result = (await clientA.query("SELECT login FROM usersdb WHERE email='" + (body.email) + "' AND password='" + body.password + "' OR login='" + (body.email) + "' AND password='" + body.password + "';" ))
    if(result.rowCount === 0){
      res.end(JSON.stringify('"Response":"Zły login lub hasło"'));
      console.log("Zły login lub hasło " + body.email + " " + body.password)
     }
      else{
        console.log("Poprawny login i hasło " + body.email) 
        res.end(JSON.stringify('"Response":"Uwierzytelniono"'));
      }
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
  socket.on('slice', slice =>{
    word = slice
  })
  socket.on('disconnect', () => {
    switch(word) {
      case 'ChatRoom.html':
        console.log("User disconnected")
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
        break;
      case 'PrivateRoom.html':
        console.log("Private user disconnected")
        socket.broadcast.emit('priv-user-disconnected', users[socket.id])
        delete users[socket.id]
        break;
    }
  })
  socket.on('priv-new-user', name => {
    console.log("Private user connected: " + name)
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
})
