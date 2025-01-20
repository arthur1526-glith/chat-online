const express = require("express");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const socket = ('https://chat-online-n582.onrender.com');


// Servindo arquivos estáticos na pasta "public"
app.use(express.static(path.join(__dirname, "public")));

// Servidor HTTP
const server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// Servidor WebSocket
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("Novo cliente conectado");

    // Quando receber uma mensagem do cliente
    ws.on("message", (message) => {
        console.log(`Mensagem recebida: ${message}`);
        // Enviar a mensagem para todos os clientes conectados
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Garante que é texto
            }
        });
    });

    // Quando o cliente se desconectar
    ws.on("close", () => {
        console.log("Cliente desconectado");
    });
});
