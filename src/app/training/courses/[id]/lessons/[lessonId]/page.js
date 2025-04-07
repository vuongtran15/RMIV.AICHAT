'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  ArrowRightIcon,
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  LinkIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;
  const lessonId = params.lessonId;
  
  // State for lesson data and progress
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuizButton, setShowQuizButton] = useState(false);
  const [slideStartTime, setSlideStartTime] = useState(Date.now());
  const [videoProgress, setVideoProgress] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const [minimumViewTimeReached, setMinimumViewTimeReached] = useState(false);
  
  // Refs
  const slidesContainerRef = useRef(null);
  const videoRef = useRef(null);
  const minimumViewTimeRef = useRef(null);
  const videoProgressIntervalRef = useRef(null);
  
  // Mock lesson data - in a real app, this would come from an API
  const [slides, setSlides] = useState([
    { 
      id: 1, 
      type: 'video',
      title: 'Giới thiệu bài học',
      content: 'https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1', // Added autoplay parameter
      duration: '2:30'
    },
    { 
      id: 2, 
      type: 'image',
      title: 'Khái niệm cơ bản',
      content: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Hình ảnh minh họa các khái niệm cơ bản về an toàn lao động'
    },
    { 
      id: 3, 
      type: 'text',
      title: 'Quy định an toàn',
      content: `
        <h3>Quy định an toàn lao động</h3>
        <p>An toàn lao động là một trong những vấn đề quan trọng nhất trong môi trường làm việc. Các quy định về an toàn lao động được thiết lập để bảo vệ sức khỏe và tính mạng của người lao động.</p>
        <p>Một số quy định cơ bản về an toàn lao động bao gồm:</p>
        <ul>
          <li>Luôn sử dụng thiết bị bảo hộ cá nhân phù hợp</li>
          <li>Tuân thủ các quy trình làm việc an toàn</li>
          <li>Báo cáo ngay các sự cố hoặc điều kiện không an toàn</li>
          <li>Tham gia các khóa đào tạo về an toàn lao động</li>
        </ul>
      `
    },
    { 
      id: 4, 
      type: 'hyperlink',
      title: 'Tài liệu tham khảo',
      content: 'https://www.labor.vn/vi/tin-tuc/quy-dinh-an-toan-lao-dong',
      description: 'Tài liệu chi tiết về quy định an toàn lao động từ Bộ Lao động'
    },
    { 
      id: 5, 
      type: 'video',
      title: 'Hướng dẫn thực hành',
      content: 'https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1', // Added autoplay parameter
      duration: '3:45'
    }
  ]);
  
  // Fetch lesson data based on ID
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      const mockLessons = {
        1: { 
          id: 1, 
          title: 'Giới thiệu khóa học', 
          courseId: 1,
          duration: '15 phút',
          completed: false
        },
        2: { 
          id: 2, 
          title: 'Kiến thức nền tảng', 
          courseId: 1,
          duration: '30 phút',
          completed: false
        },
        3: { 
          id: 3, 
          title: 'Bài tập thực hành', 
          courseId: 1,
          duration: '45 phút',
          completed: false
        }
      };
      
      setLesson(mockLessons[lessonId] || null);
      setLoading(false);
    }, 500);
  }, [lessonId]);
  
  // Check if we've reached the end of the slides
  useEffect(() => {
    if (currentSlideIndex === slides.length - 1) {
      setShowQuizButton(true);
    } else {
      setShowQuizButton(false);
    }
  }, [currentSlideIndex, slides.length]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && canProceed) {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
        goToPreviousSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlideIndex, canProceed]);
  
  // Reset slide timer when changing slides
  useEffect(() => {
    setSlideStartTime(Date.now());
    setCanProceed(false);
    setMinimumViewTimeReached(false);
    setVideoProgress(0);
    
    // Clear any existing intervals
    if (minimumViewTimeRef.current) {
      clearTimeout(minimumViewTimeRef.current);
    }
    if (videoProgressIntervalRef.current) {
      clearInterval(videoProgressIntervalRef.current);
    }
    
    // Set minimum viewing time (5 seconds)
    minimumViewTimeRef.current = setTimeout(() => {
      setMinimumViewTimeReached(true);
      if (slides[currentSlideIndex].type !== 'video') {
        setCanProceed(true);
      }
    }, 5000);
    
    // Auto-play video when changing to a video slide
    if (slides[currentSlideIndex].type === 'video') {
      setIsPlaying(true);
    }
    
    return () => {
      if (minimumViewTimeRef.current) {
        clearTimeout(minimumViewTimeRef.current);
      }
      if (videoProgressIntervalRef.current) {
        clearInterval(videoProgressIntervalRef.current);
      }
    };
  }, [currentSlideIndex, slides]);
  
  // Handle video progress tracking
  useEffect(() => {
    if (slides[currentSlideIndex].type === 'video') {
      // For YouTube iframe, we can't directly track progress
      // In a real app, you would use the YouTube Player API
      // For now, we'll simulate progress with a timer
      let progress = 0;
      videoProgressIntervalRef.current = setInterval(() => {
        progress += 1;
        setVideoProgress(progress);
        
        // If video progress reaches 80%, allow proceeding
        if (progress >= 80 && minimumViewTimeReached) {
          setCanProceed(true);
        }
      }, 100);
      
      return () => {
        if (videoProgressIntervalRef.current) {
          clearInterval(videoProgressIntervalRef.current);
        }
      };
    }
  }, [currentSlideIndex, minimumViewTimeReached]);
  
  // Handle navigation between slides
  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1 && canProceed) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      if (slidesContainerRef.current) {
        slidesContainerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };
  
  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      if (slidesContainerRef.current) {
        slidesContainerRef.current.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };
  
  // Handle play/pause for video slides
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Navigate to quiz page
  const goToQuiz = () => {
    router.push(`/training/courses/${courseId}/lessons/${lessonId}/quiz`);
  };
  
  // Render different slide types
  const renderSlide = (slide) => {
    switch (slide.type) {
      case 'video':
        return (
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <iframe 
              src={slide.content} 
              title={slide.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm flex justify-between items-center">
              <span>{slide.duration}</span>
              <div className="flex items-center">
                <div className="w-32 h-1 bg-gray-600 rounded-full mr-2">
                  <div 
                    className="h-full bg-pink-500 rounded-full" 
                    style={{ width: `${videoProgress}%` }}
                  ></div>
                </div>
                <span>{videoProgress}%</span>
              </div>
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <Image 
              src={slide.content} 
              alt={slide.title}
              fill
              className="object-contain"
            />
            {slide.description && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-sm">
                {slide.description}
              </div>
            )}
          </div>
        );
      case 'text':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div dangerouslySetInnerHTML={{ __html: slide.content }} className="prose max-w-none" />
          </div>
        );
      case 'hyperlink':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
            <p className="text-gray-700 mb-4">{slide.description}</p>
            <a 
              href={slide.content} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <LinkIcon className="w-5 h-5 mr-2" />
              Mở liên kết
            </a>
          </div>
        );
      default:
        return <div>Loại slide không được hỗ trợ</div>;
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  
  if (!lesson) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy bài học</h2>
        <p className="text-gray-600 mb-6">Bài học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link href={`/training/courses/${courseId}`} className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Quay lại khóa học
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Lesson header */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between">
          <Link 
            href={`/training/courses/${courseId}`} 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Quay lại khóa học
          </Link>
          <div className="text-sm text-gray-500">
            Bài {lessonId} / 3
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mt-4">{lesson.title}</h1>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <ClockIcon className="w-4 h-4 mr-1" />
          {lesson.duration}
        </div>
      </div>
      
      {/* Slides container */}
      <div 
        ref={slidesContainerRef}
        className="bg-white rounded-xl p-6 shadow-md min-h-[500px] overflow-y-auto"
      >
        {/* Slide navigation */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={goToPreviousSlide}
            disabled={currentSlideIndex === 0}
            className={`p-2 rounded-full ${
              currentSlideIndex === 0 
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          
          <div className="text-sm font-medium">
            Slide {currentSlideIndex + 1} / {slides.length}
          </div>
          
          <button 
            onClick={goToNextSlide}
            disabled={!canProceed || currentSlideIndex === slides.length - 1}
            className={`p-2 rounded-full ${
              !canProceed || currentSlideIndex === slides.length - 1
                ? 'text-gray-300 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* Current slide */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">{slides[currentSlideIndex].title}</h2>
          {renderSlide(slides[currentSlideIndex])}
        </div>
        
        {/* Slide progress indicator */}
        <div className="flex justify-center space-x-2 mb-6">
          {slides.map((_, index) => (
            <div 
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlideIndex 
                  ? 'bg-pink-500' 
                  : index < currentSlideIndex 
                    ? 'bg-green-500' 
                    : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
        
        {/* Navigation instructions */}
        <div className="text-center text-sm text-gray-500 mb-4">
          {!canProceed ? (
            <p>
              {slides[currentSlideIndex].type === 'video' 
                ? `Vui lòng xem ít nhất 80% video và đợi ít nhất 5 giây trước khi chuyển slide. (${videoProgress}% đã xem)`
                : 'Vui lòng đợi ít nhất 5 giây trước khi chuyển slide.'}
            </p>
          ) : (
            <p>Bạn có thể chuyển sang slide tiếp theo bằng nút mũi tên hoặc phím mũi tên trên bàn phím.</p>
          )}
        </div>
        
        {/* Quiz button (only shown at the end) */}
        {showQuizButton && canProceed && (
          <div className="flex justify-center mt-8">
            <button 
              onClick={goToQuiz}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-colors shadow-md"
            >
              <CheckCircleIcon className="w-5 h-5 mr-2" />
              Làm bài kiểm tra
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 