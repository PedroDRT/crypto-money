import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    // Simular autenticação (em produção, verificar no banco)
    if (email === 'admin@cryptomoney.com' && password === '123456') {
      const user = {
        id: '1',
        name: 'Administrador',
        email: 'admin@cryptomoney.com',
        createdAt: '2024-01-01T00:00:00.000Z',
        balance: 10000,
        cryptoHoldings: [
          { symbol: 'BTC', amount: 0.5, avgPrice: 45000 },
          { symbol: 'ETH', amount: 5, avgPrice: 3000 }
        ]
      }

      const token = `mock_token_${Date.now()}`

      return NextResponse.json({
        message: 'Login realizado com sucesso!',
        user,
        token
      })
    }

    // Credenciais inválidas
    return NextResponse.json(
      { error: 'Email ou senha incorretos' },
      { status: 401 }
    )

  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
