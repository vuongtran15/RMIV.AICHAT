import React, { useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const avatars = [
  { id: 1, name: 'Anna', image: '/avatar1.png' },
  { id: 2, name: 'John', image: '/avatar2.png' },
  { id: 3, name: 'Sarah', image: '/avatar3.png' },
  { id: 4, name: 'Mike', image: '/avatar4.png' },
  { id: 5, name: 'Lisa', image: '/avatar5.png' },
  { id: 6, name: 'David', image: '/avatar6.png' },
];

const AvatarPopup = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white shadow-2xl rounded-xl w-[700px] max-h-[80vh] flex flex-col border border-gray-100">
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
              className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300 bg-white text-gray-700 placeholder-gray-400"
            />
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Avatar Grid */}
        <div className="p-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-3 gap-4">
            {avatars.map((avatar) => (
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