'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authAPI } from '../../../../lib/api';
import { translateBackendError, extractErrorMessage } from '../../../../lib/errorTranslations';

export default function VerifyEmailPage() {
  const t = useTranslations('auth');
  const errorT = useTranslations('errors');
  const validationT = useTranslations('validation');
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const otpSchema = z.object({
    otpCode: z.string().length(6, validationT('otpMustBe6Digits')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const onSubmit = async (data) => {
    if (!email) {
      setError(validationT('emailRequired'));
      return;
    }

    setError('');
    setLoading(true);
    try {
      await authAPI.verifyOTP(email, data.otpCode);
      router.push('/auth/create-profile');
    } catch (err) {
      const errorMsg = extractErrorMessage(err, 'verificationFailed') || errorT('verificationFailed');
      setError(translateBackendError(errorMsg, errorT));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || countdown > 0) return;

    setResending(true);
    setError('');
    try {
      await authAPI.sendOTP(email);
      setCountdown(90); // 90 seconds cooldown
    } catch (err) {
      const errorMsg = extractErrorMessage(err, 'resendFailed') || errorT('resendFailed');
      setError(translateBackendError(errorMsg, errorT));
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{validationT('emailRequired')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-[#08743E]">
          {t('verify.title')}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {t('verify.description')} <strong>{email}</strong>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('verify.otp')}
            </label>
            <input
              type="text"
              {...register('otpCode')}
              maxLength={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08743E] focus:border-transparent text-center text-2xl tracking-widest"
              placeholder="000000"
            />
            {errors.otpCode && (
              <p className="mt-1 text-sm text-red-600">{errors.otpCode.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#08743E] text-white py-2 px-4 rounded-lg hover:bg-[#065a2e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? t('verify.loading') : t('verify.submit')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResend}
            disabled={resending || countdown > 0}
            className="text-[#08743E] hover:underline disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {countdown > 0
              ? t('verify.resendCountdown', { seconds: countdown })
              : t('verify.resend')}
          </button>
        </div>
      </div>
    </div>
  );
}

