import { createServer as app } from './server';
import * as http from 'http';

//const NAMESPACE = 'Server';

//** create http server */
const httpServer: http.Server = http.createServer(app);

//const PORT = config.server.port || 4400;
const PORT = 5500;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  //logging.info(NAMESPACE, `Server is running ${config.server.hostname}:${PORT}`);
});
