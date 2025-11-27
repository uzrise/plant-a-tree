// Note: We're using direct backend Google OAuth, not next-auth
// This file is kept for compatibility but Google login redirects directly to backend
export async function GET() {
  return new Response('Not used - Google OAuth handled by backend', { status: 404 });
}

export async function POST() {
  return new Response('Not used - Google OAuth handled by backend', { status: 404 });
}

