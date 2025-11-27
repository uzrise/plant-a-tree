'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { contactsAPI, usersAPI } from '../../../../lib/api';
import Link from 'next/link';

export default function AdminContactsPage() {
  const t = useTranslations('admin');
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const response = await usersAPI.getMe();
      if (response.data.role !== 'admin') {
        router.replace('/profile');
        return;
      }
      // User is admin, load contacts
      await loadContacts();
      setLoading(false);
    } catch (err) {
      router.replace('/auth/login');
      return;
    }
  };

  const loadContacts = async () => {
    try {
      const [contactsResponse, unreadResponse] = await Promise.all([
        contactsAPI.getAll(),
        contactsAPI.getUnreadCount(),
      ]);
      setContacts(contactsResponse.data);
      setUnreadCount(unreadResponse.data.count);
    } catch (err) {
      setError(t('contacts.loadError'));
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await contactsAPI.markAsRead(id);
      loadContacts();
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
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
            <div>
              <h1 className="text-3xl font-bold text-[#08743E]">{t('contacts.title')}</h1>
              {unreadCount > 0 && (
                <p className="text-red-600 mt-1">
                  {unreadCount === 1
                    ? t('contacts.unreadCount', { count: unreadCount })
                    : t('contacts.unreadCountPlural', { count: unreadCount })}
                </p>
              )}
            </div>
            <Link
              href="/admin"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              {t('contacts.backToDashboard')}
            </Link>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {contacts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {t('contacts.noMessages')}
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact._id || contact.id}
                  className={`border rounded-lg p-6 ${
                    !contact.read ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {contact.name}
                        </h3>
                        {!contact.read && (
                          <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                            {t('contacts.new')}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong>{t('contacts.email')}:</strong> {contact.email}
                        </p>
                        {contact.phone && (
                          <p>
                            <strong>{t('contacts.phone')}:</strong> {contact.phone}
                          </p>
                        )}
                        <p>
                          <strong>{t('contacts.date')}:</strong> {formatDate(contact.createdAt)}
                        </p>
                        {contact.userId && (
                          <div className="mt-2">
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded mr-2">
                              {t('contacts.registeredUser')}
                            </span>
                            <Link
                              href={`/admin/users?id=${
                                typeof contact.userId === 'object'
                                  ? contact.userId._id || contact.userId.id
                                  : contact.userId
                              }`}
                              className="text-[#08743E] hover:underline font-medium text-sm"
                            >
                              {t('contacts.viewProfile')}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                    {!contact.read && (
                      <button
                        onClick={() => handleMarkAsRead(contact._id || contact.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        {t('contacts.markAsRead')}
                      </button>
                    )}
                  </div>
                  <div className="mt-4 p-4 bg-white rounded border border-gray-200">
                    <p className="text-gray-800 whitespace-pre-wrap">{contact.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

