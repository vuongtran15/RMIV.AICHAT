import { formatTime,formatMessageWithLineBreaks } from "@/utils/chatUtils";

export default function MsgSystemItem({ message }) {
    return (<div key={message.id} className="message-container flex justify-start" >
        <div className="message max-w-[70%] p-3 rounded-lg bg-gray-200 text-gray-800 rounded-tl-none" >
            <div className="message-text">{formatMessageWithLineBreaks(message.text)}</div>
            <div className="message-time text-xs mt-1 text-gray-500" >
                {formatTime(message.timestamp)}
            </div>
        </div>
    </div>);
}
