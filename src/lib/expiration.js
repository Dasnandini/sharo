/**
 * Calculates expiration Date based on duration option
 * @param {string} duration - '1h', '24h', '7d' or labels like '1 Hour', '24 Hours', '7 Days'
 * @returns {Date}
 */
export function calculateExpiresAt(duration = '24h') {
  const now = new Date();
  const dur = String(duration).toLowerCase();

  if (dur.includes('1h') || dur.includes('1 hour')) {
    return new Date(now.getTime() + 60 * 60 * 1000);
  } else if (dur.includes('7d') || dur.includes('7 days')) {
    return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  } else {
    // Default 24 Hours
    return new Date(now.getTime() + 24 * 60 * 60 * 1000);
  }
}

/**
 * Checks if a date has passed
 * @param {Date|string} expiresAt 
 * @returns {boolean}
 */
export function isExpired(expiresAt) {
  if (!expiresAt) return true;
  return new Date(expiresAt).getTime() <= Date.now();
}

/**
 * Returns human-readable remaining time string (e.g., "23h 58m", "42m", "6d 22h", or "Expired")
 * @param {Date|string} expiresAt 
 * @returns {string}
 */
export function formatTimeRemaining(expiresAt) {
  if (!expiresAt) return 'Expired';
  
  const expiryTime = new Date(expiresAt).getTime();
  const diffMs = expiryTime - Date.now();

  if (diffMs <= 0) return 'Expired';

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    const remainingHours = diffHours % 24;
    return `${diffDays}d ${remainingHours}h`;
  }

  if (diffHours > 0) {
    const remainingMinutes = diffMinutes % 60;
    return `${diffHours}h ${remainingMinutes}m`;
  }

  return `${diffMinutes}m`;
}
