import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token de autenticação não fornecido' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    // Em produção, verificar o token JWT
    // Por enquanto, simular validação
    if (token.startsWith('mock_token_')) {
      const user = {
        id: '1',
        name: 'Usuário Teste',
        email: 'usuario@teste.com',
        createdAt: '2024-01-01T00:00:00.000Z',
        balance: 5000,
        cryptoHoldings: [
          { symbol: 'BTC', amount: 0.1, avgPrice: 45000 }
        ]
      }

      return NextResponse.json(user)
    }

    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    )

  } catch (error) {
    console.error('Erro na verificação:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
