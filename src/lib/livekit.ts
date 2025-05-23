import { Room, RoomEvent } from "livekit-client";

// Placeholder for your LiveKit server URL
const LIVEKIT_SERVER_URL = "wss://your-livekit-server-url";

// Placeholder for your token generation logic
// In a real application, this would fetch a token from your backend
async function getLiveKitToken(roomName: string, participantIdentity: string): Promise<string> {
  // Replace with your actual token generation logic or backend API call
  console.log(`Fetching token for room: ${roomName}, participant: ${participantIdentity}`);
  // Example:
  // const response = await fetch(`https://your-backend.com/api/livekit-token?roomName=${roomName}&participantIdentity=${participantIdentity}`);
  // if (!response.ok) {
  //   throw new Error('Failed to fetch LiveKit token');
  // }
  // const data = await response.json();
  // return data.token;

  // For now, using a placeholder. Replace this in a real setup.
  // IMPORTANT: THIS IS NOT SECURE FOR PRODUCTION.
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGlrZXkiLCJqdGkiOiJyb29tQVBJZHVtbXkiLCJuYW1lIjoiSm9obiBEb2UiLCJuYmYiOjE2NzY2MDU2MDAsImV4cCI6MTY3NjYwOTIwMCwiaWF0IjoxNjc2NjA1NjAwLCJ2aWRlbyI6eyJyb29tIjoicm9vbUFQSWQiLCJyb29tSm9pbiI6dHJ1ZX19.dummyToken";
}

export class LiveKitService {
  private room: Room;
  private static instance: LiveKitService;

  private constructor() {
    this.room = new Room({
      // Options for the Room. See LiveKit documentation for more details.
      // Example: adaptiveStream: true, dynacast: true
    });

    // Setup basic room event listeners
    this.room
      .on(RoomEvent.Connected, () => console.log("Successfully connected to LiveKit room"))
      .on(RoomEvent.Disconnected, () => console.log("Disconnected from LiveKit room"))
      .on(RoomEvent.Reconnecting, () => console.log("Reconnecting to LiveKit room"))
      .on(RoomEvent.Reconnected, () => console.log("Successfully reconnected to LiveKit room"));
    // Add more event listeners as needed, e.g., for participant events, track events, data messages
  }

  public static getInstance(): LiveKitService {
    if (!LiveKitService.instance) {
      LiveKitService.instance = new LiveKitService();
    }
    return LiveKitService.instance;
  }

  public async connectToRoom(roomName: string, participantIdentity: string): Promise<void> {
    if (this.room.state !== "disconnected") {
      console.log("Already connected or connecting to a room.");
      return;
    }

    try {
      const token = await getLiveKitToken(roomName, participantIdentity);
      await this.room.connect(LIVEKIT_SERVER_URL, token);
      console.log(`Connected to room: ${this.room.name} as ${this.room.localParticipant.identity}`);
    } catch (error) {
      console.error("Failed to connect to LiveKit room:", error);
      // Handle connection error appropriately
    }
  }

  public disconnectFromRoom(): void {
    if (this.room.state !== "disconnected") {
      this.room.disconnect();
    }
  }

  // Add other methods here to interact with the LiveKit room,
  // such as publishing tracks, sending data messages, handling remote participants, etc.

  public getRoom(): Room {
    return this.room;
  }
}

// Example usage (optional, can be removed or commented out):
// const livekitService = LiveKitService.getInstance();
// livekitService.connectToRoom('my-interview-room', 'user123');

// To use this service elsewhere:
// import { LiveKitService } from './lib/livekit';
// const lkService = LiveKitService.getInstance();
// lkService.connectToRoom('some-room', 'some-participant');
// const room = lkService.getRoom();
// room.on(RoomEvent.DataReceived, (payload, participant) => { ... });
