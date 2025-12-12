'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usersAPI } from '../../../../lib/api';
import Link from 'next/link';

export default function AdminUsersPage() {
  const t = useTranslations('admin');
  const router = useRouter();
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get('id');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAdminAndLoadUsers();
  }, []);

  useEffect(() => {
    if (userIdParam) {
      loadUserById(userIdParam);
    }
  }, [userIdParam]);

  const checkAdminAndLoadUsers = async () => {
    try {
      const meResponse = await usersAPI.getMe();
      if (meResponse.data.role !== 'admin') {
        router.replace('/profile');
        return;
      }

      // User is admin, load users
      const usersResponse = await usersAPI.getAllUsers();
      setUsers(usersResponse.data);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        router.replace('/auth/login');
        return;
      } else {
        setError(t('users.loadError'));
        setLoading(false);
      }
    }
  };

  const loadUserById = async (userId) => {
    try {
      const response = await usersAPI.getUserById(userId);
      setSelectedUser(response.data);
    } catch (err) {
        setError(t('users.userLoadError'));
      setSelectedUser(null);
    }
  };

  const handleToggleBlock = async (userId) => {
    try {
      await usersAPI.toggleBlock(userId);
      await checkAdminAndLoadUsers();
      if (selectedUser && selectedUser.id === userId) {
        await loadUserById(userId);
      }
    } catch (err) {
        setError(err.response?.data?.message || t('users.toggleError'));
    }
  };

  const handleCloseUserDetail = () => {
    setSelectedUser(null);
    router.push('/admin/users');
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

  if (selectedUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#08743E]">{t('users.viewProfile')}</h1>
            <button
              onClick={handleCloseUserDetail}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              {t('users.backToUsers')}
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('users.email')}</label>
              <p className="mt-1 text-gray-900">{selectedUser.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('users.name')}</label>
              <p className="mt-1 text-gray-900">{selectedUser.name || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('users.surname')}</label>
              <p className="mt-1 text-gray-900">{selectedUser.surname || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('users.phone')}</label>
              <p className="mt-1 text-gray-900">{selectedUser.phone || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('users.role')}</label>
              <p className="mt-1">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {selectedUser.role}
                </span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('users.status')}</label>
              <p className="mt-1">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedUser.blocked
                      ? 'bg-red-100 text-red-800'
                      : selectedUser.verified
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {selectedUser.blocked
                    ? t('users.blocked')
                    : selectedUser.verified
                    ? t('users.verified')
                    : t('users.unverified')}
                </span>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t('users.createdAt')}</label>
              <p className="mt-1 text-gray-900">
                {new Date(selectedUser.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => handleToggleBlock(selectedUser.id)}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  selectedUser.blocked
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {selectedUser.blocked ? t('users.unblockUser') : t('users.blockUser')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#08743E]">{t('users.title')}</h1>
          <Link
            href="/admin"
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            {t('users.back')}
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('users.email')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('users.name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('users.phone')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('users.role')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('users.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('users.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name} {user.surname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.phone || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.blocked
                          ? 'bg-red-100 text-red-800'
                          : user.verified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {user.blocked
                        ? t('users.blocked')
                        : user.verified
                        ? t('users.verified')
                        : t('users.unverified')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={`/admin/users?id=${user.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {t('users.view')}
                    </Link>
                    <button
                      onClick={() => handleToggleBlock(user.id)}
                      className={`${
                        user.blocked
                          ? 'text-green-600 hover:text-green-900'
                          : 'text-red-600 hover:text-red-900'
                      }`}
                    >
                      {user.blocked ? t('users.unblock') : t('users.block')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

