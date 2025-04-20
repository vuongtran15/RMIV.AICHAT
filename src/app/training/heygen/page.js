'use client';

import { useState, useEffect, useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FiTrash2, FiPlusCircle } from 'react-icons/fi';

export default function HeygenPage() {
  const [voiceItems, setVoiceItems] = useState([
    { id: 1, voice: 'Annie', text: '12', sequence: 1 },
    { id: 2, voice: 'Annie', text: '321', sequence: 2 },
    { id: 3, voice: 'Annie', text: '123132', sequence: 3 },
  ]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [title, setTitle] = useState('Untitled Video');
  const textareaRefs = useRef({});

  const adjustTextareaHeight = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  const handleTextChange = (id, newText) => {
    setVoiceItems(items =>
      items.map(item =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
    adjustTextareaHeight(textareaRefs.current[id]);
  };

  // Adjust height on initial render and when items change
  useEffect(() => {
    voiceItems.forEach(item => {
      adjustTextareaHeight(textareaRefs.current[item.id]);
    });
  }, [voiceItems]);

  const handleDeleteItem = (id) => {
    setVoiceItems(items => {
      const filteredItems = items.filter(item => item.id !== id);
      return filteredItems.map((item, index) => ({
        ...item,
        sequence: index + 1
      }));
    });
    setOpenMenuId(null);
  };

  const handleAddItem = () => {
    const newId = voiceItems.length > 0 ? Math.max(...voiceItems.map(item => item.id)) + 1 : 1;
    const newSequence = voiceItems.length + 1;
    const newItem = {
      id: newId,
      voice: 'Annie',
      text: '',
      sequence: newSequence
    };
    setVoiceItems(items => [...items, newItem]);
  };

  const handleInsertItem = (currentId) => {
    const currentIndex = voiceItems.findIndex(item => item.id === currentId);
    const newId = Math.max(...voiceItems.map(item => item.id)) + 1;
    const newItem = {
      id: newId,
      voice: 'Annie',
      text: '',
      sequence: voiceItems[currentIndex].sequence + 1
    };

    setVoiceItems(items => {
      const newItems = [...items];
      newItems.splice(currentIndex + 1, 0, newItem);
      return newItems.map((item, index) => ({
        ...item,
        sequence: index + 1
      }));
    });
    setOpenMenuId(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-menu') && !event.target.closest('.menu-button')) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b border-pink-100 pb-4">
        HeyGen Video Generator
      </h1>
      
      <div className="flex w-full h-[calc(100%-4rem)]">
        <div className="w-2/5 border-r border-gray-200 flex flex-col">
          <div className="p-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl text-gray-500 mb-4 w-full bg-transparent outline-none focus:text-gray-700 transition-colors duration-200 font-medium"
              placeholder="Enter video title..."
            />
          </div>
          
          <div className="flex-1 overflow-y-auto px-4 [&::-webkit-scrollbar]:w-[1px] [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="space-y-4 pr-2">
              {voiceItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600">
                    {item.sequence}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
                      <span className="font-medium text-gray-700">{item.voice}</span>
                      <MdKeyboardArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="mt-2">
                      <textarea
                        ref={el => textareaRefs.current[item.id] = el}
                        value={item.text}
                        onChange={(e) => handleTextChange(item.id, e.target.value)}
                        className="w-full p-2 text-gray-600 outline-none resize-none bg-transparent focus:bg-gray-50 rounded-md transition-colors duration-200 overflow-hidden"
                        placeholder="Enter text for voice generation..."
                        rows={1}
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === item.id ? null : item.id);
                      }}
                      className="p-1 hover:bg-gray-100 rounded group menu-button"
                    >
                      <BsThreeDotsVertical className="w-5 h-5 text-gray-400" />
                    </button>
                    
                    {openMenuId === item.id && (
                      <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-10 dropdown-menu border border-gray-200">
                        <button
                          onClick={() => handleInsertItem(item.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                        >
                          <FiPlusCircle className="mr-3 w-4 h-4" />
                          Insert After
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t border-gray-100"
                        >
                          <FiTrash2 className="mr-3 w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-3">
              <button 
                onClick={handleAddItem}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <span>+ Scene</span>
              </button>
            </div>
          </div>
        </div>
        <div className="w-3/5 p-4">
          {/* Right half content */}
        </div>
      </div>
    </div>
  );
}
