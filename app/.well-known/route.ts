import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    accountAssociation: {
      header:
        'eyJmaWQiOjYwNDExNCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweGRENWM3MTg1MjQwMTcyQTI2YkFkMjQ2YjgxQzBGNjgwRWQ5MzY1ZEIifQ',
      payload: 'eyJkb21haW4iOiJiYXNlbWFuLWV0YS52ZXJjZWwuYXBwIn0',
      signature:
        'MHhiMmI2ZjE1ZmE5MzZhYWE0NmY4NzA3YzQxYWJhOWY3YmQxYmRlOGM0YzY5MWQ0ZmM0ZGI5ZGYwZTg0NzVmYzNlNjM4ZjE0YTY5YzYyZGRkZTUyOGE1ZjE0NWEwOTE3YTg5YThlZGM1OWQwYWFhZGRjNjE3MGViNzY0MWNkNjFi',
    },
    frame: {
      version: '1',
      name: 'Baseman',
      iconUrl: 'https://baseman-eta.vercel.app/baseman.png',
      splashImageUrl: 'https://baseman-eta.vercel.app/fondo.png',
      splashBackgroundColor: '#0f172a',
      homeUrl: 'https://baseman-eta.vercel.app',
      webhookUrl: 'https://baseman-eta.vercel.app/api/webhook',
    },
  };

  return NextResponse.json(manifest);
}
