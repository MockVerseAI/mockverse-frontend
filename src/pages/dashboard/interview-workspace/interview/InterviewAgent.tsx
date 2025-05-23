import { useEffect, useState, useRef } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LiveKitService } from "@/lib/livekit";
import { RoomEvent, RemoteParticipant, ConnectionState, Participant, DataPacket_Kind } from "livekit-client";
import InterviewService from "@/services/interviewService";
import { RootState } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Laptop } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

const InterviewAgent = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { id: interviewWorkspaceId = "", interviewId = "" } = useParams();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [lastMessage, setLastMessage] = useState<string>("");
  const [agentVolumeLevel, setAgentVolumeLevel] = useState<number>(0);
  const [agentIdentity, setAgentIdentity] = useState<string | null>(null);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const livekitService = LiveKitService.getInstance();
  const room = livekitService.getRoom();

  const { mutate: startInterviewMutation, isPending } = useMutation({
    mutationFn: async () => {
      const res = await InterviewService.agent({ interviewId });
      return res?.data;
    },
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message || "Failed to start interview");
    },
    onSuccess: async (response) => {
      const assistantId = response?.data?.assistantId;
      console.log("Mutation response, assistantId:", assistantId);
      if (assistantId) {
        setAgentIdentity(assistantId);
        toast.success("Preparing interview session...");
        handleStartInterview(assistantId);
      } else {
        toast.error("Failed to get Assistant ID from server.");
        setCallStatus(CallStatus.INACTIVE);
      }
    },
  });

  const { mutate: endInterview, isPending: isEndInterviewPending } = useMutation({
    mutationFn: async () => {
      console.log("end-interview");
      const res = await InterviewService.endAgent({ interviewId, messages });
      return res?.data;
    },
    onError: (e: any) => {
      const errObj = e?.response?.data;
      toast.error(errObj.message || "Failed to start interview");
    },
    onSuccess: async () => {
      toast.success("Interview ended successfully");
      navigate(`/dashboard/interview-workspace/${interviewWorkspaceId}/interview/report/${interviewId}`);
    },
  });

  const { data: interview } = useQuery({
    queryKey: ["interview", interviewId],
    queryFn: async () => {
      const res = await InterviewService.getById(interviewId);
      return res?.data?.data;
    },
  });

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }
  }, [messages]);

  useEffect(() => {
    if (videoRef.current && webcamStream) {
      videoRef.current.srcObject = webcamStream;
    }
  }, [webcamStream]);

  useEffect(() => {
    if (callStatus === CallStatus.ACTIVE) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setWebcamStream(stream);
        })
        .catch((error) => {
          console.error("Error accessing webcam:", error);
        });
    }

    return () => {
      if (webcamStream) {
        webcamStream.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callStatus]);

  const handleStartInterview = async (currentAgentId: string) => {
    if (!currentAgentId) {
      toast.error("Agent ID not available. Cannot start interview.");
      setCallStatus(CallStatus.INACTIVE);
      return;
    }
    setCallStatus(CallStatus.CONNECTING);
    const roomName = `interview-${interviewId}`;
    const localParticipantIdentity = user?.id?.toString() || `user-${Date.now()}`;

    console.log(`Attempting to connect to LiveKit room: ${roomName} as participant: ${localParticipantIdentity}`);
    console.log("The agent for this session is expected to have identity:", currentAgentId);

    try {
      await livekitService.connectToRoom(roomName, localParticipantIdentity);
    } catch (error) {
      console.error("Failed to connect to LiveKit room:", error);
      toast.error("Error connecting to the interview room.");
      setCallStatus(CallStatus.INACTIVE);
    }
  };

  const handleDisconnect = async () => {
    console.log("Disconnecting from LiveKit room.");
    livekitService.disconnectFromRoom();
  };

  useEffect(() => {
    if (!room || !agentIdentity) {
      return;
    }

    console.log(`Setting up LiveKit event listeners. Expecting agent: ${agentIdentity}`);

    const onConnectionStateChanged = (connectionState: ConnectionState) => {
      console.log("LiveKit Connection state changed:", connectionState);
      if (connectionState === ConnectionState.Connected) {
        setCallStatus(CallStatus.ACTIVE);
        toast.success("Connected to interview room.");
      } else if (connectionState === ConnectionState.Connecting || connectionState === ConnectionState.Reconnecting) {
        setCallStatus(CallStatus.CONNECTING);
      } else if (connectionState === ConnectionState.Disconnected) {
        setCallStatus(CallStatus.FINISHED);
        toast.info("Disconnected from interview room.");
        endInterview();
      }
    };

    const onDataReceived = (payload: Uint8Array, rcvParticipant?: Participant, kind?: DataPacket_Kind) => {
      if (rcvParticipant && rcvParticipant.identity === agentIdentity) {
        try {
          const messageStr = new TextDecoder().decode(payload);
          const messageData = JSON.parse(messageStr);
          console.log("Data received from agent:", messageData);
          if (messageData.type === "transcript" && typeof messageData.transcript === "string") {
            const newMessage: SavedMessage = { role: "assistant", content: messageData.transcript };
            setMessages((prev) => [...prev, newMessage]);
          } else {
            console.warn("Received unexpected message structure from agent:", messageData);
          }
        } catch (e) {
          console.error("Failed to parse message from agent:", e);
        }
      }
    };

    const onParticipantConnected = (participant: Participant) => {
      console.log("LiveKit Participant connected:", participant.identity);
      if (participant.identity === agentIdentity) {
        console.log("Agent has joined the room.");
        toast.success("Agent connected.");
      }
    };

    const onParticipantDisconnected = (participant: Participant) => {
      console.log("LiveKit Participant disconnected:", participant.identity);
      if (participant.identity === agentIdentity) {
        console.log("Agent has left the room.");
        toast.info("Agent has disconnected.");
        setCallStatus(CallStatus.FINISHED);
      }
    };

    const onActiveSpeakerChanged = (speakers: Participant[]) => {
      const agentIsSpeaking = speakers.some((s) => s.identity === agentIdentity);
      setAgentVolumeLevel(agentIsSpeaking ? 1 : 0);
    };

    room.on(RoomEvent.ConnectionStateChanged, onConnectionStateChanged);
    room.on(RoomEvent.DataReceived, onDataReceived);
    room.on(RoomEvent.ParticipantConnected, onParticipantConnected);
    room.on(RoomEvent.ParticipantDisconnected, onParticipantDisconnected);
    room.on(RoomEvent.ActiveSpeakerChanged, onActiveSpeakerChanged);

    return () => {
      console.log("Cleaning up LiveKit event listeners.");
      room.off(RoomEvent.ConnectionStateChanged, onConnectionStateChanged);
      room.off(RoomEvent.DataReceived, onDataReceived);
      room.off(RoomEvent.ParticipantConnected, onParticipantConnected);
      room.off(RoomEvent.ParticipantDisconnected, onParticipantDisconnected);
      room.off(RoomEvent.ActiveSpeakerChanged, onActiveSpeakerChanged);
    };
  }, [room, agentIdentity, endInterview]);

  return (
    <div className="flex w-full flex-col px-4 py-4 lg:px-10 lg:py-8">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 flex-shrink-0 rounded-md p-2">
          <Laptop className="text-primary size-10" />
        </div>

        <div className="flex flex-col items-start justify-start">
          <h1 className="text-2xl font-bold">{interview?.interviewTemplateId?.name}</h1>
          <p className="text-muted-foreground text-sm">
            <span className="capitalize">{interview?.difficulty}</span> - {interview?.duration} minutes
          </p>
        </div>
      </div>
      <div className="mt-20 grid w-full grid-cols-2 gap-8">
        <Card className="relative flex min-h-96 items-center justify-center">
          <motion.div
            animate={{ scale: 1 + agentVolumeLevel, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "bg-accent absolute top-1/2 left-1/2 z-10 flex size-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
              callStatus === CallStatus.CONNECTING && "animate-ping"
            )}
          />
          <Avatar className="relative z-20 size-36">
            <AvatarImage src="/icon.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Card>

        {/* User Profile Card */}
        <Card
          className={cn("flex max-h-96 min-h-96 items-center justify-center overflow-hidden", webcamStream && "py-0")}
        >
          {webcamStream ? (
            <video ref={videoRef} autoPlay muted className="h-full w-full object-cover" />
          ) : (
            <Avatar className="size-36">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{user?.username}</AvatarFallback>
            </Avatar>
          )}
        </Card>
      </div>

      <Card className="mt-5 min-h-16 w-full py-2">
        {messages.length > 0 && (
          <div className="dark-gradient flex min-h-12 items-center justify-center rounded-2xl">
            <p
              key={lastMessage}
              className={cn(
                "text-center text-lg opacity-0 transition-opacity duration-500",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastMessage}
            </p>
          </div>
        )}
      </Card>

      <div className="mt-8 flex w-full justify-center">
        {callStatus !== CallStatus.ACTIVE ? (
          <Button isLoading={isPending} className="btn-call relative" onClick={() => startInterviewMutation()}>
            Start Interview
          </Button>
        ) : (
          <Button isLoading={isEndInterviewPending} className="btn-disconnect" onClick={() => handleDisconnect()}>
            End Interview
          </Button>
        )}
      </div>
    </div>
  );
};

export default InterviewAgent;
