import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validação básica
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      )
    }

    // Simular validação de email único (em produção, verificar no banco)
    if (email === 'admin@cryptomoney.com') {
      return NextResponse.json(
        { error: 'Este email já está em uso' },
        { status: 409 }
      )
    }

    // Simular criação de usuário (em produção, salvar no banco)
    const user = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString(),
      balance: 0,
      cryptoHoldings: []
    }

    // Simular token JWT (em produção, gerar token real)
    const token = `mock_token_${Date.now()}`

    return NextResponse.json({
      message: 'Usuário registrado com sucesso!',
      user,
      token
    }, { status: 201 })

  } catch (error) {
    console.error('Erro no registro:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
