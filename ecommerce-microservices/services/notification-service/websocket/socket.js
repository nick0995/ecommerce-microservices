import { Server } from "socket.io";

let io;
export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    
    socket.on("subscribe", (userId) => {
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export { io };
