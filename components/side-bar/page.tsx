'use client'

import React from 'react'
import {
  HomeIcon,
  UsersIcon,
  ShoppingCartIcon,
  BarChart3Icon,
  SettingsIcon,
  HelpCircleIcon,
  XIcon,
} from 'lucide-react'
interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <div className="text-xl font-bold">Admin</div>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-5 px-2">
          <SidebarItem
            icon={<HomeIcon className="h-5 w-5" />}
            text="Dashboard"
            active
          />
          <SidebarItem icon={<UsersIcon className="h-5 w-5" />} text="Users" />
          <SidebarItem
            icon={<ShoppingCartIcon className="h-5 w-5" />}
            text="Products"
          />
          <SidebarItem
            icon={<BarChart3Icon className="h-5 w-5" />}
            text="Analytics"
          />
          <div className="mt-10 pt-6 border-t border-gray-800">
            <SidebarItem
              icon={<SettingsIcon className="h-5 w-5" />}
              text="Settings"
            />
            <SidebarItem
              icon={<HelpCircleIcon className="h-5 w-5" />}
              text="Help"
            />
          </div>
        </nav>
      </div>
    </>
  )
}
interface SidebarItemProps {
  icon: React.ReactNode
  text: string
  active?: boolean
}
function SidebarItem({ icon, text, active }: SidebarItemProps) {
  return (
    <a
      href="#"
      className={`
        flex items-center px-4 py-3 mb-1 rounded-md transition-colors
        ${active ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
      `}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </a>
  )
}
