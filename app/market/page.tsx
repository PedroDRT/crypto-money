'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuth } from '@/hooks/useAuth'
import { Search, Star, TrendingDown, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface CryptoData {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  image: string
  market_cap_rank: number
}

export default function Market() {
  const { user } = useAuth()
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'market_cap' | 'price' | 'volume' | 'change'>('market_cap')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true)
        // Usar API gratuita do CoinGecko para mais criptomoedas
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')

        if (!response.ok) {
          throw new Error('Falha ao buscar dados das criptomoedas')
        }

        const data = await response.json()
        setCryptoData(data)
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
        // Fallback para dados simulados
        setCryptoData([
          {
            id: 'bitcoin',
            symbol: 'btc',
            name: 'Bitcoin',
            current_price: 43250.50,
            price_change_percentage_24h: 2.5,
            market_cap: 850000000000,
            total_volume: 28000000000,
            image: '',
            market_cap_rank: 1
          },
          {
            id: 'ethereum',
            symbol: 'eth',
            name: 'Ethereum',
            current_price: 2650.75,
            price_change_percentage_24h: -1.2,
            market_cap: 320000000000,
            total_volume: 15000000000,
            image: '',
            market_cap_rank: 2
          },
          {
            id: 'binance-coin',
            symbol: 'bnb',
            name: 'BNB',
            current_price: 320,
            price_change_percentage_24h: 5.8,
            market_cap: 52000000000,
            total_volume: 2800000000,
            image: '',
            market_cap_rank: 3
          },
          {
            id: 'cardano',
            symbol: 'ada',
            name: 'Cardano',
            current_price: 0.485,
            price_change_percentage_24h: 3.2,
            market_cap: 17000000000,
            total_volume: 1200000000,
            image: '',
            market_cap_rank: 4
          },
          {
            id: 'solana',
            symbol: 'sol',
            name: 'Solana',
            current_price: 98.50,
            price_change_percentage_24h: -2.1,
            market_cap: 45000000000,
            total_volume: 2500000000,
            image: '',
            market_cap_rank: 5
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchCryptoData()

    // Atualizar dados a cada 60 segundos
    const interval = setInterval(fetchCryptoData, 60000)

    return () => clearInterval(interval)
  }, [])

  const formatCurrency = (value: number) => {
    if (value >= 1e9) {
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
    return `$${price.toFixed(4)}`
  }

  const filteredAndSortedData = cryptoData
    .filter(crypto =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue: number, bValue: number

      switch (sortBy) {
        case 'market_cap':
          aValue = a.market_cap
          bValue = b.market_cap
          break
        case 'price':
          aValue = a.current_price
          bValue = b.current_price
          break
        case 'volume':
          aValue = a.total_volume
          bValue = b.total_volume
          break
        case 'change':
          aValue = a.price_change_percentage_24h
          bValue = b.price_change_percentage_24h
          break
        default:
          aValue = a.market_cap
          bValue = b.market_cap
      }

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue
    })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso Negado</h1>
          <p className="text-gray-600">Você precisa estar logado para acessar o market.</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Market de Criptomoedas</h1>
        <p className="text-gray-600">Acompanhe preços em tempo real e analise o mercado</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar criptomoedas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
            >
              <option value="market_cap">Market Cap</option>
              <option value="price">Preço</option>
              <option value="volume">Volume</option>
              <option value="change">24h Change</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-primary focus:border-primary"
            >
              {sortOrder === 'asc' ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Market Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Total Market Cap</div>
          <div className="text-xl font-bold text-gray-900">
            ${(cryptoData.reduce((total, crypto) => total + crypto.market_cap, 0) / 1e12).toFixed(2)}T
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">24h Volume</div>
          <div className="text-xl font-bold text-gray-900">
            ${(cryptoData.reduce((total, crypto) => total + crypto.total_volume, 0) / 1e9).toFixed(2)}B
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Criptomoedas</div>
          <div className="text-xl font-bold text-gray-900">{cryptoData.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600">Dominância BTC</div>
          <div className="text-xl font-bold text-gray-900">
            {cryptoData.length > 0 ? ((cryptoData[0]?.market_cap / cryptoData.reduce((total, crypto) => total + crypto.market_cap, 0)) * 100).toFixed(1) : 0}%
          </div>
        </div>
      </div>

      {/* Crypto List */}
      {loading ? (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    24h Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market Cap
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Volume 24h
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedData.map((crypto) => (
                  <tr key={crypto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {crypto.market_cap_rank}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {crypto.image ? (
                            <img
                              src={crypto.image}
                              alt={crypto.name}
                              className="h-10 w-10 rounded-full"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">{crypto.symbol.toUpperCase()}</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{crypto.name}</div>
                          <div className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(crypto.current_price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        crypto.price_change_percentage_24h >= 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(crypto.market_cap)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(crypto.total_volume)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex space-x-2">
                        <Link
                          href={`/market/${crypto.id}`}
                          className="text-primary hover:text-primary-dark font-medium"
                        >
                          Ver Detalhes
                        </Link>
                        <button className="text-gray-400 hover:text-yellow-500">
                          <Star className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhuma criptomoeda encontrada com os filtros aplicados.</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination Info */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Mostrando {filteredAndSortedData.length} de {cryptoData.length} criptomoedas
      </div>
    </DashboardLayout>
  )
}
