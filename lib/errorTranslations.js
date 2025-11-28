// Helper function to extract error message from response
export const extractErrorMessage = (err, defaultKey) => {
  let errorMsg = err?.response?.data?.message;
  
  // Handle nested message object
  if (errorMsg && typeof errorMsg === 'object') {
    errorMsg = errorMsg.message || errorMsg.error || null;
  }
  
  // Fallback to default if no message found
  if (!errorMsg || typeof errorMsg !== 'string') {
    return null;
  }
  
  return errorMsg;
};

// Mapping from backend translation keys to frontend error keys
const backendToFrontendKeyMap = {
  'user.already.exists': 'userExists',
  'user.not.found': 'userNotFound',
  'user.already.verified': 'userAlreadyVerified',
  'otp.not.found': 'otpNotFound',
  'otp.invalid': 'invalidOtp',
  'otp.expired': 'otpExpired',
  'otp.wait': 'waitBeforeResend',
  'email.not.verified': 'verifyEmailFirst',
  'account.blocked': 'accountBlocked',
  'use.google.login': 'useGoogleLogin',
  'credentials.invalid': 'invalidCredentials',
  'donation.not.found': 'donationNotFound',
  'donation.already.paid': 'donationAlreadyPaid',
  'unauthorized': 'unauthorized',
  'invalid.request': 'invalidRequest',
  'admin.access.required': 'adminAccessRequired',
};

// Helper function to translate backend error messages
// Backend sends translation keys (e.g., "user.already.exists")
// Frontend translates them using the errors namespace
export const translateBackendError = (errorKey, t) => {
  if (!errorKey || typeof errorKey !== 'string') {
    return t('generic');
  }

  // Handle keys with parameters (e.g., "otp.wait:seconds=90")
  if (errorKey.includes(':')) {
    const [key, paramsStr] = errorKey.split(':');
    const params = {};
    paramsStr.split(',').forEach((param) => {
      const [paramKey, value] = param.split('=');
      if (paramKey && value) {
        params[paramKey] = value;
      }
    });
    
    // Map backend key to frontend key
    const frontendKey = backendToFrontendKeyMap[key] || 'waitBeforeResend';
    
    // Try to translate with parameters
    const translation = t(frontendKey, params);
    if (translation && translation !== frontendKey) {
      return translation;
    }
    
    // Fallback to key without parameters
    return translateBackendError(key, t);
  }

  // Map backend key to frontend key
  const frontendKey = backendToFrontendKeyMap[errorKey];
  if (frontendKey) {
    const translation = t(frontendKey);
    if (translation && translation !== frontendKey) {
      return translation;
    }
  }

  // If it's not a mapped key, try direct lookup (for backward compatibility)
  const directTranslation = t(errorKey);
  if (directTranslation && directTranslation !== errorKey) {
    return directTranslation;
  }

  // Fallback to generic error
  return t('generic');
};

