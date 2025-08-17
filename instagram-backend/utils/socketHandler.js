// utils/socketHandler.js
const Message = require('../models/Message');

module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    // Join a room based on user ID
    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room.`);
    });

    // Handle sending private messages
    socket.on('privateMessage', async ({ senderId, receiverId, content }) => {
      const message = new Message({
        sender: senderId,
        receiver: receiverId,
        content: content,
      });
      await message.save();

      // Emit the message to the receiver's room
      io.to(receiverId).emit('newMessage', message);
      // Also emit to the sender's room to update their UI
      io.to(senderId).emit('newMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
