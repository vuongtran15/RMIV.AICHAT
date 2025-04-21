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
  ArrowRightIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

// Constants
const ALL_DEPARTMENTS = 'Tất cả';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = parseInt(params.id);
  
  // Mock course data - in a real app, this would come from an API
  const [course, setCourse] = useState({
    id: courseId,
    title: 'An toàn lao động cơ bản',
    department: 'Phòng Sản xuất',
    description: 'Khóa học này cung cấp kiến thức cơ bản về an toàn lao động, giúp nhân viên nhận biết và phòng tránh các rủi ro trong môi trường làm việc. Học viên sẽ được trang bị các kỹ năng cần thiết để đảm bảo an toàn cho bản thân và đồng nghiệp.',
    duration: '2 giờ',
    students: 120,
    completionRate: 85,
    tags: ['Bắt buộc', 'An toàn'],
    image: '/images/training/safety-basics.jpg',
    instructor: 'Nguyễn Văn B',
    instructorTitle: 'Trưởng phòng An toàn',
    instructorImage: '/images/training/instructor.jpg',
    modules: [
      {
        id: 1,
        title: 'Giới thiệu về an toàn lao động',
        duration: '30 phút',
        completed: true
      },
      {
        id: 2,
        title: 'Các quy định về an toàn lao động',
        duration: '45 phút',
        completed: true
      },
      {
        id: 3,
        title: 'Xử lý tình huống khẩn cấp',
        duration: '30 phút',
        completed: false
      },
      {
        id: 4,
        title: 'Kiểm tra cuối khóa',
        duration: '15 phút',
        completed: false
      }
    ],
    relatedCourses: [
      {
        id: 5,
        title: 'Quy trình sản xuất',
        department: 'Phòng Sản xuất',
        duration: '4 giờ',
        students: 60,
        completionRate: 70,
        tags: ['Bắt buộc', 'Sản xuất'],
        image: '/images/training/production-process.jpg'
      },
      {
        id: 6,
        title: 'Quản lý chất lượng',
        department: 'Phòng Sản xuất',
        duration: '3 giờ',
        students: 45,
        completionRate: 65,
        tags: ['Bắt buộc', 'Sản xuất'],
        image: '/images/training/quality-management.jpg'
      },
      {
        id: 7,
        title: 'An toàn hóa chất',
        department: 'Phòng Sản xuất',
        duration: '2.5 giờ',
        students: 30,
        completionRate: 55,
        tags: ['Bắt buộc', 'An toàn'],
        image: '/images/training/chemical-safety.jpg'
      }
    ]
  });
  
  const [imageError, setImageError] = useState(false);
  const [instructorImageError, setInstructorImageError] = useState(false);
  const [relatedImageErrors, setRelatedImageErrors] = useState({});

  const handleImageError = (type, id) => {
    if (type === 'main') {
      setImageError(true);
    } else if (type === 'instructor') {
      setInstructorImageError(true);
    } else if (type === 'related') {
      setRelatedImageErrors(prev => ({ ...prev, [id]: true }));
    }
  };

  const getFallbackImage = (type) => {
    switch (type) {
      case 'main':
        return '/images/course-placeholder.svg';
      case 'instructor':
        return '/images/instructor-placeholder.svg';
      case 'related':
        return '/images/related-course-placeholder.svg';
      default:
        return '/images/course-placeholder.svg';
    }
  };
  
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
  //     </div>
  //   );
  // }
  
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
    <div className="container mx-auto px-4 py-8">
      {/* Course header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="relative h-64 w-full">
          <Image 
            src={imageError ? getFallbackImage('main') : course.image} 
            alt={course.title}
            fill
            className="object-cover"
            onError={() => handleImageError('main')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          {/* Back button - positioned at the top of the image */}
          <div className="absolute top-4 left-4 z-10">
            <Link href="/training/courses" className="inline-flex items-center px-3 py-2 text-pink-600 rounded-lg transition-all">
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Quay lại danh sách khóa học
            </Link>
          </div>
          
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
            <p className="text-lg opacity-90">{course.department}</p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center">
              <ClockIcon className="w-5 h-5 text-pink-500 mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <UserGroupIcon className="w-5 h-5 text-pink-500 mr-2" />
              <span>{course.students} học viên</span>
            </div>
            <div className="flex items-center">
              <ChartBarIcon className="w-5 h-5 text-pink-500 mr-2" />
              <span>{course.completionRate}% hoàn thành</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {course.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                <TagIcon className="w-4 h-4 mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          <p className="text-gray-700 mb-6">{course.description}</p>
          
          
        </div>
      </div>
        {/* Course content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Modules */}
          <section className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <BookOpenIcon className="w-6 h-6 mr-2 text-pink-500" />
              Nội dung khóa học
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-6">
                {course.modules.map((module, index) => (
                  <div key={module.id} className="relative">                    {/* Kiểm tra xem module này có thể được truy cập hay không */}
                    {/* Module có thể được truy cập nếu đã hoàn thành hoặc là module đầu tiên chưa hoàn thành (module được mở khóa tiếp theo) */}
                    {(module.completed || 
                      (!module.completed && index === 0) || 
                      (!module.completed && index > 0 && course.modules[index-1].completed)) ? (
                      <Link 
                        href={`/training/courses/${courseId}/lessons/${module.id}`}
                        className="block"
                      >
                        <div className={`relative flex flex-col sm:flex-row items-start sm:items-center rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-md overflow-hidden ${
                          module.completed 
                            ? 'bg-gradient-to-r from-green-50 to-white' 
                            : ((!module.completed && index === 0) || (!module.completed && index > 0 && course.modules[index-1].completed))
                              ? 'bg-gradient-to-r from-pink-50/30 to-white'
                              : 'bg-gradient-to-r from-gray-50/30 to-white'
                        }`}>
                          {/* Module number indicator */}
                          <div className="absolute left-4 -ml-4 flex items-center justify-center">
                            <div className={`w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 ${
                              module.completed 
                                ? 'bg-green-500' 
                                : ((!module.completed && index === 0) || (!module.completed && index > 0 && course.modules[index-1].completed))
                                  ? 'bg-pink-500'
                                  : 'bg-gray-400'
                            }`}>
                              <span className="text-xs font-bold text-white">{module.id}</span>
                            </div>
                          </div>
                          
                          {/* Main content */}
                          <div className="w-full p-5 pl-10">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
                              <div className="mb-3 sm:mb-0">
                                <div className="flex items-center">
                                  <h3 className="font-semibold text-lg text-gray-800">{module.title}</h3>
                                  {module.completed && (
                                    <span className="ml-2 inline-flex items-center">
                                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-wrap items-center mt-2 text-sm text-gray-600">
                                  <div className="flex items-center mr-4">
                                    <ClockIcon className="w-4 h-4 mr-1 text-gray-500" />
                                    <span>{module.duration}</span>
                                  </div>                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    module.completed 
                                      ? 'bg-green-100 text-green-800' 
                                      : ((!module.completed && index === 0) || (!module.completed && index > 0 && course.modules[index-1].completed))
                                        ? 'bg-pink-100 text-pink-700'
                                        : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    {module.completed 
                                      ? 'Đã hoàn thành' 
                                      : ((!module.completed && index === 0) || (!module.completed && index > 0 && course.modules[index-1].completed))
                                        ? 'Sẵn sàng học'
                                        : 'Chưa mở khóa'}
                                  </span>
                                  {module.completed && (
                                    <span className="ml-3 text-xs text-green-600">
                                      Hoàn thành: {module.completedAt || '12/05/2023 - 14:30'}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <button className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                                  module.completed 
                                    ? 'bg-green-500 text-white hover:bg-green-600' 
                                    : 'bg-pink-500 text-white hover:bg-pink-600'
                                }`}>
                                  {module.completed ? (
                                    <>
                                      <BookOpenIcon className="w-4 h-4 mr-2" />
                                      Xem lại
                                    </>
                                  ) : (
                                    <>
                                      <PlayIcon className="w-4 h-4 mr-2" />
                                      Bắt đầu
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className={`relative flex flex-col sm:flex-row items-start sm:items-center rounded-xl border border-gray-200 transition-all duration-300 overflow-hidden bg-gray-50/50`}>
                        {/* Module number indicator (locked) */}
                        <div className="absolute left-4 -ml-4 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full border-4 border-white flex items-center justify-center z-10 bg-gray-400">
                            <span className="text-xs font-bold text-white">{module.id}</span>
                          </div>
                        </div>
                        
                        {/* Main content (locked) */}
                        <div className="w-full p-5 pl-10">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
                            <div className="mb-3 sm:mb-0">
                              <div className="flex items-center">
                                <h3 className="font-semibold text-lg text-gray-500">{module.title}</h3>
                                <span className="ml-2 inline-flex items-center">
                                  <XCircleIcon className="w-5 h-5 text-gray-400" />
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center mt-2 text-sm text-gray-500">
                                <div className="flex items-center mr-4">
                                  <ClockIcon className="w-4 h-4 mr-1 text-gray-400" />
                                  <span>{module.duration}</span>
                                </div>
                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600">
                                  Chưa mở khóa
                                </span>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <button className="flex items-center px-4 py-2 rounded-lg bg-gray-300 text-gray-600 cursor-not-allowed" disabled>
                                <XCircleIcon className="w-4 h-4 mr-2" />
                                Chưa mở khóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                      {/* Connector to next module (except for last item) */}
                    {index < course.modules.length - 1 && (
                      <div className="absolute left-4 top-full h-6 w-0.5 bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Progress */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <ChartBarIcon className="w-6 h-6 mr-2 text-pink-500" />
              Tiến độ học tập
            </h2>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Hoàn thành</span>
                <span className="text-sm font-medium text-gray-700">50%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-pink-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
              </div>            </div>
            
            <div className="text-center">
              <Link href={
                // Tìm module tiếp theo cần học dựa trên trạng thái hoàn thành
                (() => {
                  // Tìm module đầu tiên chưa hoàn thành 
                  const nextModule = course.modules.find(m => !m.completed);
                  if (nextModule) {
                    return `/training/courses/${courseId}/lessons/${nextModule.id}`;
                  }
                  // Nếu tất cả đã hoàn thành, quay lại module đầu tiên
                  return `/training/courses/${courseId}/lessons/${course.modules[0].id}`;
                })()
              }>
                <button className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center">
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Tiếp tục học
                </button>
              </Link>
            </div>
          </section>
            {/* Related courses */}
          <section className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <AcademicCapIcon className="w-6 h-6 mr-2 text-pink-500" />
              Khóa học liên quan
            </h2>
            
            <div className="space-y-4">
              {course.relatedCourses.map((relatedCourse, index) => (
                <Link key={relatedCourse.id} href={`/training/courses/${relatedCourse.id}`} className="block">
                  <div className="group relative flex items-center p-4 border border-gray-100 rounded-xl transition-all duration-300 hover:shadow-md overflow-hidden bg-gradient-to-r from-pink-50/20 to-white">
                    {/* Course number indicator */}
                    <div className="absolute left-4 -ml-2 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center z-10 bg-pink-500 group-hover:bg-pink-600 transition-colors">
                        <span className="text-xs font-bold text-white">{index + 1}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center pl-6">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 shadow-sm group-hover:shadow transition-all">
                        <Image 
                          src={relatedImageErrors[relatedCourse.id] ? getFallbackImage('related') : relatedCourse.image} 
                          alt={relatedCourse.title}
                          fill
                          className="object-cover transition-all duration-300 group-hover:scale-110"
                          onError={() => handleImageError('related', relatedCourse.id)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-800 group-hover:text-pink-700 transition-colors">{relatedCourse.title}</h3>
                        <div className="flex flex-wrap items-center mt-1 text-xs text-gray-500">
                          <div className="flex items-center mr-3">
                            <ClockIcon className="w-3 h-3 mr-1 text-pink-400" />
                            <span>{relatedCourse.duration}</span>
                          </div>
                          <div className="flex items-center mr-3">
                            <UserGroupIcon className="w-3 h-3 mr-1 text-pink-400" />
                            <span>{relatedCourse.students} học viên</span>
                          </div>
                          {relatedCourse.tags && relatedCourse.tags.length > 0 && (
                            <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                              <TagIcon className="w-3 h-3 mr-1" />
                              {relatedCourse.tags[0]}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRightIcon className="w-5 h-5 text-pink-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/training/courses" className="inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-700">
                Xem tất cả khóa học
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 