import { verify } from 'jsonwebtoken';

/**
 * Extracts and verifies user information from a JWT token
 * @param {string} token - The JWT token to verify
 * @returns {Object|null} The decoded token payload or null if invalid
 */
export function extractUserFromToken(token) {
  if (!token) return null;
  
  try {
    // Verify the token using the secret key
    const decoded = verify(token, process.env.JWT_SECRET);
    
    // Return user information
    return {
      id: decoded.id,
      username: decoded.username,
      // Add any other user properties you need
    };
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}

/**
 * Checks if a token is valid and not expired
 * @param {string} token - The JWT token to check
 * @returns {boolean} Whether the token is valid
 */
export function isValidToken(token) {
  return !!extractUserFromToken(token);
}
