export const extractErrorMessage = (err, defaultKey) => {
  let errorMsg = err?.response?.data?.message;
  
  if (errorMsg && typeof errorMsg === 'object') {
    errorMsg = errorMsg.message || errorMsg.error || null;
  }
  
  if (!errorMsg || typeof errorMsg !== 'string') {
    return null;
  }
  
  return errorMsg;
};

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

export const translateBackendError = (errorKey, t) => {
  if (!errorKey || typeof errorKey !== 'string') {
    return t('generic');
  }

  if (errorKey.includes(':')) {
    const [key, paramsStr] = errorKey.split(':');
    const params = {};
    paramsStr.split(',').forEach((param) => {
      const [paramKey, value] = param.split('=');
      if (paramKey && value) {
        params[paramKey] = value;
      }
    });
    
    const frontendKey = backendToFrontendKeyMap[key] || 'waitBeforeResend';
    
    const translation = t(frontendKey, params);
    if (translation && translation !== frontendKey) {
      return translation;
    }
    
    return translateBackendError(key, t);
  }

  const frontendKey = backendToFrontendKeyMap[errorKey];
  if (frontendKey) {
    const translation = t(frontendKey);
    if (translation && translation !== frontendKey) {
      return translation;
    }
  }

  const directTranslation = t(errorKey);
  if (directTranslation && directTranslation !== errorKey) {
    return directTranslation;
  }

  return t('generic');
};

