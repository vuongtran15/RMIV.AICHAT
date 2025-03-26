import ChatInputControl from "./ChatInputControl";

export default function ChatBoxContainer({ item }) {
    return (
        <div className='main-chat chat-box-page'>
            <div className="chat-header font-medium p-5 content-center flex flex-row">
                <div className="text text-xl content-center">{item.title}</div>
            </div>
            <div className="chat-body">
                <div className="chat-introduction chat-container container mx-auto px-4 place-content-center">

                </div>
            </div>
            <div className="chat-control chat-container container mx-auto px-4 mb-2">
                <ChatInputControl allowTyping={true} />
            </div>
        </div>
    );
}