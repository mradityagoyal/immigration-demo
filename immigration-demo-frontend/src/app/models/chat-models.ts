
export interface ChatMessage {
    sender: MessageSender;
    message: string;
    type: MessageType;
}

// Keep in sync with main.py
export enum MessageType {
    STREAM_START = "STREAM_START",
    STREAM_END = "STREAM_END",
    STREAM_MSG = "STREAM_MSG",
    COMMAND = "COMMAND",
    CLIENT_QUESTION = "CLIENT_QUESTION",
    QUICK_ACTION = "QUICK_ACTION",
}

export enum MessageSender {
    HUMAN = 'HUMAN',
    AI = 'AI',
}