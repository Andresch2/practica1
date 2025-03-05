const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8095 });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  // Enviar mensaje cada 3 segundos
  const interval = setInterval(() => {
    ws.send(`Hora del servidor: ${new Date().toLocaleTimeString()}`);
  }, 3000);

  // Manejar cierre de conexión
  ws.on('close', () => {
    console.log('Cliente desconectado');
    clearInterval(interval); // Detener el intervalo
  });
});