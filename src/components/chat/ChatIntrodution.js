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
    const maxLength = 500;
    const inputRef = React.useRef(null);

    const handlePaste = (e) => {
        e.preventDefault();
        const text = (e.clipboardData || window.clipboardData).getData('text');
        const truncatedText = text.slice(0, maxLength);
        
        // Insert the text at cursor position
        const selection = window.getSelection();
        if (selection.rangeCount) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            
            const currentLength = inputRef.current.innerText.length;
            const remainingSpace = maxLength - currentLength;
            
            if (remainingSpace > 0) {
                const textToInsert = truncatedText.slice(0, remainingSpace);
                range.insertNode(document.createTextNode(textToInsert));
            }
        }
    };

    const handleInput = (e) => {
        const text = e.currentTarget.innerText;
        if (text.length > maxLength) {
            e.currentTarget.innerText = text.slice(0, maxLength);
            // Move cursor to end
            const range = document.createRange();
            const sel = window.getSelection();
            range.setStart(e.currentTarget.childNodes[0], maxLength);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (!e.shiftKey) {
                e.preventDefault();
                const message = e.currentTarget.innerText.trim();
                if (message) {
                    sendMessage(message);
                    // Clear the input right after sending
                    if (inputRef.current) {
                        inputRef.current.innerText = '';
                    }
                }
            }
        }
    };

    const sendMessage = (msg) => {
        if (!msg.trim()) return;
        // Process and send the message here
        console.log('Sending message:', msg);
    };

    return (
        <div className='chat-input-container relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-3'>
            <div
                ref={inputRef}
                contentEditable
                className="chat-input w-full min-h-[40px] max-h-32 overflow-y-auto px-2 focus:outline-none"
                spellCheck="false"
                data-gramm="false"
                data-gramm_editor="false"
                data-enable-grammarly="false"
                onPaste={handlePaste}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                suppressContentEditableWarning={true}
                placeholder="Type a message..."
                onFocus={(e) => e.currentTarget.dataset.placeholder = ''}
                onBlur={(e) => e.currentTarget.dataset.placeholder = 'Type a message...'}
                data-placeholder="Type a message..."
            />

            <div className='chat-input-action flex flex-row justify-between items-center mt-2 px-2'>
                <div className='left-items'>
                    <span className={`text-xs ${
                        inputRef.current && inputRef.current.innerText.length >= maxLength 
                            ? 'text-red-500' 
                            : 'text-gray-400'
                    }`}>
                        {inputRef.current ? `${inputRef.current.innerText.length}/${maxLength}` : `0/${maxLength}`}
                    </span>
                </div>
                <div className='right-items flex flex-row gap-3'>
                    <button className='action-btn p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700'>
                        <IoAttachSharp size={18} />
                    </button>
                    <button className='action-btn p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700'>
                        <HiMiniMicrophone size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
