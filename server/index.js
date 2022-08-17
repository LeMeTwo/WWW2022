var ws = require("websockets");
var wsServer = ws.createServer();

var clientList = [];
wsServer.on("connect", function(client){
    clientList.push(client);

    client.on("message", function(msg){
        for (c of clientList) {
            c.send(msg);
        }

    });

    client.on("close", function(){
        var idx = clientList.indexOf(this);
        if (idx !== -1) {
            clientList.splice(idx, 1);
        }

    });

    client.send("Wellcum!");

});


wsServer.listen(8612);