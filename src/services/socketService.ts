import { io, Socket } from "socket.io-client";
import { getAuthToken } from "@/lib/utils";

class SocketService {
  private socket: Socket | null = null;
  private isConnecting = false;
  private currentUserId: string | null = null;

  connect(userId?: string): Socket | null {
    if (this.socket?.connected || this.isConnecting) {
      return this.socket;
    }

    const token = getAuthToken();
    if (!token) {
      console.warn("No auth token found, cannot connect to socket");
      return null;
    }

    this.isConnecting = true;

    try {
      this.socket = io(import.meta.env.VITE_API_URL, {
        auth: {
          token,
        },
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000,
      });

      this.socket.on("connect", () => {
        console.log("Socket connected:", this.socket?.id);
        this.isConnecting = false;

        // Auto-join user room if userId provided
        if (userId) {
          this.joinUserRoom(userId);
        }
      });

      this.socket.on("disconnect", (reason) => {
        console.log("Socket disconnected:", reason);
        this.isConnecting = false;
      });

      this.socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        this.isConnecting = false;
      });

      // Store userId for reconnection scenarios
      if (userId) {
        this.currentUserId = userId;
      }

      return this.socket;
    } catch (error) {
      console.error("Failed to create socket connection:", error);
      this.isConnecting = false;
      return null;
    }
  }

  private joinUserRoom(userId: string): void {
    if (this.socket?.connected) {
      console.log("Joining user room:", userId);
      this.socket.emit("joinRoom", { roomId: userId });
      this.currentUserId = userId;
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnecting = false;
      this.currentUserId = null;
      console.log("Socket disconnected manually");
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  getCurrentUserId(): string | null {
    return this.currentUserId;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  emit(event: string, data?: any): void {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("Socket not connected, cannot emit event:", event);
    }
  }

  on(event: string, callback: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.on(event, callback);
    } else {
      console.warn("Socket not available, cannot listen to event:", event);
    }
  }

  off(event: string, callback?: (...args: any[]) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

const socketService = new SocketService();
export default socketService;
