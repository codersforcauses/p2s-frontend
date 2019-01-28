import feathers from '@feathersjs/client';
import io from 'socket.io-client';

const port = process.env.NODE_ENV === 'production' ? 'http://localhost' : 'http://localhost:3030';
const socket = io(port, { transports: ['websocket'] });

const feathersClient = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.authentication({ storage: window.localStorage }));

export default feathersClient;
