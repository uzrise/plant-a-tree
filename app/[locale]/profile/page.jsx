'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usersAPI, authAPI } from '../../../lib/api';
import { translateBackendError } from '../../../lib/errorTranslations';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Surname is required'),
  phone: z.string().min(1, 'Phone is required'),
});

export default function ProfilePage() {
  const t = useTranslations('profile');
  const errorT = useTranslations('errors');
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await usersAPI.getMe();
      setUser(response.data);
      reset({
        name: response.data.name,
        surname: response.data.surname,
        phone: response.data.phone,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        router.push('/auth/login');
      } else {
        setError(errorT('loadProfileFailed'));
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setError('');
    setSaving(true);
    try {
      await usersAPI.updateProfile(data);
      await loadUser();
      setEditMode(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || errorT('updateProfileFailed');
      setError(translateBackendError(errorMsg, errorT));
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout error:', err);
      router.push('/auth/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#08743E] mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#08743E]">{t('title')}</h1>
          {user.role === 'admin' && (
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('adminPanel')}
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {!editMode ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('email')}</label>
              <p className="mt-1 text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('name')}</label>
              <p className="mt-1 text-gray-900">{user.name || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('surname')}</label>
              <p className="mt-1 text-gray-900">{user.surname || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('phone')}</label>
              <p className="mt-1 text-gray-900">{user.phone || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('role')}</label>
              <p className="mt-1 text-gray-900 capitalize">{user.role}</p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setEditMode(true)}
                className="flex-1 bg-[#08743E] text-white py-2 px-4 rounded-lg hover:bg-[#065a2e] transition-colors"
              >
                {t('edit')}
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('logout')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('name')}</label>
              <input
                type="text"
                {...register('name')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08743E] focus:border-transparent"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('surname')}</label>
              <input
                type="text"
                {...register('surname')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08743E] focus:border-transparent"
              />
              {errors.surname && (
                <p className="mt-1 text-sm text-red-600">{errors.surname.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone')}</label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#08743E] focus:border-transparent"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#08743E] text-white py-2 px-4 rounded-lg hover:bg-[#065a2e] transition-colors disabled:opacity-50"
              >
                {saving ? t('saving') : t('save')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  reset({
                    name: user.name,
                    surname: user.surname,
                    phone: user.phone,
                  });
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                {t('cancel')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

