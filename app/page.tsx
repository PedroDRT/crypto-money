'use client'

import CryptoCard from '@/components/crypto/CryptoCard'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import FeatureCard from '@/components/ui/FeatureCard'
import StatsCard from '@/components/ui/StatsCard'
import { useAuth } from '@/hooks/useAuth'
import { motion } from 'framer-motion'
import {
    ArrowRight,
    Bitcoin,
    Coins,
    Globe,
    Shield,
    Star,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react'
import { useEffect, useState } from 'react'

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

export default function HomePage() {
    const { user } = useAuth()
    const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                setLoading(true)
                // Usar API gratuita do CoinGecko
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=3&page=1&sparkline=false')

                if (!response.ok) {
                    throw new Error('Falha ao buscar dados das criptomoedas')
                }

                const data = await response.json()

                // Mapear dados da API para o formato dos cards
                const mappedData: CryptoData[] = data.slice(0, 3).map((crypto: any, index: number) => ({
                    id: crypto.id,
                    name: crypto.name,
                    symbol: crypto.symbol.toUpperCase(),
                    price: crypto.current_price,
                    change24h: crypto.price_change_percentage_24h,
                    marketCap: crypto.market_cap,
                    volume: crypto.total_volume,
                    color: ['#f7931a', '#627eea', '#f3ba2f'][index] // Cores para BTC, ETH, BNB
                }))

                setCryptoData(mappedData)
            } catch (err) {
                console.error('Erro ao buscar dados:', err)
                // Fallback para dados simulados
                setCryptoData([
                    {
                        id: 'bitcoin',
                        name: 'Bitcoin',
                        symbol: 'BTC',
                        price: 43250.50,
                        change24h: 2.5,
                        marketCap: 850000000000,
                        volume: 25000000000,
                        color: '#f7931a'
                    },
                    {
                        id: 'ethereum',
                        name: 'Ethereum',
                        symbol: 'ETH',
                        price: 3200,
                        change24h: -1.2,
                        marketCap: 380000000000,
                        volume: 18000000000,
                        color: '#627eea'
                    },
                    {
                        id: 'binance-coin',
                        name: 'BNB',
                        symbol: 'BNB',
                        price: 320,
                        change24h: 5.8,
                        marketCap: 52000000000,
                        volume: 2800000000,
                        color: '#f3ba2f'
                    }
                ])
            } finally {
                setLoading(false)
            }
        }

        fetchCryptoData()

        // Atualizar dados a cada 30 segundos
        const interval = setInterval(fetchCryptoData, 30000)

        return () => clearInterval(interval)
    }, [])

    const features = [
        {
            icon: <Shield className="w-8 h-8" />,
            title: 'Segurança Máxima',
            description: 'Sua segurança é nossa prioridade. Utilizamos as melhores práticas de segurança do mercado.'
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Transações Rápidas',
            description: 'Execute suas operações em segundos com nossa tecnologia de ponta.'
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: 'Acesso Global',
            description: 'Acesse sua conta de qualquer lugar do mundo, 24 horas por dia.'
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: 'Melhores Preços',
            description: 'Conectamos você às melhores exchanges para obter os preços mais competitivos.'
        }
    ]

    const stats = [
        { label: 'Usuários Ativos', value: '50K+', icon: <Users className="w-6 h-6" /> },
        { label: 'Transações Diárias', value: '1M+', icon: <Coins className="w-6 h-6" /> },
        { label: 'Países', value: '150+', icon: <Globe className="w-6 h-6" /> },
        { label: 'Avaliação', value: '4.9/5', icon: <Star className="w-6 h-6" /> }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Sua plataforma para{' '}
                                <span className="text-gradient">Bitcoin e outras criptomoedas</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Compre, venda e gerencie suas criptomoedas com segurança e facilidade.
                                Acesse as melhores exchanges do mercado em um só lugar.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                {user ? (
                                    <a href="/dashboard" className="btn-primary inline-flex items-center">
                                        Acessar Dashboard
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </a>
                                ) : (
                                    <>
                                        <a href="/register" className="btn-primary inline-flex items-center">
                                            Começar Agora
                                            <ArrowRight className="ml-2 w-5 h-5" />
                                        </a>
                                        <a href="/login" className="btn-outline">
                                            Fazer Login
                                        </a>
                                    </>
                                )}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative z-10">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        {loading ? (
                                            <div className="crypto-card bitcoin-gradient p-6 rounded-2xl text-white">
                                                <div className="animate-pulse">
                                                    <div className="flex items-center space-x-3 mb-4">
                                                        <Bitcoin className="w-8 h-8" />
                                                        <div>
                                                            <div className="h-4 bg-white bg-opacity-20 rounded w-20"></div>
                                                            <div className="h-3 bg-white bg-opacity-20 rounded w-12 mt-1"></div>
                                                        </div>
                                                    </div>
                                                    <div className="h-6 bg-white bg-opacity-20 rounded w-24 mb-2"></div>
                                                    <div className="h-4 bg-white bg-opacity-20 rounded w-16"></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="crypto-card bitcoin-gradient p-6 rounded-2xl text-white">
                                                <div className="flex items-center space-x-3">
                                                    <Bitcoin className="w-8 h-8" />
                                                    <div>
                                                        <h3 className="font-semibold">{cryptoData[0]?.name || 'Bitcoin'}</h3>
                                                        <p className="text-sm opacity-90">{cryptoData[0]?.symbol || 'BTC'}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <p className="text-2xl font-bold">${cryptoData[0]?.price?.toLocaleString() || '45,000'}</p>
                                                    <p className={`text-sm opacity-90 ${cryptoData[0]?.change24h >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                                                        {cryptoData[0]?.change24h >= 0 ? '+' : ''}{cryptoData[0]?.change24h?.toFixed(2) || '2.5'}%
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {loading ? (
                                            <div className="crypto-card ethereum-gradient p-6 rounded-2xl text-white">
                                                <div className="animate-pulse">
                                                    <div className="flex items-center space-x-3 mb-4">
                                                        <Coins className="w-8 h-8" />
                                                        <div>
                                                            <div className="h-4 bg-white bg-opacity-20 rounded w-20"></div>
                                                            <div className="h-3 bg-white bg-opacity-20 rounded w-12 mt-1"></div>
                                                        </div>
                                                    </div>
                                                    <div className="h-6 bg-white bg-opacity-20 rounded w-24 mb-2"></div>
                                                    <div className="h-4 bg-white bg-opacity-20 rounded w-16"></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="crypto-card ethereum-gradient p-6 rounded-2xl text-white">
                                                <div className="flex items-center space-x-3">
                                                    <Coins className="w-8 h-8" />
                                                    <div>
                                                        <h3 className="font-semibold">{cryptoData[1]?.name || 'Ethereum'}</h3>
                                                        <p className="text-sm opacity-90">{cryptoData[1]?.symbol || 'ETH'}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <p className="text-2xl font-bold">${cryptoData[1]?.price?.toLocaleString() || '3,200'}</p>
                                                    <p className={`text-sm opacity-90 ${cryptoData[1]?.change24h >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                                                        {cryptoData[1]?.change24h >= 0 ? '+' : ''}{cryptoData[1]?.change24h?.toFixed(2) || '-1.2'}%
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4 pt-8">
                                        {loading ? (
                                            <div className="crypto-card bnb-gradient p-6 rounded-2xl text-white">
                                                <div className="animate-pulse">
                                                    <div className="flex items-center space-x-3 mb-4">
                                                        <Coins className="w-8 h-8" />
                                                        <div>
                                                            <div className="h-4 bg-white bg-opacity-20 rounded w-20"></div>
                                                            <div className="h-3 bg-white bg-opacity-20 rounded w-12 mt-1"></div>
                                                        </div>
                                                    </div>
                                                    <div className="h-6 bg-white bg-opacity-20 rounded w-24 mb-2"></div>
                                                    <div className="h-4 bg-white bg-opacity-20 rounded w-16"></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="crypto-card bnb-gradient p-6 rounded-2xl text-white">
                                                <div className="flex items-center space-x-3">
                                                    <Coins className="w-8 h-8" />
                                                    <div>
                                                        <h3 className="font-semibold">{cryptoData[2]?.name || 'BNB'}</h3>
                                                        <p className="text-sm opacity-90">{cryptoData[2]?.symbol || 'BNB'}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <p className="text-2xl font-bold">${cryptoData[2]?.price?.toLocaleString() || '320'}</p>
                                                    <p className={`text-sm opacity-90 ${cryptoData[2]?.change24h >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                                                        {cryptoData[2]?.change24h >= 0 ? '+' : ''}{cryptoData[2]?.change24h?.toFixed(2) || '5.8'}%
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <TrendingUp className="w-8 h-8 text-primary-600" />
                                                </div>
                                                <h3 className="font-semibold text-gray-900">Market Cap</h3>
                                                <p className="text-2xl font-bold text-primary-600">$1.2T</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <StatsCard key={index} {...stat} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Por que escolher a <span className="text-gradient">CryptoMoney</span>?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Oferecemos a melhor experiência para investir em criptomoedas,
                            com segurança, rapidez e os melhores preços do mercado.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <FeatureCard {...feature} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Crypto Market Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Mercado de <span className="text-gradient">Criptomoedas</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Acompanhe os preços em tempo real e tome decisões informadas sobre seus investimentos.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {cryptoData.map((crypto, index) => (
                            <motion.div
                                key={crypto.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <CryptoCard crypto={crypto} />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <a href="/market" className="btn-outline inline-flex items-center">
                            Ver Todas as Criptomoedas
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 gradient-bg">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl font-bold text-white">
                            Pronto para começar sua jornada nas criptomoedas?
                        </h2>
                        <p className="text-xl text-primary-100">
                            Junte-se a milhares de usuários que já confiam na CryptoMoney para seus investimentos.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {user ? (
                                <a href="/dashboard" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                                    Acessar Dashboard
                                </a>
                            ) : (
                                <>
                                    <a href="/register" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                                        Criar Conta Grátis
                                    </a>
                                    <a href="/login" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                                        Fazer Login
                                    </a>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
