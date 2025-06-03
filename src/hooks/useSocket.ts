import { useSocket as useSocketContext } from "@/providers/socket-provider";
import { useCallback } from "react";

export const useSocket = () => {
  const { socket, isConnected, currentUserId } = useSocketContext();

  const emit = useCallback(
    (event: string, data?: any) => {
      if (socket?.connected) {
        socket.emit(event, data);
      } else {
        console.warn("Socket not connected, cannot emit event:", event);
      }
    },
    [socket]
  );

  const on = useCallback(
    (event: string, callback: (...args: any[]) => void) => {
      if (socket) {
        socket.on(event, callback);

        // Return cleanup function
        return () => {
          socket.off(event, callback);
        };
      } else {
        console.warn("Socket not available, cannot listen to event:", event);
        return () => {};
      }
    },
    [socket]
  );

  const off = useCallback(
    (event: string, callback?: (...args: any[]) => void) => {
      if (socket) {
        socket.off(event, callback);
      }
    },
    [socket]
  );

  return {
    socket,
    isConnected,
    currentUserId,
    emit,
    on,
    off,
  };
};
