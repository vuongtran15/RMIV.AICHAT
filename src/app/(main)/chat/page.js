'use client';
import React, { useState } from 'react';
import './page.scss';
import Image from 'next/image';
import { FiSearch, FiEdit, FiTrash2 } from 'react-icons/fi';

const ChatPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [chatHistory, setChatHistory] = useState([
        { id: 1, title: 'How to use React hooks', date: '2025-03-22', isActive: true },
        { id: 2, title: 'Building responsive layouts', date: '2025-03-21', isActive: false },
        { id: 3, title: 'Next.js optimization techniques', date: '2025-03-20', isActive: false },
        { id: 4, title: 'JavaScript async/await patterns', date: '2025-03-19', isActive: false },
        { id: 5, title: 'CSS Grid vs Flexbox', date: '2025-03-18', isActive: false },
        { id: 6, title: 'State management in React', date: '2025-03-17', isActive: false },
        { id: 7, title: 'API integration best practices', date: '2025-03-16', isActive: false },
        { id: 8, title: 'Performance optimization for web apps', date: '2025-03-15', isActive: false },
        { id: 9, title: 'Responsive design techniques', date: '2025-03-14', isActive: false },
        { id: 10, title: 'Authentication strategies in Next.js', date: '2025-03-13', isActive: false },
        { id: 11, title: 'Web accessibility guidelines', date: '2025-03-12', isActive: false },
        { id: 12, title: 'GraphQL vs REST API', date: '2025-03-11', isActive: false },
        { id: 13, title: 'Serverless architecture', date: '2025-03-10', isActive: false },
        { id: 14, title: 'Docker for frontend development', date: '2025-03-09', isActive: false },
        { id: 15, title: 'Unit testing with Jest', date: '2025-03-08', isActive: false },
        { id: 16, title: 'Form validation strategies', date: '2025-03-07', isActive: false },
        { id: 17, title: 'WebSockets and real-time data', date: '2025-03-06', isActive: false },
        { id: 18, title: 'Progressive Web Apps (PWAs)', date: '2025-03-05', isActive: false },
        { id: 19, title: 'Modern CSS features', date: '2025-03-04', isActive: false },
        { id: 20, title: 'TypeScript best practices', date: '2025-03-03', isActive: false }
    ]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const addNewChat = () => {
        const newChat = {
            id: Date.now(),
            title: 'New Conversation',
            date: new Date().toISOString().split('T')[0],
            isActive: false
        };
        setChatHistory([newChat, ...chatHistory]);
    };

    const selectChat = (id) => {
        const updatedHistory = chatHistory.map(chat => ({
            ...chat,
            isActive: chat.id === id
        }));
        setChatHistory(updatedHistory);
    };

    const deleteChat = (e, id) => {
        e.stopPropagation(); // Prevent triggering selectChat
        const updatedHistory = chatHistory.filter(chat => chat.id !== id);
        
        // If we're deleting the active chat, make the first remaining chat active
        if (chatHistory.find(chat => chat.id === id)?.isActive && updatedHistory.length > 0) {
            updatedHistory[0].isActive = true;
        }
        
        setChatHistory(updatedHistory);
    };

    const filteredChats = chatHistory.filter(chat => 
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
                        <button className='add-new-chat-button' onClick={addNewChat}>
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
                {chatHistory.length > 0 ? (
                    chatHistory.find(chat => chat.isActive)?.title || 'Select a chat to begin'
                ) : (
                    <div className="empty-state">
                        <p>No chats available. Create a new chat to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;