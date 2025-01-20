// Conecta ao servidor WebSocket
const socket = new WebSocket("ws://localhost:3000");

// Manipula o envio de mensagens
document.getElementById("form").onsubmit = function (event) {
    event.preventDefault();
    const input = document.getElementById("message");
    const mensagem = input.value.trim(); // Remove espaços desnecessários
    if (mensagem) {
        socket.send(mensagem); // Envia a mensagem para o servidor
        input.value = ""; // Limpa o campo de entrada
    }
};

// Recebe mensagens do servidor
socket.onmessage = function (event) {
    const mensagem = event.data; // Recebe os dados como texto
    const mensagemElemento = document.createElement("div");
    mensagemElemento.textContent = mensagem; // Adiciona o texto ao chat
    document.getElementById("messages").appendChild(mensagemElemento);
};
