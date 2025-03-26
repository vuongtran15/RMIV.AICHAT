'use client';
import React, { useState } from 'react';
import './page.scss';
import { FiSearch, FiEdit, FiTrash2 } from 'react-icons/fi';
import ChatIntrodution from '@/components/chat/ChatIntrodution';
import ChatBoxContainer from '@/components/chat/ChatBoxContainer';

const ChatPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [chatDataSource, setChatDataSource] = useState([
        { id: 1, title: 'How to use React hooks', date: '2025-03-22', isActive: false },
        { id: 2, title: 'Building responsive layouts', date: '2025-03-21', isActive: false },
        { id: 3, title: 'Next.js optimization techniques', date: '2025-03-20', isActive: false },
        { id: 4, title: 'JavaScript async/await patterns', date: '2025-03-19', isActive: false }
    ]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const addNewChat = (msg) => {
        const newChat = {
            id: Date.now(),
            title: msg || 'New Conversation',
            date: new Date().toISOString().split('T')[0],
            isActive: true
        };
        setChatDataSource([newChat, ...chatDataSource]);
    };

    const selectChat = (id) => {
        const updatedHistory = chatDataSource.map(chat => ({
            ...chat,
            isActive: chat.id === id
        }));
        setChatDataSource(updatedHistory);
    };

    const deleteChat = (e, id) => {
        e.stopPropagation(); // Prevent triggering selectChat
        const updatedHistory = chatDataSource.filter(chat => chat.id !== id);

        // If we're deleting the active chat, make the first remaining chat active
        if (chatDataSource.find(chat => chat.id === id)?.isActive && updatedHistory.length > 0) {
            updatedHistory[0].isActive = true;
        }

        setChatDataSource(updatedHistory);
    };

    const filteredChats = chatDataSource.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='chat-page'>
            <div className='chat-catgory'>
                <div className='header-box'>
                    <div className='search-and-new-row'>
                        <div className='search-box'>
                            <input
                                type="text"
                                placeholder="Search chats..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <button className="search-icon">
                                <FiSearch size={16} />
                            </button>
                        </div>
                        <button className='add-new-chat-button' onClick={e=>addNewChat()}>
                            <FiEdit size={18} />
                        </button>
                    </div>
                </div>
                <div className='chat-history'>
                    {filteredChats.length > 0 ? (
                        filteredChats.map(chat => (
                            <div
                                key={chat.id}
                                className={`chat-item ${chat.isActive ? 'active' : ''}`}
                                onClick={() => selectChat(chat.id)}
                            >
                                <div className="chat-info">
                                    <h4>{chat.title}</h4>
                                </div>
                                <button
                                    className="delete-chat"
                                    onClick={(e) => deleteChat(e, chat.id)}
                                >
                                    <FiTrash2 size={16} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">No chats found</div>
                    )}
                </div>
            </div>
            <div className='chat-content'>

                {chatDataSource.length > 0 && chatDataSource.find(chat => chat.isActive) ? (
                    <ChatBoxContainer item={chatDataSource.find(chat => chat.isActive)} />
                ) : (
                    <ChatIntrodution addNewChat={addNewChat} />
                )}

            </div>
        </div>
    );
};

export default ChatPage;