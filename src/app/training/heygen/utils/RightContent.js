import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdTextFields } from 'react-icons/md';
import { IoImageOutline } from 'react-icons/io5';
import AvatarPopup from './AvatarPopup';
import VoicePopup from './VoicePopup';
import { BsMicFill } from 'react-icons/bs';

const RightContent = ({ voiceItems }) => {
  const [activeTab, setActiveTab] = useState('avatar');
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isVoicePopupOpen, setIsVoicePopupOpen] = useState(false);

  const handleAvatarClick = () => {
    setActiveTab('avatar');
    setIsAvatarPopupOpen(true);
  };

  const handleVoiceClick = () => {
    setActiveTab('voice');
    setIsVoicePopupOpen(true);
  };

  return (
    <div className="flex flex-col h-full ">
      {/* Toolbar Section */}
      <div className="h-16 border-b border-gray-200 flex items-center justify-center space-x-2 px-4 bg-white rounded mb-4">
        <div 
          onClick={handleAvatarClick}
          className={`p-3 rounded flex items-center justify-center w-12 h-12 transition-all
            ${activeTab === 'avatar' 
              ? 'bg-red-100 text-red-500' 
              : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <FaUserAlt className="w-5 h-5" />
        </div>
        <div 
          onClick={handleVoiceClick}
          className={`p-3 rounded flex items-center justify-center w-12 h-12 transition-all
            ${activeTab === 'voice' 
              ? 'bg-red-100 text-red-500' 
              : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <BsMicFill className="w-5 h-5" />
        </div>
        <div 
          onClick={() => setActiveTab('text')}
          className={`p-3 rounded flex items-center justify-center w-12 h-12 transition-all
            ${activeTab === 'text' 
              ? 'bg-red-100 text-red-500' 
              : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <MdTextFields className="w-5 h-5" />
        </div>
        <div 
          onClick={() => setActiveTab('media')}
          className={`p-3 rounded flex items-center justify-center w-12 h-12 transition-all
            ${activeTab === 'media' 
              ? 'bg-red-100 text-red-500' 
              : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <IoImageOutline className="w-5 h-5" />
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 bg-purple-500 relative">
        <div className="absolute bottom-4 right-4">
          
        </div>
      </div>

      {/* Footer Section */}
      <div className="h-32 border-t border-gray-200 bg-white rounded mt-4">
        <div className="h-full p-4">
          <div className="flex gap-4 overflow-x-auto custom-scrollbar">
            {voiceItems.map((item, index) => (
              <div
                key={item.id}
                className="min-w-[150px] h-20 bg-white border border-gray-200 rounded-lg p-2 flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium">Scene {index + 1}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[100px]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Avatar Popup */}
      <AvatarPopup 
        isOpen={isAvatarPopupOpen}
        onClose={() => setIsAvatarPopupOpen(false)}
      />

      {/* Voice Popup */}
      <VoicePopup 
        isOpen={isVoicePopupOpen}
        onClose={() => setIsVoicePopupOpen(false)}
      />
    </div>
  );
};

export default RightContent; 