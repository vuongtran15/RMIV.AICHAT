'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id;
  const lessonId = params.lessonId;
  
  // State for quiz data and progress
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  
  // Mock quiz data - in a real app, this would come from an API
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: 'An toàn lao động là gì?',
      options: [
        { id: 'a', text: 'Một chương trình đào tạo bắt buộc' },
        { id: 'b', text: 'Các biện pháp bảo vệ sức khỏe và tính mạng người lao động' },
        { id: 'c', text: 'Một loại bảo hiểm' },
        { id: 'd', text: 'Một quy định không cần thiết' }
      ],
      correctAnswer: 'b'
    },
    {
      id: 2,
      question: 'Khi phát hiện điều kiện không an toàn, bạn nên làm gì?',
      options: [
        { id: 'a', text: 'Bỏ qua vì không liên quan đến mình' },
        { id: 'b', text: 'Báo cáo ngay cho cấp trên hoặc phòng an toàn' },
        { id: 'c', text: 'Tự sửa chữa mà không báo cáo' },
        { id: 'd', text: 'Chờ đợi người khác phát hiện' }
      ],
      correctAnswer: 'b'
    },
    {
      id: 3,
      question: 'Thiết bị bảo hộ cá nhân (PPE) bao gồm những gì?',
      options: [
        { id: 'a', text: 'Chỉ mũ bảo hộ' },
        { id: 'b', text: 'Chỉ giày bảo hộ' },
        { id: 'c', text: 'Mũ, kính, khẩu trang, găng tay, giày bảo hộ tùy theo công việc' },
        { id: 'd', text: 'Không cần thiết bị bảo hộ' }
      ],
      correctAnswer: 'c'
    },
    {
      id: 4,
      question: 'Tần suất kiểm tra thiết bị an toàn là bao lâu?',
      options: [
        { id: 'a', text: 'Chỉ khi thiết bị bị hỏng' },
        { id: 'b', text: 'Hàng năm' },
        { id: 'c', text: 'Theo lịch định kỳ của công ty, thường là hàng tháng hoặc hàng quý' },
        { id: 'd', text: 'Không cần kiểm tra' }
      ],
      correctAnswer: 'c'
    },
    {
      id: 5,
      question: 'Khi xảy ra tai nạn lao động, việc đầu tiên cần làm là gì?',
      options: [
        { id: 'a', text: 'Chạy trốn' },
        { id: 'b', text: 'Gọi cấp cứu và sơ cứu nạn nhân nếu có thể' },
        { id: 'c', text: 'Chụp ảnh để đăng lên mạng xã hội' },
        { id: 'd', text: 'Đợi người khác xử lý' }
      ],
      correctAnswer: 'b'
    }
  ]);
  
  // Fetch quiz data based on lesson ID
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      const mockQuiz = {
        id: 1,
        lessonId: lessonId,
        title: 'Kiểm tra kiến thức',
        description: 'Hoàn thành bài kiểm tra để đánh giá kiến thức của bạn về an toàn lao động.',
        passingScore: questions.length, // Need to get all questions correct to pass
        timeLimit: 10 // 10 minutes
      };
      
      setQuiz(mockQuiz);
      setLoading(false);
    }, 500);
  }, [lessonId, questions.length]);
  
  // Handle answer selection
  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId
    });
  };
  
  // Move to next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score
      let correctCount = 0;
      questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctCount++;
        }
      });
      
      setScore(correctCount);
      setShowResults(true);
    }
  };
  
  // Move to previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // Navigate back to lesson
  const goBackToLesson = () => {
    router.push(`/training/courses/${courseId}/lessons/${lessonId}`);
  };
  
  // Navigate to next lesson or course
  const goToNextLesson = () => {
    // In a real app, this would navigate to the next lesson
    // For now, we'll just go back to the course page
    router.push(`/training/courses/${courseId}`);
  };
  
  // Retake the quiz
  const retakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setAttempts(attempts + 1);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  
  if (!quiz) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy bài kiểm tra</h2>
        <p className="text-gray-600 mb-6">Bài kiểm tra bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link href={`/training/courses/${courseId}/lessons/${lessonId}`} className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Quay lại bài học
        </Link>
      </div>
    );
  }
  
  // Show results if quiz is completed
  if (showResults) {
    const passed = score === questions.length; // Must get all questions correct to pass
    
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h1 className="text-2xl font-bold mb-4">Kết quả bài kiểm tra</h1>
          <div className="flex items-center justify-center my-8">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
              passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              <div className="text-center">
                <div className="text-4xl font-bold">{score}/{questions.length}</div>
                <div className="text-sm mt-1">{passed ? 'Đạt' : 'Không đạt'}</div>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-gray-600">
              {passed 
                ? 'Chúc mừng! Bạn đã hoàn thành bài kiểm tra với kết quả tốt.' 
                : 'Bạn cần trả lời đúng tất cả các câu hỏi để hoàn thành bài kiểm tra.'}
            </p>
            {!passed && (
              <p className="text-gray-600 mt-2">
                Bạn đã làm {attempts + 1} lần. Vui lòng xem lại bài học và thử lại.
              </p>
            )}
          </div>
          
          <div className="flex justify-center space-x-4">
            {passed ? (
              <>
                <button 
                  onClick={goBackToLesson}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Xem lại bài học
                </button>
                
                <button 
                  onClick={goToNextLesson}
                  className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Tiếp tục
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={goBackToLesson}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Xem lại bài học
                </button>
                
                <button 
                  onClick={retakeQuiz}
                  className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  <ArrowPathIcon className="w-5 h-5 mr-2" />
                  Làm lại bài kiểm tra
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Question review */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4">Chi tiết bài kiểm tra</h2>
          
          <div className="space-y-6">
            {questions.map((question, index) => {
              const isCorrect = selectedAnswers[question.id] === question.correctAnswer;
              
              return (
                <div key={question.id} className="border-b border-gray-200 pb-4 last:border-0">
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 mr-3 ${
                      isCorrect ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {isCorrect ? (
                        <CheckCircleIcon className="w-6 h-6" />
                      ) : (
                        <XCircleIcon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium mb-2">
                        Câu {index + 1}: {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map(option => (
                          <div 
                            key={option.id}
                            className={`p-2 rounded ${
                              option.id === question.correctAnswer
                                ? 'bg-green-100 text-green-800'
                                : option.id === selectedAnswers[question.id] && !isCorrect
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100'
                            }`}
                          >
                            {option.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  
  // Show current question
  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between">
          <Link 
            href={`/training/courses/${courseId}/lessons/${lessonId}`} 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Quay lại bài học
          </Link>
          <div className="text-sm text-gray-500">
            Câu {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mt-4 mb-6">{quiz.title}</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">{currentQuestion.question}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map(option => (
              <div 
                key={option.id}
                onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedAnswers[currentQuestion.id] === option.id
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedAnswers[currentQuestion.id] === option.id
                      ? 'border-pink-500 bg-pink-500 text-white'
                      : 'border-gray-300'
                  }`}>
                    {option.id.toUpperCase()}
                  </div>
                  <span>{option.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-4 py-2 rounded-lg ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <ArrowLeftIcon className="w-5 h-5 inline-block mr-1" />
            Câu trước
          </button>
          
          <button 
            onClick={goToNextQuestion}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Hoàn thành' : 'Câu tiếp'}
            <ArrowRightIcon className="w-5 h-5 inline-block ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
} 