const io = require('socket.io')(3000)

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