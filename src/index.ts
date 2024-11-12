import { app } from './app';
import * as http from 'http';
import config from './modules/config/config';
import logger from './modules/logger/logger';
import { io } from './socket.io';

// create http server
const server: http.Server = http.createServer(app);

// PORT
const PORT = config.server.port || 5500;

// attach socket.io to the server
io.attach(server);

server.listen(PORT, async () => {
  logger.info(`Server is listening on port ${PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
