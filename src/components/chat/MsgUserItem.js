import { formatTime,formatMessageWithLineBreaks } from "@/utils/chatUtils";

export default function MsgUserItem({ message }) {
    return (<div key={message.id} className="message-container flex justify-end">
        <div className="message max-w-[70%] p-3 rounded-lg bg-blue-500 text-white rounded-tr-none">
            <div className="message-text">{formatMessageWithLineBreaks(message.text)}</div>
            <div className="message-time text-xs mt-1 text-blue-100" >
                {formatTime(message.timestamp)}
            </div>
        </div>
    </div>);
}
