'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  BookOpenIcon, 
  UserGroupIcon, 
  CalendarIcon, 
  ChartBarIcon,
  CogIcon,
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  InformationCircleIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';

export default function TrainingLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/training', icon: HomeIcon },
    { name: 'Khóa học', href: '/training/courses', icon: BookOpenIcon },
    { name: 'Học viên', href: '/training/students', icon: UserGroupIcon },
    { name: 'Lịch học', href: '/training/schedule', icon: CalendarIcon },
    { name: 'Báo cáo', href: '/training/reports', icon: ChartBarIcon },
    { name: 'Cài đặt', href: '/training/settings', icon: CogIcon },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Sidebar */}
      <div 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-white to-pink-50 shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-pink-100 bg-gradient-to-r from-pink-500 to-rose-500">
            <Link href="/training" className="text-xl font-bold text-white text-center flex-1 uppercase tracking-wider animate-pulse hover:animate-none hover:scale-105 transition-all duration-300">
              Training
            </Link>
            <button 
              className="md:hidden text-white hover:text-pink-100 transition-colors"
              onClick={toggleSidebar}
            >
              {sidebarOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-md transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:text-pink-700 hover:shadow-sm group'
                  }`}
                >
                  <item.icon className={`w-6 h-6 mr-3 transition-transform duration-300 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-pink-500 group-hover:scale-110'}`} />
                  <span className={`transition-all duration-300 ${isActive ? 'font-bold' : 'group-hover:font-semibold group-hover:tracking-wide'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
          
          {/* User profile */}
          <div className="p-4 border-t border-pink-100 bg-gradient-to-t from-pink-50 to-white">
            <div className="relative">
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center shadow-md">
                    <span className="text-sm font-medium text-white">U</span>
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-800">User Name</p>
                  <p className="text-xs text-gray-500">user@example.com</p>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${userMenuOpen ? 'transform rotate-180' : ''}`} />
              </div>
              
              {/* Side menu */}
              {userMenuOpen && (
                <div className="absolute right-0 bottom-0 mb-0 ml-2 py-2 bg-white rounded-md shadow-lg z-50 border border-pink-100 w-48 transform translate-x-full">
                  <div className="px-4 py-2 border-b border-pink-100">
                    <p className="text-sm font-medium text-gray-800">Signed in as</p>
                    <p className="text-xs text-gray-500 truncate">user@example.com</p>
                  </div>
                  <div className="py-1">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-700 transition-colors">
                      <UserCircleIcon className="w-5 h-5 mr-3 text-gray-500" />
                      Your Profile
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-700 transition-colors">
                      <InformationCircleIcon className="w-5 h-5 mr-3 text-gray-500" />
                      Account Settings
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-700 transition-colors">
                      <Squares2X2Icon className="w-5 h-5 mr-3 text-gray-500" />
                      Other Modules
                    </a>
                  </div>
                  <div className="py-1 border-t border-pink-100">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3 text-red-500" />
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden flex items-center h-16 px-4 bg-gradient-to-r from-pink-500 to-rose-500 shadow-md">
          <button 
            className="text-white hover:text-pink-100 transition-colors"
            onClick={toggleSidebar}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <h1 className="ml-4 text-xl font-semibold text-white">Training</h1>
        </div>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-pink-50 to-rose-50">
          <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
