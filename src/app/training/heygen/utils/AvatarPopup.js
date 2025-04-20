import React, { useEffect, useState } from 'react';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

const avatars = [
  { id: 1, name: 'Anna', image: '/avatar1.png' },
  { id: 2, name: 'John', image: '/avatar2.png' },
  { id: 3, name: 'Sarah', image: '/avatar3.png' },
  { id: 4, name: 'Mike', image: '/avatar4.png' },
  { id: 5, name: 'Lisa', image: '/avatar5.png' },
  { id: 6, name: 'David', image: '/avatar6.png' },
  { id: 7, name: 'Emma', image: '/avatar7.png' },
  { id: 8, name: 'James', image: '/avatar8.png' },
  { id: 9, name: 'Sophie', image: '/avatar9.png' },
  { id: 10, name: 'William', image: '/avatar10.png' },
  { id: 11, name: 'Olivia', image: '/avatar11.png' },
  { id: 12, name: 'Daniel', image: '/avatar12.png' },
  { id: 13, name: 'Isabella', image: '/avatar13.png' },
  { id: 14, name: 'Michael', image: '/avatar14.png' },
  { id: 15, name: 'Mia', image: '/avatar15.png' },
  { id: 16, name: 'Alexander', image: '/avatar16.png' },
  { id: 17, name: 'Charlotte', image: '/avatar17.png' },
  { id: 18, name: 'Benjamin', image: '/avatar18.png' },
  { id: 19, name: 'Amelia', image: '/avatar19.png' },
  { id: 20, name: 'Henry', image: '/avatar20.png' },
];

const AvatarPopup = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const filteredAvatars = avatars.filter(avatar => 
    avatar.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white shadow-2xl rounded-xl w-[700px] min-h-[40vh] max-h-[80vh] flex flex-col border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Choose Avatar</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-800"
          >
            <IoCloseOutline className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search avatars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 h-12 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-100 focus:border-red-300 bg-white text-gray-700 placeholder-gray-400" 
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Avatar Grid */}
        <div className="p-4 overflow-y-auto flex-1 max-h-[60vh]">
          <div className="grid grid-cols-3 gap-4">
            {filteredAvatars.map((avatar) => (
              <div
                key={avatar.id}
                className="aspect-square border rounded-lg p-2 hover:border-purple-500 cursor-pointer transition-all hover:shadow-md"
              >
                <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-gray-600 font-medium text-xl">
                    {avatar.name[0]}
                  </div>
                </div>
                <p className="text-center mt-2 text-sm font-medium text-gray-700">{avatar.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarPopup; 