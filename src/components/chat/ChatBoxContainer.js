export default function ChatBoxContainer({item}) {
    return (
        <div className='chat-box-container'>
            <h1>{item.title}</h1>
            <p>This is the chat box where you can chat with your friends.</p>
            <p>To get started, select a chat from the left or create a new one.</p>
        </div>
    );
}