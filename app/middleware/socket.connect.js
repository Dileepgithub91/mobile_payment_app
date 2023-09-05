const {Server} = require("socket.io");

const initializeSocket = (appData, customPath) => {
  const io = new Server(appData, {
    cors: {
      origin: "*",
    },
  });
  
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
};

module.exports = initializeSocket;
