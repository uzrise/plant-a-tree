'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usersAPI } from '../../../lib/api';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const t = useTranslations('admin');
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const response = await usersAPI.getMe();
      if (response.data.role !== 'admin') {
        // Immediately redirect non-admin users without showing content
        router.replace('/profile');
        return;
      }
      // User is admin, allow access
      setLoading(false);
    } catch (err) {
      // Immediately redirect unauthenticated users
      router.replace('/auth/login');
      return;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#08743E] mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#08743E]">{t('dashboard.title')}</h1>
            <Link
              href="/profile"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              {t('dashboard.backToProfile')}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/admin/users"
              className="block p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border-2 border-blue-200"
            >
              <h2 className="text-xl font-semibold text-blue-900 mb-2">{t('dashboard.users')}</h2>
              <p className="text-blue-700">{t('dashboard.manageUsers')}</p>
            </Link>
            <Link
              href="/admin/contacts"
              className="block p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border-2 border-green-200"
            >
              <h2 className="text-xl font-semibold text-green-900 mb-2">{t('contacts.title')}</h2>
              <p className="text-green-700">{t('contacts.manageContacts')}</p>
            </Link>
            <Link
              href="/admin/donations"
              className="block p-6 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors border-2 border-purple-200"
            >
              <h2 className="text-xl font-semibold text-purple-900 mb-2">{t('donations.title')}</h2>
              <p className="text-purple-700">{t('donations.manageDonations')}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

