import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/config';

let socket = null;

export const initSocket = (token) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      auth: { token }
    });
  }
  return socket;
};

export const getSocket = () => socket;

const defaultSocket = io(SOCKET_URL, {
  autoConnect: false,
});

export default defaultSocket;
