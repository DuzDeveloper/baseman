import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Aquí puedes manejar los eventos del webhook
    console.log('Webhook received:', body);

    // Por ejemplo, podrías guardar analytics, enviar notificaciones, etc.
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
