'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StatsCardProps {
  label: string
  value: string
  icon: ReactNode
}

export default function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.05 }}
      className="card text-center group"
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
        <div className="text-primary-600 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>

      {/* Value */}
      <p className="text-3xl font-bold text-gray-900 mb-2">
        {value}
      </p>

      {/* Label */}
      <p className="text-gray-600 font-medium">
        {label}
      </p>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-primary-800/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}
