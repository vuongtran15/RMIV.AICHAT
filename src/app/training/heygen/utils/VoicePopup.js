import React, { useEffect, useState, useRef, useCallback } from 'react';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';

const VoicePopup = ({ isOpen, onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [voices, setVoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedVoices, setDisplayedVoices] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [groupedVoices, setGroupedVoices] = useState({});
  const [expandedLanguages, setExpandedLanguages] = useState({});
  const audioRef = useRef(typeof window !== 'undefined' ? new Audio() : null);
  const containerRef = useRef(null);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/heygen?endpoint=VOICES', {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch voices');
        }
        const data = await response.json();
        //{ "voice_id": "c8e176c17f814004885fd590e03ff99f", "language": "Multilingual", "gender": "female", "name": "Elizabeth", "preview_audio": "https://static.heygen.ai/voice_preview/nFpfJnrcHH8kBy4pGkLKT6.wav", "support_pause": false, "emotion_support": true, "support_interactive_avatar": true }
        console.log(data.data.voices);
        
        // Filter voices to only include specified languages
        const allowedLanguages = ['Multilingual', 'English', 'Chinese', 'Vietnamese'];
        var voices = data.data.voices
          .filter(voice => allowedLanguages.includes(voice.language))
          .map(voice => ({
            id: voice.voice_id,
            name: voice.name,
            gender: voice.gender,
            language: voice.language,
            preview_audio: voice.preview_audio,
            support_pause: voice.support_pause,
            emotion_support: voice.emotion_support,
            support_interactive_avatar: voice.support_interactive_avatar
          }));
        console.log(voices);
        setVoices(voices);
        setHasMore(voices.length > ITEMS_PER_PAGE);
      } catch (err) {
        console.error('Error fetching voices:', err);
        setError('Failed to load voices. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchVoices();
    }
  }, [isOpen]);

  // Group voices by language
  useEffect(() => {
    // Split search query into terms to search for each term separately
    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const filtered = voices.filter(voice => {
      // If no search terms, show all voices
      if (searchTerms.length === 0) return true;
      
      // Check if all search terms match either the name or language
      return searchTerms.every(term => 
        voice.name?.toLowerCase().includes(term) || 
        voice.language?.toLowerCase().includes(term)
      );
    });
    
    // Group voices by language
    const grouped = filtered.reduce((acc, voice) => {
      const language = voice.language || 'Unknown';
      if (!acc[language]) {
        acc[language] = [];
      }
      acc[language].push(voice);
      return acc;
    }, {});
    
    setGroupedVoices(grouped);
    
    // Initialize expanded state for each language
    const expanded = {};
    Object.keys(grouped).forEach(language => {
      expanded[language] = true; // Default to expanded
    });
    setExpandedLanguages(expanded);
    
    // Set displayed voices for pagination
    setDisplayedVoices(filtered.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(filtered.length > ITEMS_PER_PAGE);
  }, [voices, searchQuery]);

  // Handle scroll to load more
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isLoadingMore || !hasMore) return;
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    // Load more when user scrolls to 80% of the container
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      loadMoreVoices();
    }
  }, [isLoadingMore, hasMore]);

  const loadMoreVoices = () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    
    // Simulate loading delay to prevent UI jank
    setTimeout(() => {
      // Split search query into terms to search for each term separately
      const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
      
      const filtered = voices.filter(voice => {
        // If no search terms, show all voices
        if (searchTerms.length === 0) return true;
        
        // Check if all search terms match either the name or language
        return searchTerms.every(term => 
          voice.name?.toLowerCase().includes(term) || 
          voice.language?.toLowerCase().includes(term)
        );
      });
      
      const nextPage = page + 1;
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      
      const newVoices = filtered.slice(startIndex, endIndex);
      
      setDisplayedVoices(prev => [...prev, ...newVoices]);
      setPage(nextPage);
      setHasMore(endIndex < filtered.length);
      setIsLoadingMore(false);
    }, 300);
  };

  // Toggle language group expansion
  const toggleLanguageGroup = (language) => {
    setExpandedLanguages(prev => ({
      ...prev,
      [language]: !prev[language]
    }));
  };

  // Handle audio playback
  const handlePlayVoice = async (voice) => {
    try {
      if (currentlyPlaying === voice.id) {
        // If the same voice is already playing, toggle play/pause
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        // If a different voice is selected, stop current audio and play the new one
        audioRef.current.pause();
        audioRef.current.src = voice.preview_audio;
        await audioRef.current.play();
        setCurrentlyPlaying(voice.id);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    
    const handleEnded = () => {
      setIsPlaying(false);
    };
    
    const handleError = () => {
      console.error('Error playing audio');
      setIsPlaying(false);
    };
    
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

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
      // Stop audio when closing the popup
      audioRef.current.pause();
      setIsPlaying(false);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white shadow-2xl rounded-xl w-[700px] min-h-[40vh] max-h-[80vh] flex flex-col border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Choose Voice</h2>
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
              placeholder="Search by name (e.g. 'Elizabeth') or language (e.g. 'English')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 h-12 rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-100 focus:border-red-300 bg-white text-gray-700 placeholder-gray-400" 
            />
            <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 mt-1">You can search by voice name or language. Try: "English female" or "Elizabeth"</p>
        </div>

        {/* Voice Grid */}
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
          ) : Object.keys(groupedVoices).length === 0 ? (
            <div className="flex items-center justify-center h-40 text-gray-500">
              No voices found
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {Object.entries(groupedVoices).map(([language, languageVoices]) => (
                  <div key={language} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Language header */}
                    <div 
                      className="flex items-center justify-between p-3 bg-gray-50 cursor-pointer"
                      onClick={() => toggleLanguageGroup(language)}
                    >
                      <h3 className="font-medium text-gray-700">{language}</h3>
                      <span className="text-sm text-gray-500">{languageVoices.length} voices</span>
                    </div>
                    
                    {/* Voices in this language */}
                    {expandedLanguages[language] && (
                      <div className="p-4 grid grid-cols-3 gap-4">
                        {languageVoices.map(voice => (
                          <div
                            key={voice.id}
                            className="border border-gray-200 rounded-lg overflow-hidden hover:border-purple-300 hover:shadow-md cursor-pointer transition-all relative flex flex-col h-[200px] bg-white"
                            onClick={() => onSelect(voice)}
                          >
                            {/* Voice icon container with play functionality */}
                            <div 
                              className="w-full h-[140px] bg-gray-50 relative overflow-hidden flex items-center justify-center"
                            >
                              <div 
                                className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlayVoice(voice);
                                }}
                              >
                                {currentlyPlaying === voice.id && isPlaying ? (
                                  <BsPauseFill className="h-8 w-8 text-purple-500" />
                                ) : (
                                  <BsPlayFill className="h-8 w-8 text-purple-500" />
                                )}
                              </div>
                            </div>
                            
                            {/* Info container */}
                            <div className="p-2 bg-white flex-1 flex flex-col justify-between border-t border-gray-100">
                              <p className="text-sm font-medium text-gray-700 truncate">{voice.name || 'Unnamed Voice'}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-100">
                                  {voice.gender || 'Unknown'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {isLoadingMore && (
                <div className="flex justify-center mt-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-500"></div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoicePopup; 