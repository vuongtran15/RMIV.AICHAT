import React, { useEffect, useState, useRef, useCallback } from 'react';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

const AvatarPopup = ({ isOpen, onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const containerRef = useRef(null);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/heygen?endpoint=AVATARS', {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch characters');
        }
        const data = await response.json();
        //{ "avatar_id": "Abigail_expressive_2024112501", "avatar_name": "Abigail (Upper Body)", "gender": "female", "preview_image_url": "https://files2.heygen.ai/avatar/v3/1ad51ab9fee24ae88af067206e14a1d8_44250/preview_target.webp", "preview_video_url": "https://files2.heygen.ai/avatar/v3/1ad51ab9fee24ae88af067206e14a1d8_44250/preview_video_target.mp4", "premium": false, "type": null, "tags": null, "default_voice_id": null }
        var characters = data.data.avatars
          .filter(character => character.premium === false)
          .map(character => ({
            id: character.avatar_id,
            name: character.avatar_name,
            thumbnail_url: character.preview_image_url,
            gender: character.gender,
            premium: character.premium,
          }));
        setCharacters(characters);
        setHasMore(characters.length > ITEMS_PER_PAGE);
      } catch (err) {
        setError('Failed to load characters. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchCharacters();
    }
  }, [isOpen]);

  // Initialize displayed characters when characters or search query changes
  useEffect(() => {
    const filtered = characters.filter(character => 
      character.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedCharacters(filtered.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [characters, searchQuery]);

  // Handle scroll to load more
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isLoadingMore || !hasMore) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // Load more when user scrolls to 80% of the container
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      loadMoreCharacters();
    }
  }, [isLoadingMore, hasMore]);

  const loadMoreCharacters = () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading delay to prevent UI jank
    setTimeout(() => {
      const filtered = characters.filter(character => 
        character.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      const nextPage = page + 1;
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      
      const newCharacters = filtered.slice(startIndex, endIndex);
      
      setDisplayedCharacters(prev => [...prev, ...newCharacters]);
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
          <h2 className="text-xl font-semibold text-gray-800">Choose Character</h2>
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
              placeholder="Search characters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 h-12 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-100 focus:border-red-300 bg-white text-gray-700 placeholder-gray-400" 
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Character Grid */}
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
          ) : displayedCharacters.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-gray-500">
              No characters found
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4">
                {displayedCharacters.map(character => (
                  <div
                    key={character.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-purple-300 hover:shadow-md cursor-pointer transition-all relative flex flex-col h-[200px] bg-white"
                    onClick={() => onSelect(character)}
                  >
                    {/* Image container - optimized for character display */}
                    <div className="w-full h-[140px] bg-gray-50 relative overflow-hidden flex items-center justify-center">
                      {character.thumbnail_url ? (
                        <img 
                          src={character.thumbnail_url} 
                          alt={character.name}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center text-gray-500 font-medium text-xl">
                          {character.name?.[0] || '?'}
                        </div>
                      )}
                    </div>
                    
                    {/* Info container */}
                    <div className="p-2 bg-white flex-1 flex flex-col justify-between border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-700 truncate">{character.name || 'Unnamed Character'}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                          {character.gender || 'Unknown'}
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
                    onClick={loadMoreCharacters}
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