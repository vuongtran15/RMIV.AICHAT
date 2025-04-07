'use client';

import { useState, useEffect } from 'react';
import { 
  AcademicCapIcon, 
  CheckCircleIcon, 
  ChartBarIcon, 
  DocumentCheckIcon,
  BuildingOfficeIcon,
  BookOpenIcon,
  TagIcon,
  UserGroupIcon,
  ClockIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  // Mock data for demonstration
  const [userStats, setUserStats] = useState({
    enrolledCourses: 12,
    completedCourses: 8,
    completionRate: 66.7,
    certificates: 5
  });

  const [departments, setDepartments] = useState([
    { id: 1, name: 'Phòng Nhân sự', requiredCourses: 5 },
    { id: 2, name: 'Phòng Kế toán', requiredCourses: 4 },
    { id: 3, name: 'Phòng IT', requiredCourses: 6 },
    { id: 4, name: 'Phòng Kinh doanh', requiredCourses: 3 },
    { id: 5, name: 'Phòng Sản xuất', requiredCourses: 7 },
    { id: 6, name: 'Phòng Marketing', requiredCourses: 4 },
    { id: 7, name: 'Phòng Hành chính', requiredCourses: 3 },
    { id: 8, name: 'Phòng Tài chính', requiredCourses: 5 },
    { id: 9, name: 'Phòng Pháp chế', requiredCourses: 4 },
    { id: 10, name: 'Phòng R&D', requiredCourses: 6 }
  ]);

  const [requiredCourses, setRequiredCourses] = useState([
    { 
      id: 1, 
      title: 'An toàn lao động cơ bản', 
      department: 'Tất cả', 
      duration: '2 giờ', 
      students: 120, 
      completionRate: 85,
      tags: ['Bắt buộc', 'An toàn'],
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 2, 
      title: 'Quy định công ty', 
      department: 'Tất cả', 
      duration: '1.5 giờ', 
      students: 150, 
      completionRate: 92,
      tags: ['Bắt buộc', 'Quy định'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 3, 
      title: 'Kỹ năng giao tiếp', 
      department: 'Phòng Kinh doanh', 
      duration: '3 giờ', 
      students: 45, 
      completionRate: 78,
      tags: ['Bắt buộc', 'Kỹ năng mềm'],
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
    },
    { 
      id: 4, 
      title: 'Bảo mật thông tin', 
      department: 'Phòng IT', 
      duration: '2.5 giờ', 
      students: 30, 
      completionRate: 65,
      tags: ['Bắt buộc', 'Bảo mật'],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 5, 
      title: 'Quy trình sản xuất', 
      department: 'Phòng Sản xuất', 
      duration: '4 giờ', 
      students: 60, 
      completionRate: 70,
      tags: ['Bắt buộc', 'Sản xuất'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 6, 
      title: 'Quản lý tài chính cơ bản', 
      department: 'Phòng Kế toán', 
      duration: '3.5 giờ', 
      students: 35, 
      completionRate: 62,
      tags: ['Bắt buộc', 'Tài chính'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80'
    },
    { 
      id: 7, 
      title: 'Quy trình tuyển dụng', 
      department: 'Phòng Nhân sự', 
      duration: '2 giờ', 
      students: 25, 
      completionRate: 58,
      tags: ['Bắt buộc', 'Nhân sự'],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 8, 
      title: 'Quản lý dự án', 
      department: 'Phòng IT', 
      duration: '4.5 giờ', 
      students: 40, 
      completionRate: 67,
      tags: ['Bắt buộc', 'Quản lý'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ]);

  const [allCourses, setAllCourses] = useState([
    { 
      id: 1, 
      title: 'An toàn lao động cơ bản', 
      department: 'Tất cả', 
      duration: '2 giờ', 
      students: 120, 
      completionRate: 85,
      tags: ['Bắt buộc', 'An toàn'],
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 2, 
      title: 'Quy định công ty', 
      department: 'Tất cả', 
      duration: '1.5 giờ', 
      students: 150, 
      completionRate: 92,
      tags: ['Bắt buộc', 'Quy định'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 3, 
      title: 'Kỹ năng giao tiếp', 
      department: 'Phòng Kinh doanh', 
      duration: '3 giờ', 
      students: 45, 
      completionRate: 78,
      tags: ['Bắt buộc', 'Kỹ năng mềm'],
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
    },
    { 
      id: 4, 
      title: 'Bảo mật thông tin', 
      department: 'Phòng IT', 
      duration: '2.5 giờ', 
      students: 30, 
      completionRate: 65,
      tags: ['Bắt buộc', 'Bảo mật'],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 5, 
      title: 'Quy trình sản xuất', 
      department: 'Phòng Sản xuất', 
      duration: '4 giờ', 
      students: 60, 
      completionRate: 70,
      tags: ['Bắt buộc', 'Sản xuất'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 6, 
      title: 'Excel nâng cao', 
      department: 'Phòng Kế toán', 
      duration: '5 giờ', 
      students: 25, 
      completionRate: 60,
      tags: ['Tùy chọn', 'Excel'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 7, 
      title: 'Quản lý thời gian hiệu quả', 
      department: 'Tất cả', 
      duration: '2 giờ', 
      students: 80, 
      completionRate: 75,
      tags: ['Tùy chọn', 'Kỹ năng mềm'],
      image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80'
    },
    { 
      id: 8, 
      title: 'Lập kế hoạch dự án', 
      department: 'Phòng IT', 
      duration: '3.5 giờ', 
      students: 20, 
      completionRate: 55,
      tags: ['Tùy chọn', 'Quản lý'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState('Tất cả');
  const [filteredRequiredCourses, setFilteredRequiredCourses] = useState(requiredCourses);

  // Filter required courses when department is selected
  useEffect(() => {
    if (selectedDepartment === 'Tất cả') {
      setFilteredRequiredCourses(requiredCourses);
    } else {
      const filtered = requiredCourses.filter(course => 
        course.department === selectedDepartment || course.department === 'Tất cả'
      );
      setFilteredRequiredCourses(filtered);
    }
  }, [selectedDepartment, requiredCourses]);

  // Course card component
  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-40 w-full">
        <Image 
          src={course.image} 
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{course.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{course.department}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {course.tags.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
              <TagIcon className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <UserGroupIcon className="w-4 h-4 mr-1" />
            {course.students}
          </div>
          <div className="flex items-center">
            <ChartBarIcon className="w-4 h-4 mr-1" />
            {course.completionRate}%
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Phần 1: Panel lời chào và thống kê */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row gap-6">
          {/* User information - left side */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mr-4">
                <span className="text-2xl font-bold">NV</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Nguyễn Văn A</h1>
                <p className="text-white/80">Nhân viên - Phòng IT</p>
              </div>
            </div>
            <p className="text-white/90">Chào mừng bạn đến với hệ thống đào tạo. Dưới đây là thống kê về tiến độ học tập của bạn.</p>
          </div>
          
          {/* Statistics - right side */}
          <div className="md:w-1/2 flex flex-wrap justify-end gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center h-[100px] w-[100px]">
              <div className="flex flex-col items-center w-full">
                <div className="bg-white/30 p-2 rounded-full mb-2">
                  <BookOpenIcon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs opacity-80 text-center">Đã tham gia</p>
                <p className="text-xl font-bold">{userStats.enrolledCourses}</p>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center h-[100px] w-[100px]">
              <div className="flex flex-col items-center w-full">
                <div className="bg-white/30 p-2 rounded-full mb-2">
                  <CheckCircleIcon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs opacity-80 text-center">Hoàn thành</p>
                <p className="text-xl font-bold">{userStats.completedCourses}</p>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center h-[100px] w-[100px]">
              <div className="flex flex-col items-center w-full">
                <div className="bg-white/30 p-2 rounded-full mb-2">
                  <ChartBarIcon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs opacity-80 text-center">Tỷ lệ</p>
                <p className="text-xl font-bold">{userStats.completionRate}%</p>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center h-[100px] w-[100px]">
              <div className="flex flex-col items-center w-full">
                <div className="bg-white/30 p-2 rounded-full mb-2">
                  <DocumentCheckIcon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs opacity-80 text-center">Chứng chỉ</p>
                <p className="text-xl font-bold">{userStats.certificates}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phần 2: Danh sách bộ phận */}
      <section className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <BuildingOfficeIcon className="w-6 h-6 mr-2 text-pink-500" />
          Bộ phận cần đào tạo
        </h2>
        
        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <div className="flex space-x-3 min-w-max">
            <button 
              onClick={() => setSelectedDepartment('Tất cả')}
              className={`p-4 rounded-lg border-2 transition-all whitespace-nowrap ${
                selectedDepartment === 'Tất cả' 
                  ? 'border-pink-500 bg-pink-50 text-pink-700' 
                  : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">Tất cả</span>
                <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-medium ml-2">
                  {requiredCourses.length} khóa
                </span>
              </div>
            </button>
            
            {departments.map(dept => (
              <button 
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.name)}
                className={`p-4 rounded-lg border-2 transition-all whitespace-nowrap ${
                  selectedDepartment === dept.name 
                    ? 'border-pink-500 bg-pink-50 text-pink-700' 
                    : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{dept.name}</span>
                  <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-medium ml-2">
                    {dept.requiredCourses} khóa
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Phần 3: Danh sách khóa học bắt buộc */}
      <section className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <AcademicCapIcon className="w-6 h-6 mr-2 text-pink-500" />
            Khóa học bắt buộc
            {selectedDepartment !== 'Tất cả' && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                (Đã lọc theo {selectedDepartment})
              </span>
            )}
          </h2>
          <Link href="/training/courses/required" className="flex items-center text-pink-600 hover:text-pink-700 font-medium">
            Xem tất cả
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRequiredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Phần 4: Danh sách tất cả khóa học */}
      <section className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <BookOpenIcon className="w-6 h-6 mr-2 text-pink-500" />
            Tất cả khóa học
          </h2>
          <Link href="/training/courses" className="flex items-center text-pink-600 hover:text-pink-700 font-medium">
            Xem tất cả
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}

