import Message from "@/components/cards/Message";
import { IMessage } from "@/types";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Markdown from "react-markdown";
import DualAudioWaveform from "../DualAudioWaveform";

interface InterviewAnalysisProps {
  messages: IMessage[];
  recordings: {
    voice: {
      combined: string;
      assistant: string;
      user: string;
    };
    video?: string;
  };
  analysis?: string;
  isVideoEnabled: boolean;
}
const InterviewAnalysis: FC<InterviewAnalysisProps> = ({ messages, recordings, analysis, isVideoEnabled }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div
          className="scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-500 mx-auto w-full max-w-5xl overflow-y-auto p-4"
          style={{ maxHeight: "40vh" }}
        >
          {messages.map((message: IMessage, index: number) => (
            <Message key={index} message={message} className="max-w-xs md:max-w-xs lg:max-w-md xl:max-w-xl" />
          ))}
        </div>
        <div className="flex aspect-video w-full flex-col gap-4">
          {isVideoEnabled ? (
            <video className="w-full rounded-lg" controls>
              <source src={recordings?.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <DualAudioWaveform
              userAudioUrl={recordings.voice.user}
              assistantAudioUrl={recordings.voice.assistant}
              combinedAudioUrl={recordings.voice.combined}
              title="Interview Recording"
              className="h-full"
              height={50}
            />
          )}
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Markdown>{analysis}</Markdown>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewAnalysis;
