import { useState, useEffect, useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { FiTrash2, FiPlusCircle, FiVolumeX } from 'react-icons/fi';

const MAX_ITEMS = 20;

export default function LeftContent({ title, setTitle, voiceItems, setVoiceItems, selectedItem, setSelectedItem }) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const textareaRefs = useRef({});

  const adjustTextareaHeight = (textarea) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  const handleTextChange = (id, newText) => {
    const item = voiceItems.find(item => item.id === id);
    const isSilence = item.voice.type === 'silence';

    if (isSilence) {
      // Convert input to number and validate between 1-100
      const duration = Math.min(Math.max(parseInt(newText) || 0, 1), 100);
      var updatedItems = voiceItems.map(item =>
        item.id === id ? { ...item, voice: { ...item.voice, duration } } : item
      );
    } else {
      var updatedItems = voiceItems.map(item =>
        item.id === id ? { ...item, voice: { ...item.voice, input_text: newText } } : item
      );
    }

    setVoiceItems(updatedItems);
    setSelectedItem(updatedItems.find(item => item.id === id));
    adjustTextareaHeight(textareaRefs.current[id]);
  };

  const handleDeleteItem = (id, e) => {
    e.stopPropagation();
    setVoiceItems(items => {
      const filteredItems = items.filter(item => item.id !== id);
      return filteredItems.map((item, index) => ({
        ...item,
        sequence: index + 1
      }));
    });
    setOpenMenuId(null);
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const handleAddItem = () => {
    if (voiceItems.length >= MAX_ITEMS) {
      alert(`Maximum limit of ${MAX_ITEMS} items reached`);
      return;
    }
    const newId = voiceItems.length > 0 ? Math.max(...voiceItems.map(item => item.id)) + 1 : 1;
    const newSequence = voiceItems.length + 1;
    const lastItem = voiceItems[voiceItems.length - 1];
    const newItem = {
      id: newId,
      character: lastItem ? { ...lastItem.character } : {
        avatar_id: '',
        avatar_name: '',
        preview_image_url: '',
      },
      voice: lastItem ? { ...lastItem.voice } : {
        // type: 'text', // text only
        voice_id: '',
        voice_name: '',
        language: '',
        input_text: '',
        preview_audio: '',
        duration: 0,
      },
      background: lastItem ? { ...lastItem.background } : {
        type: '', // color or image or video
        value: '',
      },
      sequence: newSequence
    };
    setVoiceItems(items => [...items, newItem]);
  };

  const handleInsertItem = (currentId) => {
    if (voiceItems.length >= MAX_ITEMS) {
      alert(`Maximum limit of ${MAX_ITEMS} items reached`);
      return;
    }
    const currentIndex = voiceItems.findIndex(item => item.id === currentId);
    const currentItem = voiceItems[currentIndex];
    const newId = Math.max(...voiceItems.map(item => item.id)) + 1;
    const newItem = {
      id: newId,
      character: { ...currentItem.character },
      voice: { ...currentItem.voice, input_text: '' },
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

  const handleInsertSilenceVoice = (currentId) => {
    if (voiceItems.length >= MAX_ITEMS) {
      alert(`Maximum limit of ${MAX_ITEMS} items reached`);
      return;
    }
    const currentIndex = voiceItems.findIndex(item => item.id === currentId);
    const currentItem = voiceItems[currentIndex];
    const newId = Math.max(...voiceItems.map(item => item.id)) + 1;
    const newItem = {
      id: newId,
      character: { ...currentItem.character },
      voice: {
        type: 'silence',
        input_text: '',
        duration: 1 // Default silence duration of 1 second
      },
      background: { ...currentItem.background },
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

  // Adjust height on initial render and when items change
  useEffect(() => {
    voiceItems.forEach(item => {
      adjustTextareaHeight(textareaRefs.current[item.id]);
    });
  }, [voiceItems]);

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
            <div
              key={item.id}
              className={`flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer ${selectedItem?.id === item.id ? 'bg-gray-100' : ''
                }`}
              onClick={() => setSelectedItem(item)}
            >
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-600">
                {item.sequence}
              </div>
              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  {item.character.avatar_id ? (
                    <div className="w-8 h-8 bg-gray-100 rounded-full">
                      {item.character.preview_image_url && (
                        <img
                          src={item.character.preview_image_url}
                          alt={item.character.avatar_name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-500">
                    </div>
                  )}
                  {item.voice.type === 'silence' ? <span className='font-medium text-gray-700'>Silence {item.voice.duration}s</span> :
                    <span className="font-medium text-gray-700">
                      {item.character.avatar_name || 'No Character'} - {item.voice.voice_name || 'No Voice'}{item.voice.language ? ` (${item.voice.language})` : ''}
                    </span>}



                </div>
                <div className="mt-2">
                  <textarea
                    ref={el => textareaRefs.current[item.id] = el}
                    value={item.voice.type === 'silence' ? item.voice.duration : item.voice.input_text}
                    onChange={(e) => handleTextChange(item.id, e.target.value)}
                    className="w-full p-2 text-gray-600 outline-none resize-none bg-transparent focus:bg-gray-50 rounded-md transition-colors duration-200 overflow-hidden"
                    placeholder={item.voice.type === 'silence' ? "Enter silence duration (1-100s)..." : "Enter text for voice generation..."}
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
                      onClick={() => handleInsertSilenceVoice(item.id)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <FiVolumeX className="mr-3 w-4 h-4" />
                      Add Silence
                    </button>
                    <button
                      onClick={(e) => handleDeleteItem(item.id, e)}
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
  );
} 