// Defines the structure for messages exchanged with the agent via LiveKit Data Channels.

// Interface for messages stored in the chat history
export interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

// Interface for the expected structure of a transcript message from the agent
export interface AgentTranscriptMessage {
  type: "transcript";
  transcript: string;
  // Add any other fields the agent might send
}

// Add other agent-related types here as needed.
// For example, if the agent can send other types of messages:
// export interface AgentFunctionCallMessage {
//   type: "function-call";
//   functionName: string;
//   parameters: unknown;
// }
// export type AgentMessage = AgentTranscriptMessage | AgentFunctionCallMessage;
