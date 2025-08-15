'use client'

import { motion } from 'framer-motion'
import { BarChart3, DollarSign, TrendingDown, TrendingUp } from 'lucide-react'

interface CryptoData {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  marketCap: number
  volume: number
  color: string
}

interface CryptoCardProps {
  crypto: CryptoData
}

export default function CryptoCard({ crypto }: CryptoCardProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`
    } else if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(2)}K`
    }
    return `$${value.toFixed(2)}`
  }

  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `$${price.toLocaleString()}`
    }
    return `$${price.toFixed(2)}`
  }

  const isPositive = crypto.change24h >= 0

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="card group cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: crypto.color }}
          >
            <span className="text-white font-bold text-sm">
              {crypto.symbol.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{crypto.name}</h3>
            <p className="text-sm text-gray-500">{crypto.symbol}</p>
          </div>
        </div>

        {/* Price Change Indicator */}
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
          isPositive
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{Math.abs(crypto.change24h).toFixed(2)}%</span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-900">
          {formatPrice(crypto.price)}
        </p>
        <p className={`text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? '+' : ''}{crypto.change24h.toFixed(2)}% (24h)
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Market Cap</p>
            <p className="text-sm font-medium text-gray-900">
              {formatCurrency(crypto.marketCap)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <BarChart3 className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Volume 24h</p>
            <p className="text-sm font-medium text-gray-900">
              {formatCurrency(crypto.volume)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-6">
        <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
          Comprar
        </button>
        <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200">
          Vender
        </button>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 to-primary-800/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  )
}
