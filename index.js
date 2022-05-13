const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => { // cuando la conexion se establice
    io.emit('chat message', "El usuario " + socket.id + " se ha conectado");
    socket.on('chat message', msg => { //Cuando recibas una señal llamada "chat message"
        var date = new Date();
        var msg = "[" + date.getHours() + ":" + date.getMinutes() + "]  " + msg;
        io.emit('chat message', msg); // emite al resto de usuarios el mensaje
    });
    socket.on('close', function() {
        io.emit('chat message', "El usuario " + socket.id + " se ha conectado"); // implementación, cuando alguien se descoencte , lo anuncia
        socket.disconnect(); //lo descoencta
    });
});


http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});