'use client';

import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  TagIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

// Constants
const ALL_DEPARTMENTS = 'Tất cả';

export default function CoursesPage() {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for departments
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

  // State for all courses (30 random courses)
  const [allCourses, setAllCourses] = useState([
    { 
      id: 1, 
      title: 'An toàn lao động cơ bản', 
      department: 'Phòng Sản xuất', 
      duration: '2 giờ', 
      students: 120, 
      completionRate: 85,
      tags: ['Bắt buộc', 'An toàn'],
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 2, 
      title: 'Quy định công ty', 
      department: 'Phòng Hành chính', 
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
    },
    { 
      id: 9, 
      title: 'Excel nâng cao', 
      department: 'Phòng Kế toán', 
      duration: '5 giờ', 
      students: 25, 
      completionRate: 60,
      tags: ['Tùy chọn', 'Excel'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 10, 
      title: 'Quản lý thời gian hiệu quả', 
      department: 'Phòng Nhân sự', 
      duration: '2 giờ', 
      students: 80, 
      completionRate: 75,
      tags: ['Tùy chọn', 'Kỹ năng mềm'],
      image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80'
    },
    { 
      id: 11, 
      title: 'Lập kế hoạch dự án', 
      department: 'Phòng IT', 
      duration: '3.5 giờ', 
      students: 20, 
      completionRate: 55,
      tags: ['Tùy chọn', 'Quản lý'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 12, 
      title: 'Kỹ năng lãnh đạo', 
      department: 'Phòng Nhân sự', 
      duration: '4 giờ', 
      students: 30, 
      completionRate: 70,
      tags: ['Tùy chọn', 'Kỹ năng mềm'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 13, 
      title: 'Quản lý nhân sự', 
      department: 'Phòng Nhân sự', 
      duration: '3 giờ', 
      students: 25, 
      completionRate: 65,
      tags: ['Bắt buộc', 'Nhân sự'],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 14, 
      title: 'Quản lý tài chính nâng cao', 
      department: 'Phòng Tài chính', 
      duration: '5 giờ', 
      students: 15, 
      completionRate: 50,
      tags: ['Bắt buộc', 'Tài chính'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80'
    },
    { 
      id: 15, 
      title: 'Quản lý sản xuất', 
      department: 'Phòng Sản xuất', 
      duration: '4 giờ', 
      students: 40, 
      completionRate: 60,
      tags: ['Bắt buộc', 'Sản xuất'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 16, 
      title: 'Quản lý dự án nâng cao', 
      department: 'Phòng IT', 
      duration: '5 giờ', 
      students: 20, 
      completionRate: 45,
      tags: ['Tùy chọn', 'Quản lý'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 17, 
      title: 'Quản lý marketing', 
      department: 'Phòng Marketing', 
      duration: '3.5 giờ', 
      students: 30, 
      completionRate: 55,
      tags: ['Bắt buộc', 'Marketing'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 18, 
      title: 'Quản lý hành chính', 
      department: 'Phòng Hành chính', 
      duration: '2.5 giờ', 
      students: 25, 
      completionRate: 65,
      tags: ['Bắt buộc', 'Hành chính'],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 19, 
      title: 'Quản lý pháp chế', 
      department: 'Phòng Pháp chế', 
      duration: '4 giờ', 
      students: 20, 
      completionRate: 50,
      tags: ['Bắt buộc', 'Pháp chế'],
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 20, 
      title: 'Quản lý R&D', 
      department: 'Phòng R&D', 
      duration: '4.5 giờ', 
      students: 15, 
      completionRate: 45,
      tags: ['Bắt buộc', 'R&D'],
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 21, 
      title: 'Kỹ năng thuyết trình', 
      department: 'Phòng Marketing', 
      duration: '2.5 giờ', 
      students: 60, 
      completionRate: 70,
      tags: ['Tùy chọn', 'Kỹ năng mềm'],
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
    },
    { 
      id: 22, 
      title: 'Quản lý tài chính cá nhân', 
      department: 'Phòng Tài chính', 
      duration: '3 giờ', 
      students: 45, 
      completionRate: 65,
      tags: ['Tùy chọn', 'Tài chính'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80'
    },
    { 
      id: 23, 
      title: 'Quản lý thời gian', 
      department: 'Phòng Hành chính', 
      duration: '2 giờ', 
      students: 50, 
      completionRate: 75,
      tags: ['Tùy chọn', 'Kỹ năng mềm'],
      image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80'
    },
    { 
      id: 24, 
      title: 'Quản lý dự án Agile', 
      department: 'Phòng IT', 
      duration: '5 giờ', 
      students: 25, 
      completionRate: 55,
      tags: ['Tùy chọn', 'Quản lý'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 25, 
      title: 'Quản lý nhân sự nâng cao', 
      department: 'Phòng Nhân sự', 
      duration: '4 giờ', 
      students: 20, 
      completionRate: 50,
      tags: ['Tùy chọn', 'Nhân sự'],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 26, 
      title: 'Quản lý tài chính doanh nghiệp', 
      department: 'Phòng Tài chính', 
      duration: '5 giờ', 
      students: 15, 
      completionRate: 45,
      tags: ['Tùy chọn', 'Tài chính'],
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80'
    },
    { 
      id: 27, 
      title: 'Quản lý sản xuất nâng cao', 
      department: 'Phòng Sản xuất', 
      duration: '5 giờ', 
      students: 20, 
      completionRate: 40,
      tags: ['Tùy chọn', 'Sản xuất'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 28, 
      title: 'Quản lý marketing nâng cao', 
      department: 'Phòng Marketing', 
      duration: '4.5 giờ', 
      students: 15, 
      completionRate: 45,
      tags: ['Tùy chọn', 'Marketing'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 29, 
      title: 'Quản lý hành chính nâng cao', 
      department: 'Phòng Hành chính', 
      duration: '4 giờ', 
      students: 15, 
      completionRate: 50,
      tags: ['Tùy chọn', 'Hành chính'],
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    { 
      id: 30, 
      title: 'Quản lý pháp chế nâng cao', 
      department: 'Phòng Pháp chế', 
      duration: '5 giờ', 
      students: 10, 
      completionRate: 40,
      tags: ['Tùy chọn', 'Pháp chế'],
      image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ]);

  // State for filtered courses based on search
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  
  // State for selected department
  const [selectedDepartment, setSelectedDepartment] = useState(ALL_DEPARTMENTS);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalPages, setTotalPages] = useState(1);

  // Loading state
  const [loading, setLoading] = useState(true);

  // State for department course counts
  const [departmentCourseCounts, setDepartmentCourseCounts] = useState({});

  // Calculate course counts for each department
  useEffect(() => {
    const counts = {};
    
    // Initialize counts for all departments
    departments.forEach(dept => {
      counts[dept.name] = 0;
    });
    
    // Count courses for each department
    allCourses.forEach(course => {
      // Count courses that belong to a specific department
      counts[course.department]++;
    });
    
    setDepartmentCourseCounts(counts);
  }, [allCourses, departments]);

  // Simulate loading when filters change
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedDepartment, currentPage]);

  // Filter courses based on search query and selected department
  useEffect(() => {
    let filtered = allCourses;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by department
    if (selectedDepartment !== ALL_DEPARTMENTS) {
      filtered = filtered.filter(course => 
        course.department === selectedDepartment
      );
    }
    
    setFilteredCourses(filtered);
    
    // Reset to first page when filters change
    setCurrentPage(1);
    
    // Calculate total pages
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
  }, [searchQuery, selectedDepartment, allCourses]);

  // Get current page items
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCourses.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading skeleton for course card
  const CourseCardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="relative h-40 w-full bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-5 bg-gray-200 rounded-full w-16"></div>
          <div className="h-5 bg-gray-200 rounded-full w-20"></div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );

  // Course card component with lazy loading
  const CourseCard = ({ course }) => (
    <Link href={`/training/courses/${course.id}`} className="block">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-40 w-full">
          <Image 
            src={course.image} 
            alt={course.title}
            fill
            className="object-cover"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMmUyZTIiLz48L3N2Zz4="
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
              {course.students} học viên
            </div>
            <div className="flex items-center">
              <ChartBarIcon className="w-4 h-4 mr-1" />
              {course.completionRate}% hoàn thành
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;
    
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="flex justify-center mt-8">
        <nav className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === 1
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                1
              </button>
              {startPage > 2 && <span className="text-gray-400">...</span>}
            </>
          )}
          
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`w-10 h-10 rounded-full ${
                currentPage === number
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {number}
            </button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`w-10 h-10 rounded-full ${
                  currentPage === totalPages
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {totalPages}
              </button>
            </>
          )}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </nav>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Danh sách khóa học</h1>
      
      {/* Search bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            placeholder="Tìm kiếm khóa học..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Departments sidebar with enhanced styling */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Bộ phận</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <ul className="divide-y divide-gray-200">
              <li 
                className={`px-4 py-3 cursor-pointer transition-all duration-300 ${
                  selectedDepartment === ALL_DEPARTMENTS 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' 
                    : 'hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50'
                }`}
                onClick={() => setSelectedDepartment(ALL_DEPARTMENTS)}
              >
                <div className="flex items-center">
                  <BuildingOfficeIcon className={`h-5 w-5 mr-3 ${
                    selectedDepartment === ALL_DEPARTMENTS ? 'text-white' : 'text-gray-400'
                  }`} />
                  <span className="font-medium">{ALL_DEPARTMENTS}</span>
                </div>
              </li>
              {departments.map((dept) => (
                <li 
                  key={dept.id}
                  className={`px-4 py-3 cursor-pointer transition-all duration-300 ${
                    selectedDepartment === dept.name 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md' 
                      : 'hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50'
                  }`}
                  onClick={() => setSelectedDepartment(dept.name)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BuildingOfficeIcon className={`h-5 w-5 mr-3 ${
                        selectedDepartment === dept.name ? 'text-white' : 'text-gray-400'
                      }`} />
                      <span className="font-medium">{dept.name}</span>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedDepartment === dept.name 
                        ? 'bg-white text-pink-600' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {departmentCourseCounts[dept.name] || 0}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Courses grid with pagination */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">
            {selectedDepartment === ALL_DEPARTMENTS 
              ? 'Tất cả khóa học' 
              : `Khóa học của ${selectedDepartment}`}
          </h2>
          
          {filteredCourses.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">Không tìm thấy khóa học nào phù hợp với tiêu chí tìm kiếm.</p>
            </div>
          ) : (
            <>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <CourseCardSkeleton key={index} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getCurrentPageItems().map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              <Pagination />
              
              {/* Results count */}
              <div className="mt-4 text-sm text-gray-500 text-center">
                Hiển thị {getCurrentPageItems().length} trong tổng số {filteredCourses.length} khóa học
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
