import React, { useState } from 'react';
import { HiMiniMicrophone } from "react-icons/hi2";
import { IoAttachSharp } from "react-icons/io5";

export default function ChatIntrodution() {
    return (
        <div className='main-chat'>
            <div className="chat-header"></div>
            <div className="chat-body">
                <div className="chat-introduction chat-container container mx-auto px-4 place-content-center">
                    <div className="chat-guide flex flex-col gap-4">
                        <div className="chat-name flex flex-row gap-4">
                            <div className="logo">
                                <img src="/images/bot.gif" alt="logo" />
                            </div>
                            <div className="chat-text flex flex-col gap-2  place-content-center">
                                <div className="bot-name font-medium text-2xl">Hi, I am Kibago, your personal AI assistant</div>
                                <div className="bot-description opacity-50">How can I help you?</div>
                            </div>
                        </div>
                        <div className="card-group grid grid-cols-3 gap-4 mt-4">
                            <div className=" card basis-1/3">
                                <div className="card-header font-medium pb-1 text-lg">Productivity Tool</div>
                                <div className="card-header-sub opacity-50 text-xs pl-2">Use for Office and Study</div>
                                <div className="card-body pt-5 flex flex-col gap-2.5">
                                    <ToolCardBodyItem
                                        image={"/images/chat.png"}
                                        title={"Chat AI Assistant"}
                                        description={"Ask me anything!"} />
                                    <ToolCardBodyItem
                                        image={"/images/document.png"}
                                        title={"Reading Assistant"}
                                        description={"Summarize and extract information from documents"} />
                                    <ToolCardBodyItem
                                        image={"/images/voice.png"}
                                        title={"Voice Assistant"}
                                        description={"Convert text to speech and vice versa"} />
                                </div>
                            </div>
                            <div className="card basis-1/3"></div>
                            <div className="card basis-1/3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chat-control chat-container container mx-auto px-4 mb-2">
                <ChatInput />
            </div>
        </div>
    );
}

function ToolCardBodyItem({ image, title, description }) {
    return (<div className="body-item flex flex-row gap-5 py-3 px-3">
        <div className="img">
            <img src={image} alt="logo" />
        </div>
        <div className="description place-content-center">
            <div className="tilte font-medium pb-1.5">{title}</div>
            <div className="desc opacity-50">
                <span>{description}</span>
            </div>
        </div>
    </div>);
}
const ChatInput = () => {
    const [content, setContent] = useState('');
    const maxLength = 500;

    const handlePaste = (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text');
        const truncatedText = text.slice(0, maxLength);
        setContent(truncatedText);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (!e.shiftKey) {
                setContent(e.currentTarget.innerHTML);
                sendMessage(e.currentTarget.innerHTML);
                e.preventDefault();
                
            }
            // Do not prevent default for Shift+Enter, allowing new line
        }
    };

    const sendMessage = (msg) => {
        if (!msg.trim()) return;
        // Process and send the message here
        console.log('Sending message:', msg);
        
        // Clear the input after sending
        setContent('');
    };

    return (
        <div className='chat-input-container'>
            <div
                contentEditable
                className="chat-input"
                spellCheck="false"
                data-gramm="false"
                data-gramm_editor="false"
                data-enable-grammarly="false"
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                suppressContentEditableWarning={true}
                dangerouslySetInnerHTML={{ __html: content }}
                placeholder="Type a message..."
                onFocus={(e) => e.currentTarget.dataset.placeholder = ''}
                onBlur={(e) => e.currentTarget.dataset.placeholder = 'Type a message...'}
                data-placeholder="Type a message..."
            />

            <div className='chat-input-action flex flex-row'>
                <div className='left-items'>
                    
                </div>
                <div className='right-items fkex flex-row gap-2'>
                    <div className='action-btn'>
                        <IoAttachSharp size={15} />
                    </div>
                    <div className='action-btn'>
                        <HiMiniMicrophone size={15} />
                    </div>
                </div>
            </div>
        </div>
    );
};