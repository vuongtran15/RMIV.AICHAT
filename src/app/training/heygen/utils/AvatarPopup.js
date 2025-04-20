import React, { useEffect, useState, useRef, useCallback } from 'react';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

const AvatarPopup = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedAvatars, setDisplayedAvatars] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const containerRef = useRef(null);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/heygen?endpoint=AVATARS', {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch avatars');
        }
        const data = await response.json();
        //{ "avatar_id": "Abigail_expressive_2024112501", "avatar_name": "Abigail (Upper Body)", "gender": "female", "preview_image_url": "https://files2.heygen.ai/avatar/v3/1ad51ab9fee24ae88af067206e14a1d8_44250/preview_target.webp", "preview_video_url": "https://files2.heygen.ai/avatar/v3/1ad51ab9fee24ae88af067206e14a1d8_44250/preview_video_target.mp4", "premium": false, "type": null, "tags": null, "default_voice_id": null }
        console.log(data.data.avatars);
        var avatars = data.data.avatars
          .filter(avatar => avatar.premium === false)
          .map(avatar => ({
            id: avatar.avatar_id,
            name: avatar.avatar_name,
            thumbnail_url: avatar.preview_image_url,
            gender: avatar.gender,
            premium: avatar.premium,
          }));
        setAvatars(avatars);
        setHasMore(avatars.length > ITEMS_PER_PAGE);
      } catch (err) {
        console.error('Error fetching avatars:', err);
        setError('Failed to load avatars. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchAvatars();
    }
  }, [isOpen]);

  // Initialize displayed avatars when avatars or search query changes
  useEffect(() => {
    const filtered = avatars.filter(avatar => 
      avatar.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedAvatars(filtered.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [avatars, searchQuery]);

  // Handle scroll to load more
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isLoadingMore || !hasMore) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // Load more when user scrolls to 80% of the container
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      loadMoreAvatars();
    }
  }, [isLoadingMore, hasMore]);

  const loadMoreAvatars = () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading delay to prevent UI jank
    setTimeout(() => {
      const filtered = avatars.filter(avatar => 
        avatar.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const nextPage = page + 1;
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      
      const newAvatars = filtered.slice(startIndex, endIndex);
      
      setDisplayedAvatars(prev => [...prev, ...newAvatars]);
      setPage(nextPage);
      setHasMore(endIndex < filtered.length);
      setIsLoadingMore(false);
    }, 300);
  };

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
        <div 
          ref={containerRef}
          className="p-4 overflow-y-auto flex-1 max-h-[60vh]"
          onScroll={handleScroll}
        >
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-40 text-red-500">
              {error}
            </div>
          ) : displayedAvatars.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-gray-500">
              No avatars found
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                {displayedAvatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-purple-300 hover:shadow-md cursor-pointer transition-all relative flex flex-col h-[200px] bg-white"
                  >
                    {/* Image container - optimized for avatar display */}
                    <div className="w-full h-[140px] bg-gray-50 relative overflow-hidden flex items-center justify-center">
                      {avatar.thumbnail_url ? (
                        <img 
                          src={avatar.thumbnail_url} 
                          alt={avatar.name}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center text-gray-500 font-medium text-xl">
                          {avatar.name?.[0] || '?'}
                        </div>
                      )}
                    </div>
                    
                    {/* Info container */}
                    <div className="p-2 bg-white flex-1 flex flex-col justify-between border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-700 truncate">{avatar.name || 'Unnamed Avatar'}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                          {avatar.gender || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {isLoadingMore && (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                </div>
              )}
              
              {!isLoadingMore && hasMore && (
                <div className="flex justify-center mt-4">
                  <button 
                    onClick={loadMoreAvatars}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvatarPopup; 