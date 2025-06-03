import socketService from "@/services/socketService";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  currentUserId: string | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  userId?: string;
}

export const SocketProvider = ({ children, isAuthenticated, userId }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && userId) {
      const newSocket = socketService.connect(userId);

      if (newSocket) {
        setSocket(newSocket);

        newSocket.on("connect", () => {
          setIsConnected(true);
          setCurrentUserId(userId);
        });

        newSocket.on("disconnect", () => {
          setIsConnected(false);
          setCurrentUserId(null);
        });
      }
    } else {
      socketService.disconnect();
      setSocket(null);
      setIsConnected(false);
      setCurrentUserId(null);
    }

    return () => {
      socketService.disconnect();
      setSocket(null);
      setIsConnected(false);
      setCurrentUserId(null);
    };
  }, [isAuthenticated, userId]);

  const value: SocketContextType = {
    socket,
    isConnected,
    currentUserId: currentUserId || socketService.getCurrentUserId(),
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
