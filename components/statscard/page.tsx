'use client'

import React from 'react';

interface StatsCardProps {
  title: string
  value: string
  icon: React.ReactNode
}
export function StatsCard({
  title,
  value,
  icon,
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
      
    </div>
  )
}
