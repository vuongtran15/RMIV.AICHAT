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
      {/* Back button */}
      <Link href="/training/courses" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-6">
        <ArrowLeftIcon className="w-4 h-4 mr-1" />
        Quay lại danh sách khóa học
      </Link>
      
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
          
          <div className="flex items-center">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image 
                src={instructorImageError ? getFallbackImage('instructor') : course.instructorImage} 
                alt={course.instructor}
                fill
                className="object-cover"
                onError={() => handleImageError('instructor')}
              />
            </div>
            <div>
              <p className="font-medium">{course.instructor}</p>
              <p className="text-sm text-gray-500">{course.instructorTitle}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Modules */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <BookOpenIcon className="w-6 h-6 mr-2 text-pink-500" />
              Nội dung khóa học
            </h2>
            
            <div className="space-y-4">
              {course.modules.map(module => (
                <Link 
                  key={module.id} 
                  href={`/training/courses/${courseId}/lessons/${module.id}`}
                  className="block"
                >
                  <div className={`flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-all ${
                    module.completed ? 'bg-green-50' : 'bg-white'
                  }`}>
                    <div className="flex items-center">
                      {module.completed ? (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 mr-3">
                          <CheckCircleIcon className="w-6 h-6 text-green-500" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 mr-3">
                          <XCircleIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{module.title}</h3>
                        <div className="flex items-center mt-1">
                          <p className="text-sm text-gray-500 mr-3">{module.duration}</p>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            module.completed 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {module.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg transition-colors ${
                      module.completed 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                    }`}>
                      {module.completed ? 'Xem lại' : 'Bắt đầu'}
                    </button>
                  </div>
                </Link>
              ))}
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
              </div>
            </div>
            
            <div className="text-center">
              <button className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                Tiếp tục học
              </button>
            </div>
          </section>
          
          {/* Related courses */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <AcademicCapIcon className="w-6 h-6 mr-2 text-pink-500" />
              Khóa học liên quan
            </h2>
            
            <div className="space-y-4">
              {course.relatedCourses.map(relatedCourse => (
                <Link key={relatedCourse.id} href={`/training/courses/${relatedCourse.id}`} className="block">
                  <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4">
                      <Image 
                        src={relatedImageErrors[relatedCourse.id] ? getFallbackImage('related') : relatedCourse.image} 
                        alt={relatedCourse.title}
                        fill
                        className="object-cover"
                        onError={() => handleImageError('related', relatedCourse.id)}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">{relatedCourse.title}</h3>
                      <p className="text-xs text-gray-500">{relatedCourse.duration}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 