import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { MdTextFields } from 'react-icons/md';
import { IoImageOutline } from 'react-icons/io5';
import AvatarPopup from './AvatarPopup';
import VoicePopup from './VoicePopup';
import MediaPopup from './MediaPopup';
import { BsMicFill } from 'react-icons/bs';
import MainContent from './MainContent';

const RightContent = ({ voiceItems, setVoiceItems, selectedItem, setSelectedItem }) => {
  const [activeTab, setActiveTab] = useState('avatar');
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isVoicePopupOpen, setIsVoicePopupOpen] = useState(false);
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);

  const handleAvatarClick = () => {
    if (!selectedItem) {
      
      return;
    }
    if (selectedItem.voice.type === 'silence') {
      return;
    }
    setActiveTab('avatar');
    setIsAvatarPopupOpen(true);
  };

  const handleVoiceClick = () => {
    if (!selectedItem) {
      
      return;
    }
    if (selectedItem.voice.type === 'silence') {
      return;
    }
    setActiveTab('voice');
    setIsVoicePopupOpen(true);
  };

  const handleAvatarSelect = (character) => {
    if (selectedItem) {
      const updatedItem = {
        ...selectedItem,
        character: {
          ...selectedItem.character,
          avatar_id: character.id,
          avatar_name: character.name,
          preview_image_url: character.thumbnail_url,
        }
      };
      setVoiceItems(items =>
        items.map(item =>
          item.id === selectedItem.id ? updatedItem : item
        )
      );
      setSelectedItem(updatedItem);
    }
    setIsAvatarPopupOpen(false);
  };

  const handleVoiceSelect = (voice) => {
    if (selectedItem) {
      const updatedItem = {
        ...selectedItem,
        voice: {
          ...selectedItem.voice,
          type: 'text',
          voice_id: voice.id,
          voice_name: voice.name,
          language: voice.language,
          preview_audio: voice.preview_audio,
        }
      };
      setVoiceItems(items =>
        items.map(item =>
          item.id === selectedItem.id ? updatedItem : item
        )
      );
      setSelectedItem(updatedItem);
    }
    setIsVoicePopupOpen(false);
  };

  const handleMediaSelect = (media) => {
    if (selectedItem) {
      const updatedItem = {
        ...selectedItem,
        background: {
          ...selectedItem.background,
          type: media.type,
          value: media.value
        }
      };
      setVoiceItems(items =>
        items.map(item =>
          item.id === selectedItem.id ? updatedItem : item
        )
      );
      setSelectedItem(updatedItem);
    }
    setIsMediaPopupOpen(false);
  };

  return (
    <div className="flex flex-col h-full">
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
          onClick={() => {
            setActiveTab('media');
            setIsMediaPopupOpen(true);
          }}
          className={`p-3 rounded flex items-center justify-center w-12 h-12 transition-all
            ${activeTab === 'media' 
              ? 'bg-red-100 text-red-500' 
              : 'text-gray-500 hover:bg-gray-100'}`}
        >
          <IoImageOutline className="w-5 h-5" />
        </div>
      </div>

      {/* Main Container */}
      <MainContent selectedItem={selectedItem} setVoiceItems={setVoiceItems} />

      {/* Footer Section */}
      <div className="h-32 border-t border-gray-200 bg-white rounded mt-4">
        <div className="h-full p-4">
          <div className="flex gap-4 overflow-x-auto custom-scrollbar">
            {voiceItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`min-w-[150px] h-20 bg-white border rounded-lg p-2 flex items-center gap-2 cursor-pointer transition-all
                  ${selectedItem?.id === item.id ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className={`p-2 w-10 rounded-full flex items-center justify-center
                  ${selectedItem?.id === item.id ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium">

                    {item.voice.type === 'silence' ? <span className='font-medium text-gray-700'>Silence {item.voice.duration}s</span>:
                    <span className="font-medium text-gray-700">
                      {item.character.avatar_name || 'No Character'} - {item.voice.voice_name || 'No Voice'}
                    </span>}


                    
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[100px]">{item.voice.input_text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Popup */}
      <MediaPopup 
        isOpen={isMediaPopupOpen}
        onClose={() => setIsMediaPopupOpen(false)}
        onSelect={handleMediaSelect}
      />

      {/* Avatar Popup */}
      <AvatarPopup 
        isOpen={isAvatarPopupOpen}
        onClose={() => setIsAvatarPopupOpen(false)}
        onSelect={handleAvatarSelect}
      />

      {/* Voice Popup */}
      <VoicePopup 
        isOpen={isVoicePopupOpen}
        onClose={() => setIsVoicePopupOpen(false)}
        onSelect={handleVoiceSelect}
      />
    </div>
  );
};

export default RightContent; 