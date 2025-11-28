'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { donationsAPI, usersAPI } from '../../../../lib/api';
import Link from 'next/link';

export default function AdminDonationsPage() {
  const t = useTranslations('admin');
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [groupedDonations, setGroupedDonations] = useState([]);
  const [expandedUsers, setExpandedUsers] = useState(new Set());

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const response = await usersAPI.getMe();
      if (response.data.role !== 'admin') {
        router.push('/profile');
      } else {
        loadDonations();
      }
    } catch (err) {
      console.error('Admin check failed:', err);
      router.push('/auth/login');
    } finally {
      setLoading(false);
    }
  };

  const loadDonations = async () => {
    try {
      const response = await donationsAPI.getAllGrouped();
      setGroupedDonations(response.data);
    } catch (err) {
      console.error('Failed to load donations:', err);
      const errorMessage = err.response?.data?.message || err.message || t('donations.loadError');
      setError(errorMessage);
    }
  };

  const toggleExpand = (userId) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
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
            <h1 className="text-3xl font-bold text-[#08743E]">{t('donations.title')}</h1>
            <Link
              href="/admin"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              {t('donations.backToDashboard')}
            </Link>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {groupedDonations.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {t('donations.noDonations')}
            </div>
          ) : (
            <div className="space-y-2">
              {groupedDonations.map((group) => {
                const isExpanded = expandedUsers.has(group.userId?.toString() || group.userId);
                const hasMultipleDonations = group.donationCount > 1;
                const userIdStr = group.userId?.toString() || group.userId;

                return (
                  <div key={userIdStr} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Collapsed/Summary Row */}
                    <div
                      className={`bg-white ${
                        hasMultipleDonations ? 'cursor-pointer hover:bg-gray-50' : ''
                      } transition-colors`}
                      onClick={() => hasMultipleDonations && toggleExpand(userIdStr)}
                    >
                      <div className="px-6 py-4 flex items-center gap-4">
                        <div className="flex items-center gap-2 flex-shrink-0 min-w-[200px]">
                          {hasMultipleDonations && (
                            <button className="text-gray-500 hover:text-gray-700 flex-shrink-0">
                              {isExpanded ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              )}
                            </button>
                          )}
                          <div className="min-w-[270px]">
                            {group.user ? (
                              <>
                                <div className="text-sm font-medium text-gray-900 truncate">{group.user.email}</div>
                                <div className="text-xs text-gray-500 truncate">
                                  {group.user.name} {group.user.surname}
                                </div>
                              </>
                            ) : (
                              <span className="text-sm text-gray-400">User ID: {userIdStr}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-900 flex-shrink-0 min-w-[120px]">
                          <div className="whitespace-nowrap">{formatAmount(group.totalAmount)} UZS</div>
                          {hasMultipleDonations && (
                            <div className="text-xs text-gray-500">{t('donations.total')}</div>
                          )}
                        </div>
                        <div className="text-sm text-gray-900 flex-shrink-0 min-w-[100px]">
                          <div>{group.totalTreeCount}</div>
                          {hasMultipleDonations && (
                            <div className="text-xs text-gray-500">{t('donations.totalTrees')}</div>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 flex-shrink-0 min-w-[120px]">
                          {hasMultipleDonations ? (
                            <div>
                              <div>{group.donationCount} {t('donations.times')}</div>
                              <div className="text-xs">{t('donations.lastDonation')}</div>
                            </div>
                          ) : (
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                group.donations[0]?.anonymous
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {group.donations[0]?.anonymous ? t('donations.anonymous') : t('donations.no')}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 flex-shrink-0 min-w-[150px]">
                          <div className="whitespace-nowrap">{formatDate(group.lastDonationDate)}</div>
                          {hasMultipleDonations && (
                            <div className="text-xs">{t('donations.lastDate')}</div>
                          )}
                        </div>
                        <div className="text-sm font-medium flex-shrink-0 ml-auto">
                          {group.user?._id && (
                            <Link
                              href={`/admin/users?id=${group.user._id}`}
                              className="text-[#08743E] hover:underline whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {t('donations.viewProfile')}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Rows - Individual Donations */}
                    {hasMultipleDonations && isExpanded && (
                      <div className="bg-gray-50 border-t border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t('donations.amount')}
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t('donations.treeCount')}
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t('donations.anonymous')}
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t('donations.date')}
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {group.donations.map((donation) => (
                              <tr key={donation.id || donation._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {formatAmount(donation.amount)} UZS
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {donation.treeCount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                      donation.anonymous
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-green-100 text-green-800'
                                    }`}
                                  >
                                    {donation.anonymous ? t('donations.anonymous') : t('donations.no')}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDate(donation.createdAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

