import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Em produção, invalidar o token no servidor
    // Por enquanto, apenas retornar sucesso

    return NextResponse.json({
      message: 'Logout realizado com sucesso!'
    })

  } catch (error) {
    console.error('Erro no logout:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
