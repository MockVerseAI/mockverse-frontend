export interface DeepgramTranscriptionAlternative {
  transcript: string;
  confidence: number;
  words: {
    word: string;
    start: number;
    end: number;
    confidence: number;
  }[];
}

export interface DeepgramTranscriptionResult {
  channel: {
    alternatives: DeepgramTranscriptionAlternative[];
  };
  is_final: boolean;
  speech_final: boolean;
  channel_index: number[];
  duration: number;
  start: number;
  utterance?: {
    confidence: number;
    end: number;
    id: string;
    start: number;
    speaker?: number;
    words: Array<{
      confidence: number;
      end: number;
      punctuated_word: string;
      speaker?: number;
      start: number;
      word: string;
    }>;
  };
}
