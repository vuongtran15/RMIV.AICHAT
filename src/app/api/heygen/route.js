import { NextResponse } from 'next/server';

const HEYGEN_API_KEY = 'YzRhZjAzZDhmYmY2NDQ1Mjg5YjMyMDI0MWJkYTJlYzQtMTc0MzIyNzE3OQ==';
const HEYGEN_API_URL = 'https://api.heygen.com/v2';

// Endpoints cụ thể theo tài liệu Heygen API
const ENDPOINTS = {
  AVATARS: 'avatars', // Lấy danh sách avatars
  VOICES: 'voices', // Lấy danh sách voices
  AVATAR_GROUP_LIST:"avatar_group.list",
  AVATAR_GROUP_DETAIL:"avatar_group/{group_id}/avatars",
  VIDEO_GENERATE:"video/generate"
};

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds
const cache = {
  data: {},
  timestamp: {}
};
const CACHE_ENDPOINTS = ['AVATARS', 'VOICES', 'AVATAR_GROUP_LIST'];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint || !ENDPOINTS[endpoint]) {
      return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    // Check if endpoint should be cached
    if (CACHE_ENDPOINTS.includes(endpoint)) {
      const now = Date.now();
      // Return cached data if it exists and is not expired
      if (cache.data[endpoint] && cache.timestamp[endpoint] && (now - cache.timestamp[endpoint] < CACHE_DURATION)) {
        return NextResponse.json(cache.data[endpoint]);
      }
    }

    const response = await fetch(`${HEYGEN_API_URL}/${ENDPOINTS[endpoint]}`, {
      headers: {
        'accept': 'application/json',
        'x-api-key': HEYGEN_API_KEY,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HeyGen API error: ${response.status}`);
    }

    const data = await response.json();

    // Cache the response if endpoint is in CACHE_ENDPOINTS
    if (CACHE_ENDPOINTS.includes(endpoint)) {
      cache.data[endpoint] = data;
      cache.timestamp[endpoint] = Date.now();
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('HeyGen API error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch from Heygen API',
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint || !ENDPOINTS[endpoint]) {
      return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    const body = await request.json();
    
    const response = await fetch(`${HEYGEN_API_URL}/${ENDPOINTS[endpoint]}`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'x-api-key': HEYGEN_API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HeyGen API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('HeyGen API error:', error);
    return NextResponse.json({ 
      error: 'Failed to post to Heygen API',
      details: error.message 
    }, { status: 500 });
  }
} 