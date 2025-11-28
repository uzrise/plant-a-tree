'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usersAPI } from '../../../../lib/api';
import { translateBackendError } from '../../../../lib/errorTranslations';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  phone: z.string().min(1, 'Phone is required'),
});

export default function CreateProfilePage() {
  const t = useTranslations('auth');
  const errorT = useTranslations('errors');
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);
    try {
      await usersAPI.updateProfile(data);
      router.push('/');
    } catch (err) {
      const errorMsg = err.response?.data?.message || errorT('updateProfileFailed');
      setError(translateBackendError(errorMsg, errorT));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#08743E]">
          {t('createProfile.title')}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {t('createProfile.description')}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('createProfile.name')}
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08743E] focus:border-transparent"
              placeholder={t('createProfile.namePlaceholder')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('createProfile.surname')}
            </label>
            <input
              type="text"
              {...register('surname')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08743E] focus:border-transparent"
              placeholder={t('createProfile.surnamePlaceholder')}
            />
            {errors.surname && (
              <p className="mt-1 text-sm text-red-600">{errors.surname.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('createProfile.phone')}
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08743E] focus:border-transparent"
              placeholder={t('createProfile.phonePlaceholder')}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#08743E] text-white py-2 px-4 rounded-lg hover:bg-[#065a2e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? t('createProfile.loading') : t('createProfile.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}

