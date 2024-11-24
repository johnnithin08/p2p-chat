declare interface IMessage {
  local: boolean;
  memberId?: string;
  message: string;
  timestamp: string;
  type: "text" | "audio" | "video";
}
