import feathers from '@feathersjs/client';
import io from 'socket.io-client';

const socket = io('http://localhost:3030', { transports: ['websocket'] });

const feathersClient = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.authentication({ storage: window.localStorage }));

export default feathersClient;
