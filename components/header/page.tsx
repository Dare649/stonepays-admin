import React from 'react'
import { MenuIcon, BellIcon, SearchIcon, UserIcon } from 'lucide-react'
interface HeaderProps {
  onMenuClick: () => void
}
export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <button className="md:hidden p-1" onClick={onMenuClick}>
          <MenuIcon className="h-6 w-6" />
        </button>
        <div className="hidden md:flex md:w-72">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center">
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-600 mr-4">
            <BellIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
              <UserIcon className="h-5 w-5" />
            </div>
            <span className="ml-2 text-sm font-medium hidden md:block">
              Admin User
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
