# Frontend - Plant a Tree

Next.js 15 application with authentication and admin panel.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

3. Run the development server:
```bash
npm run dev
```

## Pages

- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/auth/verify-email` - Email verification page
- `/auth/create-profile` - Complete profile page
- `/profile` - User profile page
- `/admin` - Admin dashboard
- `/admin/users` - User management page

## Features

- Email + OTP verification
- Google OAuth login
- JWT token management with auto-refresh
- Admin panel for user management
- Internationalization (Uzbek, Russian, English)
- Responsive design with TailwindCSS
