// Helper function to translate backend error messages
export const translateBackendError = (errorMessage, t) => {
  if (!errorMessage || typeof errorMessage !== 'string') {
    return t('generic');
  }

  const errorLower = errorMessage.toLowerCase();

  // Check for "Please wait X seconds" pattern first
  const waitMatch = errorMessage.match(/please wait (\d+) seconds/i);
  if (waitMatch) {
    return t('waitBeforeResend', { seconds: waitMatch[1] });
  }

  // Map backend error messages to translation keys (ordered by specificity)
  // Note: 't' should be scoped to 'errors' namespace (useTranslations('errors'))
  const errorMap = [
    { key: 'user already exists', translation: 'userExists' },
    { key: 'user not found', translation: 'userNotFound' },
    { key: 'user already verified', translation: 'userAlreadyVerified' },
    { key: 'otp not found or expired', translation: 'otpNotFound' },
    { key: 'invalid otp code', translation: 'invalidOtp' },
    { key: 'otp expired', translation: 'otpExpired' },
    { key: 'please verify your email first', translation: 'verifyEmailFirst' },
    { key: 'account is blocked', translation: 'accountBlocked' },
    { key: 'please use google login', translation: 'useGoogleLogin' },
    { key: 'invalid credentials', translation: 'invalidCredentials' },
  ];

  // Check for matches
  for (const { key, translation } of errorMap) {
    if (errorLower.includes(key)) {
      return t(translation);
    }
  }

  // Return original message if no translation found
  return errorMessage;
};

