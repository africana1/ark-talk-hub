import { createServer } from 'http';
import { Server } from 'socket.io';
import config from './modules/config/config';

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: config.env === 'production' ? config.client.frontend_domain : [`http://localhost:${5173}`],
    methods: ['GET', 'POST'],
  },
});

console.log(`Socket IO server listening on port ${config.server.port}`);

// Handle Socket.IO connection
io.on('connection', (socket) => {
  // Join room based on topic ID
  socket.on('joinTopic', (topicId) => {
    socket.join(topicId);
  });

  // Handle message and broadcast to the room
  socket.on('sendMessage', (message) => {
    io.to(message.topicId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

export { io };
