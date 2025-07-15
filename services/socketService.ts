import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your backend URL

// Authenticate the user with their wallet address
const authenticate = (walletAddress: any) => {
  return new Promise((resolve, reject) => {
    socket.emit('authenticate', { address: walletAddress });
    socket.on('authenticated', (data) => resolve(data));
    socket.on('error', (error) => reject(error));
  });
};

// Create a room
const createRoom = (roomData: any) => {
  return new Promise((resolve, reject) => {
    socket.emit('createRoom', roomData);
    socket.on('roomCreated', (data) => resolve(data));
    socket.on('error', (error) => reject(error));
  });
};

// Listen for new rooms
const onNewRoom = (callback: (...args: any[]) => void) => {
  socket.on('newRoom', callback);
};

// Listen for room updates (e.g., player count)
const onUpdateRoom = (callback: (...args: any[]) => void) => {
  socket.on('updateRoom', callback);
};

// Clean up listeners
const offNewRoom = () => socket.off('newRoom');
const offUpdateRoom = () => socket.off('updateRoom');

export default {
  socket,
  authenticate,
  createRoom,
  onNewRoom,
  onUpdateRoom,
  offNewRoom,
  offUpdateRoom,
};