var ws = require("websockets");
var wsServer = ws.createServer();


var clientList = [];
//Zamist id będzie się brało loginy w przyszłości
//Ale najpierw trzeba zrobić logowanie
var id = 0;






//SQL

const mysql = require('pg');

const DATABASE_HOST='localhost';
const DATABASE_USER='postgres';
const DATABASE_PASSWORD='admin';
const DATABASE_NAME='postgres';

const {Client} = require('pg');


const main = async () => {
    const client = new Client({
        user: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        host: DATABASE_HOST,
    });
    await client.connect();
    try {
        //Test połączenia z bazą
        console.log(await client.query('SELECT * FROM userdb'));
    } finally {
        //Módl się, żeby ta linijka się nie załączyła
        await client.end();
    }
};

main().catch(console.error);



//Kod użytkowy down there:








//Mapa do trzymania języków użytkownika
var map = new Map();
var myObj =[];
wsServer.on("connect", function(client){
    var myObj =[];
    clientList.push(client);
    client.id = id
    id = id + 1

    //Języki można trzymać jako obiekt przypisany do użytkowanika
    myObj.push("angielski");
    myObj.push("żymski");
    myObj.push("watykański");

    map.set(clientList.indexOf(client), myObj);
    //zeby dostać się do języków, można użyc
        //map.get(clientList.indexOf(client))


    client.on("message", function(msg){
        for (c of clientList) {
            test1 = map.get(clientList.indexOf(c));
            test2 = map.get(clientList.indexOf(client));
            knows = 0;

            for (let i = 0; i < test2.length; i++) {
                for (let j = 0; j < test1.length; j++) {
                    //c.send(test1[j] + " outer");
                    if (test1[j] === test2[i]) {
                        //c.send(test1[j] + " inner");
                        //c.send(test2[i] + " inner");
                        //c.send(client.id + ": " + msg + " POW TU WESZŁO");
                        c.send(client.id + ": " + msg);
                        return
                    }
                }
            }

            c.send(client.id + ": " + "(((Niezrozumiałe)))");
        }

    });


    client.on("close", function(){
        var idx = clientList.indexOf(this);
        if (idx !== -1) {
            clientList.splice(idx, 1);
        }

    });
    client.send("NEW USER JOINED");
    client.send("Wellcum!");
});


wsServer.listen(8612);