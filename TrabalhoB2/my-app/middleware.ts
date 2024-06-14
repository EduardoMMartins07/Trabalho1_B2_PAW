import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token') || '';

  try {
    jwt.verify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: '/products',
};
