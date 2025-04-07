'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  ClockIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  TagIcon,
  BookOpenIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  PlayIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id;
  
  // Mock course data - in a real app, this would come from an API
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courseProgress, setCourseProgress] = useState('not_started'); // 'not_started', 'in_progress', 'completed'
  
  // Mock course modules
  const [modules, setModules] = useState([
    { 
      id: 1, 
      title: 'Giới thiệu khóa học', 
      duration: '15 phút',
      type: 'video',
      completed: true,
      completedAt: '2023-05-15T10:30:00'
    },
    { 
      id: 2, 
      title: 'Kiến thức nền tảng', 
      duration: '30 phút',
      type: 'video',
      completed: true,
      completedAt: '2023-05-16T14:45:00'
    },
    { 
      id: 3, 
      title: 'Bài tập thực hành', 
      duration: '45 phút',
      type: 'assignment',
      completed: false
    },
    { 
      id: 4, 
      title: 'Kiểm tra kiến thức', 
      duration: '20 phút',
      type: 'quiz',
      completed: false
    },
    { 
      id: 5, 
      title: 'Thảo luận nhóm', 
      duration: '60 phút',
      type: 'discussion',
      completed: false
    }
  ]);
  
  // Fetch course data based on ID
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock data - in a real app, this would come from an API
      const mockCourses = {
        1: { 
          id: 1, 
          title: 'An toàn lao động cơ bản', 
          department: 'Tất cả', 
          duration: '2 giờ', 
          students: 120, 
          completionRate: 85,
          tags: ['Bắt buộc', 'An toàn'],
          image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          description: 'Khóa học cung cấp kiến thức cơ bản về an toàn lao động, giúp người học nhận biết và phòng tránh các rủi ro trong môi trường làm việc.',
          instructor: 'Nguyễn Văn B',
          instructorTitle: 'Chuyên gia An toàn lao động',
          lastUpdated: '15/03/2023',
          level: 'Cơ bản',
          language: 'Tiếng Việt',
          progress: 'in_progress' // Mock progress state
        },
        2: { 
          id: 2, 
          title: 'Quy định công ty', 
          department: 'Tất cả', 
          duration: '1.5 giờ', 
          students: 150, 
          completionRate: 92,
          tags: ['Bắt buộc', 'Quy định'],
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
          description: 'Khóa học giới thiệu các quy định nội bộ của công ty, giúp nhân viên hiểu rõ về văn hóa tổ chức và các chính sách làm việc.',
          instructor: 'Trần Thị C',
          instructorTitle: 'Trưởng phòng Nhân sự',
          lastUpdated: '10/04/2023',
          level: 'Cơ bản',
          language: 'Tiếng Việt'
        },
        3: { 
          id: 3, 
          title: 'Kỹ năng giao tiếp', 
          department: 'Phòng Kinh doanh', 
          duration: '3 giờ', 
          students: 45, 
          completionRate: 78,
          tags: ['Bắt buộc', 'Kỹ năng mềm'],
          image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
          description: 'Khóa học trang bị các kỹ năng giao tiếp hiệu quả trong môi trường kinh doanh, giúp xây dựng mối quan hệ tốt với khách hàng và đồng nghiệp.',
          instructor: 'Lê Văn D',
          instructorTitle: 'Chuyên gia Đào tạo Kỹ năng mềm',
          lastUpdated: '05/05/2023',
          level: 'Trung cấp',
          language: 'Tiếng Việt'
        }
      };
      
      setCourse(mockCourses[courseId] || null);
      // Set course progress based on mock data
      if (mockCourses[courseId]) {
        setCourseProgress(mockCourses[courseId].progress || 'not_started');
      }
      setLoading(false);
    }, 500);
  }, [courseId]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy khóa học</h2>
        <p className="text-gray-600 mb-6">Khóa học bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link href="/training/home" className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Quay lại trang chủ
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Course header */}
      <div className="relative h-64 w-full rounded-xl overflow-hidden">
        <Image 
          src={course.image} 
          alt={course.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        {/* Back button at the top of the image */}
        <div className="absolute top-0 left-0 p-4 z-10">
          <Link href="/training/home" className="inline-flex items-center text-white/90 hover:text-white transition-colors">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Quay lại
          </Link>
        </div>
        
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center">
              <UserGroupIcon className="w-4 h-4 mr-1" />
              {course.students} học viên
            </div>
            <div className="flex items-center">
              <ChartBarIcon className="w-4 h-4 mr-1" />
              {course.completionRate}% hoàn thành
            </div>
          </div>
        </div>
      </div>
      
      {/* Course content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course description */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <BookOpenIcon className="w-6 h-6 mr-2 text-pink-500" />
              Giới thiệu khóa học
            </h2>
            <p className="text-gray-700 mb-4">{course.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {course.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                  <TagIcon className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </section>
          
          {/* Course modules */}
          <section className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <AcademicCapIcon className="w-6 h-6 mr-2 text-pink-500" />
              Danh sách bài học
            </h2>
            
            <div className="space-y-4">
              {modules.map((module, index) => (
                <Link 
                  key={module.id} 
                  href={`/training/courses/${courseId}/lessons/${module.id}`}
                  className="flex items-center p-5 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="flex-shrink-0 mr-5 w-10 h-10 flex items-center justify-center bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-bold shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-gray-800">{module.title}</h3>
                    <div className="flex items-center mt-1">
                      <ClockIcon className="w-4 h-4 text-gray-500 mr-1" />
                      <p className="text-sm text-gray-600">{module.duration}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {module.completed ? (
                      <div className="flex flex-col items-end">
                        <div className="flex items-center">
                          <CheckCircleIcon className="w-6 h-6 text-green-500 mr-1" />
                          <span className="text-sm text-green-600 font-medium">Hoàn thành</span>
                        </div>
                        {module.completedAt && (
                          <span className="text-xs text-gray-500 mt-1">
                            {new Date(module.completedAt).toLocaleDateString('vi-VN', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 mr-1"></div>
                        <span className="text-sm text-gray-500">Chưa hoàn thành</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course info */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4">Thông tin khóa học</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Bộ phận</p>
                <p className="font-medium">{course?.department || 'Chưa có thông tin'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Cập nhật lần cuối</p>
                <p className="font-medium">{course?.lastUpdated || 'Chưa có thông tin'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Trình độ</p>
                <p className="font-medium">{course?.level || 'Chưa có thông tin'}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Ngôn ngữ</p>
                <p className="font-medium">{course?.language || 'Chưa có thông tin'}</p>
              </div>
            </div>
          </div>
          
          {/* Enroll button */}
          <button 
            className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg ${
              courseProgress === 'not_started' 
                ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700' 
                : courseProgress === 'in_progress'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
            }`}
          >
            {courseProgress === 'not_started' ? (
              <>
                <PlayIcon className="w-5 h-5 mr-2" />
                <span>Bắt đầu học</span>
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </>
            ) : courseProgress === 'in_progress' ? (
              <>
                <ClockIcon className="w-5 h-5 mr-2" />
                <span>Đang tiến hành</span>
              </>
            ) : (
              <>
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                <span>Đã hoàn thành</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 