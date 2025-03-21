import { NextResponse } from 'next/server';

// This is a simplified auth handler. In a real application, you would:
// 1. Hash passwords
// 2. Connect to a database
// 3. Use proper session management
// 4. Implement proper JWT or other token-based auth

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Basic validation
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    // Demo authentication logic - replace with real authentication
    // In a real application, you would check against a database
    if (username === 'admin' && password === 'password') {
      // For demo purposes, generate a simple token
      const token = btoa(`${username}:${Date.now()}`);
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Authentication successful',
          token,
          user: {
            id: 1,
            username,
            role: 'admin'
          }
        },
        { status: 200 }
      );
    }
    
    // Authentication failed
    return NextResponse.json(
      { success: false, message: 'Invalid username or password' },
      { status: 401 }
    );
    
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
