import React, { useState, useEffect, useRef } from "react";
import ChatInputControl from "./ChatInputControl";
import MsgUserItem from "./MsgUserItem";
import MsgSystemItem from "./MsgSystemItem";

export default function ChatBoxContainer({ item }) {

    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMessages([
            // Sample initial messages for demonstration
            { id: 1, text: "Hello! How can I help you today?", sender: "system", timestamp: new Date() },
            { id: 2, text: "I need help with React hooks", sender: "user", timestamp: new Date() },
            { id: 3, text: "Of course! React hooks are functions that let you use state and lifecycle features in functional components.\nWhat specific hook would you like to learn about?", sender: "system", timestamp: new Date() }
        ]);
    }, [item.id]);

    const fnOnUserMessage = (message) => {
        console.log(message);
        const newUserMessage = {
            id: Date.now(),
            text: message,
            sender: "user",
            timestamp: new Date()
        };

        setMessages(prevMessages => [...prevMessages, newUserMessage]);

        // Simulate system response (in a real app, this would be from your API)
        setTimeout(() => {
            const systemResponse = {
                id: Date.now() + 1,
                text: "This is a simulated response. In a real application, this would come from your backend or AI service.",
                sender: "system",
                timestamp: new Date()
            };
            setMessages(prevMessages => [...prevMessages, systemResponse]);
        }, 1000);
    };

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className='main-chat chat-box-page'>
            <div className="chat-header font-medium p-5 content-center flex flex-row">
                <div className="text text-xl content-center">{item.title}</div>
            </div>
            <div className="chat-body">
                <div className="chat-introduction chat-container container mx-auto px-4 pt-2">
                    <div className="chat-messages space-y-4">
                        {messages.map((message) => (
                            message.sender === 'user' ? <MsgUserItem message={message} key={message.id} /> : 
                            <MsgSystemItem message={message} key={message.id} />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>
            <div className="chat-control chat-container container mx-auto px-4 mb-2">
                <ChatInputControl allowTyping={true} onMessageSend={msg => fnOnUserMessage(msg)} />
            </div>
        </div>
    );
}

